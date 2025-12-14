import { NextRequest, NextResponse } from 'next/server';
import {
  saveTestimonial,
  getAllApprovedTestimonials,
} from '@/lib/testimonial-manager';
import type { TestimonialFormData } from '@/lib/types/testimonial';

/**
 * GET /api/testimonials
 * Returns all approved testimonials
 */
export async function GET() {
  try {
    const testimonials = getAllApprovedTestimonials();
    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 },
    );
  }
}

/**
 * POST /api/testimonials
 * Creates a new testimonial in pending status
 */
export async function POST(request: NextRequest) {
  try {
    const body: TestimonialFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.role || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 },
      );
    }

    // Validate rating
    if (body.rating < 1 || body.rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 },
      );
    }

    // Validate message length
    if (body.message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long' },
        { status: 400 },
      );
    }

    const testimonial = saveTestimonial(body);

    return NextResponse.json(
      {
        message: 'Testimonial submitted successfully and pending approval',
        testimonial,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 },
    );
  }
}
