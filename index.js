
const TelegramApi = require('node-telegram-bot-api')

const token = '6173931314:AAFF6a-OMv7RSRxFEPU4C8cXES5cJGuITes'

const bot = new TelegramApi(token, {polling:true})


//создадим объект,который как ключи содержит id чата,а как значение- загаданное ботом число
const chats = {}


//Массив кнопок
const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
            [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],
            [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],
            [{text: '0', callback_data: '0'}],
            ]

    })
}


const start = () => {
    bot.setMyCommands([
        {command:'/start', description: 'Начальное приветствие'},
        {command:'/info', description: 'Получить информацию о пользователе'},
        {command:'/game', description: 'Игра угадай цифру'},
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/start'){
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ac7/5e3/ac75e3f5-5369-3e8b-bc19-d61a67d43bd8/5.webp')
            return  bot.sendMessage(chatId, `Добро пожаловать`)
        }
        if (text === '/info'){
            return  bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`)
        }
        if (text === '/game'){
            await  bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать!`);
            const randomNumber = Math.floor(Math.random() * 10);
            chats[chatId] = randomNumber
            return bot.sendMessage(chatId,'Отгадывай', gameOptions);
        }

        return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!')
    })
    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        bot.sendMessage(chatId, `Ты выбрал цифру ${data}`)
    })

}
start()