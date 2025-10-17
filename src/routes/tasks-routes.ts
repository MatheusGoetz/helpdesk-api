import { Router } from "express";
import { TasksController } from "@/controller/tasks-controller";

const tasksRoutes = Router()
const tasksController = new TasksController()

tasksRoutes.get("/", tasksController.index)
tasksRoutes.post("/", tasksController.create)
tasksRoutes.put("/:id", tasksController.update)
tasksRoutes.delete("/:id", tasksController.remove)

export { tasksRoutes }