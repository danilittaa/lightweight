import express, { Response } from "express";
import { router as CatRouter } from "./routers/cat-router";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";
import cats from "./data/cats.json";

const BASE_CAT_URL = "/cats";
const PORT = 3000;

const app = express();
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(BASE_CAT_URL, CatRouter);

app.get("/", (_, res: Response) => {
  res.render("index", { cats });
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
