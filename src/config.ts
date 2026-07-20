import Anthropic from "@anthropic-ai/sdk";
import { HireCraftConfig } from "./types";

let _config: HireCraftConfig = {};
let _client: Anthropic | null = null;

/**
 * Configure recruitkit with API keys and defaults.
 * Call once at startup before using AI-powered modules.
 */
export function configure(config: HireCraftConfig): void {
  _config = {
    model: "claude-sonnet-4-6",
    maxTokens: 4096,
    budgetCapUsd: 0.5,
    ...config,
  };
  _client = null; // Reset client on reconfigure
}

export function getConfig(): HireCraftConfig {
  return _config;
}

export function getClient(): Anthropic {
  if (!_config.anthropicApiKey) {
    throw new Error(
      "[recruitkit] Anthropic API key required for AI-powered features. " +
        "Call configure({ anthropicApiKey: '...' }) first, " +
        "or set ANTHROPIC_API_KEY environment variable."
    );
  }
  if (!_client) {
    _client = new Anthropic({ apiKey: _config.anthropicApiKey });
  }
  return _client;
}

export function requireApiKey(feature: string): void {
  const key =
    _config.anthropicApiKey || process.env.ANTHROPIC_API_KEY;
  if (!key) {
    throw new Error(
      `[recruitkit] ${feature} requires an Anthropic API key. ` +
        `Call configure({ anthropicApiKey: '...' }) or set ANTHROPIC_API_KEY env var.`
    );
  }
  if (!_config.anthropicApiKey && key) {
    _config.anthropicApiKey = key;
  }
}

/**
 * Rough token estimation for budget guardrails.
 * ~4 chars per token for English text.
 */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * Estimate cost in USD for a Claude API call.
 * Sonnet 4.6 pricing: $3/M input, $15/M output (approximate).
 */
export function estimateCostUsd(
  inputTokens: number,
  outputTokens: number
): number {
  const inputCost = (inputTokens / 1_000_000) * 3;
  const outputCost = (outputTokens / 1_000_000) * 15;
  return inputCost + outputCost;
}

export function checkBudget(estimatedInputTokens: number): void {
  const cap = _config.budgetCapUsd ?? 0.5;
  const estimated = estimateCostUsd(
    estimatedInputTokens,
    _config.maxTokens ?? 4096
  );
  if (estimated > cap) {
    throw new Error(
      `[recruitkit] Estimated cost ($${estimated.toFixed(4)}) exceeds budget cap ($${cap.toFixed(2)}). ` +
        `Increase budgetCapUsd in configure() or reduce input size.`
    );
  }
}

/**
 * Call Claude with standard error handling and budget checks.
 */
export async function callClaude(
  systemPrompt: string,
  userPrompt: string
): Promise<{ text: string; inputTokens: number; outputTokens: number }> {
  requireApiKey("This feature");
  const client = getClient();
  const config = getConfig();

  const inputEstimate = estimateTokens(systemPrompt + userPrompt);
  checkBudget(inputEstimate);

  const response = await client.messages.create({
    model: config.model || "claude-sonnet-4-6",
    max_tokens: config.maxTokens || 4096,
    messages: [{ role: "user", content: userPrompt }],
    system: systemPrompt,
  });

  const text = response.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("\n");

  return {
    text,
    inputTokens: response.usage.input_tokens,
    outputTokens: response.usage.output_tokens,
  };
}

/**
 * Call Claude expecting JSON output. Parses and returns typed result.
 */
export async function callClaudeJSON<T>(
  systemPrompt: string,
  userPrompt: string
): Promise<{ data: T; inputTokens: number; outputTokens: number }> {
  const result = await callClaude(
    systemPrompt +
      "\n\nIMPORTANT: Respond ONLY with valid JSON. No markdown backticks, no preamble, no explanation. Just the JSON object.",
    userPrompt
  );

  const cleaned = result.text
    .replace(/^```json\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  try {
    const data = JSON.parse(cleaned) as T;
    return { data, inputTokens: result.inputTokens, outputTokens: result.outputTokens };
  } catch {
    throw new Error(
      `[recruitkit] Failed to parse Claude JSON response. Raw output:\n${result.text.slice(0, 500)}`
    );
  }
}
