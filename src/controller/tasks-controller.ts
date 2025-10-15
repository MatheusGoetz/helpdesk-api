import { Request, Response } from 'express';
import { z } from 'zod'
import { prisma } from '@/database/prisma';
import { PriorityTasks, StatusTasks } from '@prisma/client';
import { AppError } from '@/utils/AppError';

class TasksController {
  async create(req: Request, res: Response){
    const bodySchema = z.object({
      title: z.string().trim().min(4),
      description: z.string().trim().min(6),
      status: z.enum([StatusTasks.pending, StatusTasks.in_progress, StatusTasks.completed]).default(StatusTasks.pending),
      priority: z.enum([PriorityTasks.low, PriorityTasks.medium, PriorityTasks.high]).default(PriorityTasks.medium),
      assignedTo: z.string().uuid(),
      teamId: z.string().uuid()
    })

    const { title, description, status, priority, assignedTo, teamId } = bodySchema.parse(req.body)

    const [assignedToExist, teamExist] = await Promise.all([
      prisma.user.findUnique({where: {id: assignedTo}}),
      prisma.teams.findUnique({where: {id: teamId}})
    ])

    if(!assignedToExist){
      throw new AppError("Usuário não encontrado!")
    }

    if(!teamExist){
      throw new AppError("Time não encontrado!")
    }

    const task = await prisma.tasks.create({
      data:
      {
        title,
        description,
        status,
        priority,
        assignedTo,
        teamId
      }
    })

    return res.json(task)
  }
}

export { TasksController }