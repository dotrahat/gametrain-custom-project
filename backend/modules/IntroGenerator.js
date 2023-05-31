import express from "express";
import User from "../models/User.js";
import Output from "../models/Output.js";
import Input from "../models/Input.js";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_KEY,
});
const openai = new OpenAIApi(configuration);

export const IntroGenerator = async (req, res) => {
  const user_id = req.body.user_id;
  const input_text = req.body.input_text;
  const numberOfOutputs = req.body.numberOfOutputs || 1;

  const savedInput = await saveInput(input_text, user_id);
  const output = await getAiContent(
    input_text,
    savedInput._id,
    user_id,
    numberOfOutputs
  );
  saveOutput(output, savedInput._id, user_id);

  console.log(output);

  res.status(200).send(output);
};

async function saveInput(input_text, user_id) {
  const saved = await new Input({
    input_text,
    user_id: user_id,
  }).save();

  // console.log(saved);

  return saved;
}

async function saveOutput(output, input_id, user_id) {
  const all_outputs = output.map(async (item) => {
    const saveOutput = await new Output({
      output_text: item.text.trim(),
      user_id,
      input_id,
    }).save();

    await saveOutputIdToInput(input_id, saveOutput._id);

    return saveOutput;
  });

  console.log(all_outputs);

  return all_outputs;
}

async function saveOutputIdToInput(input_id, output_id) {
  const saved = await Input.findByIdAndUpdate(input_id, {
    output_id,
  });

  return saved;
}

async function getAiContent(input_text, input_id, user_id, numberOfOutputs) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Write a Blog Post Intro for Heading: ${input_text}`,
    temperature: 1,
    max_tokens: 50,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    user: user_id,
    n: numberOfOutputs,
  });

  const output = response.data.choices;

  return output;
}