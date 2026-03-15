/**
 * @source cursor @line_count 78
 */

export interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  nickname: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}

export interface UserSettings {
  id: number;
  user_id: number;
  llm_provider: string;
  model_name: string;
  api_key: string;
  custom_provider_url: string;
  custom_model_name: string;
  language: string;
}

export interface Conversation {
  id: number;
  user_id: number;
  title: string;
  module: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: number;
  conversation_id: number;
  role: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string;
}

export interface UserProfile {
  id: number;
  user_id: number;
  profile_data: string;
  radar_data: string;
  level: number;
  exp: number;
  badges: string;
  streak_days: number;
  last_active: string;
}

export interface RadarData {
  image_mgmt: number;
  emotional_stability: number;
  communication: number;
  execution: number;
  life_richness: number;
}

export interface JwtPayload {
  userId: number;
  username: string;
  exp: number;
}

export type LLMProvider = 'deepseek' | 'gemini' | 'custom';
