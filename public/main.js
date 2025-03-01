function logMessage(message) {
    console.log(message);
    const logElement = document.getElementById("log");
    if (logElement) {
        logElement.innerHTML += message + "<br>";
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

        // Получаем данные пользователя из Telegram
        const user = tg.initDataUnsafe.user;
        if (user) {
            logMessage(`Пользователь: ${user.first_name} ${user.last_name || ""} (@${user.username})`);
            document.getElementById("userData").innerHTML = `
                <p><strong>Имя:</strong> ${user.first_name} ${user.last_name || ""}</p>
                <p><strong>Username:</strong> @${user.username || "Нет"}</p>
                <p><strong>ID:</strong> ${user.id}</p>
            `;
        } else {
            logMessage("Ошибка: данные пользователя не получены.");
            document.getElementById("userData").innerHTML = "<p>Не удалось загрузить данные профиля.</p>";
        }

        // Загрузка данных (например, с сервера)
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
