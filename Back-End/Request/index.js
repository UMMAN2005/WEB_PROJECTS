import express from "express";
const app = express();
const port = 3000;
const filePath = "C:\\Users\\user\\Desktop\\Resources\\Angela Yu Web Development Bootcamp\\Express.js\\public\\index.html"

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Hello, world!");
});
app.get('/register', (req, res) => {
    res.sendFile(filePath);
});

app.post('/generate', (req, res) => {
    console.log(req.body);
    res.send(`<h1>Your band name is:</h1><br><h3>${req.body.streetName} ${req.body.petName}</h3>`)
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});