import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod"
import { PriorityTasks, StatusTasks } from "@prisma/client";
import { AppError } from "@/utils/AppError";

class TasksFilterController{
  async statusFilter(req: Request, res: Response){
    const paramsSchema = z.object({
      status: z.enum([StatusTasks.pending, StatusTasks.in_progress, StatusTasks.completed])
    })

    const { status } = paramsSchema.parse(req.params)

    if(!status){
      throw new AppError("Status not found!", 404)
    }

    const statusTasks  = await prisma.tasks.findMany({where: {status: status}})

    return res.json(statusTasks)
  }

  async priorityFilter(req: Request, res: Response){
    const paramsSchema = z.object({
      priority: z.enum([PriorityTasks.low, PriorityTasks.medium, PriorityTasks.high])
    })

    const { priority } = paramsSchema.parse(req.params)

    if(!priority){
      throw new AppError("Priority not found", 404)
    }

    const priorityTasks = await prisma.tasks.findMany({where: {priority: priority}})

    return res.json(priorityTasks)
  }
}

export { TasksFilterController }