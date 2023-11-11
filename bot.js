const TelegramBot = require("node-telegram-bot-api");

const token = "6245599366:AAGrPUIm6qbOAOe0EcLa5K20YEEDA6MIzsE"; // Замените на свой токен
const bot = new TelegramBot(token, { polling: true });

// Функция для отправки сообщения с кнопками
function sendWelcomeMessage(chatId) {
  const welcomeMessage = "Let's go";

  const keyboard = {
    inline_keyboard: [
      [{ text: "Город 🏙️", callback_data: "city" }],
      [{ text: "Карта 🗺️", callback_data: "map" }],
      [{ text: "Обучение 📹", callback_data: "training" }],
    ],
  };

  // Увеличиваем размер кнопок на 50%
  keyboard.inline_keyboard.forEach((row) => {
    row.forEach((button) => {
      button.text = button.text + "  "; // добавляем пробелы
    });
  });

  return { text: welcomeMessage, reply_markup: keyboard };
}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = sendWelcomeMessage(chatId);
  bot.sendMessage(chatId, welcomeMessage.text, {
    reply_markup: welcomeMessage.reply_markup,
  });
});

bot.on("new_chat_members", (msg) => {
  const chatId = msg.chat.id;
  const newMembers = msg.new_chat_members
    .map((member) => member.first_name)
    .join(", ");

  const welcomeMessage = sendWelcomeMessage(chatId);
  bot.sendMessage(
    chatId,
    `Добро пожаловать, ${newMembers}! Я ваш бот для получения информации.`,
    { reply_markup: welcomeMessage.reply_markup }
  );
});

bot.on("callback_query", (callbackQuery) => {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const chatId = msg.chat.id;

  switch (action) {
    case "city":
      bot.sendMessage(chatId, "https://t.me/bayernball_too/5");
      break;
    case "map":
      bot.sendMessage(chatId, " https://t.me/bayernball_too/4");
      break;
    case "training":
      bot.sendMessage(chatId, "https://t.me/bayernball_too/17");
      break;
  }
});
