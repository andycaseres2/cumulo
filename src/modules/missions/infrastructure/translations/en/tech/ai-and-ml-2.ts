import type { Mission } from '../../../../domain/Mission';

/**
 * Municipalidad: the digital innovation office of a city hall in Arequipa that wants faster permits and more accessible notices.
 * Practices Amazon Textract, Amazon Translate, Amazon Polly and Amazon Bedrock.
 */
export const aiAndMl2: Mission = {
  id: 'ai-and-ml-2',
  track: 'tech',
  topicSlug: 'ai-and-ml',
  buildingId: 'cityhall',
  title: 'Smarter paperwork',
  client: { name: 'Andrés Cárdenas', role: 'Digital Innovation Coordinator at the Municipalidad' },
  intro: [
    "Hi, great to see you. I'm Andrés Cárdenas, digital innovation coordinator at the Municipalidad. My office is two floors above the records room, and my job is to make city paperwork in Arequipa simpler.",
    'Every week we get hundreds of paper license applications, with forms and tables that a team types up by hand. A permit that could be issued in two days takes three weeks.',
    "On top of that, our public notices are only in Spanish, written and in small print. Tourists can't understand them, and residents with visual impairments can't read them.",
    "The mayor wants results this year, and I've been given access to the AWS AI services. But I don't know which one is for what. Can you help me?",
  ],
  outro: {
    passed: [
      'This is going to change the Municipalidad! Applications read themselves, notices go out in several languages and residents can listen to them.',
      'And my team now knows what to use to build their own assistant for residents. Thank you: the mayor wants to meet you at the next ribbon-cutting.',
    ],
    failed: [
      "Hmm... with these decisions I'm afraid paperwork will keep taking weeks. Some of these answers don't convince me.",
      'Review the theory on artificial intelligence and machine learning, and come back whenever you like. Here at the Municipalidad, the paperwork always waits.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'license-forms',
      prompt:
        "Let's start with the license applications. They're scanned forms with fields and tables: name, address, square meters of the premises. I want to extract that data automatically, not just loose text. What service do we use?",
      topicSlug: 'ai-and-ml',
      examTasks: ['3.7'],
      options: [
        {
          id: 'forms-rekognition',
          label: 'Amazon Rekognition',
          definition:
            'Service that analyzes images and videos to detect objects, people, text, scenes and faces.',
          explanation:
            'Choosing Rekognition to read documents is a classic trap. Rekognition looks at images and videos; for extracting forms and tables from documents, there is Textract.',
          correct: false,
        },
        {
          id: 'forms-textract',
          label: 'Amazon Textract',
          definition:
            'Service that extracts text and data from scanned documents, including forms and tables, going beyond simple OCR.',
          explanation:
            'Textract reads the scanned applications and returns the form fields and table rows, exactly what the team types up by hand today.',
          correct: true,
        },
        {
          id: 'forms-comprehend',
          label: 'Amazon Comprehend',
          definition:
            'Service that analyzes text to find language, key phrases, entities, sentiment and topics.',
          explanation:
            "Comprehend analyzes the meaning of text that is already digital. It doesn't extract the fields and tables from a scanned form.",
          correct: false,
        },
        {
          id: 'forms-transcribe',
          label: 'Amazon Transcribe',
          definition: 'Service that converts speech into text, from recorded audio or in real time.',
          explanation:
            'Transcribe works with audio. The license applications are scanned paper, not recordings.',
          correct: false,
        },
      ],
    },
    {
      id: 'tourist-notices',
      prompt:
        'Now, the notices for tourists: museum hours, street closures, fairs. We write them in Spanish, and I want to publish them in English and Portuguese too without hiring translators for every notice. What do we use?',
      topicSlug: 'ai-and-ml',
      examTasks: ['3.7'],
      options: [
        {
          id: 'notices-comprehend',
          label: 'Amazon Comprehend',
          definition:
            'Service that analyzes text to detect its language, key phrases, entities, sentiment and topics.',
          explanation:
            "Thinking Comprehend translates is a classic trap: Comprehend can detect a text's language, but it doesn't translate it.",
          correct: false,
        },
        {
          id: 'notices-polly',
          label: 'Amazon Polly',
          definition: 'Service that turns text into natural-sounding speech.',
          explanation:
            "Polly turns text into speech, but it doesn't change its language. First you need the notice in English and Portuguese.",
          correct: false,
        },
        {
          id: 'notices-lex',
          label: 'Amazon Lex',
          definition:
            'Service for building chatbots and conversational interfaces using voice or text.',
          explanation:
            'Lex is for having conversations with a user. Andrés needs to convert written notices from one language to another.',
          correct: false,
        },
        {
          id: 'notices-translate',
          label: 'Amazon Translate',
          definition: 'Service that translates text between languages.',
          explanation:
            'Translate changes the language of text: every notice written in Spanish can also be published in English and Portuguese.',
          correct: true,
        },
      ],
    },
    {
      id: 'audio-notices',
      prompt:
        'For residents with visual impairments, I want every notice to have an audio version, with a natural voice, that they can listen to on the website or over the phone. Which service generates it?',
      topicSlug: 'ai-and-ml',
      examTasks: ['3.7'],
      options: [
        {
          id: 'audio-polly',
          label: 'Amazon Polly',
          definition: 'Service that turns text into natural-sounding speech.',
          explanation:
            'Polly "speaks": it takes the text of each notice and generates natural-sounding audio that residents can listen to.',
          correct: true,
        },
        {
          id: 'audio-transcribe',
          label: 'Amazon Transcribe',
          definition:
            'Service that converts speech into text, from audio files or in real time.',
          explanation:
            'Mixing up Polly and Transcribe is the most common trap. Transcribe "listens" and produces text; here you need the opposite.',
          correct: false,
        },
        {
          id: 'audio-translate',
          label: 'Amazon Translate',
          definition: 'Service that translates text from one language to another.',
          explanation:
            "Translate changes the language of a text, but the result is still written text. It doesn't generate audio.",
          correct: false,
        },
        {
          id: 'audio-rekognition',
          label: 'Amazon Rekognition',
          definition:
            'Service that analyzes images and videos to identify objects, scenes, text and faces.',
          explanation:
            "Rekognition analyzes images and videos. It doesn't turn written notices into a version people can listen to.",
          correct: false,
        },
      ],
    },
    {
      id: 'citizen-assistant',
      prompt:
        'Last one: my development team wants to build its own generative AI application, an assistant that explains city procedures to residents. They want to choose between foundation models from Amazon and other companies through an API. What service do they use?',
      topicSlug: 'ai-and-ml',
      examTasks: ['3.7'],
      options: [
        {
          id: 'assistant-q-developer',
          label: 'Amazon Q Developer',
          definition:
            'Generative AI assistant for developers: it generates and explains code, scans for vulnerabilities and answers questions about AWS resources.',
          explanation:
            "Q Developer is a ready-to-use assistant that helps you code. Andrés's team wants to build its own application by choosing foundation models through an API.",
          correct: false,
        },
        {
          id: 'assistant-comprehend',
          label: 'Amazon Comprehend',
          definition:
            'Pretrained service that analyzes text to extract sentiment, entities, key phrases and topics.',
          explanation:
            "Comprehend analyzes existing text, but it doesn't offer foundation models to generate new answers like an assistant's.",
          correct: false,
        },
        {
          id: 'assistant-bedrock',
          label: 'Amazon Bedrock',
          definition:
            'Managed service that offers foundation models from Amazon and other leading AI companies through an API.',
          explanation:
            'To build your own generative AI application with foundation models, the answer is Bedrock: the team chooses the model and uses it through an API, without managing servers.',
          correct: true,
        },
        {
          id: 'assistant-transcribe',
          label: 'Amazon Transcribe',
          definition: 'Service that converts speech into text, from audio files or in real time.',
          explanation:
            "Transcribe turns speech into text, but it doesn't generate answers. It isn't the foundation for a generative AI assistant.",
          correct: false,
        },
      ],
    },
  ],
};
