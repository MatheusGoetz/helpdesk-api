import { Request, Response } from 'express';
import { z } from 'zod'
import { prisma } from '@/database/prisma';
import { PriorityTasks, StatusTasks } from '@prisma/client';
import { AppError } from '@/utils/AppError';
import id from 'zod/v4/locales/id.js';

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

  async update(req: Request, res: Response){
    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const bodySchema = z.object({
      title: z.string().trim().min(4).optional(),
      description: z.string().trim().min(6).optional(),
      status: z.enum([StatusTasks.pending, StatusTasks.in_progress, StatusTasks.completed]).default(StatusTasks.pending),
      priority: z.enum([PriorityTasks.low, PriorityTasks.medium, PriorityTasks.high]).default(PriorityTasks.medium),
      assignedTo: z.string().uuid().optional(),
      teamId: z.string().uuid().optional()
    })

    const { id } = paramsSchema.parse(req.params)
    const { title, description, status, priority, assignedTo, teamId } = bodySchema.parse(req.body)

    await prisma.tasks.update({
      data: {
        title,
        description,
        status,
        priority,
        assignedTo,
        teamId
      },
      where: {
        id
      }
    })


    return res.json()
  }

  async index(req: Request, res: Response){
    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = paramsSchema.parse(req.params)

    const tasks = await prisma.tasks.findUnique({ where: {id: id}})

    return res.json(tasks)
  }

  async remove(req: Request, res: Response){
    const paramsSChema = z.object({
      id: z.string().uuid()
    })

    const { id } = paramsSChema.parse(req.params)

    await prisma.tasks.delete({ where: {id: id}})

    return res.json()
  }
}

export { TasksController }