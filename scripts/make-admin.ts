import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function makeAdmin(email: string) {
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' },
    });
    console.log(`✅ Successfully updated ${user.email} to ADMIN role`);
  } catch (error: any) {
    if (error.code === 'P2025') {
      console.error(`❌ User with email "${email}" not found`);
    } else {
      console.error('❌ Error:', error.message);
    }
  } finally {
    await prisma.$disconnect();
  }
}

// Get email from command line argument
const email = process.argv[2];

if (!email) {
  console.error('❌ Please provide an email address');
  console.log('Usage: npx tsx scripts/make-admin.ts <email>');
  process.exit(1);
}

makeAdmin(email);

