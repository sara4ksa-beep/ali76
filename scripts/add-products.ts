import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
  {
    name: 'Premium Coffee Beans',
    nameAr: 'حبوب القهوة المميزة',
    description: 'High-quality Arabica coffee beans, freshly roasted. Perfect for coffee enthusiasts who appreciate rich flavor and aroma.',
    descriptionAr: 'حبوب قهوة عربية عالية الجودة، محمصة حديثاً. مثالية لعشاق القهوة الذين يقدرون النكهة الغنية والرائحة العطرة.',
    price: 89.99,
    stock: 50,
    featured: true,
    images: ['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800'],
  },
  {
    name: 'Wireless Bluetooth Headphones',
    nameAr: 'سماعات لاسلكية بلوتوث',
    description: 'Premium noise-canceling wireless headphones with superior sound quality and long battery life. Perfect for music lovers.',
    descriptionAr: 'سماعات لاسلكية مميزة بإلغاء الضوضاء وجودة صوت فائقة وعمر بطارية طويل. مثالية لعشاق الموسيقى.',
    price: 299.99,
    stock: 30,
    featured: true,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'],
  },
  {
    name: 'Smart Watch Series 9',
    nameAr: 'ساعة ذكية سلسلة 9',
    description: 'Advanced smartwatch with health monitoring, GPS, and fitness tracking. Water-resistant and stylish design.',
    descriptionAr: 'ساعة ذكية متقدمة مع مراقبة الصحة ونظام تحديد المواقع وتتبع اللياقة البدنية. مقاومة للماء وتصميم أنيق.',
    price: 449.99,
    stock: 25,
    featured: true,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'],
  },
  {
    name: 'Organic Honey Jar',
    nameAr: 'عسل عضوي',
    description: 'Pure organic honey from local beekeepers. Natural, unprocessed, and rich in antioxidants. Perfect for your daily wellness.',
    descriptionAr: 'عسل عضوي نقي من مربي النحل المحليين. طبيعي وغير معالج وغني بمضادات الأكسدة. مثالي لصحتك اليومية.',
    price: 45.99,
    stock: 100,
    featured: false,
    images: ['https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800'],
  },
  {
    name: 'Leather Wallet',
    nameAr: 'محفظة جلدية',
    description: 'Genuine leather wallet with multiple card slots and cash compartment. Handcrafted with attention to detail.',
    descriptionAr: 'محفظة جلدية أصلية مع عدة جيوب للبطاقات ومساحة للنقود. مصنوعة يدوياً بعناية فائقة.',
    price: 79.99,
    stock: 60,
    featured: false,
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=800'],
  },
  {
    name: 'Yoga Mat Premium',
    nameAr: 'سجادة يوجا مميزة',
    description: 'Non-slip premium yoga mat with extra cushioning. Perfect for yoga, pilates, and fitness exercises.',
    descriptionAr: 'سجادة يوجا مميزة غير قابلة للانزلاق مع وسادة إضافية. مثالية لليوجا والبيلاتس وتمارين اللياقة.',
    price: 59.99,
    stock: 40,
    featured: false,
    images: ['https://images.unsplash.com/photo-1601925260368-ae2f83d1366a?w=800'],
  },
  {
    name: 'Ceramic Dinner Set',
    nameAr: 'طقم أطباق سيراميك',
    description: 'Elegant ceramic dinner set for 6 people. Dishwasher safe and microwave safe. Perfect for family gatherings.',
    descriptionAr: 'طقم أطباق سيراميك أنيق لـ 6 أشخاص. آمن للغسالة والمايكروويف. مثالي للاجتماعات العائلية.',
    price: 129.99,
    stock: 20,
    featured: false,
    images: ['https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=800'],
  },
  {
    name: 'Wireless Phone Charger',
    nameAr: 'شاحن لاسلكي للهاتف',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.',
    descriptionAr: 'لوح شحن لاسلكي سريع متوافق مع جميع الأجهزة المدعومة بتقنية Qi. تصميم أنيق مع مؤشر LED.',
    price: 34.99,
    stock: 75,
    featured: false,
    images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c8?w=800'],
  },
  {
    name: 'Stainless Steel Water Bottle',
    nameAr: 'زجاجة ماء من الفولاذ المقاوم للصدأ',
    description: 'Insulated stainless steel water bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly.',
    descriptionAr: 'زجاجة ماء معزولة من الفولاذ المقاوم للصدأ تحافظ على المشروبات باردة لمدة 24 ساعة أو ساخنة لمدة 12 ساعة. خالية من BPA وصديقة للبيئة.',
    price: 39.99,
    stock: 80,
    featured: false,
    images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800'],
  },
  {
    name: 'LED Desk Lamp',
    nameAr: 'مصباح مكتب LED',
    description: 'Modern LED desk lamp with adjustable brightness and color temperature. USB charging port included.',
    descriptionAr: 'مصباح مكتب LED عصري مع سطوع قابل للتعديل ودرجة حرارة لون. يتضمن منفذ شحن USB.',
    price: 49.99,
    stock: 45,
    featured: false,
    images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800'],
  },
  {
    name: 'Backpack Travel',
    nameAr: 'حقيبة ظهر للسفر',
    description: 'Durable travel backpack with multiple compartments, laptop sleeve, and water-resistant material. Perfect for adventures.',
    descriptionAr: 'حقيبة ظهر سفر متينة مع عدة جيوب وغطاء للابتوب ومواد مقاومة للماء. مثالية للمغامرات.',
    price: 89.99,
    stock: 35,
    featured: true,
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'],
  },
];

async function addProducts() {
  try {
    // Get or create a default category
    let category = await prisma.category.findFirst();
    
    if (!category) {
      category = await prisma.category.create({
        data: {
          name: 'General',
          nameAr: 'عام',
          slug: 'general',
        },
      });
      console.log('✅ Created default category');
    } else {
      console.log(`✅ Found category: ${category.name} (${category.nameAr})`);
    }

    // Add products
    for (const product of products) {
      const created = await prisma.product.create({
        data: {
          ...product,
          categoryId: category.id,
        },
      });
      console.log(`✅ Created: ${created.name} / ${created.nameAr}`);
    }

    console.log(`\n✅ Successfully added ${products.length} products!`);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

addProducts();

