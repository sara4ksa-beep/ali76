import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-helpers';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();

    const favorites = await prisma.favorite.findMany({
      where: { userId: user.id },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ favorites });
  } catch (error: any) {
    console.error('Error fetching favorites:', error);
    if (error.message?.includes('requireAuth')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Failed to fetch favorites' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Check if already favorited
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId: user.id,
          productId,
        },
      },
    });

    if (existingFavorite) {
      return NextResponse.json({ message: 'Product already in favorites' });
    }

    await prisma.favorite.create({
      data: {
        userId: user.id,
        productId,
      },
    });

    return NextResponse.json({ message: 'Product added to favorites' });
  } catch (error: any) {
    console.error('Error adding to favorites:', error);
    if (error.message?.includes('requireAuth')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Failed to add to favorites' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    await prisma.favorite.delete({
      where: {
        userId_productId: {
          userId: user.id,
          productId,
        },
      },
    });

    return NextResponse.json({ message: 'Product removed from favorites' });
  } catch (error: any) {
    console.error('Error removing from favorites:', error);
    if (error.message?.includes('requireAuth')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Failed to remove from favorites' },
      { status: 500 }
    );
  }
}

