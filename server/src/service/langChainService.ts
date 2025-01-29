import { type Request, type Response } from "express";
import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import dotenv from "dotenv";
import { dietValues } from "../types/index.js";

dotenv.config();

// Get the OpenAI API key from the environment variables
const apiKey = process.env.OPENAI_API_KEY;
let model: OpenAI;

if (apiKey) {
  // Initialize the OpenAI model if the API key is provided
  model = new OpenAI({
    temperature: 0,
    openAIApiKey: apiKey,
    modelName: "gpt-4o-mini",
  });
} else {
  console.error("OPENAI_API_KEY is not configured.");
}

// With a `StructuredOutputParser` we can define a schema for the output.
const parser = StructuredOutputParser.fromNamesAndDescriptions({
  title: "The title of the recipe (string).",
  Summary: "A detailed summary of the recipe (string).",
  ReadyInMinutes: "The total preparation time in minutes (integer).",
  Servings: "Number of servings this recipe makes (integer).",
  Ingredients: "List of ingredients separated by semicolons (string).",
  Instructions: "Steps for making the recipe, formatted as a string.",
  Steps: "Steps formatted as a semicolon-delimited list (string).",
  Diets: `A list of applicable diets, chosen **only** from the following: ${dietValues}. 
  formatted as a semicolon-delimited list (string).`,
});

const formatInstructions = parser.getFormatInstructions();

// Create a new prompt template for formatting prompts
const promptTemplate = new PromptTemplate({
  template:
    "You are a fun, helpful cooking expert expert. Your job is to provide high-quality recipies, adhearing to any of the user's instructions. If the question is unrelated to cooking, just create a template recipe.\n{format_instructions}\n{question}",
  inputVariables: ["question"],
  partialVariables: { format_instructions: formatInstructions },
});

// Format the prompt using the prompt template with the user's question
const formatPrompt = async (question: string): Promise<string> => {
  return await promptTemplate.format({ question });
};

// Call the OpenAI API to get a response to the formatted prompt
const promptFunc = async (input: string): Promise<string> => {
  try {
    if (model) {
      return await model.invoke(input);
    }
    return '```json\n{\n    "code": "No OpenAI API key provided.",\n    "explanation": "Unable to provide a response."\n}\n```';
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Parse the response from the model
const parseResponse = async (
  response: string
): Promise<{ [key: string]: string }> => {
  try {
    return await parser.parse(response);
  } catch (err) {
    console.error("Error in parseResponse:", err);
    return { error: "Failed to parse the response from the model." };
  }
};

// Handle the POST request to ask a question
export const askQuestion = async (
  req: Request,
  res: Response
): Promise<void> => {
  let userQuestion: string = req.body.question;

  try {
    if (!userQuestion) {
      userQuestion = "Please make me a recipe!";
    }

    const formattedPrompt: string = await formatPrompt(userQuestion);
    const rawResponse: string = await promptFunc(formattedPrompt);
    const result: { [key: string]: string } = await parseResponse(rawResponse);
    res.json({
      question: userQuestion,
      prompt: formattedPrompt,
      response: rawResponse,
      formattedResponse: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    }
    res.status(500).json({
      question: userQuestion,
      prompt: null,
      response: "Internal Server Error",
      formattedResponse: null,
    });
  }
};
