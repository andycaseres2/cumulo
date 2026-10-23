import type { Mission } from '../../../../domain/Mission';

/**
 * Telecom Andina: a mobile carrier in La Paz whose call center is overwhelmed and whose customers are leaving.
 * Practices Amazon Lex, Amazon Transcribe, Amazon Comprehend and Amazon SageMaker AI.
 */
export const aiAndMl1: Mission = {
  id: 'ai-and-ml-1',
  track: 'tech',
  topicSlug: 'ai-and-ml',
  buildingId: 'telecom',
  title: 'The call center that listens',
  client: { name: 'Diego Mamani', role: 'Head of Customer Experience at Telecom Andina' },
  intro: [
    "Hi, come in. I'm Diego Mamani, head of customer experience at Telecom Andina. We provide mobile and internet service to half a million people from La Paz.",
    'Our call center gets thousands of calls a day, almost all about the same things: checking a balance, paying a bill or reporting an outage. Customers wait half an hour for someone to pick up.',
    "And every month we lose customers to the competition without knowing why. We record every call, but nobody has time to listen to them.",
    "Management approved using artificial intelligence on AWS, but we don't have data scientists for everything. Can you help me choose the right service for each problem?",
  ],
  outro: {
    passed: [
      'Excellent! The call center bot handles the simple requests, recorded calls turn into text and we finally know which customers hang up upset.',
      'And with the churn model we can call people in time, before they leave. Thank you: at Telecom Andina you will always have a good signal.',
    ],
    failed: [
      "Hmm... with these decisions I think the call center would still be swamped and customers would keep leaving. Some of these answers just don't add up for me.",
      'Review the theory on artificial intelligence and machine learning, and come back whenever you like. The line stays open for you.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'phone-bot',
      prompt:
        'First, the call center. When customers call, I want them to say in their own words what they need, and have a bot understand them and resolve simple requests, like checking a balance or making a payment. What service do we use?',
      topicSlug: 'ai-and-ml',
      examTasks: ['3.7'],
      options: [
        {
          id: 'bot-lex',
          label: 'Amazon Lex',
          definition:
            'Service for building chatbots and conversational interfaces using voice or text, including interactive voice response (IVR) phone systems.',
          explanation:
            'A phone bot that understands what the customer says and has a conversation with them is the use case for Lex, which uses speech recognition and natural language understanding.',
          correct: true,
        },
        {
          id: 'bot-polly',
          label: 'Amazon Polly',
          definition: 'Service that turns text into natural-sounding speech.',
          explanation:
            "Polly can give a message a voice, but it doesn't understand what the customer says or hold a conversation. That's what Lex is for.",
          correct: false,
        },
        {
          id: 'bot-comprehend',
          label: 'Amazon Comprehend',
          definition:
            'Service that analyzes text to find language, key phrases, entities, sentiment and topics.',
          explanation:
            "Comprehend analyzes text that has already been written. It isn't the service for building a bot that talks with customers over the phone.",
          correct: false,
        },
        {
          id: 'bot-q-business',
          label: 'Amazon Q Business',
          definition:
            "Generative AI assistant that answers employees' questions using the company's content and systems.",
          explanation:
            "Amazon Q Business is designed for the company's employees, not for serving the call center's customers over the phone.",
          correct: false,
        },
      ],
    },
    {
      id: 'call-recordings',
      prompt:
        'Now, the recordings. We have thousands of calls stored as audio, and we want to turn them into text so we can read and search them. Which service does that?',
      topicSlug: 'ai-and-ml',
      examTasks: ['3.7'],
      options: [
        {
          id: 'recordings-polly',
          label: 'Amazon Polly',
          definition: 'Service that turns text into natural-sounding speech.',
          explanation:
            "It's the most common mix-up: Polly does the opposite, turning text into speech. To convert the recordings into text, you use Transcribe.",
          correct: false,
        },
        {
          id: 'recordings-textract',
          label: 'Amazon Textract',
          definition:
            'Service that extracts text and data from scanned documents, including forms and tables.',
          explanation:
            "Textract reads documents, not audio. The call center recordings are voice, not scanned paperwork.",
          correct: false,
        },
        {
          id: 'recordings-transcribe',
          label: 'Amazon Transcribe',
          definition:
            'Service that converts speech into text, from audio files or in real time.',
          explanation:
            'Transcribe "listens" to the recordings and turns them into text, which can then be read, searched and analyzed.',
          correct: true,
        },
        {
          id: 'recordings-translate',
          label: 'Amazon Translate',
          definition: 'Service that translates text from one language to another.',
          explanation:
            "Translate works with text that already exists and changes its language. First you have to turn the speech into text, and Translate doesn't do that.",
          correct: false,
        },
      ],
    },
    {
      id: 'angry-customers',
      prompt:
        'With the calls now in text, I want to know which ones ended with an upset customer and which with a happy one, and what topics people complain about most. Which service analyzes that?',
      topicSlug: 'ai-and-ml',
      examTasks: ['3.7'],
      options: [
        {
          id: 'sentiment-rekognition',
          label: 'Amazon Rekognition',
          definition:
            'Service that analyzes images and videos to detect objects, people, text, scenes and faces.',
          explanation:
            'Rekognition looks at images and videos. Here you need to understand the meaning of conversation transcripts.',
          correct: false,
        },
        {
          id: 'sentiment-comprehend',
          label: 'Amazon Comprehend',
          definition:
            'Service that analyzes text to find language, key phrases, people, places, positive or negative sentiment and topics.',
          explanation:
            'Comprehend understands the meaning of text: it detects whether a conversation is positive or negative and finds the topics that come up most often in complaints.',
          correct: true,
        },
        {
          id: 'sentiment-translate',
          label: 'Amazon Translate',
          definition: 'Service that translates text between languages.',
          explanation:
            "Thinking Translate and Comprehend do the same thing is a classic trap: Translate changes the language of the text, but it doesn't tell you whether the customer was upset.",
          correct: false,
        },
        {
          id: 'sentiment-lex',
          label: 'Amazon Lex',
          definition:
            'Service for building conversational interfaces using voice or text, such as chatbots.',
          explanation:
            'Lex is for talking with customers in real time, not for analyzing the sentiment of thousands of already transcribed conversations.',
          correct: false,
        },
      ],
    },
    {
      id: 'churn-model',
      prompt:
        'Last one, and the most ambitious: using our history of usage, payments and complaints, we want our own model that predicts which customers are about to cancel their line. What service do we use?',
      topicSlug: 'ai-and-ml',
      examTasks: ['3.7'],
      options: [
        {
          id: 'churn-comprehend',
          label: 'Amazon Comprehend',
          definition:
            'Pretrained service that analyzes text to extract sentiment, entities, key phrases and topics.',
          explanation:
            "Comprehend analyzes text, but predicting cancellations from the company's own history requires training a custom model.",
          correct: false,
        },
        {
          id: 'churn-q-developer',
          label: 'Amazon Q Developer',
          definition:
            'Generative AI assistant that helps developers understand, build and operate applications on AWS.',
          explanation:
            "Q Developer helps you code and operate applications, but it isn't the service for building, training and deploying a prediction model with Telecom Andina's data.",
          correct: false,
        },
        {
          id: 'churn-rekognition',
          label: 'Amazon Rekognition',
          definition:
            'Pretrained service that analyzes images and videos, including facial analysis and comparison.',
          explanation:
            'Rekognition works with images and videos. Usage and payment history has nothing to do with that.',
          correct: false,
        },
        {
          id: 'churn-sagemaker-ai',
          label: 'Amazon SageMaker AI',
          definition:
            'Fully managed machine learning service for building, training and deploying your own models.',
          explanation:
            "Predicting who will cancel at Telecom Andina requires a custom model, trained on the history of its own customers: building, training and deploying it is SageMaker AI's job.",
          correct: true,
        },
      ],
    },
  ],
};
