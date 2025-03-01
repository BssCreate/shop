document.addEventListener("DOMContentLoaded", () => {
    const tg = window.Telegram?.WebApp;
    
    if (!tg) {
        document.body.innerHTML = "<h2>Ошибка: Telegram WebApp недоступен</h2>";
        return;
    }

    tg.expand(); // Разворачиваем WebApp

    // Проверяем, есть ли initDataUnsafe
    if (!tg.initData || !tg.initDataUnsafe) {
        document.body.innerHTML = "<h2>Ошибка: initData не передан в WebApp</h2>";
        return;
    }

    // Получаем данные пользователя
    const user = tg.initDataUnsafe.user;

    if (user) {
        document.body.innerHTML = `
            <h2>Данные пользователя</h2>
            <p><strong>Имя:</strong> ${user.first_name} ${user.last_name || ""}</p>
            <p><strong>Username:</strong> @${user.username || "Нет"}</p>
            <p><strong>ID:</strong> ${user.id}</p>
        `;
    } else {
        document.body.innerHTML = `<h2>Ошибка: Telegram не передал данные пользователя.</h2>
        <p>Попробуй открыть WebApp через команду бота.</p>`;
    }
});
