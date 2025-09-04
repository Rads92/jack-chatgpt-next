import { Chat } from "./components/Chat";
import { PreviousChat } from "./components/PreviousChats";
import { getUserSession } from "./server-actions/getUserSession";
import { Suspense } from "react";

export default async function Home() {
  await getUserSession();
  return (
    <main>
      <h1>Welcome to ChatGPT</h1>
      <Suspense fallback="loading">
        <PreviousChat />
      </Suspense>
      <Chat />
    </main>
  );
}
