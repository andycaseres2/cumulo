---
title: "Artificial intelligence and machine learning"
summary: "Which task each AWS AI service solves: SageMaker AI for your own models, pre-trained services such as Lex or Textract, and Amazon Q as a generative assistant."
domain: "technology-services"
order: 15
examTasks: ["3.7"]
services: ["Amazon SageMaker AI", "Amazon Lex", "Amazon Comprehend", "Amazon Polly", "Amazon Rekognition", "Amazon Textract", "Amazon Transcribe", "Amazon Translate", "Amazon Q", "Amazon Bedrock"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain3.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/machine-learning.html"
  - "https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html"
  - "https://aws.amazon.com/q/"
  - "https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/what-is.html"
quiz:
  - prompt: "A lender in Santiago de Chile receives thousands of scanned credit applications and wants to automatically extract the text, form fields, and tables, with no ML expertise. Which service should it use?"
    options:
      - label: "Amazon Polly"
        explanation: "Amazon Polly turns text into natural-sounding speech; it does not read scanned documents."
      - label: "Amazon Textract"
        explanation: "Amazon Textract extracts text and data from scanned documents, including forms and tables, going beyond simple OCR."
        correct: true
      - label: "Amazon Comprehend"
        explanation: "Amazon Comprehend analyzes the meaning of text you already have, such as its sentiment or key phrases; it does not extract data from scanned documents."
      - label: "Amazon Translate"
        explanation: "Amazon Translate translates text between languages; the scenario asks to extract fields and tables from documents, not to change their language."
  - prompt: "An e-commerce company in Lima wants to know whether the reviews its customers write are positive or negative and which key phrases come up again and again. Which pre-trained AI service should it use?"
    options:
      - label: "Amazon Translate"
        explanation: "Amazon Translate changes the language of text; it does not determine whether a review is positive or negative."
      - label: "Amazon Lex"
        explanation: "Amazon Lex is for building chatbots and conversational interfaces; it is not designed to analyze the sentiment of reviews."
      - label: "Amazon Transcribe"
        explanation: "Amazon Transcribe converts speech to text; the reviews are already written, and what is needed is to analyze their meaning."
      - label: "Amazon Comprehend"
        explanation: "Amazon Comprehend analyzes text: it detects the language, key phrases, entities, and positive or negative sentiment."
        correct: true
  - prompt: "A digital bank needs a custom model, trained on its own customer history, that predicts who might stop paying their credit card. Which AWS service should it use?"
    options:
      - label: "Amazon SageMaker AI"
        explanation: "Amazon SageMaker AI is a fully managed ML service for building, training, and deploying your own models, such as one that predicts defaults."
        correct: true
      - label: "Amazon Rekognition"
        explanation: "Amazon Rekognition is a pre-trained service for analyzing images and videos; it does not train a default model on your data."
      - label: "Amazon Polly"
        explanation: "Amazon Polly is a pre-trained service that turns text into speech; it does not predict customer behavior."
      - label: "Amazon Q Developer"
        explanation: "Amazon Q Developer is a generative AI assistant that helps developers write and understand code; it is not the service for training your own prediction model."
practice:
  - prompt: "A call center in Guadalajara stores thousands of recordings of customer calls and wants to convert them into text so they can be searched. Which AWS service should it use?"
    options:
      - label: "Amazon Polly"
        explanation: "Amazon Polly does the opposite: it turns text into natural-sounding speech; it does not transcribe recordings."
      - label: "Amazon Transcribe"
        explanation: "Amazon Transcribe converts speech to text, both from audio files and in real time, which is exactly what the recordings need."
        correct: true
      - label: "Amazon Comprehend"
        explanation: "Amazon Comprehend analyzes the meaning of existing text; the calls would have to be transcribed first."
      - label: "Amazon Lex"
        explanation: "Amazon Lex is for building chatbots and conversational interfaces, not for transcribing an archive of recordings."
  - prompt: "An airline in Panama City wants a phone IVR that talks with passengers by voice so they can check their flight status. Which AWS service should it use to build that conversational interface?"
    options:
      - label: "Amazon Translate"
        explanation: "Amazon Translate translates text between languages; it does not build an interface that converses with the passenger."
      - label: "Amazon Textract"
        explanation: "Amazon Textract extracts text and data from scanned documents; it does not handle phone conversations."
      - label: "Amazon Lex"
        explanation: "Amazon Lex builds chatbots and conversational interfaces by voice or text, including a phone IVR like the airline's."
        correct: true
      - label: "Amazon Rekognition"
        explanation: "Amazon Rekognition analyzes images and videos; it cannot hold phone conversations with passengers."
  - prompt: "A news app in Quito wants its articles to be read aloud, with a natural sound, for visually impaired users. Which pre-trained service should it use?"
    options:
      - label: "Amazon Polly"
        explanation: "Amazon Polly turns text into natural-sounding speech, ideal for reading the articles aloud."
        correct: true
      - label: "Amazon Transcribe"
        explanation: "Amazon Transcribe converts speech to text; here the reverse is needed, from text to speech."
      - label: "Amazon Comprehend"
        explanation: "Amazon Comprehend analyzes text (language, entities, sentiment), but it does not turn it into audio."
      - label: "Amazon Translate"
        explanation: "Amazon Translate changes the language of text; it does not generate the voice users would hear."
  - prompt: "A photo social network in Bogotá wants to automatically detect inappropriate content in the images its users upload, with no ML expertise. Which service should it use?"
    options:
      - label: "Amazon Textract"
        explanation: "Amazon Textract is designed to extract text, forms, and tables from documents, not to moderate photos."
      - label: "Amazon Comprehend"
        explanation: "Amazon Comprehend analyzes written text; it does not examine the visual content of images."
      - label: "Amazon Transcribe"
        explanation: "Amazon Transcribe converts audio to text; photos have no audio to transcribe."
      - label: "Amazon Rekognition"
        explanation: "Amazon Rekognition analyzes images and videos, including detecting inappropriate content, as a pre-trained service."
        correct: true
  - prompt: "A fintech in Montevideo wants to build its own generative AI application using foundation models from Amazon and other AI companies, accessible through an API. Which AWS service fits?"
    options:
      - label: "Amazon Q Business"
        explanation: "Amazon Q Business is a ready-to-use assistant that works with company content; the fintech wants to build its own application with foundation models."
      - label: "Amazon Bedrock"
        explanation: "Amazon Bedrock is the managed service that offers foundation models from Amazon and other leading AI companies through an API to build generative AI applications."
        correct: true
      - label: "Amazon Rekognition"
        explanation: "Amazon Rekognition is a pre-trained image and video analysis service, not access to foundation models for creating content."
      - label: "Amazon Polly"
        explanation: "Amazon Polly turns text into speech; it does not offer foundation models for building a generative AI application."
  - prompt: "A construction company in Buenos Aires wants its employees to use generative AI securely to ask questions about the company's internal documents and systems, with a ready-to-use assistant. Which service should it choose?"
    options:
      - label: "Amazon Q Developer"
        explanation: "Amazon Q Developer is aimed at developers and IT professionals who build and operate applications; it is not the assistant for employees working with company content."
      - label: "Amazon Transcribe"
        explanation: "Amazon Transcribe converts speech to text; it does not answer employees' questions about internal documents."
      - label: "Amazon Q Business"
        explanation: "Amazon Q Business makes generative AI securely accessible to employees, using the company's content and systems."
        correct: true
      - label: "Amazon Translate"
        explanation: "Amazon Translate translates text between languages; it is not an assistant that answers questions about internal information."
---

## Why does it matter?

A digital bank in Santiago de Chile wants to automate its customer service: a chatbot that answers questions, automatic reading of the ID documents customers upload, analysis of whether social media comments are positive or negative, and its own model that predicts which customers might stop paying their credit card.

It does not need a team of data scientists for all of that. AWS offers **pre-trained AI services** that you use with a single API call, and **Amazon SageMaker AI** for when you need your own model. The exam will ask you to match each task with its service.

## Basic concepts

- **Artificial intelligence (AI)**: systems that perform tasks that normally require human intelligence, such as understanding language or recognizing images.
- **Machine learning (ML)**: the technique of training **models** on data so they learn patterns and make predictions.
- **Pre-trained model**: a model AWS has already trained; you just send your data and get the result back, with no ML expertise.
- **Generative AI**: models that **create** new content (text, code, images) from a prompt.

## Amazon SageMaker AI: building your own models

**Amazon SageMaker AI** is a **fully managed** ML service that lets data scientists and developers **build, train, and deploy** ML models in a production-ready environment, without managing servers.

Current fact: on December 3, 2024, Amazon SageMaker was renamed **Amazon SageMaker AI**. That same day AWS launched the next generation of **Amazon SageMaker**, a unified platform for data, analytics, and AI that includes SageMaker AI as one of its capabilities. For the exam, the guide uses the name **Amazon SageMaker AI**.

**SageMaker AI or a pre-trained service?** If the task is common (translating, transcribing, detecting faces), use the pre-trained service. If you need a custom model trained on your own data, such as predicting defaults in your loan portfolio, use SageMaker AI.

## Pre-trained AI services

| I need to… | Service |
| --- | --- |
| Build a **chatbot** or a conversational interface by voice or text (including a phone IVR) | **Amazon Lex** |
| Analyze **text**: language, key phrases, people, places, positive or negative **sentiment**, topics | **Amazon Comprehend** |
| Turn **text into speech** that sounds natural | **Amazon Polly** |
| Turn **speech into text** (transcribe audio, from files or in real time) | **Amazon Transcribe** |
| **Translate** text between languages | **Amazon Translate** |
| Analyze **images and videos**: objects, people, text, scenes, inappropriate content, **face** analysis and comparison | **Amazon Rekognition** |
| **Extract text and data** from scanned documents, including **forms and tables** (more than simple OCR) | **Amazon Textract** |
| Build, train, and deploy **your own** ML models | **Amazon SageMaker AI** |
| A **generative AI assistant** for work and software development | **Amazon Q** |

To remember the pairs that get mixed up most often:

- **Polly** speaks (text → speech); **Transcribe** listens (speech → text).
- **Comprehend** understands the meaning of text; **Translate** changes its language.
- **Textract** reads documents; **Rekognition** looks at images and videos.
- **Lex** converses; under the hood it uses speech recognition and natural language understanding, the same deep learning technologies that power Amazon Alexa.

## Amazon Q: a generative AI assistant

**Amazon Q** is a generative AI–powered assistant for speeding up software development and making use of an organization's internal data. Its main offerings:

- **Amazon Q Developer**: helps developers and IT professionals understand, build, extend, and operate applications on AWS. In the IDE it generates and explains code, scans for vulnerabilities, and suggests improvements; it also answers questions about your AWS resources in the console. It was previously called Amazon CodeWhisperer.
- **Amazon Q Business**: makes generative AI securely accessible to employees, using the company's content and systems.

Amazon Q Developer is built on **Amazon Bedrock**, the managed service that offers **foundation models** from Amazon and other leading AI companies through an API. If a scenario asks to "build your own generative AI application with foundation models", the answer is usually Bedrock; if it asks for "a ready-to-use assistant", it is Amazon Q.

## Common exam traps

- **Confusing Polly with Transcribe.** Polly generates speech; Transcribe generates text from speech.
- **Choosing Rekognition to read invoices.** To extract text, forms, and tables from documents, the answer is **Textract**.
- **Choosing SageMaker AI for common tasks.** If a pre-trained service solves the task, it is the simplest option.
- **Thinking Comprehend translates.** Comprehend analyzes text; **Translate** translates.
- **Using old names.** The current guide says **Amazon SageMaker AI**, not just "SageMaker".

## Exam summary

- SageMaker AI = build, train, and deploy your own ML models, fully managed.
- Lex = chatbots; Comprehend = text and sentiment analysis; Polly = text to speech; Transcribe = speech to text.
- Translate = translation; Rekognition = images and video; Textract = text, forms, and tables from documents.
- Pre-trained services require no ML expertise.
- Amazon Q = generative AI assistant (Q Developer for software, Q Business for employees).
- Amazon Bedrock = foundation models through an API for building generative AI applications.
