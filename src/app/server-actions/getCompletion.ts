"use server";

import { Completion } from "@/lib/types";
import OpenAi from "openai";

import { createChat, updateChat } from "@/prisma/chat";
import { auth } from "@/auth";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getCompletion(
  id: string | null,
  messageHistory: Completion[]
) {
  const response = await openai.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: messageHistory as ChatCompletionMessageParam[],
  });

  const messages = [
    ...messageHistory,
    response.choices[0].message as unknown as Completion,
  ];

  const session = await auth();

  let chatId = id;
  let chat;
  if (!chatId) {
    chat = await createChat(
      session?.user?.email || "",
      messageHistory[0].content,
      messages
    );
    chatId = chat.id;
  } else {
    await updateChat(chatId, messages);
  }

  return {
    messages,
    id: chatId,
  };
}
