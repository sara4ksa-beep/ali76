import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-helpers';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();

    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json({ items: [] });
    }

    return NextResponse.json(cart);
  } catch (error: any) {
    console.error('Error fetching cart:', error);
    if (error.message?.includes('requireAuth')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const { productId, quantity } = body;

    if (!productId || !quantity) {
      return NextResponse.json(
        { error: 'Product ID and quantity are required' },
        { status: 400 }
      );
    }

    let cart = await prisma.cart.findUnique({
      where: { userId: user.id },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: user.id },
      });
    }

    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }

    return NextResponse.json({ message: 'Item added to cart' });
  } catch (error: any) {
    console.error('Error adding to cart:', error);
    if (error.message?.includes('requireAuth')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Failed to add to cart' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const { productId, quantity } = body;

    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
    });

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    await prisma.cartItem.update({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      data: { quantity },
    });

    return NextResponse.json({ message: 'Cart updated' });
  } catch (error: any) {
    console.error('Error updating cart:', error);
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const { productId } = body;

    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
    });

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    await prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    return NextResponse.json({ message: 'Item removed from cart' });
  } catch (error: any) {
    console.error('Error removing from cart:', error);
    return NextResponse.json(
      { error: 'Failed to remove from cart' },
      { status: 500 }
    );
  }
}



