import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

import {comparePassword} from '../helpers/password.js'

export const isSignedIn = (req, res, next) => {

    const token = req.headers.authorization;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).send('Unauthorized')
        } else {
            req.body.user_id = decoded.id;
            next();
        }
    });

}

export const login = async (req, res) => {

    const user = await User.findOne({email: req.body.email});

    if (!user) {
        res.status(404).send('User not found');
    }
    else {
        const match = await comparePassword(req.body.password, user.password);
        if(match) {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            res.status(200).send({token: token});
        }
        else {
            console.log('no match');
        }
    }
}