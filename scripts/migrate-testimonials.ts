/**
 * Migration script to transfer testimonials from Markdown files to Postgres
 *
 * This script should be run once to migrate existing testimonials from the
 * file-based storage (contents/testimonials/) to the Vercel Postgres database.
 *
 * Usage: npm run db:migrate
 */

// Load environment variables from .env.local
import { config } from 'dotenv';
config({ path: '.env.local' });

// Map Vercel Storage variables to POSTGRES variables if needed
if (!process.env.POSTGRES_URL && process.env.Storage_DATABASE_URL) {
  process.env.POSTGRES_URL = process.env.Storage_DATABASE_URL;
  process.env.POSTGRES_PRISMA_URL = process.env.Storage_PRISMA_URL;
  process.env.POSTGRES_URL_NO_SSL = process.env.Storage_DATABASE_URL_UNPOOLED;
  process.env.POSTGRES_URL_NON_POOLING = process.env.Storage_URL_NON_POOLING;
}

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { sql } from '@vercel/postgres';

const TESTIMONIALS_DIR = path.join(process.cwd(), 'contents', 'testimonials');
const PENDING_DIR = path.join(TESTIMONIALS_DIR, 'pending');
const APPROVED_DIR = path.join(TESTIMONIALS_DIR, 'approved');

interface MarkdownTestimonial {
  name: string;
  email: string;
  role: string;
  company?: string;
  rating: number;
  message: string;
  date: string;
  status: 'pending' | 'approved';
  priority: number;
}

/**
 * Read testimonials from a Markdown directory
 */
const readTestimonialsFromDir = (
  dir: string,
  status: 'pending' | 'approved',
): MarkdownTestimonial[] => {
  if (!fs.existsSync(dir)) {
    console.log(`Directory ${dir} does not exist, skipping...`);
    return [];
  }

  const files = fs
    .readdirSync(dir)
    .filter((file: string) => file.endsWith('.md'));
  console.log(`Found ${files.length} testimonial files in ${dir}`);

  return files.map((file: string) => {
    const filePath = path.join(dir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
      name: data.name,
      email: data.email,
      role: data.role,
      company: data.company,
      rating: data.rating,
      message: content.trim(),
      date: data.date,
      status,
      priority: data.priority || 0,
    };
  });
};

/**
 * Migrate testimonials to Postgres
 */
const migrateTestimonials = async () => {
  try {
    console.log('Starting testimonials migration...\n');

    // Read all testimonials from Markdown files
    const pendingTestimonials = readTestimonialsFromDir(PENDING_DIR, 'pending');
    const approvedTestimonials = readTestimonialsFromDir(
      APPROVED_DIR,
      'approved',
    );

    const allTestimonials = [...pendingTestimonials, ...approvedTestimonials];

    if (allTestimonials.length === 0) {
      console.log('No testimonials found to migrate.');
      return;
    }

    console.log(`\nTotal testimonials to migrate: ${allTestimonials.length}`);
    console.log(`- Pending: ${pendingTestimonials.length}`);
    console.log(`- Approved: ${approvedTestimonials.length}\n`);

    // Ensure the testimonials table exists
    console.log('Creating testimonials table if it does not exist...');
    await sql`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        message TEXT NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
        priority INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log('Creating indexes...');
    await sql`CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials(status);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_testimonials_priority ON testimonials(priority DESC);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON testimonials(created_at DESC);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_testimonials_status_priority_created ON testimonials(status, priority DESC, created_at DESC);`;

    console.log('Table and indexes created successfully.\n');

    // Insert testimonials
    let successCount = 0;
    let errorCount = 0;

    for (const testimonial of allTestimonials) {
      try {
        await sql`
          INSERT INTO testimonials (name, email, role, company, rating, message, status, priority, created_at, updated_at)
          VALUES (
            ${testimonial.name},
            ${testimonial.email},
            ${testimonial.role},
            ${testimonial.company || null},
            ${testimonial.rating},
            ${testimonial.message},
            ${testimonial.status},
            ${testimonial.priority},
            ${testimonial.date},
            ${testimonial.date}
          )
        `;
        successCount++;
        console.log(`✓ Migrated: ${testimonial.name} (${testimonial.status})`);
      } catch (error) {
        errorCount++;
        console.error(`✗ Failed to migrate: ${testimonial.name}`, error);
      }
    }

    console.log(`\n✓ Migration completed!`);
    console.log(`- Successfully migrated: ${successCount}`);
    console.log(`- Failed: ${errorCount}`);

    if (successCount > 0) {
      console.log(
        '\n⚠️  Please verify the migrated data in your database before deleting the Markdown files.',
      );
      console.log(
        '⚠️  You may want to backup the contents/testimonials directory first.',
      );
    }
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

// Run the migration
migrateTestimonials()
  .then(() => {
    console.log('\nMigration script finished.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
