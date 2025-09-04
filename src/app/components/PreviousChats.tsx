import { auth } from "@/auth";
import { getChats } from "@/prisma/chat";

import Transcript from "./Transcript";

export async function PreviousChat() {
  const session = await auth();
  const chats = await getChats(session?.user?.email as string, true);

  return (
    <div>
      {chats.length === 0 && <h3>No prevois chats.</h3>}
      <div className="grid grid-cols-2 gap-4">
        {chats.map((chat) => (
          <div key={chat.id} className="p-5 border-2 border-white rounded-lg">
            <h3>{chat.name}</h3>
            <div className="border-white border-b-1 my-4" />

            <Transcript messages={chat.Message} truncate={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
