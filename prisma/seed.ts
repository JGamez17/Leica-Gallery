import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'admin@leica-gallery.com' },
    update: {},
    create: {
      id: 'temp-user-id',
      email: 'admin@leica-gallery.com',
      name: 'Jess',
    },
  });
  console.log('Seeded user:', user);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());