import { Router } from "express";
import { TasksController } from "@/controller/tasks-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const tasksRoutes = Router()
const tasksController = new TasksController()


tasksRoutes.post("/", ensureAuthenticated, tasksController.create)
tasksRoutes.get("/:id", ensureAuthenticated, tasksController.index)
tasksRoutes.put("/:id", ensureAuthenticated, tasksController.update)
tasksRoutes.delete("/:id", ensureAuthenticated, tasksController.remove)

export { tasksRoutes }