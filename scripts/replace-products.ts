import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const replacementProducts = [
  {
    name: 'Perfume Collection Set',
    nameAr: 'مجموعة عطور',
    description: 'Luxury perfume collection with 3 different fragrances. Long-lasting scents perfect for any occasion. Elegant packaging included.',
    descriptionAr: 'مجموعة عطور فاخرة مع 3 عطور مختلفة. روائح طويلة الأمد مثالية لأي مناسبة. يتضمن تغليف أنيق.',
    price: 149.99,
    stock: 40,
    featured: true,
    images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?w=800'],
  },
  {
    name: 'Fitness Resistance Bands',
    nameAr: 'أشرطة مقاومة للتمارين',
    description: 'Professional resistance bands set with 5 different resistance levels. Perfect for home workouts, strength training, and rehabilitation exercises.',
    descriptionAr: 'مجموعة أشرطة مقاومة احترافية مع 5 مستويات مقاومة مختلفة. مثالية لتمارين المنزل وبناء العضلات وتمارين إعادة التأهيل.',
    price: 29.99,
    stock: 70,
    featured: false,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'],
  },
  {
    name: 'Portable Power Bank',
    nameAr: 'شاحن محمول',
    description: 'High-capacity 20000mAh power bank with fast charging technology. Compatible with all smartphones and tablets. Includes USB-C and USB-A ports.',
    descriptionAr: 'شاحن محمول عالي السعة 20000 مللي أمبير مع تقنية الشحن السريع. متوافق مع جميع الهواتف الذكية والأجهزة اللوحية. يتضمن منافذ USB-C و USB-A.',
    price: 49.99,
    stock: 55,
    featured: false,
    images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c8?w=800'],
  },
];

async function replaceProducts() {
  try {
    // Find products to replace
    const productsToDelete = await prisma.product.findMany({
      where: {
        OR: [
          { nameAr: 'عسل عضوي' },
          { nameAr: 'سجادة يوجا مميزة' },
          { nameAr: 'شاحن لاسلكي للهاتف' }
        ]
      }
    });

    console.log(`Found ${productsToDelete.length} products to replace:`);
    productsToDelete.forEach(p => {
      console.log(`- ${p.name} / ${p.nameAr}`);
    });

    // Get category
    const category = await prisma.category.findFirst();
    if (!category) {
      console.error('❌ No category found');
      return;
    }

    // Delete old products
    for (const product of productsToDelete) {
      await prisma.product.delete({
        where: { id: product.id }
      });
      console.log(`✅ Deleted: ${product.name} / ${product.nameAr}`);
    }

    // Add new products
    for (const product of replacementProducts) {
      const created = await prisma.product.create({
        data: {
          ...product,
          categoryId: category.id,
        },
      });
      console.log(`✅ Created: ${created.name} / ${created.nameAr}`);
    }

    console.log(`\n✅ Successfully replaced ${productsToDelete.length} products with ${replacementProducts.length} new products!`);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

replaceProducts();

