import React, { useState, useEffect } from 'react';
import { Send, User } from 'lucide-react';
// import { io } from 'socket.io-client';


// Mock Socket for demo as actual server might not be running in this env
// const socket = io('http://localhost:5000');

const Chat = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi, is this still available?", sender: "buyer", time: "10:30 AM" },
        { id: 2, text: "Yes it is!", sender: "me", time: "10:32 AM" },
        { id: 3, text: "Can you do ₹1100?", sender: "buyer", time: "10:33 AM" }
    ]);
    const [newMessage, setNewMessage] = useState("");

    // useEffect(() => {
    //     socket.on('receive_message', (data) => {
    //         setMessages((prev) => [...prev, data]);
    //     });
    // }, []);

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const msg = {
            id: Date.now(),
            text: newMessage,
            sender: "me",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, msg]);
        setNewMessage("");

        // socket.emit('send_message', msg);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <div className="flex-1 pt-20 pb-4 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full flex">


                {/* Chat List (Left Sidebar) */}
                <div className="w-80 bg-white border border-r-0 border-slate-200 rounded-l-2xl hidden md:flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-slate-100 bg-slate-50">
                        <h2 className="font-bold text-slate-800">Messages</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition ${i === 1 ? 'bg-blue-50 border-l-4 border-l-primary' : ''}`}>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-slate-200 rounded-full mr-3"></div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="text-sm font-semibold text-slate-900 truncate">Aryan K.</h3>
                                            <span className="text-xs text-slate-400">10:33 AM</span>
                                        </div>
                                        <p className="text-sm text-slate-500 truncate">Can you do ₹1100?</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Window (Right) */}
                <div className="flex-1 bg-white border border-slate-200 rounded-r-2xl rounded-l-2xl md:rounded-l-none flex flex-col shadow-sm h-[calc(100vh-140px)]">
                    {/* Header */}
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-slate-200 rounded-full mr-3 flex items-center justify-center text-slate-500">
                                <User size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Aryan K.</h3>
                                <p className="text-xs text-green-600 flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                                    Online
                                </p>
                            </div>
                        </div>
                        <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                            Product: Vintage Nike Hoodie
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${msg.sender === 'me' ? 'bg-primary text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'}`}>
                                    <p>{msg.text}</p>
                                    <p className={`text-[10px] mt-1 text-right ${msg.sender === 'me' ? 'text-primary-light' : 'text-slate-400'}`}>{msg.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-slate-100">
                        <form onSubmit={handleSend} className="flex gap-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 px-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                            <button type="submit" className="p-2 bg-primary text-white rounded-full hover:bg-primary-dark transition shadow-md">
                                <Send size={20} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
