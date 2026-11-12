import express from 'express';
import { WebcastPushConnection } from 'tiktok-live-connector';
const app=express();
app.disable('x-powered-by');
const port=Number(process.env.PORT||3000);
const room=(process.env.TIKTOK_ROOM||'').replace(/^@/,'').trim();
const listeners=new Set();
let status='disconnected', error='', client;
function send(obj){const line='data: '+JSON.stringify(obj)+'\n\n';for(const res of listeners){try{res.write(line)}catch{listeners.delete(res)}}}
app.get('/health',(_req,res)=>res.json({status,room:room?'configured':'missing',error}));
app.get('/events',(req,res)=>{
 res.setHeader('Content-Type','text/event-stream');
 res.setHeader('Cache-Control','no-cache');
 res.setHeader('Connection','keep-alive');
 res.flushHeaders();
 listeners.add(res);
 res.write('data: '+JSON.stringify({type:'status',status})+'\n\n');
 const timer=setInterval(()=>res.write(': keepalive\n\n'),25000);
 req.on('close',()=>{clearInterval(timer);listeners.delete(res)});
});
app.get('/',(_req,res)=>res.type('text').send('LIVE AI BOT server: read-only TikTok LIVE monitor. /health /events'));
if(room){
 client=new WebcastPushConnection(room);
 client.on('chat',data=>send({type:'chat',user:data.uniqueId||'',nickname:data.nickname||'',text:data.comment||'',timestamp:Date.now()}));
 client.on('streamEnd',()=>{status='ended';send({type:'status',status})});
 client.on('disconnected',()=>{status='disconnected';send({type:'status',status})});
 const connect=async()=>{try{await client.connect();status='connected';error='';send({type:'status',status})}catch(e){status='error';error=String(e?.message||e).slice(0,250);send({type:'status',status,error})}};
 connect();
 setInterval(()=>{if(status!=='connected')connect()},60000);
}
app.listen(port,'0.0.0.0',()=>console.log('Listening on '+port));
