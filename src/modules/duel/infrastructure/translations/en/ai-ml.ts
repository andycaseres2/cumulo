import type { ServiceFamily } from '../../../domain/ServiceFamily';

export const aiMlFamily: ServiceFamily = {
  id: 'ai-ml',
  title: 'Artificial intelligence and machine learning',
  summary:
    'Look at the input and the output: images or video (Rekognition), scanned documents (Textract), text to insights (Comprehend), speech to text (Transcribe), text to speech (Polly), language to language (Translate), conversation (Lex), your own model (SageMaker AI) and generative assistant (Q).',
  services: [
    {
      name: 'Amazon Rekognition',
      summary: 'Analyzes images and video: objects, faces, face comparison and inappropriate content.',
    },
    {
      name: 'Amazon Textract',
      summary: 'Extracts text, handwriting, forms and tables from scanned documents and PDFs.',
    },
    {
      name: 'Amazon Comprehend',
      summary: 'Natural language processing: sentiment, entities, key phrases, language and personal data in text.',
    },
    {
      name: 'Amazon Transcribe',
      summary: 'Converts speech to text, in batches or in real time, and can tell speakers apart.',
    },
    {
      name: 'Amazon Polly',
      summary: 'Turns text into natural-sounding speech, with many voices and languages.',
    },
    {
      name: 'Amazon Translate',
      summary: 'Translates text between languages with machine learning, in real time or in batches.',
    },
    {
      name: 'Amazon Lex',
      summary: 'Builds chatbots and voice bots that understand the intent of whoever types or speaks.',
    },
    {
      name: 'Amazon SageMaker AI',
      summary: 'Managed platform to build, train and deploy your own machine learning models.',
    },
    {
      name: 'Amazon Q',
      summary: 'Generative AI assistant; for example, it helps developers with code suggestions and answers about AWS.',
    },
  ],
  cards: [
    {
      id: 'ai-ml-1',
      prompt:
        'A gym in Barranquilla wants a camera at the entrance to compare each person’s face with their registration photo to confirm their identity. Which service do you use?',
      options: [
        {
          service: 'Amazon Rekognition',
          why: 'Correct: Rekognition detects and compares faces in images and video, a classic identity verification use case.',
        },
        {
          service: 'Amazon Textract',
          why: 'Textract extracts text and data from documents; it does not compare faces.',
        },
        {
          service: 'Amazon Comprehend',
          why: 'Comprehend analyzes text with natural language processing; it does not work with images of people.',
        },
      ],
      answer: 'Amazon Rekognition',
      topicSlug: 'ai-and-ml',
    },
    {
      id: 'ai-ml-2',
      prompt:
        'A marketplace in Santa Cruz de la Sierra lets each seller upload photos of their products. It needs to automatically detect violent or explicit images before publishing them. Which service do you choose?',
      options: [
        {
          service: 'Amazon Comprehend',
          why: 'Comprehend detects sentiment and entities in text; it does not review the content of photos.',
        },
        {
          service: 'Amazon SageMaker AI',
          why: 'With SageMaker AI you could train your own model, but there is already a ready-made service to moderate images without ML expertise.',
        },
        {
          service: 'Amazon Rekognition',
          why: 'Correct: Rekognition content moderation detects explicit, inappropriate or violent content in images and video.',
        },
        {
          service: 'Amazon Textract',
          why: 'Textract reads text and data from documents; it does not judge whether an image is inappropriate.',
        },
      ],
      answer: 'Amazon Rekognition',
      topicSlug: 'ai-and-ml',
    },
    {
      id: 'ai-ml-3',
      prompt:
        'An insurer in Puebla receives scanned claim forms. It needs to pull out each field with its value (name, policy, date) and the damage tables, not just loose text. Which service do you use?',
      options: [
        {
          service: 'Amazon Rekognition',
          why: 'Rekognition can detect text in photos, like a street sign, but it does not understand the structure of forms and tables in a document.',
        },
        {
          service: 'Amazon Textract',
          why: 'Correct: Textract extracts text, forms with their key-value pairs, and tables from scanned documents.',
        },
        {
          service: 'Amazon Comprehend',
          why: 'Comprehend analyzes text you already have; it does not read scanned documents to pull out fields and tables.',
        },
      ],
      answer: 'Amazon Textract',
      topicSlug: 'ai-and-ml',
    },
    {
      id: 'ai-ml-4',
      prompt:
        'An accounting firm in Tegucigalpa receives hundreds of invoices and receipts every month, as PDFs or photos. It wants to get the vendor, date and total of each one without typing them by hand. Which service do you choose?',
      options: [
        {
          service: 'Amazon Translate',
          why: 'Translate translates text between languages; it does not extract data from invoices.',
        },
        {
          service: 'Amazon Comprehend',
          why: 'Comprehend finds entities in text that is already digital, but reading scanned invoices and pulling out their fields is another service’s job.',
        },
        {
          service: 'Amazon Textract',
          why: 'Correct: Textract processes invoices and receipts with its expense API and returns data such as vendor, date and total.',
        },
      ],
      answer: 'Amazon Textract',
      topicSlug: 'ai-and-ml',
    },
    {
      id: 'ai-ml-5',
      prompt:
        'A hotel in Cancún receives thousands of written guest reviews. It wants to know automatically whether each review is positive, negative or mixed, and which topics it covers. Which service do you use?',
      options: [
        {
          service: 'Amazon Lex',
          why: 'Lex builds chatbots that hold conversations; it does not analyze the sentiment of thousands of existing reviews.',
        },
        {
          service: 'Amazon Comprehend',
          why: 'Correct: Comprehend uses natural language processing to detect sentiment, entities and key phrases, and to group texts by topic.',
        },
        {
          service: 'Amazon Translate',
          why: 'Translate changes the language of the text, but it does not tell you whether a review is positive or negative.',
        },
      ],
      answer: 'Amazon Comprehend',
      topicSlug: 'ai-and-ml',
    },
    {
      id: 'ai-ml-6',
      prompt:
        'A hospital in Arequipa wants to share emails and care notes, already in digital text, with a research team. First it must find personal data such as addresses or phone numbers to redact them.',
      options: [
        {
          service: 'Amazon Textract',
          why: 'Textract extracts text from scanned documents; here the text is already digital and what is missing is finding the personal data.',
        },
        {
          service: 'Amazon Rekognition',
          why: 'Rekognition analyzes images and video; it does not review emails or text notes.',
        },
        {
          service: 'Amazon Comprehend',
          why: 'Correct: Comprehend detects personally identifiable information (PII), such as addresses, phone numbers or bank accounts, in text.',
        },
      ],
      answer: 'Amazon Comprehend',
      topicSlug: 'ai-and-ml',
    },
    {
      id: 'ai-ml-7',
      prompt:
        'A digital newspaper in Asunción wants to offer every story as audio too, with a natural voice, for people with visual impairments. Which service turns the articles into audio?',
      options: [
        {
          service: 'Amazon Transcribe',
          why: 'Transcribe does the opposite: it converts speech to text.',
        },
        {
          service: 'Amazon Translate',
          why: 'Translate translates text into another language, but it does not generate audio.',
        },
        {
          service: 'Amazon Polly',
          why: 'Correct: Polly turns text into natural-sounding speech, a typical use for accessibility and reading news aloud.',
        },
      ],
      answer: 'Amazon Polly',
      topicSlug: 'ai-and-ml',
    },
    {
      id: 'ai-ml-8',
      prompt:
        'A clinic in Mérida records its medical appointments, with consent. It wants to turn each recording into text and tell what the doctor said apart from what the patient said. Which service do you use?',
      options: [
        {
          service: 'Amazon Transcribe',
          why: 'Correct: Transcribe converts audio to text, in batches or in real time, and can separate each speaker.',
        },
        {
          service: 'Amazon Polly',
          why: 'Polly turns text into speech, exactly the opposite direction from what you need.',
        },
        {
          service: 'Amazon Comprehend',
          why: 'Comprehend analyzes text, but first someone has to turn the audio into text.',
        },
      ],
      answer: 'Amazon Transcribe',
      topicSlug: 'ai-and-ml',
    },
    {
      id: 'ai-ml-9',
      prompt:
        'An online store in Montevideo wants to sell in Brazil and the United States too, and needs to automatically convert its product descriptions from Spanish into Portuguese and English. Which service do you use?',
      options: [
        {
          service: 'Amazon Comprehend',
          why: 'Comprehend can detect the language of a text, but it does not translate it.',
        },
        {
          service: 'Amazon Polly',
          why: 'Polly reads text aloud; it does not convert it into another language.',
        },
        {
          service: 'Amazon Transcribe',
          why: 'Transcribe converts audio to text; here you already have the text and what you need is to change its language.',
        },
        {
          service: 'Amazon Translate',
          why: 'Correct: Translate translates text between languages with machine learning, ideal for your catalog content.',
        },
      ],
      answer: 'Amazon Translate',
      topicSlug: 'ai-and-ml',
    },
    {
      id: 'ai-ml-10',
      prompt:
        'A pizzeria in Tijuana wants a chatbot on its website that takes orders conversationally: it understands what you want to order, asks for size and flavor, and confirms the order. Which service do you use to build it?',
      options: [
        {
          service: 'Amazon Polly',
          why: 'Polly only turns text into speech; it does not understand what the person types or manage the conversation.',
        },
        {
          service: 'Amazon Lex',
          why: 'Correct: Lex builds chatbots that recognize intent, ask for missing details such as size and flavor, and complete the task.',
        },
        {
          service: 'Amazon Comprehend',
          why: 'Comprehend extracts sentiment and entities from text, but it does not hold a dialog to take an order.',
        },
      ],
      answer: 'Amazon Lex',
      topicSlug: 'ai-and-ml',
    },
    {
      id: 'ai-ml-11',
      prompt:
        'A bank in La Paz wants a voice bot on its phone line: the caller says what they need, the bot understands the intent, for example checking their balance, and replies. Which service builds that bot?',
      options: [
        {
          service: 'Amazon Transcribe',
          why: 'Transcribe turns speech into text, but it does not understand intent or manage the dialog with the caller.',
        },
        {
          service: 'Amazon Polly',
          why: 'Polly generates the voice of the replies, but it does not understand what the caller is asking for.',
        },
        {
          service: 'Amazon Lex',
          why: 'Correct: Lex combines speech recognition and language understanding to build voice and text bots that understand intents.',
        },
      ],
      answer: 'Amazon Lex',
      topicSlug: 'ai-and-ml',
    },
    {
      id: 'ai-ml-12',
      prompt:
        'An agtech company in Rosario has years of weather, soil and harvest data. Its team wants to build, train and deploy its own model to predict the yield of each plot. Which service does it use?',
      options: [
        {
          service: 'Amazon Rekognition',
          why: 'Rekognition offers pre-trained image analysis; it is not for training a prediction model on your own harvest data.',
        },
        {
          service: 'Amazon SageMaker AI',
          why: 'Correct: SageMaker AI is the managed service to build, train and deploy your own machine learning models.',
        },
        {
          service: 'Amazon Comprehend',
          why: 'Comprehend analyzes text with language models; it does not predict yields from weather and soil data.',
        },
      ],
      answer: 'Amazon SageMaker AI',
      topicSlug: 'ai-and-ml',
    },
    {
      id: 'ai-ml-13',
      prompt:
        'The data science team at a bank in Lima built a fraud detection model. Now it needs to train it on more data on managed infrastructure and publish it as an endpoint for the payments app.',
      options: [
        {
          service: 'Amazon Lex',
          why: 'Lex builds chatbots; it does not train or publish your own fraud models.',
        },
        {
          service: 'Amazon Textract',
          why: 'Textract extracts data from documents; it is not a platform to train and deploy models.',
        },
        {
          service: 'Amazon SageMaker AI',
          why: 'Correct: SageMaker AI trains models on managed infrastructure and deploys them to a secure, scalable production environment.',
        },
      ],
      answer: 'Amazon SageMaker AI',
      topicSlug: 'ai-and-ml',
    },
    {
      id: 'ai-ml-14',
      prompt:
        'A software factory in Medellín wants a generative AI assistant inside its IDE that suggests code, scans for vulnerabilities and answers questions about its AWS resources, without training any model. Which one do you choose?',
      options: [
        {
          service: 'Amazon SageMaker AI',
          why: 'SageMaker AI is for building and training your own models; here you want a ready-to-use assistant.',
        },
        {
          service: 'Amazon Lex',
          why: 'Lex lets you build your own chatbot with intents, but it is not a ready-made coding assistant inside the IDE.',
        },
        {
          service: 'Amazon Comprehend',
          why: 'Comprehend analyzes text to extract sentiment and entities; it does not generate code or answer questions about your AWS account.',
        },
        {
          service: 'Amazon Q',
          why: 'Correct: Amazon Q Developer is a generative AI assistant that suggests code, scans for vulnerabilities and answers questions about AWS.',
        },
      ],
      answer: 'Amazon Q',
      topicSlug: 'ai-and-ml',
    },
  ],
};
