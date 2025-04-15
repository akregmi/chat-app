import { useEffect, useState } from "react";
import moment from "moment";

interface Member {
    id: string;
    username: string;
    profilePic: string;
}

interface Conversation {
    id: string;
    createdAt: string;
    updatedAt: string;
    memberIds: string[];
    members: Member[];
}

interface Props {
    getId: (conversationId: string, memberName: string) => void
}


const ConversationList = ({getId}: Props) => {

    const [conversations, setConversations] = useState<Conversation[]>([]);
    useEffect(() => {
        // Mock API call
        const fetchConversations = async () => {
            const data = await fetch('/api/conversation', {
                credentials: "include",
            });;
            const jsonData = await data.json();
            setConversations(jsonData);
        };

        fetchConversations();
    }, [])

    return (
        <div className="max-w-md mx-auto p-4">
                <ul className="space-y-4">
                    {conversations.map((conversation) => {
                        const member = conversation.members[0];
                        return (
                            <li key={conversation.id} className="flex flex-row items-center space-x-4 p-6 shadow-lg rounded-lg bg-gray-700 hover:bg-gray-500 cursor-pointer" onClick={() => { getId(conversation.id, member.username) }}>
                                <div className="avatar">
                                    <div className="w-12 rounded-full">
                                        <img src={member.profilePic} alt={member.username} />
                                    </div>
                                </div>
                                <p className="text-lg font-medium">{member.username}</p>
                                <p className="text-sm text-gray-400">{moment(conversation.updatedAt).fromNow()}</p>
                            </li>
                        );
                    })}
                </ul>
        </div>
    );

}

export default ConversationList