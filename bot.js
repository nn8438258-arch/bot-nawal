const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
const fs = require("fs")

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth')
  const sock = makeWASocket({ auth: state })
  sock.ev.on('creds.update', saveCreds)
  
  sock.ev.on('messages.upsert', async m => {
    const msg = m.messages[0]
    if (!msg.message || msg.key.fromMe) return
    let text = msg.message.conversation || msg.message.extendedTextMessage?.text || ""
    
    if (text.startsWith("كتاب")) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `تفضلي يا نوال 📚\n\nBY | نوال اليقين` 
      })
    }
  })
}
startBot()
