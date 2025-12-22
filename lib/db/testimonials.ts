import { sql } from '@vercel/postgres';
import type { Testimonial, TestimonialFormData } from '../types/testimonial';

/**
 * Save a new testimonial to the database
 */
export const saveTestimonial = async (
  data: TestimonialFormData,
): Promise<Testimonial> => {
  const result = await sql`
    INSERT INTO testimonials (name, email, role, company, rating, message, status, priority)
    VALUES (${data.name}, ${data.email}, ${data.role}, ${data.company || null}, ${data.rating}, ${data.message}, 'pending', 0)
    RETURNING id, name, email, role, company, rating, message, status, priority, 
              created_at as date, created_at, updated_at
  `;

  const row = result.rows[0];

  return {
    id: row.id.toString(),
    name: row.name,
    email: row.email,
    role: row.role,
    company: row.company,
    rating: row.rating,
    message: row.message,
    date: row.date.toISOString(),
    status: row.status as 'pending' | 'approved' | 'rejected',
    priority: row.priority,
  };
};

/**
 * Get all approved testimonials, sorted by priority and date
 */
export const getAllApprovedTestimonials = async (): Promise<Testimonial[]> => {
  const result = await sql`
    SELECT id, name, email, role, company, rating, message, status, priority,
           created_at as date, created_at, updated_at
    FROM testimonials
    WHERE status = 'approved'
    ORDER BY priority DESC, created_at DESC
  `;

  return result.rows.map((row) => ({
    id: row.id.toString(),
    name: row.name,
    email: row.email,
    role: row.role,
    company: row.company,
    rating: row.rating,
    message: row.message,
    date: row.date.toISOString(),
    status: row.status as 'pending' | 'approved' | 'rejected',
    priority: row.priority,
  }));
};

/**
 * Get all pending testimonials, sorted by date (newest first)
 */
export const getAllPendingTestimonials = async (): Promise<Testimonial[]> => {
  const result = await sql`
    SELECT id, name, email, role, company, rating, message, status, priority,
           created_at as date, created_at, updated_at
    FROM testimonials
    WHERE status = 'pending'
    ORDER BY created_at DESC
  `;

  return result.rows.map((row) => ({
    id: row.id.toString(),
    name: row.name,
    email: row.email,
    role: row.role,
    company: row.company,
    rating: row.rating,
    message: row.message,
    date: row.date.toISOString(),
    status: row.status as 'pending' | 'approved' | 'rejected',
    priority: row.priority,
  }));
};

/**
 * Get a single testimonial by ID from pending status
 */
export const getPendingTestimonialById = async (
  id: string,
): Promise<Testimonial | null> => {
  const result = await sql`
    SELECT id, name, email, role, company, rating, message, status, priority,
           created_at as date, created_at, updated_at
    FROM testimonials
    WHERE id = ${parseInt(id)} AND status = 'pending'
    LIMIT 1
  `;

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];

  return {
    id: row.id.toString(),
    name: row.name,
    email: row.email,
    role: row.role,
    company: row.company,
    rating: row.rating,
    message: row.message,
    date: row.date.toISOString(),
    status: row.status as 'pending' | 'approved' | 'rejected',
    priority: row.priority,
  };
};

/**
 * Approve a testimonial (update status to 'approved')
 */
export const approveTestimonial = async (id: string): Promise<boolean> => {
  try {
    const result = await sql`
      UPDATE testimonials
      SET status = 'approved', updated_at = CURRENT_TIMESTAMP
      WHERE id = ${parseInt(id)} AND status = 'pending'
      RETURNING id
    `;

    return result.rowCount > 0;
  } catch (error) {
    console.error('Error approving testimonial:', error);
    return false;
  }
};

/**
 * Reject a testimonial (delete from database)
 */
export const rejectTestimonial = async (id: string): Promise<boolean> => {
  try {
    const result = await sql`
      DELETE FROM testimonials
      WHERE id = ${parseInt(id)} AND status = 'pending'
      RETURNING id
    `;

    return result.rowCount > 0;
  } catch (error) {
    console.error('Error rejecting testimonial:', error);
    return false;
  }
};

/**
 * Disable a testimonial (move from approved back to pending)
 */
export const disableTestimonial = async (id: string): Promise<boolean> => {
  try {
    const result = await sql`
      UPDATE testimonials
      SET status = 'pending', updated_at = CURRENT_TIMESTAMP
      WHERE id = ${parseInt(id)} AND status = 'approved'
      RETURNING id
    `;

    return result.rowCount > 0;
  } catch (error) {
    console.error('Error disabling testimonial:', error);
    return false;
  }
};

/**
 * Update testimonial priority
 */
export const updateTestimonialPriority = async (
  id: string,
  priority: number,
): Promise<boolean> => {
  try {
    const result = await sql`
      UPDATE testimonials
      SET priority = ${priority}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${parseInt(id)}
      RETURNING id
    `;

    return result.rowCount > 0;
  } catch (error) {
    console.error('Error updating testimonial priority:', error);
    return false;
  }
};
