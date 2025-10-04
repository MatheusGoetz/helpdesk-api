import { Router } from "express";
import { TeamsMembersController } from "@/controller/teams-members-controller";

const teamsMembersRoutes = Router()
const teamsMembersController = new TeamsMembersController()

teamsMembersRoutes.get("/", teamsMembersController.index)

export { teamsMembersRoutes }