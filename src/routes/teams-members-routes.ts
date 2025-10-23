import { Router } from "express";
import { TeamsMembersController } from "@/controller/teams-members-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const teamsMembersRoutes = Router()
const teamsMembersController = new TeamsMembersController()

teamsMembersRoutes.post("/", ensureAuthenticated, verifyUserAuthorization(["admin"]), teamsMembersController.addMember)
teamsMembersRoutes.get("/:id", ensureAuthenticated,verifyUserAuthorization(["admin"]), teamsMembersController.show)
teamsMembersRoutes.put("/:id", ensureAuthenticated, verifyUserAuthorization(["admin"]), teamsMembersController.updateTeam)
teamsMembersRoutes.delete("/:id", ensureAuthenticated, verifyUserAuthorization(["admin"]), teamsMembersController.removeMember)

export { teamsMembersRoutes }