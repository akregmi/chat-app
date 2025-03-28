const { body, validationResult } = require('express-validator');
import { Request, Response, NextFunction } from "express";
const jwt = require('jsonwebtoken');
import prisma from "../db/prisma";
const JWT_SECRET = process.env.JWT_SECRET

interface AuthRequest extends Request {
    user?: {
        id: String,
        username: String,
        profilePic: String,
        createdOn: Date
    };
}

export const signUpValidator = [
    body('username').not().isEmpty().withMessage("Invalid username"),
    body('password').isLength({min: 6}).withMessage("Password must be at least 6 characters"),
    body("confirmPassword").custom((value: String, { req }: { req: Request }) => value === req.body.password).withMessage("Passwords do not match"),
];

export const validResult = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        res.status(400).json({ error: errors.array() });
        return
    }
    next();
}

export const userAlreadyExists = async (req: Request, res: Response, next: NextFunction) => {
    const {username} = req.body
    const user = await prisma.user.findUnique({where: {username}})
    if (user){
        res.status(400).json({ error: "User already exists" })
        return
    }
    next()
}

export const userDoesntExist = async (req: Request, res: Response, next: NextFunction) => {
    const {username} = req.body
    const user = await prisma.user.findUnique({where: {username}})
    if (!user){
        res.status(400).json({ error: "User doesn't exist" })
        return
    }
    next()
}

export const validSession = (req: AuthRequest, res: Response) => {
    const token = req.cookies.jwt;
    if (!token){
        res.status(401).json({ error: "Not authorized" });
        return
    }
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        res.status(200).json({userId: decoded.userId})
    } catch (error: any){
        console.error("Error validating user session: ", error.message);
        res.status(401).json({ error: "Invalid token" });
    }
}