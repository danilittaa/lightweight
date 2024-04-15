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

const findMostPopularBreed = () => {
  const result: Record<string, number> = {};
  for (let i = 0; i < cats.length; i++) {
    if (!result[cats[i].breed]) {
      result[cats[i].breed] = 1;
    } else if (result[cats[i].breed]) {
      result[cats[i].breed] += 1;
    }
  }

  let maxCatCount = 0;
  let mostPopularBreed = "";

  for (const breed in result) {
    if (result[breed] > maxCatCount) {
      maxCatCount = result[breed];
      mostPopularBreed = breed;
    }
  }
  return mostPopularBreed;
};

app.get("/", (_, res: Response) => {
  res.render("index", { cats, breed: findMostPopularBreed() });
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
