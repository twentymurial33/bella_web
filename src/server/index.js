const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());


let vaccines = [
    { id: 1, name: "Rabies", price: 12.99 },
    { id: 2, name: "Leptospirosis", price: 10.99},
];

// Get all vaccines
app.get("/api/vaccines", (req, res) => {
    res.json(vaccines);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});