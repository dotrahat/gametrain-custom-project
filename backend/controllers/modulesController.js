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

  // save input
  const savedInput = await saveInput(input_text, user_id);

  await User.findByIdAndUpdate(user_id, { $push: { inputs: savedInput._id } });

  // generate outputs
  const outputs = await getAiContent(
    input_text,
    user_id,
    numberOfOutputs
  );
  
  // save outputs
  await saveOutputs(outputs, savedInput._id, user_id);

  res.status(201).send(outputs);
};


// helper functions

async function saveInput(input_text, user_id) {
  const saved = await new Input({
    input_text,
    user_id: user_id,
  }).save();

  // console.log(saved);

  return saved;
}

async function saveOutputs(outputs, input_id, user_id) {

  console.log('saveOutputs', outputs)

  outputs.map(async (item) => {
    const savedOutput = await new Output({
      output_text: item.text.trim(),
      user_id,
      input_id,
    }).save();

    // push output ids in Input model
    await Input.findByIdAndUpdate(input_id, { $push: { output_id: savedOutput._id } });
    
    // push output ids in User model
    await User.findByIdAndUpdate(user_id, { $push: { outputs: savedOutput._id } });

    return savedOutput;
  });

  // console.log(all_outputs);

  return outputs;
}
  
async function getAiContent(input_text, user_id, numberOfOutputs) {
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

// async function saveGenerationDataInUser(user_id, input_id, output_id) {

  
//   const user = await User.findById(user_id);
//   user.inputs.map(async (item) => {

//     if(item !== input_id) {
//       await user.updateOne({ $push: { inputs: input_id } });
//     }
//   });
  
//   user.outputs.map(async (item) => {
//     if(item !== output_id) {
//       await user.updateOne({ $push: { outputs: output_id } });
//     }
//   });

//   // console.log('saveGenerationDataInUser', savedData);

// }