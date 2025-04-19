import MessageCard from "../cards/MessageCard";
import { getMessages } from "../db/message";

export default async function MessageList() {
  const messages = await getMessages();

  return (
    <div className="flex flex-col gap-4 overflow-y-scroll">
      {messages.map((value, index) => (
        <MessageCard key={index} {...value} />
      ))}
    </div>
  );
}
