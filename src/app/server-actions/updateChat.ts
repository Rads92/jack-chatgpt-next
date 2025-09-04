"use server";
import { auth } from "@/auth";

import { createChat } from "@/prisma/chat";

export const updateChat = async (
  chatId: string | null,
  messages: {
    role: "user" | "assistant";
    content: string;
  }[]
) => {
  const session = await auth();
  if (!chatId) {
    return await createChat(
      session?.user?.email || "",
      messages[0].content,
      messages
    );
  } else {
    // await updateChatMessages(chatId, messages);
    return chatId;
  }
};
