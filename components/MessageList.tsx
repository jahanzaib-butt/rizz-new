import { Message } from '@/types/chat';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  return (
    <ScrollArea className="flex-1 pr-4">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <Card 
            key={index}
            className={`p-4 ${
              message.role === 'user' 
                ? 'bg-primary text-primary-foreground ml-12' 
                : 'bg-muted mr-12'
            }`}
          >
            {message.content}
          </Card>
        ))}
        {isLoading && (
          <Card className="p-4 bg-muted mr-12">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </Card>
        )}
      </div>
    </ScrollArea>
  );
}