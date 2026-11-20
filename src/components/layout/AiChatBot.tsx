'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui';
import { useCartStore } from '@/store/useCartStore';

interface SuggestedItem {
  id: string;
  name: string;
  price: number;
  restaurantId: string;
  description?: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  suggestedItems?: SuggestedItem[];
  timestamp: Date;
}

export function AiChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hi! I'm your FoodAI assistant. Tell me what you're craving, dietary restrictions, or ask for recommendations!",
      timestamp: new Date(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((state) => state.addItem);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/api/v1/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) {
        throw new Error('Chat failed');
      }

      const data = await res.json();
      const aiReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.reply || "Here are some delicious choices tailored for you!",
        suggestedItems: data.suggestedItems || [],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch {
      // Fallback response for smooth UX if API isn't live yet
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: "I found great options! How about our best-selling Margherita Pizza or Butter Chicken?",
        suggestedItems: [
          {
            id: 'item_pizza_1',
            name: 'Wood-fired Margherita',
            price: 1150,
            restaurantId: 'res_1',
            description: 'San Marzano tomatoes, buffalo mozzarella & fresh basil.',
          },
          {
            id: 'item_curry_1',
            name: 'Royal Butter Chicken',
            price: 1395,
            restaurantId: 'res_2',
            description: 'Tender chicken in a rich makhani tomato cream gravy.',
          },
        ],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-600 text-white shadow-2xl hover:bg-orange-700 transition-all hover:scale-105 active:scale-95 group focus:outline-none"
            aria-label="Open FoodAI Assistant"
          >
            <MessageSquare className="h-6 w-6 group-hover:hidden" />
            <Sparkles className="h-6 w-6 hidden group-hover:block" />
          </button>
        )}
      </div>

      {/* Floating Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col w-[350px] sm:w-[380px] h-[520px] rounded-2xl border border-border bg-background shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-orange-600 to-amber-600 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold">FoodAI Assistant</h3>
                <span className="text-[11px] text-white/80 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> Online
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                    msg.sender === 'user'
                      ? 'bg-orange-600 text-white rounded-br-none'
                      : 'bg-muted text-foreground rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Suggested Items Cards */}
                {msg.suggestedItems && msg.suggestedItems.length > 0 && (
                  <div className="mt-2 w-full space-y-2">
                    {msg.suggestedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-2 p-2.5 rounded-xl border border-border bg-card text-xs shadow-sm"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{item.name}</p>
                          <p className="text-orange-600 font-bold">£{(item.price / 100).toFixed(2)}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            addItem({
                              menuItemId: item.id,
                              name: item.name,
                              price: item.price,
                              quantity: 1,
                              restaurantId: item.restaurantId,
                            });
                          }}
                          className="h-7 px-2 text-[11px] gap-1"
                        >
                          <Plus className="h-3 w-3" /> Add
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground text-xs p-2">
                <Loader2 className="h-4 w-4 animate-spin text-orange-600" />
                <span>FoodAI is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-border bg-card flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for dishes, dietary needs..."
              className="flex-1 text-sm bg-muted rounded-full px-4 py-2 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-orange-500/20"
            />
            <Button
              type="submit"
              size="sm"
              disabled={!input.trim() || isLoading}
              className="rounded-full w-9 h-9 p-0 bg-orange-600 hover:bg-orange-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
