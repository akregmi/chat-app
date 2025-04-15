import { useState } from "react";

interface MessageInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSend: (message: string) => void;
}

const MessageInput= ({ onSend, ...props }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="w-full bg-base-100 border-t border-base-300">
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="input input-bordered flex-grow"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          {...props}
        />
        <button className="btn btn-primary" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
