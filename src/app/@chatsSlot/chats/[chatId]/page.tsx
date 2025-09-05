import { auth } from "@/auth";
import { getChats } from "@/prisma/chat";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ChatMenu() {
  const session = await auth();

  if (!session || !session?.user?.email) {
    return redirect("/");
  }
  const chats = await getChats(session.user.email!);

  return (
    <main>
      <ul>
        {chats.map((chat) => {
          return (
            <li key={chat.id}>
              <Link href={`/chats/${chat.id}`}>{chat.name}</Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
