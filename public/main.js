function logMessage(message) {
    console.log(message);
    const logElement = document.getElementById("log");
    if (logElement) {
        logElement.innerHTML += message + "<br>";
    }
}

// Функция загрузки данных (эмуляция запроса к серверу)
async function loadData() {
    try {
        const response = await fetch("/api/user-data");
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        logMessage("Ошибка при загрузке данных: " + error.message);
        return { message: "Ошибка загрузки данных" };
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    logMessage("Загрузка WebApp...");

    const loadingScreen = document.getElementById("loading");
    const contentScreen = document.getElementById("content");

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
        const user = tg.initDataUnsafe?.user;
        if (user) {
            logMessage(`Пользователь: ${user.first_name} ${user.last_name || ""} (@${user.username || "Нет"})`);
            document.getElementById("userData").innerHTML = `
                <p><strong>Имя:</strong> ${user.first_name} ${user.last_name || ""}</p>
                <p><strong>Username:</strong> @${user.username || "Нет"}</p>
                <p><strong>ID:</strong> ${user.id}</p>
            `;
        } else {
            logMessage("Ошибка: данные пользователя не получены.");
            document.getElementById("userData").innerHTML = "<p>Не удалось загрузить данные профиля.</p>";
        }

        // Загружаем данные с сервера
        try {
            const data = await loadData();
            logMessage("Данные загружены: " + JSON.stringify(data));

            // Скрываем экран загрузки и показываем контент
            if (loadingScreen) loadingScreen.style.display = "none";
            if (contentScreen) contentScreen.style.display = "block";
        } catch (error) {
            logMessage("Ошибка загрузки данных: " + error.message);
        }
    } else {
        logMessage("Ошибка: WebApp не инициализирован!");
    }
});
