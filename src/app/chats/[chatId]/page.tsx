import { Chat } from "@/app/components/Chat";
import { getChat } from "@/prisma/chat";

export default async function ChatDetail({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const chatId = (await params).chatId;
  const chat = await getChat(chatId);

  if (!chat) {
    return <div>Not found</div>;
  }

  return (
    <>
      <Chat id={chat?.id} initialMessages={chat?.Message} />
    </>
  );
}
