document.addEventListener("DOMContentLoaded", () => {
    const tg = window.Telegram.WebApp;
    
    if (!tg) {
        console.error("Ошибка: Telegram SDK не загружен!");
        document.body.innerHTML = "<h2>Ошибка: Telegram WebApp недоступен</h2>";
        return;
    }

    tg.expand(); // Разворачиваем WebApp

    // Получаем данные пользователя
    const user = tg.initDataUnsafe?.user;

    if (user) {
        document.body.innerHTML = `
            <h2>Данные пользователя</h2>
            <p><strong>Имя:</strong> ${user.first_name} ${user.last_name || ""}</p>
            <p><strong>Username:</strong> @${user.username || "Нет"}</p>
            <p><strong>ID:</strong> ${user.id}</p>
        `;
    } else {
        document.body.innerHTML = "<h2>Ошибка: данные пользователя не получены.</h2>";
    }
});
