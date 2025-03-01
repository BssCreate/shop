const express = require('express');
const app = express();
const port = 3000;

// Пример API для получения данных
app.get('/api/user-data', (req, res) => {
    res.json({ message: "Данные успешно загружены!" });
});

// Обработчик 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});


app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Сервер работает на http://localhost:${port}`);
});

