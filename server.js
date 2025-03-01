const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Принимаем данные от клиента
app.post("/api/user-data", (req, res) => {
    console.log("Получены данные от Telegram:", req.body);
    res.json({ status: "ok", received: req.body });
});

app.use(express.static("public")); // Раздаём статику из папки "public"

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
