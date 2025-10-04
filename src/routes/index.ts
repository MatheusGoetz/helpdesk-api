import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { teamsRoutes } from "./teams-routes";
import { sessionRoutes } from "./sessions-routes";
import { teamsMembersRoutes } from "./teams-members-routes";

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/sessions", sessionRoutes)
routes.use("/teams", teamsRoutes)
routes.use("/teams-members", teamsMembersRoutes)

export {routes}