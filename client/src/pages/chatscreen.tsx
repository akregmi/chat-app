import { useEffect, useState } from "react";
import MessageInput from "../components/MessageInput";
import moment from "moment";
import { useAuthContext } from "../context/AuthContext";

interface User {
    username: string;
    profilePic: string;
}

interface Message {
    id: string
    body: string;
    createdAt: Date;
    senderId: string;
    sender: User;
}

const ChatScreen = ({ chatId }: { chatId: string }) => {

    const [messages, setMessages] = useState<Message[]>([]);
    const { user } = useAuthContext();
    const userId = user!.id

    const handleSendMessage = async (msg: string) => {
        try {
            console.log("Sending message:", msg);
            const res = await fetch("/api/conversation/" + chatId, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: msg
                })
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)
        } catch (error: any) {
            console.log(error)
        }
    };

    useEffect(() => {
        console.log(chatId)
        const fetchMessages = async () => {
            try {
                const data = await fetch('/api/conversation/' + chatId, {
                    credentials: "include",
                });
                const jsonData = await data.json();
                setMessages(jsonData);
            } catch (error) {
                console.log(error)
            }
        };

        if (!!chatId) fetchMessages()
    }, [chatId])

    return (
        <div className="flex flex-col p-4 h-full">
            <div className="flex-1 overflow-y-auto mb-6">
            {messages.map((message) => {
                return (
                    <div className={`chat ${message.senderId === userId ? "chat-end" : "chat-start"}`}>
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img src={message.sender.profilePic} alt={message.sender.username} />
                            </div>
                        </div>
                        <div className="chat-header">
                            {message.sender.username}
                            <time className="text-xs opacity-50">{moment(message.createdAt).fromNow()}</time>
                        </div>
                        <div className="chat-bubble">{message.body}</div>
                    </div>
                )
            })}
            </div>
            <MessageInput onSend={handleSendMessage} />
        </div>
    )
}

export default ChatScreen;