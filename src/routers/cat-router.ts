import { Request, Response, Router } from "express";
import cats from "../data/cats.json";

const router = Router();

router.get("", (req: Request, res: Response) => {
  res.json(cats);
});

router.get("/:id", (req: Request, res: Response) => {
  const cat = cats.find((item) => item.id === req.params.id);
  cat ? res.json(cat) : res.send(404);
});

export { router };
