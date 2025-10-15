import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { tasksRoutes } from "./tasks-routes";
import { teamsRoutes } from "./teams-routes";
import { sessionRoutes } from "./sessions-routes";
import { teamsMembersRoutes } from "./teams-members-routes";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/sessions", sessionRoutes)
routes.use("/tasks", tasksRoutes)

routes.use(ensureAuthenticated)
routes.use("/teams", teamsRoutes)
routes.use("/teams-members", teamsMembersRoutes)

export {routes}