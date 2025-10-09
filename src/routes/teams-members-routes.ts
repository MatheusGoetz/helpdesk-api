import { Router } from "express";
import { TeamsMembersController } from "@/controller/teams-members-controller";

const teamsMembersRoutes = Router()
const teamsMembersController = new TeamsMembersController()

teamsMembersRoutes.post("/", teamsMembersController.addMember)

export { teamsMembersRoutes }