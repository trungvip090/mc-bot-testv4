const mineflayer = require('mineflayer')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function ask(q) {
  return new Promise(res => rl.question(q, ans => res(ans)))
}

function randomName() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let n = ''
  const len = 6 + Math.floor(Math.random() * 5)
  for (let i = 0; i < len; i++) {
    n += chars[Math.floor(Math.random() * chars.length)]
  }
  return n
}

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

async function start() {
  const host = await ask('IP server: ')
  const port = parseInt(await ask('Port: '))
  const count = parseInt(await ask('Số player: '))

  console.log('\nStarting safe test...\n')

  function create(i) {
    const bot = mineflayer.createBot({
      host,
      port,
      username: randomName()
    })

    bot.once('spawn', () => {
      console.log('joined')

      // chat nhẹ (1 lần)
      setTimeout(() => {
        try { bot.chat('test') } catch {}
      }, 5000)

      // move nhẹ (ít tốn CPU)
      setInterval(() => {
        try {
          const moves = ['forward', 'back', 'left', 'right']
          const m = rand(moves)

          bot.setControlState(m, true)
          setTimeout(() => bot.setControlState(m, false), 800)
        } catch {}
      }, 10000)
    })

    bot.on('end', () => {
      setTimeout(() => create(i), 20000)
    })

    bot.on('error', () => {})
    bot.on('kicked', () => {})
  }

  // JOIN SLOW (giảm ECONNRESET)
  for (let i = 0; i < count; i++) {
    setTimeout(() => create(i), i * 3000)
  }
}

start()
