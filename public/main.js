document.addEventListener("DOMContentLoaded", () => {
    const tg = window.Telegram?.WebApp;

    if (!tg) {
        console.error("Ошибка: Telegram SDK не загружен!");
        redirectToBot();
        return;
    }

    tg.expand(); // Разворачиваем WebApp

    // Показываем экран загрузки
    document.body.innerHTML = "<h2>Загрузка...</h2>";

    setTimeout(() => {
        const user = tg.initDataUnsafe?.user;

        if (user) {
            document.body.innerHTML = `
                <h2>Данные пользователя</h2>
                <p><strong>Имя:</strong> ${user.first_name} ${user.last_name || ""}</p>
                <p><strong>Username:</strong> @${user.username || "Нет"}</p>
                <p><strong>ID:</strong> ${user.id}</p>
            `;
        } else {
            console.error("Ошибка: Telegram не передал данные пользователя.");
            redirectToBot();
        }
    }, 2000); // Имитируем задержку загрузки 2 секунды
});

// Функция для перенаправления в бота
function redirectToBot() {
    window.location.href = "https://t.me/Petition_jp_Bot?start=start";
}
