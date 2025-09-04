import { Chat } from "@/app/components/Chat";
import { getUserSession } from "@/app/server-actions/getUserSession";
import { getChat } from "@/prisma/chat";
import { notFound } from "next/navigation";

export default async function ChatDetail({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const chatId = (await params).chatId;
  const chat = await getChat(chatId);
  const session = await getUserSession();

  if (chat?.user_email !== session?.user?.email) {
    return notFound();
  }

  if (!chat) {
    return <div>Not found</div>;
  }

  return (
    <>
      <Chat id={chat?.id} initialMessages={chat?.Message} />
    </>
  );
}
