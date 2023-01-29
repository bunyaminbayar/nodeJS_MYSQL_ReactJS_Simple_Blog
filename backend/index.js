import express from "express";
import mysql from "mysql";
import cors from "cors";


const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sigma"
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("this is from backend");
})

app.get("/blogs", (req, res) => {
    const q = "SELECT * FROM blogs"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
});

app.post("/blogs", (req, res) => {
    const q = "INSERT INTO blogs (`desc`, `title`, `connicallink`, `img`, `content`, `extra`) VALUES (?)";
    const values = [
        req.body.desc,
        req.body.title,
        req.body.connicallink,
        req.body.img,
        req.body.content,
        req.body.extra
    ];
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.delete("/blogs/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM blogs WHERE id = ?";
    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been deleted successfully.");
    });
});

app.put("/blogs/:id", (req, res) => {
const bookId = req.params.id;
    const q = "UPDATE blogs SET `desc`= ?, `title`= ?, `connicallink`= ?, `img`= ?, `content`= ?, `extra`= ? WHERE id = ?";
    const values = [
        req.body.desc,
        req.body.title,
        req.body.connicallink,
        req.body.img,
        req.body.content,
        req.body.extra
    ] 
    db.query(q, [...values,bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been updated successfully.");
    });
});

app.listen(8888, () => {
    console.log("connects data");
})