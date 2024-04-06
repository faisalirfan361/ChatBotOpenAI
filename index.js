import openai from "./config/open-ai.js";
import readlineSync from 'readline-sync';
import colors from 'colors';
import { compileFunction } from "vm";

async function main() {
    const chatHistory = [];

    console.log(colors.bold.green('Welcome to the Chatbot program!'));
    console.log(colors.bold.green('You can start chatting now!'));

    while (true) {
        const userInput = readlineSync.question(colors.yellow("You: "))

        try {

            if (userInput.toLowerCase() === 'exit') {
                return;
            }
            console.log(chatHistory)

            // add new message to context
            chatHistory.push({role: 'user', content: userInput}); 

            // call API for chat
            const chatCompletion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: chatHistory
            });

            const response = chatCompletion.choices[0].message.content;

            // add to history (response from openAI)
            chatHistory.push({role: 'assistant', content: response});

            console.log("GPT-Bot: ", response);
        }
        catch(error) {
            console.error(colors.red(error))
        }
    }

}

main();