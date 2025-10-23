import { Request, Response, NextFunction } from "express";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

interface AutenticatedRequest extends Request {
  user?: {
    id: string;
    role: "admin" | "member" | string;
  }
}

async function taskPermissions(req: AutenticatedRequest, res: Response, next: NextFunction) {
  const user = req.user;
  const taskId = req.params.id;

  if (!user) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  if (user.role === "admin") {
    return next();
  }

  const task = await prisma.tasks.findUnique({
    where: { id: taskId },
    select: { assignedTo: true },
  });

  if (!task) {
    return res.status(404).json({ message: "Tarefa não encontrada" });
  }

  if (task.assignedTo !== user.id) {
    return res.status(403).json({ message: "Você não tem permissão para acessar esta tarefa" });
  }

  next();
}

export { taskPermissions }