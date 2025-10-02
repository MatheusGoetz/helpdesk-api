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

    return res.json(team)
  }
}

export { TeamsController }