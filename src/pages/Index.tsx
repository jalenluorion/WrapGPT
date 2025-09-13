import ClaudeChat from '@/components/ClaudeChat';

const messages = [
	'I should pitch this website to Y Combinator as the next big AI unicorn.',
	'A google search aint that hard bruh',
	'This site is powered by it\'s own custom LLM. That\'s right, definitly no Anthropic API calls here!',
	'You know you\'re supposed to solve Leetcode problems youself right?',
	'Insights so groundbreaking, you\'ll wonder if they\'re even real. (Spoiler: sometimes they aren\'t)',
	'I have to do ANOTHER English discussion board?',
	'Why think for yourself when you can outsource your curiosity to a glorified autocomplete?',
	'Your time here costs more in server bills than your daily tuition',
	'This website was programmed 100% by hand. Trust me bro.',
	'I\'m ready to build yet another "AI B2B Saas Startup".',
  'I hope you\'re not here to commit an AIV...',
  'I hope you\'re not here to commit an AIV...',
];

function getRandomMessage() {
	return messages[Math.floor(Math.random() * messages.length)];
}

const Index = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-4 h-screen">
			<div className="container mx-auto py-8 h-full flex flex-col">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold tracking-tight mb-2">
						🤖 WrapGPT 📦
					</h1>
					<p className="text-xl text-muted-foreground">
						{getRandomMessage()}
					</p>
				</div>
				<ClaudeChat />
			</div>
		</div>
	);
};

export default Index;
