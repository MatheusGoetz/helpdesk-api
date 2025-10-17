import { Router } from "express";
import { TasksFilterController } from "@/controller/tasks-filter-controller";

const tasksFilterRoutes = Router()
const tasksFilterController = new TasksFilterController()

tasksFilterRoutes.get("/status/:status", tasksFilterController.statusFilter)
tasksFilterRoutes.get("/priority/:priority", tasksFilterController.priorityFilter)

export { tasksFilterRoutes }