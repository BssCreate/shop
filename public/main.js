function logMessage(message) {
    const logElement = document.getElementById("log");
    if (logElement) {
        logElement.innerText += message + "\n";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    logMessage("Загрузка WebApp...");
    
    if (!window.Telegram) {
        logMessage("Ошибка: Telegram SDK не загружен!");
        return;
    }

    logMessage("Telegram SDK загружен.");
    
    const tg = window.Telegram.WebApp;

    if (tg) {
        logMessage("WebApp инициализирован.");
        tg.expand(); // Разворачиваем WebApp на весь экран

        // Симуляция загрузки данных
        loadData().then(data => {
            logMessage("Данные загружены: " + JSON.stringify(data));

            // Скрываем меню загрузки и показываем основной контент
            document.getElementById("loading").style.display = "none";
            document.getElementById("content").style.display = "block";
        }).catch(error => {
            logMessage("Ошибка при загрузке данных: " + error);
        });
    } else {
        logMessage("Ошибка: WebApp не инициализирован!");
    }
});

// Функция для загрузки данных
async function loadData() {
    const response = await fetch("https://myshoptg.vercel.app/api/user-data"); // Пример запроса на сервер
    if (!response.ok) {
        throw new Error('Ошибка загрузки данных с сервера');
    }
    return response.json(); // Возвращаем полученные данные
}
