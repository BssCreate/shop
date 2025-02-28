const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

fetch("/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ initData: tg.initData })
})
.then(response => response.json())
.then(data => console.log("Ответ сервера:", data));

app.post("/auth", (req, res) => {
    const initData = req.body.initData;
    console.log("Данные от Telegram:", initData);

    res.json({ status: "ok", userId: "получено из initData" });
});

// Обработчик 404 (если страница не найдена)
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
