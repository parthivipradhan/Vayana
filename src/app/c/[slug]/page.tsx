'use client';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { type Role, useConversation } from '@11labs/react';
import TextAnimation from '../../components/TextAnimation';
import { X } from 'react-feather';
import Message from '../../components/Message';
import { v4 as uuidv4 } from 'uuid';

export default function () {
  const { slug } = useParams();
  const [currentText, setCurrentText] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  const [sessionId] = useState(uuidv4());

  // Store only this session's messages in state
  const [sessionMessages, setSessionMessages] = useState<any[]>([]);

  const addMessage = (msg: any) => {
    setSessionMessages((prev) => [
      ...prev,
      {
        ...msg,
        sessionId,
        formatted: {
          text: msg.content[0]?.transcript ?? '',
          transcript: msg.content[0]?.transcript ?? '',
        },
      },
    ]);
  };

  const conversation = useConversation({
    onError: (error: string) => {
      toast(error);
    },
    onConnect: () => {
      toast('Connected to ElevenLabs.');
    },
    onMessage: (props: { message: string; source: Role }) => {
      const { message, source } = props;
      if (source === 'ai') setCurrentText(message);
      addMessage({
        id: 'item_' + Math.random(),
        role: source === 'ai' ? 'assistant' : 'user',
        content: [{ type: 'text', transcript: message }],
        sessionId,
      });
    },
  });

  const connectConversation = useCallback(async () => {
    toast('Setting up ElevenLabs...');
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const response = await fetch('/api/i', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.error) return toast(data.error);
      await conversation.startSession({ signedUrl: data.apiKey });
    } catch (error) {
      toast('Failed to set up ElevenLabs client :/');
    }
  }, [conversation]);

  const disconnectConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const handleStartListening = () => {
    if (conversation.status !== 'connected') connectConversation();
  };
  const handleStopListening = () => {
    if (conversation.status === 'connected') disconnectConversation();
  };
  useEffect(() => {
    return () => {
      disconnectConversation();
    };
  }, [slug]);
  return <>
  <TextAnimation
        currentText={currentText}
        onStopListening={handleStopListening}
        onStartListening={handleStartListening}
        isAudioPlaying={conversation.isSpeaking}
        />
      {sessionMessages.length > 0 && (
        <button
        className="fixed right-4 top-2 text-sm underline cursor-pointer px-6 py-2 text-green-600 border-2 border-green-500 rounded-lg hover:bg-green-50 transition-all duration-300 font-medium transform hover:scale-105 hover:shadow-lg "
        onClick={() => {
          setIsTranscriptOpen(!isTranscriptOpen);
        }}
        >
          <span className="relative z-10">Show Conversation</span>
        </button>
      )}
      {isTranscriptOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-h-[90%] max-w-[90%] overflow-y-scroll rounded bg-white p-4 text-black shadow-lg">
            <div className="flex flex-row items-center justify-between">
              <span>Transcript</span>
              <button onClick={() => setIsTranscriptOpen(false)}>
                <X />
              </button>
            </div>
            <div className="mt-4 flex flex-col gap-y-4 border-t py-4">
              {sessionMessages.map((conversationItem) => (
                <Message key={conversationItem.id} conversationItem={conversationItem} />
              ))}
            </div>
          </div>
        </div>
      )}
      </>;
}