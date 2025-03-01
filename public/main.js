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

        // Скрываем меню загрузки после инициализации WebApp
        document.getElementById("loading").style.display = "none";
        // Показываем основной контент
        document.getElementById("content").style.display = "block";
    } else {
        logMessage("Ошибка: WebApp не инициализирован!");
    }
});
