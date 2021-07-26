import { createServer, request } from "http";
import { readFile } from "fs";
import { resolve } from "path";
import { parse } from "querystring";

const server = createServer( (request,response) => {
    switch (request.url) {
        case "/status": {
            response.writeHead(200,{
                "content-type": "application/json",
            });
            response.write(JSON.stringify({
                status: "ok",
            }));
            response.end();
            break;
        }


        case "/home": {
            const path = resolve(__dirname,'./pages/home.html');
            readFile( path, (error,file) => {
                if(error) {
                    response.writeHead(500, 'Can\'t process HTML file');
                    response.end();
                    return;
                }
                response.writeHead(200);
                response.write(file);
                response.end();
                // return;
            });
            break;
        }


        case "/sign-in": {
            const path = resolve(__dirname,'./pages/sign-in.html');
            readFile( path, (error,file) => {
                if(error) {
                    response.writeHead(500, 'Can\'t process HTML file');
                    response.end();
                    return;
                }
                response.writeHead(200);
                response.write(file);
                response.end();
            });
            break;
        }
    
        case "/authenticate": {
            let data = '';
            request.on('data', (chunk) => {
                data += chunk;
            });
            request.on('end', () => {
                const params = parse(data);
                response.writeHead(301,{
                    Location: '/home'
                });
                response.end();
                return;
            });
            break;
        }
    
        default: {
            response.writeHead(404, 'Service not found');
            response.end();
        }
    }

});

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 9002;
const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server is listening at http://${HOSTNAME}:${PORT}`);
});