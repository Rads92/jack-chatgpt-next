"use client";

import { useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Completion } from "@/lib/types";
import { getCompletion } from "../server-actions/getCompletion";
import { redirect } from "next/navigation";

export function Chat({
  id,
  initialMessages = [],
}: {
  id?: string;
  initialMessages?: Completion[];
}) {
  const [messages, setMessages] = useState<Completion[]>(initialMessages);
  const [message, setMessage] = useState("");
  const chatId = useRef<string | null>(id || null);

  const onClick = async () => {
    const completions = await getCompletion(chatId.current, [
      ...messages,
      {
        role: "user",
        content: message,
      },
    ]);

    if (!chatId.current) {
      redirect(`/chats/${completions.id}`);
    }
    chatId.current = completions.id;
    setMessage("");
    setMessages(completions.messages);
  };

  return (
    <div className="flex flex-col">
      {messages?.map((message, i) => (
        <div
          key={i}
          className={`mb-5 flex flex-col ${
            message.role === "user" ? "items-end" : "items-start"
          }`}
        >
          <div
            className={`${
              message.role === "user" ? "bg-blue-500" : "bg-gray-500 text-black"
            } rounded-md py-2 px-8`}
          >
            {message.content}
          </div>
        </div>
      ))}
      <div className="flex border-t-2 border-t-gray-500 pt-3 mt-3">
        <Input
          className="flex-grow text-xl"
          placeholder="Question"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onClick();
            }
          }}
        />
      </div>
      <div className="py-6" />
      <Button onClick={onClick} className="ml-3 text-xl">
        Send
      </Button>
    </div>
  );
}
