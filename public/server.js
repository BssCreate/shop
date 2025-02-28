const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Раздача статических файлов (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Обработчик главной страницы
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
