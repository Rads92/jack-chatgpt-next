"use client";

import { useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Completion } from "@/lib/types";

import Transcript from "./Transcript";
import { updateChat } from "../server-actions/updateChat";
import { useRouter } from "next/navigation";
import { UIMessage } from "ai";

function simplifyMessages(messages: UIMessage[]) {
  return messages.map((message) => ({
    role: message.role as "user" | "assistant",
    content: message.parts.find((part) => part.type === "text")?.text || "",
  }));
}

export function Chat({
  id,
  initialMessages = [],
}: {
  id?: string;
  initialMessages?: Completion[];
}) {
  const router = useRouter();
  const [input, setInput] = useState("");
  const chatId = useRef<string | null>(id || null);
  const { messages, sendMessage } = useChat({
    messages: initialMessages.map((msg) => ({
      ...msg,
      parts: [
        {
          type: "text",
          text: msg.content,
        },
      ],
    })) as UIMessage[],
    onFinish: async ({ messages }) => {
      const simplifiedMessages = simplifyMessages(messages);
      const newChatId = await updateChat(chatId.current, simplifiedMessages);
      if (chatId.current === null) {
        router.push(`/chats/${newChatId}`);
        router.refresh();
      } else {
        chatId.current = newChatId;
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage({ text: input });
        setInput("");
      }}
      className="flex flex-col"
    >
      <Transcript messages={simplifyMessages(messages)} truncate={false} />
      <div className="flex border-t-2 border-t-gray-500 pt-3 mt-3">
        <Input
          className="flex-grow text-xl"
          placeholder="Question"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="py-6" />
      <Button type="submit" className="ml-3 text-xl">
        Send
      </Button>
    </form>
  );
}
