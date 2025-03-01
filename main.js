document.addEventListener("DOMContentLoaded", () => {
    const tg = window.Telegram.WebApp;

    // Проверка среды запуска
    if (!tg.initDataUnsafe || !tg.initDataUnsafe.user) {
        window.location.href = "https://t.me/Petition_jp_Bot?start=openonlytelegram";
        return;
    }

    // Имитация загрузки (2 секунды)
    setTimeout(() => {
        document.getElementById("loading").style.display = "none";
        document.getElementById("content").style.display = "block";

        tg.expand(); // Разворачиваем WebApp

        const userData = {
            id: tg.initDataUnsafe.user.id,
            first_name: tg.initDataUnsafe.user.first_name,
            last_name: tg.initDataUnsafe.user.last_name || "Неизвестно",
            username: tg.initDataUnsafe.user.username || "Неизвестно",
            lang: tg.initDataUnsafe.user.language_code || "Неизвестно",
        };

        document.getElementById("user-data").innerText = JSON.stringify(userData, null, 2);

        // Отправляем данные на сервер
        fetch("/api/user-data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        })
        .then(response => response.json())
        .then(data => console.log("Ответ сервера:", data))
        .catch(error => console.error("Ошибка:", error));

    }, 2000);
});
