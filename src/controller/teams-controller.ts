import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import { z } from "zod"

class TeamsController {
  async create(req: Request, res: Response){
    const bodySchema = z.object({
      name: z.string().trim().min(3),
      description: z.string().optional()
    })

    const { name, description } = bodySchema.parse(req.body)

    const teamsWithoutSameName = await prisma.teams.findFirst({ where:{name}})

    if(teamsWithoutSameName){
      throw new AppError("Nome de time ja esta sendo utilizado...")
    }

    const team = await prisma.teams.create({
      data: {
        name,
        description
      }
    })

    return res.status(201).json(team)
  }

  async index(req: Request, res: Response){
    const teams = await prisma.teams.findMany()

    return res.status(201).json(teams)
  }

  async update(req: Request, res: Response){
    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const bodySchema = z.object({
      name: z.string().trim().min(3),
      description: z.string().optional() 
    })

    const { id } = paramsSchema.parse(req.params)
    const { name, description } = bodySchema.parse(req.body)

    await prisma.teams.update({
      data: {
        name,
        description
      },
      where: {
        id
      }
    })

    return res.json()
  }

  async remove(req: Request, res: Response){
    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = paramsSchema.parse(req.params)

    await prisma.teams.delete({where: {id: id}})

    return res.json()
  }
}

export { TeamsController }