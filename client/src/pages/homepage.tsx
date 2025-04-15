import { useState } from "react";
import ConversationList from "../components/ConversationList";
import { Menu, X, MessageCircle, UserRoundPlus, Settings } from "lucide-react";
import ChatScreen from "./chatscreen";

const Homepage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [chatId, setChatId] = useState<string | null>(null);
    const [title, setTitle] = useState<string>("Select a conversation");

    const toggleSidebar = () => setIsOpen(!isOpen);

    const getChatId = (conversationId: string, memberName: string) => {
        setChatId(conversationId);
        setTitle(memberName);
    }

    return (
        <div className="flex">
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-full border-r-2 border-gray-600 bg-gray-800 text-white transition-all duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } sm:translate-x-0 sm:w-100 flex flex-col`}>
                {/* Sidebar Header */}
                <div className="p-4 flex justify-between items-center border-b border-gray-700">
                    <h2 className="text-xl font-bold mx-auto mt-2">Conversations</h2>
                    <button onClick={toggleSidebar} className="sm:hidden">
                        <X className="text-white text-2xl" />
                    </button>
                </div>

                {/* Scrollable Menu Section */}
                <div className="flex-1 overflow-y-auto">
                    <div className="space-y-4 mt-4">
                        <ConversationList getId={getChatId} />
                    </div>
                </div>

                {/* Bottom Fixed Section (Home and Settings) */}
                <div className="flex justify-evenly items-center p-4 mt-auto bg-gray-800 sm:mt-auto border-t border-gray-700">
                    <a href="#" className="flex flex-col items-center text-gray-200 hover:text-white">
                        <MessageCircle className="text-2xl mb-1" />
                        <span className="text-sm">Messages</span>
                    </a>
                    <a href="#" className="flex flex-col items-center text-gray-200 hover:text-white">
                        <UserRoundPlus className="text-2xl mb-1" />
                        <span className="text-sm">New</span>
                    </a>
                    <a href="#" className="flex flex-col items-center text-gray-200 hover:text-white">
                        <Settings className="text-2xl mb-1" />
                        <span className="text-sm">Settings</span>
                    </a>
                </div>
            </div>
            {/* Content Area */}
            <div className="flex-1 ml-0 sm:ml-100 flex flex-col h-dvh">
                <div className="flex items-center justify-between bg-gray-800 px-2 py-4">
                    <button onClick={toggleSidebar} className="sm:hidden">
                        <Menu className="text-gray-white text-2xl" />
                    </button>
                    <h1 className="text-xl font-bold mx-auto">{title}</h1>
                </div>
                <div className="flex-1">
                    <ChatScreen chatId={chatId??""} />
                </div>
            </div>
        </div>
    );
};

export default Homepage;