"use server";

import { auth } from "@/auth";
import { createChat, updateChat as updateChatMessages } from "@/prisma/chat";

export const updateChat = async (
  chatId: string | null,
  messages: {
    role: "user" | "assistant";
    content: string;
  }[]
) => {
  const session = await auth();
  if (!chatId) {
    return (
      await createChat(
        session?.user?.email || "",
        messages[0].content,
        messages
      )
    )?.id;
  } else {
    await updateChatMessages(chatId, messages);
    return chatId;
  }
};
