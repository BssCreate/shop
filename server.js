const express = require('express');
const app = express();
const port = 3000;

// Пример API для получения данных
app.get('api/user-data', (req, res) => {
    res.json({ message: "Данные успешно загружены!" });
});

// Обработчик 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// Раздаем статические файлы (если фронтенд хранится в "public")
app.use(express.static(path.join(__dirname, "public")));

// API для получения конфигурации
app.get("api/config", (req, res) => {
    fs.readFile(path.join(__dirname, "config.json"), "utf8", (err, data) => {
        if (err) {
            console.error("Ошибка загрузки config.json:", err);
            return res.status(500).json({ error: "Ошибка загрузки конфигурации" });
        }
        res.json(JSON.parse(data));
    });
});

app.listen(port, () => {
    console.log(`Сервер работает на http://localhost:${port}`);
});

