import { Request, Response } from "express";

class SessionsController {
  create(req: Request, res: Response){
    return res.json({message: "Ok!"})
  }
}

export {SessionsController}