import { Router } from "express";
import { TeamsController } from "@/controller/teams-controller";

const teamsRoutes = Router()
const teamsController = new TeamsController()

teamsRoutes.post("/", teamsController.create)

export { teamsRoutes }