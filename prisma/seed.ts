import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.user.createMany({
    data: [
      {
        email: 'arslan@idevnerds.com',
        password: '111',
        type: 'user',
        token: 0,
      },
      { email: 'usman@idevnerds.com', password: '111', type: 'user', token: 0 },
      {
        email: 'admin@idevnerds.com',
        password: '111',
        type: 'admin',
        token: 0,
      },
    ],
  });
  await prisma.route.createMany({
    data: [
      { title: '/consume10Token', cost: 10 },
      { title: '/consume20Token', cost: 20 },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
