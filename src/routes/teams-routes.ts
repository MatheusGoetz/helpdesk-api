import { Router } from "express";
import { TeamsController } from "@/controller/teams-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const teamsRoutes = Router()
const teamsController = new TeamsController()

teamsRoutes.post("/", ensureAuthenticated, verifyUserAuthorization(["admin"]), teamsController.create)
teamsRoutes.get("/", teamsController.index)
teamsRoutes.put("/:id", ensureAuthenticated, verifyUserAuthorization(["admin"]), teamsController.update)
teamsRoutes.delete("/:id", ensureAuthenticated, verifyUserAuthorization(["admin"]), teamsController.remove)

export { teamsRoutes }