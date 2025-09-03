import { Chat } from "./components/Chat";
import { getUserSession } from "./server-actions/getUserSession";

export default async function Home() {
  await getUserSession();
  return (
    <main>
      <h1>Welcome to ChatGPT</h1>
      <Chat />
    </main>
  );
}
