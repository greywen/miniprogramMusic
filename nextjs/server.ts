import { createServer } from 'http';
import next from 'next';
import express from 'express';
import fileRoutes from './routes/fileRoutes';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use('/files', fileRoutes);
  server.get('*', (req, res) => {
    return handle(req, res);
  });
  createServer(server).listen(port);
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  );
});
