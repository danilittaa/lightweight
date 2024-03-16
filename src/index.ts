import express, { Request, Response } from "express";
import cats from "./data/cats.json";

const app = express();
const PORT = 3000;
const BASE_URL = "/cats";

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get(BASE_URL, (req: Request, res: Response) => {
  res.json(cats);
});

app.get(BASE_URL + "/:id", (req: Request, res: Response) => {
  const cat = cats.find((item) => item.id === req.params.id);
  cat ? res.json(cat) : res.send(404);
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
