import express from "express";
import cors from "cors";
import mysql from "mysql";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "todo_db",
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MySQL connected");
    }
});

app.get("/api/todos", (req, res) => {
    const sql = "SELECT * FROM todos";
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.json(result);
    });
});

app.post("/api/todos", (req, res) => {
    const todo = req.body;
    const sql = "INSERT INTO todos SET ?";
    db.query(sql, todo, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.json({ id: result.insertId, ...todo });
    });
});

app.put("/api/todos/:id", (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    const sql = "UPDATE todos SET completed = ? WHERE id = ?";
    db.query(sql, [completed, id], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.json(result);
    });
});

app.delete("/api/todos/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM todos WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.json(result);
    });
});

export default app;