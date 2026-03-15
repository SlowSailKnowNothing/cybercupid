/**
 * @source cursor @line_count 178
 */

import type { UserSettings } from './types';

export interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LLMResponse {
  content: string;
  model: string;
  usage?: { prompt_tokens: number; completion_tokens: number };
}

interface ProviderConfig {
  url: string;
  defaultModel: string;
  authHeader: (key: string) => Record<string, string>;
  buildBody: (model: string, messages: LLMMessage[]) => object;
  parseResponse: (data: unknown) => LLMResponse;
}

const PROVIDERS: Record<string, ProviderConfig> = {
  deepseek: {
    url: 'https://api.deepseek.com/v1/chat/completions',
    defaultModel: 'deepseek-chat',
    authHeader: (key) => ({ Authorization: `Bearer ${key}` }),
    buildBody: (model, messages) => ({
      model,
      messages,
      temperature: 0.8,
      max_tokens: 2048,
      stream: false,
    }),
    parseResponse: (data: any) => ({
      content: data.choices?.[0]?.message?.content || '',
      model: data.model || 'deepseek',
      usage: data.usage,
    }),
  },
  gemini: {
    url: 'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent',
    defaultModel: 'gemini-2.5-flash',
    authHeader: () => ({}),
    buildBody: (_model, messages) => {
      const systemInstruction = messages.find((m) => m.role === 'system');
      const contents = messages
        .filter((m) => m.role !== 'system')
        .map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }));
      return {
        ...(systemInstruction
          ? {
              systemInstruction: {
                parts: [{ text: systemInstruction.content }],
              },
            }
          : {}),
        contents,
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 2048,
        },
      };
    },
    parseResponse: (data: any) => ({
      content: data.candidates?.[0]?.content?.parts?.[0]?.text || '',
      model: data.modelVersion || 'gemini',
      usage: data.usageMetadata
        ? {
            prompt_tokens: data.usageMetadata.promptTokenCount || 0,
            completion_tokens: data.usageMetadata.candidatesTokenCount || 0,
          }
        : undefined,
    }),
  },
  custom: {
    url: '',
    defaultModel: '',
    authHeader: (key) => ({ Authorization: `Bearer ${key}` }),
    buildBody: (model, messages) => ({
      model,
      messages,
      temperature: 0.8,
      max_tokens: 2048,
      stream: false,
    }),
    parseResponse: (data: any) => ({
      content: data.choices?.[0]?.message?.content || '',
      model: data.model || 'custom',
      usage: data.usage,
    }),
  },
};

export async function callLLM(
  settings: UserSettings,
  messages: LLMMessage[]
): Promise<LLMResponse> {
  const provider = settings.llm_provider || 'deepseek';
  const config = PROVIDERS[provider];

  if (!config) {
    throw new Error(`不支持的模型提供商: ${provider}`);
  }

  if (!settings.api_key) {
    throw new Error('请先在设置中配置 API Key');
  }

  let url: string;
  let model: string;
  let headers: Record<string, string>;
  let body: object;

  if (provider === 'custom') {
    if (!settings.custom_provider_url) {
      throw new Error('自定义模型需要填写 API 地址');
    }
    url = settings.custom_provider_url;
    model = settings.custom_model_name || 'default';
    headers = {
      'Content-Type': 'application/json',
      ...config.authHeader(settings.api_key),
    };
    body = config.buildBody(model, messages);
  } else if (provider === 'gemini') {
    model = settings.model_name || config.defaultModel;
    url = `${config.url.replace('{model}', model)}?key=${settings.api_key}`;
    headers = { 'Content-Type': 'application/json' };
    body = config.buildBody(model, messages);
  } else {
    model = settings.model_name || config.defaultModel;
    url = config.url;
    headers = {
      'Content-Type': 'application/json',
      ...config.authHeader(settings.api_key),
    };
    body = config.buildBody(model, messages);
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `LLM API 调用失败 (${response.status}): ${errorText.slice(0, 200)}`
    );
  }

  const data = await response.json();
  return config.parseResponse(data);
}

export function getAvailableModels(): {
  provider: string;
  label: string;
  models: { value: string; label: string }[];
}[] {
  return [
    {
      provider: 'deepseek',
      label: 'DeepSeek',
      models: [
        { value: 'deepseek-chat', label: 'DeepSeek V3 (deepseek-chat)' },
        { value: 'deepseek-reasoner', label: 'DeepSeek R1 (deepseek-reasoner)' },
      ],
    },
    {
      provider: 'gemini',
      label: 'Google Gemini',
      models: [
        { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
        { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro' },
        { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
      ],
    },
    {
      provider: 'custom',
      label: '自定义模型',
      models: [{ value: 'custom', label: '自定义 (OpenAI 兼容 API)' }],
    },
  ];
}
