"use server";

import { Completion } from "@/lib/types";
import OpenAi from "openai";

const openai = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getCompletion(messageHistory: Completion[]) {
  const response = await openai.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: messageHistory,
  });

  const messages = [
    ...messageHistory,
    response.choices[0].message as unknown as Completion,
  ];

  return {
    messages,
  };
}
