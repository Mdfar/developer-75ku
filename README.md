staqlt AI Developer Solution

This project implements an intelligent routing system for WhatsApp and SMS, specialized in Healthcare context and Expense tracking.

Features

Omnichannel Support: Handles incoming messages from Twilio (WhatsApp/SMS).

Function Calling: Automatically detects expenses and extracts structured data (Amount, Category).

Healthcare Logic: Uses GPT-4 to provide medical triage/information.

Scalable: Built with Node.js and Express.

Setup

Clone the repository.

Run npm install.

Create a .env file with:

OPENAI_API_KEY

TWILIO_ACCOUNT_SID

TWILIO_AUTH_TOKEN

Deploy to a public server (or use Ngrok for local testing) and point your Twilio Webhook to /webhook/messaging.

Tech Stack

AI Integration (OpenAI API)

Process Automation (Twilio Webhooks)

App Integration (Node.js)