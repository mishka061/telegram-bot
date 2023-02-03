
const TelegramApi = require('node-telegram-bot-api')

const token = '6173931314:AAFF6a-OMv7RSRxFEPU4C8cXES5cJGuITes'

const bot = new TelegramApi(token, {polling:true})


//создадим объект,который как ключи содержит id чата,а как значение- загаданное ботом число
const chats = {}




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
            return bot.sendMessage(chatId,'Отгадывай');
        }

        return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!')
    })
}
start()