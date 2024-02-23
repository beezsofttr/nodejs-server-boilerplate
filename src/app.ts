import { beeServer } from './libs';

const app = async () => {
  console.log('[NETWORK APP]\tSTARTING');
  // await prisma.$connect();
  console.log('[POSTGRESQL]\tSuccessfully connected to the database');

  await beeServer();
};

app()
  .then(async () => console.log('[NETWORK APP]\tSTARTED'))
  .catch((err) => {
    console.error(`[NETWORK APP]\tNOT STARTED ${err}`);

    process.exit();
  });
