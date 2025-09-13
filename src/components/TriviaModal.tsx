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
    question: "What are the names of Santa's reindeer?",
    options: [
      "Dasher, Dancer, Prancer, Vixen, Comet, Cupid, Donner, Blitzen, Rudolph",
      "Dasher, Dancer, Prancer, Vixen, Comet, Cupid, Donder, Blitzen, Rudolph", 
      "Dasher, Dancer, Prancer, Vixen, Comet, Cupid, Thunder, Blitzen, Rudolph"
    ],
    correct: 1
  },
  {
    question: "In which country did the Christmas tree tradition originate?",
    options: ["Norway", "Germany", "Finland"],
    correct: 1
  },
  {
    question: "What is the best-selling Christmas song of all time?",
    options: ["White Christmas by Bing Crosby", "Silent Night", "Jingle Bells"],
    correct: 0
  },
  {
    question: "In the song 'The Twelve Days of Christmas', what gift is given on the 5th day?",
    options: ["Five golden rings", "Five calling birds", "Five french hens"],
    correct: 0
  },
  {
    question: "What beverage is left out for Santa on Christmas Eve?",
    options: ["Hot chocolate", "Coffee", "Milk"],
    correct: 2
  },
  {
    question: "Which Christmas movie features the line 'Every time a bell rings, an angel gets his wings'?",
    options: ["Miracle on 34th Street", "It's a Wonderful Life", "A Christmas Carol"],
    correct: 1
  },
  {
    question: "What do children in France leave out for Santa Claus?",
    options: ["Cookies", "Their shoes", "Milk and cookies"],
    correct: 1
  },
  {
    question: "In what year was the first Christmas card sent?",
    options: ["1843", "1850", "1837"],
    correct: 0
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
            <Gift className="h-5 w-5 text-red-600" />
            Christmas Trivia Challenge!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Answer correctly to unwrap your present and reveal the message!
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
              className="bg-red-600 hover:bg-red-700"
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