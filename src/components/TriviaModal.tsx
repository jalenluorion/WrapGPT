import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Gift, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface TriviaQuestion {
  type: 'multiple-choice' | 'free-response';
  question: string;
  options?: string[];
  correct?: number;
  correctAnswers?: string[];
  validate?: (answer: string) => boolean;
  image?: string;
  wrongMessage?: string;
  rightMessage?: string;
}

interface TriviaModalProps {
  isOpen: boolean;
  onCorrect: () => void;
  onIncorrect: () => void;
  onClose: () => void;
}

const triviaQuestions: TriviaQuestion[] = [
  // Free response, single correct answer
  {
    type: 'free-response',
    question: 'What is the capital of Idaho?',
    correctAnswers: ['Boise'],
    wrongMessage: 'theres actually someone from there here yknow...',
    rightMessage: 'Wait we should be friends',
  },
  // Free response, single correct answer
  {
    type: 'free-response',
    question: 'Who voices Rumi in KPop Demon Hunters?',
    correctAnswers: ['Arden Cho'],
    wrongMessage: 'do u live under a rock',
  },
  // Free response, multiple correct answers
  {
    type: 'free-response',
    question: 'Name a member of Kessoku Band.',
    correctAnswers: ['Nijika', 'Bocchi', 'Kita', 'Ryo'],
    rightMessage: 'Wait we should be friends',
  },
  // Multiple choice
  {
    type: 'multiple-choice',
    question: 'Johnathan uses WrapGPT to look over his 21-122 programming homework and see if there are any mistakes before turning it in. Is this an Academic Integrity Violation?',
    options: ['Yes', 'No'],
    correct: 0,
    wrongMessage: 'https://www.cmu.edu/student-affairs/ocr/',
    rightMessage: 'Illiano approves',
  },
  // Free response, multiple correct answers
  {
    type: 'free-response',
    question: 'Name a country that borders Slovenia.',
    correctAnswers: ['Italy', 'Croatia', 'Austria'],
  },
  // Image + free response
  {
    type: 'free-response',
    question: '',
    image: '/assets/2024_1_8.png',
    correctAnswers: ['197'],
  },
  // Free response, custom validation (number)
  {
    type: 'free-response',
    question: 'How many members are in Tame Impala?',
    validate: (answer: string) => Number(answer) === 1,
    wrongMessage: 'Did you know Tame Impala is just one guy?',
  },
  // Multiple choice
  {
    type: 'multiple-choice',
    question: 'Which CMU dorm has AC?',
    options: ['E-Tower', 'Mudge', 'Stever', 'Donner'],
    correct: 2,
    rightMessage: 'l (this message was brought to you by the Gardens gang)',
  },
  // Image + free response
  {
    type: 'free-response',
    question: 'Geoguessr: Name the country.',
    image: '/assets/geoguessr.jpg',
    correctAnswers: ['Cambodia'],
  },
  // Free response, no validation (open-ended)
  {
    type: 'free-response',
    question: 'Give me your best gatekept stock, and I\'ll analyze it for you.',
    validate: () => true,
    rightMessage: 'Thanks for the stock recommendation!',
  },
  // Multiple choice
  {
    type: 'multiple-choice',
    question: 'According to John Mackey himself, how many cans of diet coke does he drink in a day?',
    options: ['5', '10', '40', '100'],
    correct: 2,
    rightMessage: '(Alledgedly)',
  },
  // Multiple choice
  {
    type: 'multiple-choice',
    question: 'What is the best place to get breakfast on campus?',
    options: ['The Exchange', 'ABP', 'Hunan', 'Stack\'d'],
    correct: 0,
    rightMessage: 'You know ball',
  },
  // Multiple choice
  {
    type: 'multiple-choice',
    question: 'What was the last year Cristiano Ronaldo won the Uefa Champions League?',
    options: ['2016', '2017', '2018', '2019'],
    correct: 1,
    rightMessage: 'SIUUUUUUU',
  },
  // Free response, single correct answer
  {
    type: 'free-response',
    question: 'In which US city was the polio vaccine invented?',
    correctAnswers: ['Pittsburgh'],
    rightMessage: 'Not a true local bruh.',
  },
  // Multiple choice
  {
    type: 'multiple-choice',
    question: 'Who is the current leading driver of the Formula 1 World Championships?',
    options: ['Verstappen', 'Hamilton', 'Piastri', 'Greggo'],
    correct: 2,
  },
  // Multiple choice
  {
    type: 'multiple-choice',
    question: 'Was this project vibe-coded?',
    options: ['Yes', 'No'],
    correct: 1,
    rightMessage: 'Good boy',
    wrongMessage: 'HEY. I WROTE THIS MYSELF BY HAND (mostly)',
  },
  // Free response, custom validation (number guessing)
  {
    type: 'free-response',
    question: 'I\'m thinking of a number…',
    validate: (answer: string) => Number(answer) === 67,
    rightMessage: '67',
  },
  // Image + free response
  {
    type: 'free-response',
    question: 'Solve this AIME problem.',
    image: '/assets/2022_1_9.png',
    correctAnswers: ['247'],
  },
  // Multiple choice
  {
    type: 'multiple-choice',
    question: 'Which internship are you taking:',
    options: ['Jane Street', 'Citadel'],
    correct: 3,
    wrongMessage: 'you\'re not getting either bro',
  },
  // Multiple choice
  {
    type: 'multiple-choice',
    question: 'Which Italian city did Iliano study in?',
    options: ['Rome', 'Milan', 'Turin', 'Florence'],
    correct: 2,
  },
  // Multiple choice
  {
    type: 'multiple-choice',
    question: 'React UseEffects...',
    options: ['Run after every render', 'Run only on mount', 'Run on dependency change', 'Never run'],
    correct: 2,
  },
  // Free response, custom validation (number > 7)
  {
    type: 'free-response',
    question: 'How many days since you last took a shower?',
    validate: (answer: string) => Number(answer) > 7,
    wrongMessage: 'You\'re lying',
    rightMessage: 'Typical.',
  },
  // Multiple choice
  {
    type: 'multiple-choice',
    question: 'What is the maximum context window for GPT-4?',
    options: ['8K tokens', '32K tokens', '128K tokens'],
    correct: 2,
  },
  // Multiple choice
  {
    type: 'multiple-choice',
    question: 'Which popular artist performed at CMU Orientation last year?',
    options: ['Malcom Todd', 'D4vd', 'Sombr', 'Dominic Fike'],
    correct: 0,
  },
  // Multiple choice
  {
    type: 'multiple-choice',
    question: 'Which one is a real Chinese proverb?',
    options: ['明日方舟', '孤独摇滚', '第五人格', '亡羊补牢'],
    correct: 3,
  },
  // Multiple choice
  {
    type: 'multiple-choice',
    question: 'Which Umamusume is still alive?',
    options: ['Haru Urara', 'Vodka', 'Gold Ship', 'Agnes Tacheon'],
    correct: 2,
  },
  // Multiple choice
  {
    type: 'multiple-choice',
    question: 'Ideal matcha brewing temperature',
    options: ['140', '160', '180', '200'],
    correct: 1,
  },
  // Multiple choice
  {
    type: 'multiple-choice',
    question: 'This should be obvious',
    options: ['MIT', 'CMU'],
    correct: 1,
    wrongMessage: 'ok mit reject',
    rightMessage: 'Good boy',
  },
  // Image + free response, custom validation (length requirement)
  {
    type: 'free-response',
    question: 'Give me the answer as code, and we will run testcases on it.',
    image: '/assets/leetcode.png',
    validate: (answer: string) => answer.length > 200,
    rightMessage: 'close enough i think',
    wrongMessage: '0/10 Testcases Passed',
  },
  // Image + free response, custom validation (length requirement)
  {
    type: 'free-response',
    question: 'Proof: Provide your answer in LaTeX.',
    image: '/assets/putnam.png',
    validate: (answer: string) => answer.length > 300,
    rightMessage: 'i dunno the answer either. good enough',
    wrongMessage: 'Not rigourous enough.',
  },
];

const TriviaModal = ({ isOpen, onCorrect, onIncorrect, onClose }: TriviaModalProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [currentQuestion] = useState(() => 
    triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)]
  );

  const handleSubmit = () => {
    let isCorrect = false;
    if (currentQuestion.type === 'multiple-choice') {
      const selectedIndex = parseInt(selectedAnswer);
      isCorrect = selectedIndex === currentQuestion.correct;
    } else if (currentQuestion.type === 'free-response') {
      if (currentQuestion.correctAnswers) {
        isCorrect = currentQuestion.correctAnswers.some(
          ans => ans.trim().toLowerCase() === selectedAnswer.trim().toLowerCase()
        );
      } else if (currentQuestion.validate) {
        isCorrect = currentQuestion.validate(selectedAnswer.trim());
      }
    }
    if (isCorrect) {
      toast({
        title: '🎉 Correct!',
        description: currentQuestion.rightMessage || 'Looks like you still have some free will. Response unwrapped!',
      });
      onCorrect();
    } else {
      toast({
        title: '❌ Wrong Answer',
        description: currentQuestion.wrongMessage || 'The response disappeared!',
        variant: 'destructive',
      });
      onIncorrect();
    }
    setSelectedAnswer('');
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (selectedAnswer) handleSubmit();
    }
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
            Prove you're not just a lazy AI brainrotter!
          </p>
          <div className="space-y-3">
            <h3 className="font-medium">{currentQuestion.question}</h3>
            {currentQuestion.image && (
              <img src={currentQuestion.image} alt="Question related" className="max-w-full h-32 object-contain mx-auto rounded" />
            )}
            {currentQuestion.type === 'multiple-choice' ? (
              <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                {currentQuestion.options!.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <input
                type="text"
                value={selectedAnswer}
                onChange={e => setSelectedAnswer(e.target.value)}
                onKeyDown={handleInputKeyDown}
                className="border rounded px-2 py-1 w-full"
                placeholder="Type your answer..."
              />
            )}
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