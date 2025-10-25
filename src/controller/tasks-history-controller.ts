import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { StatusTasks } from "@prisma/client";
import { Request, Response } from "express";
import z from "zod";


class TaskHistoryController{
  async create(req: Request, res: Response){
    const bodySchema = z.object({
      task_id: z.string().uuid(),
      newStatus: z.enum([StatusTasks.pending, StatusTasks.in_progress, StatusTasks.completed]), 
    })

    const { task_id, newStatus } = bodySchema.parse(req.body);

    const task = await prisma.tasks.findUnique({
      where: { id: task_id }
    })

    if(!task){
      throw new AppError("Tarefa não encontrada.", 404);
    }

    if(req.user?.role === "member" && req.user.id !== task?.assignedTo){
      throw new AppError("Você não tem permissão para acessar essa tarefa.", 403);
    }

    if (task.status === newStatus) {
      throw new AppError("A tarefa já está com esse status.", 400);
    }

    const history = await prisma.taskHistory.create({
      data: {
        taskId: task.id,
        changedBy: req.user?.id as string, 
        oldStatus: task.status,
        newStatus,
      },
    });

    await prisma.tasks.update({
      where: { id: task.id },
      data: { status: newStatus },
    });

    return res.json(history);
  }

  async show(req: Request, res: Response){
    const paramsSchema = z.object({
      task_id: z.string().uuid()
    })

    const { task_id } = paramsSchema.parse(req.params);

    const task = await prisma.tasks.findUnique({
      where: { id: task_id }
    })

    if(req.user?.role === "member" && req.user.id !== task?.assignedTo){
      throw new AppError("Você não tem permissão para acessar essa tarefa.", 403);
    }

    return res.json(task)
  }
}

export { TaskHistoryController }