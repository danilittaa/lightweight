import express from "express";
import { router as CatRouter } from "./routers/cat-router";
import morgan from "morgan";

const BASE_CAT_URL = "/cats";
const PORT = 3000;

const app = express();
app.use(morgan("tiny"));
app.use(BASE_CAT_URL, CatRouter);

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
