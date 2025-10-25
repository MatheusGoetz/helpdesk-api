import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { tasksRoutes } from "./tasks-routes";
import { teamsRoutes } from "./teams-routes";
import { sessionRoutes } from "./sessions-routes";
import { teamsMembersRoutes } from "./teams-members-routes";
import { tasksFilterRoutes } from "./tasks-filters-routes";
import { taskHistoryRoutes } from "./tasks-history-routes";

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/sessions", sessionRoutes)
routes.use("/tasks", tasksRoutes)
routes.use("/tasks-filters", tasksFilterRoutes)
routes.use("/teams", teamsRoutes)
routes.use("/teams-members", teamsMembersRoutes)
routes.use("/tasks-history", taskHistoryRoutes)

export {routes}