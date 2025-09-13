import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Gift, X } from 'lucide-react';

interface TriviaQuestion {
  question: string;
  options: string[];
  correct: number;
}

interface TriviaModalProps {
  isOpen: boolean;
  onCorrect: () => void;
  onIncorrect: () => void;
  onClose: () => void;
}

const triviaQuestions: TriviaQuestion[] = [
  {
    question: "What does GPT stand for?",
    options: [
      "Generative Pre-trained Transformer",
      "General Purpose Technology", 
      "Great Programming Tool"
    ],
    correct: 0
  },
  {
    question: "Which company created ChatGPT?",
    options: ["Google", "OpenAI", "Microsoft"],
    correct: 1
  },
  {
    question: "What is the maximum context window for GPT-4?",
    options: ["8K tokens", "32K tokens", "128K tokens"],
    correct: 2
  },
  {
    question: "What does API stand for?",
    options: ["Application Programming Interface", "Automated Program Integration", "Advanced Programming Instructions"],
    correct: 0
  },
  {
    question: "Which of these is NOT a popular AI model?",
    options: ["Claude", "BERT", "JavaScript"],
    correct: 2
  },
  {
    question: "What is the term for training an AI model on specific data?",
    options: ["Fine-tuning", "Code-tuning", "Data-shaping"],
    correct: 0
  },
  {
    question: "What does LLM stand for in AI?",
    options: ["Large Language Model", "Linear Learning Machine", "Logic Learning Module"],
    correct: 0
  },
  {
    question: "Which programming language is most commonly used for AI development?",
    options: ["JavaScript", "Python", "C++"],
    correct: 1
  }
];

const TriviaModal = ({ isOpen, onCorrect, onIncorrect, onClose }: TriviaModalProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [currentQuestion] = useState(() => 
    triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)]
  );

  const handleSubmit = () => {
    const selectedIndex = parseInt(selectedAnswer);
    if (selectedIndex === currentQuestion.correct) {
      onCorrect();
    } else {
      onIncorrect();
    }
    setSelectedAnswer('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            AI Trivia Challenge!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Answer correctly to unwrap your AI response!
          </p>
          
          <div className="space-y-3">
            <h3 className="font-medium">{currentQuestion.question}</h3>
            
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="flex justify-between gap-2">
            <Button variant="outline" onClick={onClose} className="flex items-center gap-2">
              <X className="h-4 w-4" />
              Give Up
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={!selectedAnswer}
            >
              Submit Answer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TriviaModal;