import { Response } from "express";
import { AuthRequest } from "../types/AuthRequest";
import prisma from "../db/prisma";

export const sendMessageByUserId = async (req: AuthRequest, res: Response) => {
    try{
        const { message } = req.body
        const { userId } = req.params
        const receiver = await prisma.user.findUnique({where: {id: userId}})
        if (!receiver) throw Error("Can't find recepient")
        const sender = req.user!

        let conversation = await prisma.conversation.findFirst({
            where: {
                memberIds: {
                    hasEvery: [sender.id, userId]
                }
            }
        })

        if (!conversation){
            conversation = await prisma.conversation.create({
                data: {
                    memberIds: { set: [sender.id, userId] },
                    members: {
                        connect: [
                          { id: sender.id },
                          { id: userId }
                        ]
                    },
                }
            })
        }


        if (!conversation){
            conversation = await prisma.conversation.create({
                data: {
                    memberIds: { set: [sender.id, userId] },
                }
            })
        }

        const newMessage = await prisma.message.create({
            data: {
                senderId: sender.id,
                body: message,
                conversationId: conversation.id
            }
        })

        if (newMessage) {
            await prisma.conversation.update({
                where: {
                    id: conversation.id
                },
                data: {
                    updatedAt: new Date(),
                    messages: {
                        connect: {
                            id: newMessage.id
                        }
                    }
                }
            })
        }

        res.status(201).json(newMessage)

    } catch (error: any){
        console.log("Error sending message: ", error.message)
        res.status(500).json({ error: "Error sending message" })
    }
}

export const sendMessage = async (req: AuthRequest, res: Response) => {
    try{
        const { conversationId } = req.params
        const { message } = req.body
        const userId = req.user!.id

        let conversation = await prisma.conversation.findFirst({
            where: {
                id: conversationId,
                memberIds: {
                    has: userId
                }
            }
        })

        if (!conversation) {
            res.status(401).json({ error: "Conversation not found" })
            return
        }

        const newMessage = await prisma.message.create({
            data: {
                senderId: userId,
                body: message,
                conversationId: conversation.id
            }
        })

        if (newMessage) {
            await prisma.conversation.update({
                where: {
                    id: conversation.id
                },
                data: {
                    updatedAt: new Date(),
                    messages: {
                        connect: {
                            id: newMessage.id
                        }
                    }
                }
            })
        }
        
        res.status(201).json(newMessage)
    } catch (error: any) {
        console.log("Error sending message: ", error.message)
        res.status(500).json({ error: "Error sending message"})
    }
}

export const getMessages = async(req: AuthRequest, res: Response) => {
    try {
        const { conversationId } = req.params
        const userId = req.user!.id

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
                memberIds: {
                    has: userId
                }
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "desc"
                    },
                    include: {
                        sender: {
                            select: {
                                username: true,
                                profilePic: true
                            }
                        }
                    }
                }
            }
        })
        if (!conversation) {
            res.status(200).json([]) 
            return
        }
        
        res.status(200).json(conversation.messages)
    } catch(error:any){
        console.log('Error loading messages: ', error.message)
        res.status(500).json({ error: "Error loading messages" })
    }
}

export const getConversations = async(req: AuthRequest, res: Response) => {
    try {
        const userId = req.user!.id
        const conversations = await prisma.conversation.findMany({
            where: {
                memberIds: {
                    has: userId
                }
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                members: {
                    where: {
                        NOT: {id: userId}
                    },
                    select: {
                        id: true,
                        username: true,
                        profilePic: true
                    }
                }
            }
        })

        if (!conversations) {
            res.status(200).json([]) 
            return
        }

        res.status(200).json(conversations)
    } catch (error: any) {
        console.log("Error loading conversations: ", error.message)
        res.status(500).json({ error: "Error loading conversations" })
    }
}