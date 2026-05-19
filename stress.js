const mineflayer = require('mineflayer')

const HOST = 'nova.pikamc.vn'
const PORT = 25010

const TOTAL_BOTS = 20
const JOIN_DELAY = 1200

function randomPassword(len = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let p = ''
  for (let i = 0; i < len; i++) {
    p += chars[Math.floor(Math.random() * chars.length)]
  }
  return p
}

function createBot(id) {
  const username = `Bot${id}`
  const password = randomPassword()

  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username
  })

  bot.once('spawn', () => {
    setTimeout(() => {
      try {
        bot.chat(`/register ${password} ${password}`)
      } catch {}
    }, 3000)

    setTimeout(() => {
      try {
        bot.chat(`/login ${password}`)
      } catch {}
    }, 6000)
  })

  bot.on('end', () => {
    setTimeout(() => createBot(id), 20000)
  })

  bot.on('error', () => {})
  bot.on('kicked', () => {})
}

for (let i = 0; i < TOTAL_BOTS; i++) {
  setTimeout(() => createBot(i), i * JOIN_DELAY)
}
