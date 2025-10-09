import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod"
import { AppError } from "@/utils/AppError";

class TeamsMembersController {
  async addMember(req: Request, res: Response){
      const bodySchema = z.object({
        userId: z.string().uuid(),
        teamId: z.string().uuid()
      })

      const { userId, teamId } = bodySchema.parse(req.body)

      // Verifica se usuário e time existem
      const [userExist, teamExist] = await Promise.all([
        prisma.user.findUnique({ where: {id: userId}}),
        prisma.teams.findUnique({ where: {id: teamId}})
      ])

      if(!userExist){
        throw new AppError("Usuário não encontrado!", 404)
      }
      if(!teamExist){
        throw new AppError("Time não encontrado!", 404)
      }

      const alreadyMember = await prisma.teamMembers.findFirst({
        where: {userId: userId, teamId: teamId}
      })

      if(!alreadyMember){
        throw new AppError("Este usuário já é membro deste time!", 400)
      }

      const teamMember = await prisma.teamMembers.create({
        data: {
          userId: userId,
          teamId: teamId
        }
      })

    return res.status(201).json(teamMember)
  }

}

export { TeamsMembersController }