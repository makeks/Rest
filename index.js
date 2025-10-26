import { createServer } from 'node:http';
import { getAllNotes,createNote, deleteNote } from './db.js';
const hostname = '127.0.0.1';
const port = 3000;
const server = createServer((req, res) => {
    if (req.url ==='/' && req.method === 'GET'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(getAllNotes()))
        return
    }
    if (req.url ==='/notes' && req.method === 'POST'){
        let body = [];
        req.on('data',chunk => body.push(chunk));
        req.on('end',() =>{
        const buffer = Buffer.concat(body)
        const rawDataString = buffer.toString()
        const data = JSON.parse(rawDataString)
        const createdNote = createNote(data)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(createdNote()))
    });
    return 
}
if (req.url ==='/notes' && req.method ==='DELETE'){
            let body = [];
        req.on('data',chunk => body.push(chunk));
        req.on('end',() =>{
        const buffer = Buffer.concat(body)
        const rawDataString = buffer.toString()
        const data = JSON.parse(rawDataString)
        const result = deleteNote(data.id)
        if (!result){
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(status:"Fail"))
            return
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(createdNote()))
    });
}


res.statusCode=404;
res.setHeader('Content-Type', 'application/json');
res.end(JSON.stringify(message:'Page not found'))
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});



