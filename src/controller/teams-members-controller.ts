import { Request, Response } from "express";
import { z } from "zod"

class TeamsMembersController {
  async index(req: Request, res: Response){
    return res.json("Membros dos times OK!")
  }
}

export { TeamsMembersController }