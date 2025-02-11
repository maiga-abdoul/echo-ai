'use client';

import { useConversation } from '@11labs/react';
import { useCallback, useEffect, useState } from 'react';
import { Mic, MicOff, PhoneCall, PhoneOff } from "lucide-react";
import { FaRobot } from 'react-icons/fa';

interface ConversationProps {
  bg1_color: string; // Background color for the main container
  btn_bg_color: string; // Background color for the main container
  btn_hover_bg_color: string; // Background color for the main container
  text_color: string; // Background color for the main container
  assistantName: string; // Assistant name for the title
  agentId?: string; // Optional agent ID (default provided)
}

export function Conversation({ bg1_color,btn_bg_color,btn_hover_bg_color, text_color, assistantName, agentId = 'Va5530ZjUUy2Rb8foC2L' }: ConversationProps) {
  const [messages, setMessages] = useState<{ message: string, source: string }[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => {
      console.log('Disconnected');
      setIsSpeaking(false);
    },
    onMessage: (message: any) => {
      console.log('Message:', message);
      setMessages((prev) => [...prev, message]); // Append new message
    },
    onError: (error: any) => console.error('Error:', error),
  });

  useEffect(() => {
    setIsSpeaking(conversation.isSpeaking);
  }, [conversation.isSpeaking]);

  const startConversation = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({ agentId });
      setIsSpeaking(false);
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  }, [conversation, agentId]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
    setIsSpeaking(false);
  }, [conversation]);

  return (
    <div className={`flex flex-col justify-between items-center ${bg1_color} text-white p-6 rounded-2xl w-80 h-[600px] shadow-lg`}>
      {/* Title */}
      <div className={`flex items-center text-xl font-semibold ${text_color} bg-white p-2 rounded-md mb-4 w-full text-center`}>
        <FaRobot className={`mr-2 ${text_color}`} size={32} />
        {assistantName}
      </div>

      {/* Mic Status */}
      <div className="flex flex-col items-center mt-2">
        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
          {isSpeaking ? (
            <Mic className="text-green-400 animate-pulse" size={32} />
          ) : (
            <MicOff className="text-gray-400" size={32} />
          )}
        </div>
      </div>

      {/* Chat Messages Box */}
      <div className="flex flex-col w-full h-64 overflow-y-auto bg-gray-100 p-3 rounded-lg mt-4">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 my-1 rounded-lg ${msg.source === 'ai' ? 'bg-blue-600 self-start' : `${btn_bg_color} self-end`}`}>
            <p className="text-sm">{msg.message}</p>
          </div>
        ))}
      </div>

      {/* Status */}
      <p className="text-sm text-black mt-2">Status: {conversation.status}</p>

      {/* Call Buttons */}
      <div className="flex items-center justify-center mt-auto mb-8">
        {conversation.status !== "connected" ? (
          <button
            onClick={startConversation}
            className={`flex items-center gap-2 ${btn_bg_color} text-white px-6 py-3 rounded-full shadow-md ${btn_hover_bg_color} transition`}
          >
            <PhoneCall size={20} />
            <span className="text-base font-medium">Start a call</span>
          </button>
        ) : (
          <button
            onClick={stopConversation}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-6 py-3 rounded-full shadow-md transition"
          >
            <PhoneOff className="text-white" size={28} />
            <span className="text-base font-medium">Stop the Call</span>
          </button>
        )}
      </div>
    </div>
  );
}
