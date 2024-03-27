import { Request, Response, Router } from "express";
import cats from "../data/cats.json";

const router = Router();

const catsArray = cats;

router.get("", (_, res: Response) => {
  res.json(catsArray);
});

router.get("/:id", (req: Request, res: Response) => {
  const cat = catsArray.find((item) => item.id === req.params.id);
  cat ? res.json(cat) : res.send(404);
});

router.post("/", (req: Request, res: Response) => {
  const newCat = req.body;
  catsArray.push(newCat);
  res.status(201).json(newCat);
});

export { router };
