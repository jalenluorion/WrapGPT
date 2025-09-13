import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useClaude, ClaudeMessage } from '@/hooks/useClaude';
import { Loader2, Send, Bot, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ClaudeChat = () => {
  const [messages, setMessages] = useState<ClaudeMessage[]>([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('claude-3-5-haiku-20241022');
  const { sendMessage, loading, error } = useClaude();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ClaudeMessage = {
      role: 'user',
      content: input.trim(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    const response = await sendMessage(newMessages, model);

    if (response) {
      const assistantMessage: ClaudeMessage = {
        role: 'assistant',
        content: response.content[0]?.text || 'No response content',
      };
      setMessages([...newMessages, assistantMessage]);
      toast({
        title: 'Response received',
        description: `Used ${response.usage.input_tokens} input tokens, ${response.usage.output_tokens} output tokens`,
      });
    } else if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-6 w-6" />
          Claude AI Wrapper
        </CardTitle>
        <div className="flex gap-4 items-center">
          <label className="text-sm font-medium">Model:</label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="claude-3-5-haiku-20241022">Claude 3.5 Haiku (Fast)</SelectItem>
              <SelectItem value="claude-3-5-sonnet-20241022">Claude 3.5 Sonnet (Balanced)</SelectItem>
              <SelectItem value="claude-3-opus-20240229">Claude 3 Opus (Most Capable)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <ScrollArea className="h-96 w-full border rounded-md p-4">
          {messages.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Start a conversation with Claude...
            </p>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex gap-2 max-w-[80%] ${
                      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {message.role === 'user' ? (
                        <User className="h-6 w-6 mt-1" />
                      ) : (
                        <Bot className="h-6 w-6 mt-1" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={loading}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={loading || !input.trim()}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClaudeChat;