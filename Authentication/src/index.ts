import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors())
app.use(express.json());

app.post("/deploy", async (req, res) => {
    const repoUrl = req.body.repoUrl;
});

app.get("/", (req, res) => {
    console.log("Welcome to Residentron");
    res.send("Welcome to Residentron");
});

app.listen(3000);