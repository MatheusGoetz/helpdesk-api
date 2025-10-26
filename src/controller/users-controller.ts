import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { prisma } from "@/database/prisma"
import { hash } from "bcrypt" 
import { z } from "zod"
import { UserRole } from "@prisma/client";

class UsersController{
  async create(req: Request, res: Response){
    const bodySchema = z.object({
      name: z.string().trim().min(3),
      email: z.string().email().toLowerCase(),
      password: z.string().min(6),
      role: z.enum([UserRole.member, UserRole.admin]).default(UserRole.member)
    })

    const {name, email, password, role} = bodySchema.parse(req.body)

    const userWithSameEmail = await prisma.user.findFirst({ where: {email}}) // verificando se o e-mail ja esta cadastrado.

    if(userWithSameEmail){
      throw new AppError("Um usuário com este e-mail ja esta cadastrado!")
    }

    const hashedPassword = await hash(password, 8) // criptografando a senha do usuário.

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role ?? "member"
      }
    })

    const {password: _, ...userWithotPassword} = user // Desestruturando a senha do usuário.

    return res.status(201).json(userWithotPassword)
  }
}

export { UsersController }