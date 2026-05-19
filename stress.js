const mineflayer = require('mineflayer')

const HOST = 'nova.pikamc.vn'
const PORT = 25010

const BOT_COUNT = 10
const JOIN_DELAY = 3000

const messages = [
  'hello',
  'hi',
  'test',
  'nice server',
  'lag?',
  'gg',
  'wow'
]

function randomName() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let name = ''
  const len = 6 + Math.floor(Math.random() * 5)
  for (let i = 0; i < len; i++) {
    name += chars[Math.floor(Math.random() * chars.length)]
  }
  return name
}

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function createBot(i) {
  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: randomName()
  })

  bot.once('spawn', () => {
    console.log('Bot joined')

    // chat random sau khi vào
    setInterval(() => {
      try {
        bot.chat(rand(messages))
      } catch {}
    }, 20000)

    // đi lại nhẹ
    setInterval(() => {
      try {
        const moves = ['forward', 'back', 'left', 'right']
        const move = rand(moves)

        bot.setControlState(move, true)

        setTimeout(() => {
          bot.setControlState(move, false)
        }, 1000)
      } catch {}
    }, 8000)
  })

  bot.on('end', () => {
    setTimeout(() => createBot(i), 15000)
  })

  bot.on('error', () => {})
  bot.on('kicked', () => {})
}

for (let i = 0; i < BOT_COUNT; i++) {
  setTimeout(() => createBot(i), i * JOIN_DELAY)
}
