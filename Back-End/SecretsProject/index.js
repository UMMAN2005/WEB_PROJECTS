import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

//The password is ILoveProgramming

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/check", (req, res) => {
    const password = req.body.password;
    if (password === "ILoveProgramming") {
        res.sendFile(__dirname + "/public/secret.html");
    } else {
        res.redirect("/");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});