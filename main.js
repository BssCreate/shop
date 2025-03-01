document.addEventListener("DOMContentLoaded", () => {
    console.log("Загрузка началась...");

    const tg = window.Telegram.WebApp;

    if (!tg.initDataUnsafe || !tg.initDataUnsafe.user) {
        console.error("Не в Telegram! Перенаправляем...");
        window.location.href = "https://t.me/Petition_jp_Bot?start=openonlytelegram";
        return;
    }

    console.log("Запущено внутри Telegram WebApp");
    
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

        fetch("/api/user-data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        })
        .then(response => response.json())
        .then(data => console.log("Ответ сервера:", data))
        .catch(error => console.error("Ошибка запроса:", error));

    }, 2000);
});
