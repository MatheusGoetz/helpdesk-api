import { Router } from "express"; 
import { SessionsController } from "@/controller/sessions-controller";

const sessionRoutes = Router()
const sessionController = new SessionsController()

sessionRoutes.post("/", sessionController.create)

export { sessionRoutes }