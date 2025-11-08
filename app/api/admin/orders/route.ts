import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-helpers';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ orders });
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    if (error.message?.includes('Admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}



