import { Request, Response, Router } from "express";
import cats from "../data/cats.json";
import sqlite from "sqlite3";
import { error } from "console";

const router = Router();

const catsArray = cats;

const DB_SOURCE = "db.sqlite";
let db = new sqlite.Database(DB_SOURCE, (err) => {
  if (err) {
    console.error("Connection failed: ", err.message);
    throw err;
  } else {
    console.log("Connection to DB established");
    db.run(
      `CREATE TABLE cat (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name text,
                    age integer,
                    breed text
                )`,
      (err) => {
        // console.log("inserting...")
        // const insert =  `INSERT INTO cat (name, age, breed) VALUES (?, ?, ?)`;
        // db.run(insert, ["Maeve", 3, "british"]);
        // console.log("insertion complete")
      }
    );
  }
});

router.get("", (_, res: Response) => {
  db.all("select * from cat", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "success", data: rows });
    }
  });
});

router.get("/:id", (req: Request, res: Response) => {
  db.get("select * from cat where id = ?", [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.send(404);
    } else {
      res.json({ message: "success", data: row });
    }
  });
});

router.post("/", (req: Request, res: Response) => {
  db.run(
    "insert into cat (name, age, breed) values (?, ?, ?)",
    [req.body.name, req.body.age, req.body.breed],
    function (this: sqlite.RunResult, err: Error) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({
          message: "success",
          data: req.body,
          id: this.lastID,
        });
      }
    }
  );
});

router.patch("/:id", (req: Request, res: Response) => {
  db.run(
    "update cat set name = coalesce(?, name), age = coalesce(?, age), breed = coalesce(?, breed) where id = ?",
    [req.body.name, req.body.breed, req.body.age, req.params.id],
    function (this: sqlite.RunResult, err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({
          message: "success",
          data: req.body,
          changes: this.changes,
        });
      }
    }
  );
});

router.delete("/:id", (req: Request, res: Response) => {
  db.run("delete from cat where id = ?", [req.params.id], function (this, err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "deleted", changes: this.changes });
    }
  });
});

export { router };
