import { Router } from "express";
import { TasksController } from "@/controller/tasks-controller";
import { taskPermissions } from "@/middlewares/taskPermissions";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const tasksRoutes = Router()
const tasksController = new TasksController()


tasksRoutes.get("/:id", ensureAuthenticated, taskPermissions, tasksController.index)
tasksRoutes.post("/", ensureAuthenticated, tasksController.create)
tasksRoutes.put("/:id", ensureAuthenticated, taskPermissions, tasksController.update)
tasksRoutes.delete("/:id", ensureAuthenticated, taskPermissions, tasksController.remove)

export { tasksRoutes }