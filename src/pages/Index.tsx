import ClaudeChat from '@/components/ClaudeChat';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-4">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">🤖 Claude Wrapper (Literally) 📦</h1>
          <p className="text-xl text-muted-foreground">
            Answer trivia questions to unwrap your AI responses! A parody of GPT wrappers.
          </p>
        </div>
        <ClaudeChat />
      </div>
    </div>
  );
};

export default Index;
