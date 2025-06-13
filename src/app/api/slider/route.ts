import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const sliders = await prisma.slider.findMany({
            where: {
                isActive: true,
            },
            orderBy: {
                order: 'asc',
            },
        });

        return NextResponse.json(sliders);
    } catch (error) {
        console.error('Error fetching sliders:', error);
        return NextResponse.json(
            { message: 'Error fetching sliders' },
            { status: 500 },
        );
    }
}
