import { type Request, type Response } from "express";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import dotenv from "dotenv";

dotenv.config();

// Get the OpenAI API key from the environment variables
const apiKey = process.env.OPENAI_API_KEY;
let model: ChatOpenAI;

if (apiKey) {
  // Initialize the OpenAI model if the API key is provided
  model = new ChatOpenAI({
    temperature: 0,
    openAIApiKey: apiKey,
    modelName: "gpt-4o-mini",
  });
} else {
  console.error("OPENAI_API_KEY is not configured.");
}

// With a `StructuredOutputParser` we can define a schema for the output.
const parser = StructuredOutputParser.fromNamesAndDescriptions({
  title: "title of the recipe",
  Summary: "detailed summary of the recipe you are creating.",
  ReadyInMinutes: "the number of minutes it takes to prepare the meal",
  Servings: "the number of servings creted by this recipe",
  Ingredients:
    "A comprehensive list of ingredients needed to make the recipe. This is a list delimited by semi-colons.",
  Instructions: "A comprehensive list of steps in order to make the recipe",
  Steps:
    "All of the steps from the instruction set, formatted in a list delimited by semi-colons.",
  Diets:
    "A comprehensive list of diets this meal could fit into. This is a list delimited by semi-colons.",
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
      const response = await model.invoke(input);
      //return await model.invoke(input);

    console.log(response); 
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
