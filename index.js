
const TelegramApi = require('node-telegram-bot-api')

const token = '6173931314:AAFF6a-OMv7RSRxFEPU4C8cXES5cJGuITes'

const bot = new TelegramApi(token, {polling:true})

const start = () => {
    bot.setMyCommands([
        {command:'/start', description: 'Начальное приветствие'},
        {command:'/info', description: 'Получить информацию о пользователе'},
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
            return  bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать!`)
        }

        return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!')
    })
}
start()