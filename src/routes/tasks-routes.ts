import { Router } from "express";
import { TasksController } from "@/controller/tasks-controller";

const tasksRoutes = Router()
const tasksController = new TasksController()

tasksRoutes.post("/", tasksController.create)

export { tasksRoutes }