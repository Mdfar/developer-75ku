require('dotenv').config(); const express = require('express'); const bodyParser = require('body-parser'); const { OpenAI } = require('openai'); const twilio = require('twilio');

const app = express(); app.use(bodyParser.urlencoded({ extended: false })); app.use(bodyParser.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**

Core Logic: AI Agent to Route and Process Messages

Handles both Healthcare queries and Expense tracking */ async function processMessageWithAI(incomingText, senderInfo) { const systemPrompt = You are an AI Assistant for a Healthcare and Expense Tracking app. 1. If the message is about health/medical: Provide helpful info and log it as "CARE". 2. If the message contains amounts/purchases: Extract (Amount, Category, Item) and log as "EXPENSE". 3. Keep responses professional and concise.;

const completion = await openai.chat.completions.create({ model: "gpt-4-turbo-preview", messages: [ { role: "system", content: systemPrompt }, { role: "user", content: incomingText } ], functions: [ { name: "log_expense", parameters: { type: "object", properties: { amount: { type: "number" }, category: { type: "string" }, item: { type: "string" } } } } ], function_call: "auto" });

return completion.choices[0].message; }

// Webhook for WhatsApp / SMS (Twilio) app.post('/webhook/messaging', async (req, res) => { const { Body, From } = req.body;

try {
    const aiResponse = await processMessageWithAI(Body, From);
    let replyText = aiResponse.content;

    if (aiResponse.function_call && aiResponse.function_call.name === 'log_expense') {
        const args = JSON.parse(aiResponse.function_call.arguments);
        replyText = `✅ Expense Tracked: $${args.amount} for ${args.item} (${args.category}).`;
        // In a real scenario, here we call the Google Sheets API or a DB
        console.log("Saving to Database:", args);
    }

    const twiml = new twilio.twiml.MessagingResponse();
    twiml.message(replyText || "Processing complete.");
    
    res.type('text/xml').send(twiml.toString());
} catch (error) {
    console.error("Error processing message:", error);
    res.status(500).send("Internal Server Error");
}


});

const PORT = process.env.PORT || 3000; app.listen(PORT, () => console.log(staqlt AI Hub running on port ${PORT}));