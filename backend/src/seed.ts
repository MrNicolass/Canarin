// backend/src/seed.ts

import { PrismaClient } from '../generated/prisma';

// Inicializa o Prisma Client
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // --- 1. Criar um UserType ---
  // Primeiro, garantimos que o tipo de utilizador "Passageiro" existe.
  const passengerUserType = await prisma.userType.upsert({
    where: { id: 1 }, // Podemos usar um ID fixo para o tipo de utilizador
    update: {},
    create: {
      id: 1, // Definimos o ID como 1 para consistência
      userType: 'Passageiro',
    },
  });
  console.log('Created UserType:', passengerUserType);

  // --- 2. Criar um User de Teste ---
  // Agora, criamos um utilizador de teste associado ao tipo "Passageiro".
  const testUser = await prisma.user.create({
    data: {
      login: 'teste@canarin.com',
      password: 'password123', // Em um projeto real, isto seria encriptado
      userTypeId: passengerUserType.id, // Associa ao UserType que criámos
      active: true,
    },
  });

  console.log('Created test user:', testUser);
  console.log(`Seeding finished. Use o ID: ${testUser.id} no seu frontend.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    // Fecha a conexão com a base de dados
    void prisma.$disconnect();
  });
