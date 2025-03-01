function logMessage(message) {
    document.getElementById("log").innerText += message + "\n";
}

document.addEventListener("DOMContentLoaded", () => {
    logMessage("Загрузка WebApp...");
    
    if (!window.Telegram) {
        logMessage("Ошибка: window.Telegram НЕ найден!");
        return;
    }

    logMessage("Telegram SDK загружен.");
    
    const tg = window.Telegram.WebApp;
    
    if (!tg || !tg.initDataUnsafe) {
        logMessage("Ошибка: WebApp НЕ запущен в Telegram! Перенаправление...");
        window.location.href = "https://t.me/Petition_jp_Bot?start=openonlytelegram";
        return;
    }

    logMessage("WebApp успешно запущен в Telegram!");
    document.getElementById("loading").style.display = "none";
});

    
    // Имитация загрузки (2 сек.)
    setTimeout(() => {
        document.getElementById("loading").style.display = "none";
        document.getElementById("content").style.display = "block";

        tg.expand();

        const userData = {
            id: tg.initDataUnsafe.user.id,
            first_name: tg.initDataUnsafe.user.first_name,
            last_name: tg.initDataUnsafe.user.last_name || "Неизвестно",
            username: tg.initDataUnsafe.user.username || "Неизвестно",
            lang: tg.initDataUnsafe.user.language_code || "Неизвестно",
        };

        console.log("Данные пользователя:", userData);

        document.getElementById("user-data").innerText = JSON.stringify(userData, null, 2);

        fetch("https://myshoptg.vercel.app/api/user-data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        })
        .then(response => response.json())
        .then(data => console.log("Ответ сервера:", data))
        .catch(error => console.error("Ошибка запроса:", error));

    }, 2000);
});
