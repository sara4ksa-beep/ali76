import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const email = process.argv[2] || 'admin@saudiproductsmarket.com';
    const password = process.argv[3] || 'admin123';
    const name = process.argv[4] || 'Admin User';

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      // Update existing user to admin
      const updatedUser = await prisma.user.update({
        where: { email },
        data: { role: 'ADMIN' },
      });
      console.log(`✅ User ${email} already exists. Updated to ADMIN role.`);
      console.log(`📧 Email: ${email}`);
      console.log(`🔑 Password: ${password}`);
      await prisma.$disconnect();
      return;
    }

    // Create new admin user
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'ADMIN',
      }
    });

    // Create cart for the user
    await prisma.cart.create({
      data: {
        userId: user.id
      }
    });

    console.log('✅ Admin user created successfully!');
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log(`👤 Name: ${name}`);
    console.log('\nYou can now login at http://localhost:3000/login');
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();


