require('node-env-file')(`${__dirname}/.env`);

const createServer = require('./src/server');

const start = async () => {
  const server = await createServer(
    {
      port: process.env.PORT,
      host: process.env.HOST,
    },
    {
      enableSSL: process.env.SSL === 'true',
    }
  );

  server.app.fakeDb = {};

  await server.start();

  console.log(`Server running at: ${server.info.uri}`);
  console.log(`Server docs running at: ${server.info.uri}/docs`);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

start();
