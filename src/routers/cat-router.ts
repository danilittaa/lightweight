import { Request, Response, Router } from "express";
import cats from "../data/cats.json";
import sqlite from "sqlite3";

const router = Router();

const catsArray = cats;

const DB_SOURCE = "db.sqlite";
let db = new sqlite.Database(
    DB_SOURCE,
    (err) => {
      if(err){
        console.error("Connection failed: ", err.message);
        throw err;
      } else {
        console.log("Connection to DB established");
        db.run(`CREATE TABLE cat (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name text,
                    age integer,
                    breed text
                )`, (err) => {
                    // console.log("inserting...")
                    // const insert =  `INSERT INTO cat (name, age, breed) VALUES (?, ?, ?)`;
                    // db.run(insert, ["Maeve", 3, "british"]);
                    // console.log("insertion complete")
                    }
                )
      }
    }
);

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
