import { prismaClient } from "@/prisma/client";
import { Message } from "@/prisma/generated/prisma";

export async function getChats(userEmail: string) {
  return await prismaClient.chat.findMany({
    where: {
      user_email: {
        equals: userEmail,
      },
    },
  });
}

export async function getChat(chatId: string) {
  return await prismaClient.chat.findFirst({
    where: {
      id: {
        equals: chatId,
      },
    },
    include: {
      Message: true,
    },
  });
}

export async function createChat(
  userEmail: string,
  name: string,
  messages: Omit<Message, "id" | "chat_id">[]
) {
  const chat = await prismaClient.chat.create({
    data: {
      user_email: userEmail,
      name,
      Message: {
        create: messages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
      },
    },
    include: {
      Message: true,
    },
  });

  return chat;
}

export async function updateChat(id: string, messages: Message[]) {
  console.log("elo", id, messages);
}
