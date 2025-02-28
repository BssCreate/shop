const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // 📌 Добавляем поддержку JSON

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API для аутентификации через Telegram
app.post("/auth", (req, res) => {
    const initData = req.body.initData;

    if (!initData) {
        return res.status(400).json({ error: "Нет данных от Telegram" });
    }

    console.log("Данные от Telegram:", initData);
    res.json({ status: "ok", userId: "получено из initData" });
});

// Обработчик 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
