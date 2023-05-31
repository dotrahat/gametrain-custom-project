import express from "express";
import User from "../models/User.js";
import { hashPassword } from "../helpers/password.js";

export const getUser = async (req, res) => {
  const user = await User.findById(req.body.id);
  res.status(200).send(user);
};

export const getUsers = async (req, res) => {
  const users = await User.find();
  console.log(users)
  res.status(200).send(users);
};

export const createUser = async (req, res) => {

  const {name, email, password} = req.body;

  const hashedPassword = await hashPassword(password);

  const user = await new User({
    name,
    email,
    password: hashedPassword,
    credits: 200
  }).save();
  res.status(201).send(user);
}

export const updateUser = async (req, res) => {
    const user = await User.findById(req.body.id);
    res.status(200).send(user);
}

export const deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.body.id);
    res.status(200).send(user);
}