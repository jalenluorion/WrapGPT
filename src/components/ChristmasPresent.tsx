import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Gift, Sparkles } from 'lucide-react';
import TriviaModal from './TriviaModal';
import presentImage from '@/assets/gift-box.png';

interface ChristmasPresentProps {
  message: string;
  onUnwrap: () => void;
  onDisappear: () => void;
}

type PresentState = 'wrapped' | 'trivia' | 'unwrapped' | 'disappeared';

const ChristmasPresent = ({ message, onUnwrap, onDisappear }: ChristmasPresentProps) => {
  const [state, setState] = useState<PresentState>('wrapped');
  const [showTrivia, setShowTrivia] = useState(false);

  const handleClick = () => {
    if (state === 'wrapped') {
      setShowTrivia(true);
    }
  };

  const handleTriviaCorrect = () => {
    setShowTrivia(false);
    setState('unwrapped');
    onUnwrap();
  };

  const handleTriviaIncorrect = () => {
    setShowTrivia(false);
    setState('disappeared');
    onDisappear();
  };

  const handleTriviaClose = () => {
    setShowTrivia(false);
    setState('disappeared');
    onDisappear();
  };

  if (state === 'disappeared') {
    return (
      <div className="flex justify-center items-center p-8 text-muted-foreground">
        <p>Response disappeared... Better luck next time! 📦</p>
      </div>
    );
  }

  if (state === 'unwrapped') {
    return (
      <div className="animate-fade-in space-y-4">
        <div className="flex items-center gap-2 text-primary justify-center">
          <Sparkles className="h-5 w-5 animate-pulse" />
          <span className="font-medium">Response Unwrapped!</span>
          <Sparkles className="h-5 w-5 animate-pulse" />
        </div>
        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <div className="flex gap-2">
            <Gift className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
            <div className="whitespace-pre-wrap">{message}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={handleClick}
          className="p-4 hover:scale-105 transition-transform duration-200 group"
        >
          <div className="text-center space-y-2">
            <div className="relative">
              <img 
                src={presentImage} 
                alt="Wrapped AI Response" 
                className="w-24 h-24 group-hover:animate-pulse"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-200/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
            <div className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              Click to unwrap! 📦
            </div>
          </div>
        </Button>
      </div>

      <TriviaModal
        isOpen={showTrivia}
        onCorrect={handleTriviaCorrect}
        onIncorrect={handleTriviaIncorrect}
        onClose={handleTriviaClose}
      />
    </>
  );
};

export default ChristmasPresent;