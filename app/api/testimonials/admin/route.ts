import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import {
  getAllPendingTestimonials,
  approveTestimonial,
  rejectTestimonial,
  disableTestimonial,
  updateTestimonialPriority,
} from '@/lib/testimonial-manager';

/**
 * GET /api/testimonials/admin
 * Returns all pending testimonials (admin only)
 */
export async function GET() {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    if (session.user.email !== adminEmail) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const testimonials = getAllPendingTestimonials();
    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch pending testimonials' },
      { status: 500 },
    );
  }
}

/**
 * POST /api/testimonials/admin
 * Approve or reject a testimonial (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    if (session.user.email !== adminEmail) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { id, action } = body;

    if (!id || !action) {
      return NextResponse.json(
        { error: 'Missing id or action' },
        { status: 400 },
      );
    }

    if (action === 'approve') {
      const success = approveTestimonial(id);
      if (!success) {
        return NextResponse.json(
          { error: 'Testimonial not found' },
          { status: 404 },
        );
      }
      return NextResponse.json({ message: 'Testimonial approved' });
    } else if (action === 'reject') {
      const success = rejectTestimonial(id);
      if (!success) {
        return NextResponse.json(
          { error: 'Testimonial not found' },
          { status: 404 },
        );
      }
      return NextResponse.json({ message: 'Testimonial rejected' });
    } else if (action === 'disable') {
      const success = disableTestimonial(id);
      if (!success) {
        return NextResponse.json(
          { error: 'Testimonial not found' },
          { status: 404 },
        );
      }
      return NextResponse.json({ message: 'Testimonial disabled' });
    } else if (action === 'setPriority') {
      const { priority } = body;

      if (typeof priority !== 'number') {
        return NextResponse.json(
          { error: 'Priority must be a number' },
          { status: 400 },
        );
      }

      const success = updateTestimonialPriority(id, priority);
      if (!success) {
        return NextResponse.json(
          { error: 'Testimonial not found' },
          { status: 404 },
        );
      }
      return NextResponse.json({ message: 'Priority updated' });
    } else {
      return NextResponse.json(
        {
          error:
            'Invalid action. Use "approve", "reject", "disable", or "setPriority"',
        },
        { status: 400 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process testimonial' },
      { status: 500 },
    );
  }
}
