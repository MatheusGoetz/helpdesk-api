import { Router } from "express";
import { TaskHistoryController } from "@/controller/tasks-history-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const taskHistoryRoutes = Router();
const taskHistoryController = new TaskHistoryController();

taskHistoryRoutes.get("/:task_id/show", ensureAuthenticated, verifyUserAuthorization(["admin", "member"]),taskHistoryController.show);
taskHistoryRoutes.post("/", ensureAuthenticated, verifyUserAuthorization(["admin", "member"]), taskHistoryController.create);


export { taskHistoryRoutes };