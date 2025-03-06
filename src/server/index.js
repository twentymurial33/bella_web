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

app.get("/api/vaccines", (req, res) => {
    res.json(vaccines);
});

app.get("/api/vaccines/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const vaccine = vaccines.find(v => v.id === id);
    if (vaccine) {
        res.json(vaccine);
    } else {
        res.status(404).json({ error: "Vaccine not found" });
    }
});

app.post("/api/vaccines", (req, res) => {
    const vaccine = req.body;
    if (vaccine.name && vaccine.price) {
        vaccines.push(vaccine);
        res.json(vaccine);
    } else {
        res.status(400).json({ error: "Invalid vaccine" });
    }
});

app.put("/api/vaccines/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const vaccine = req.body;
    if (vaccine.name && vaccine.price) {
        const index = vaccines.findIndex(v => v.id === id);
        if (index !== -1) {
            vaccines[index] = vaccine;
            res.json(vaccine);
        } else {
            res.status(404).json({ error: "Vaccine not found" });
        }
    } else {
        res.status(400).json({ error: "Invalid vaccine" });
    }
});

app.delete("/api/vaccines/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = vaccines.findIndex(v => v.id === id);
    if (index !== -1) {
        vaccines.splice(index, 1);
        res.json({ message: "Vaccine deleted" });
    } else {
        res.status(404).json({ error: "Vaccine not found" });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});