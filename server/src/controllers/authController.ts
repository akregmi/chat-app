import { Request, Response, NextFunction } from "express";
import bcryptjs from "bcryptjs";
import prisma from "../db/prisma";
import { generateToken } from "../utils/generateToken";
const jwt = require('jsonwebtoken');

export const signup = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const profilePic = "https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg"
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                profilePic
            }
        })

        generateToken(newUser.id, res);
        
        if (newUser){
            res.status(201).json({
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    profilePic: newUser.profilePic,
                    createdAt: newUser.createdAt,
                    updatedAt: newUser.updatedAt
                }
            })
        }
        else{
            res.status(400).json({ error: "Invalid Data" })
        }
    } catch (error: any) {
        console.log("Error signing up: ", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const login = async (req: Request, res: Response) => {
    try{
        const { username, password } = req.body;
        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = await prisma.user.findUnique({where: {username}})

        const isMatch = await bcryptjs.compare(password, user!.password)
        if (!isMatch){
            res.status(400).json( {error: "Incorrect Password"} )
            return
        }

        generateToken(user!.id, res)
        res.status(201).json({
            user: {
                id: user!.id,
                username: user!.username,
                profilePic: user!.profilePic,
                createdAt: user!.createdAt,
                updatedAt: user!.updatedAt
            }
        })
    } catch (error: any) {
        console.log("Error logging in: ", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const currentUser = async (req: Request, res: Response) => {
    const token = req.cookies.jwt;
    if (!token){
        res.status(401).json({ error: "Not authorized" });
        return
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({where: {id: decoded.userId}})
        res.status(200).json({
            user: {
                id: user!.id,
                username: user!.username,
                profilePic: user!.profilePic,
                createdAt: user!.createdAt,
                updatedAt: user!.updatedAt
            }
        })
    } catch (error: any){
        console.error("Error validating user session: ", error.message);
        res.status(401).json({ error: "Invalid token" });
    }
}

export const logout = async (req: Request, res: Response) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error: any) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};