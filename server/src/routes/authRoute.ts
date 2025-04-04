import express from "express";
import { validResult, signUpValidator, userAlreadyExists, userDoesntExist, validSession } from "../utils/authValidation";
import { login, signup, currentUser, logout } from "../controllers/authController";

const router = express.Router();

router.post('/login', userDoesntExist, login)

router.post('/signup', signUpValidator, validResult, userAlreadyExists, signup)

router.get('/me', validSession, currentUser)

router.post('/logout', logout)

export default router;