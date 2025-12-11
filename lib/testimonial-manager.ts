import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Testimonial, TestimonialFormData } from './types/testimonial';

const TESTIMONIALS_DIR = path.join(process.cwd(), 'contents', 'testimonials');
const PENDING_DIR = path.join(TESTIMONIALS_DIR, 'pending');
const APPROVED_DIR = path.join(TESTIMONIALS_DIR, 'approved');

// Ensure directories exist
const ensureDirectories = () => {
  [TESTIMONIALS_DIR, PENDING_DIR, APPROVED_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

// Generate a unique ID based on timestamp
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Create a slug from name
const createSlug = (name: string): string => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Save a new testimonial to the pending directory
 */
export const saveTestimonial = (data: TestimonialFormData): Testimonial => {
  ensureDirectories();

  const id = generateId();
  const slug = createSlug(data.name);
  const fileName = `${id}-${slug}.md`;
  const filePath = path.join(PENDING_DIR, fileName);

  const testimonial: Testimonial = {
    ...data,
    id,
    date: new Date().toISOString(),
    status: 'pending',
    priority: 0, // Default priority
  };

  const frontmatter = {
    name: testimonial.name,
    email: testimonial.email,
    role: testimonial.role,
    company: testimonial.company,
    date: testimonial.date,
    status: testimonial.status,
    rating: testimonial.rating,
    priority: testimonial.priority,
  };

  const fileContent = matter.stringify(testimonial.message, frontmatter);
  fs.writeFileSync(filePath, fileContent, 'utf-8');

  return testimonial;
};

/**
 * Read testimonials from a directory
 */
const readTestimonialsFromDir = (dir: string): Testimonial[] => {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir).filter((file) => file.endsWith('.md'));

  return files.map((file) => {
    const filePath = path.join(dir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    // Extract ID from filename (format: {id}-{slug}.md)
    const id = file.split('-')[0];

    return {
      id,
      name: data.name,
      email: data.email,
      role: data.role,
      company: data.company,
      rating: data.rating,
      message: content,
      date: data.date,
      status: data.status,
      priority: data.priority || 0,
    };
  });
};

/**
 * Get all approved testimonials
 */
export const getAllApprovedTestimonials = (): Testimonial[] => {
  const testimonials = readTestimonialsFromDir(APPROVED_DIR);
  // Sort by priority (higher first), then by date (newest first)
  return testimonials.sort((a, b) => {
    const priorityA = a.priority || 0;
    const priorityB = b.priority || 0;

    if (priorityA !== priorityB) {
      return priorityB - priorityA; // Higher priority first
    }

    // If same priority, sort by date
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};

/**
 * Get all pending testimonials
 */
export const getAllPendingTestimonials = (): Testimonial[] => {
  const testimonials = readTestimonialsFromDir(PENDING_DIR);
  // Sort by date, newest first
  return testimonials.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};

/**
 * Get a single testimonial by ID from pending directory
 */
export const getPendingTestimonialById = (id: string): Testimonial | null => {
  if (!fs.existsSync(PENDING_DIR)) {
    return null;
  }

  const files = fs.readdirSync(PENDING_DIR);
  const file = files.find((f) => f.startsWith(`${id}-`));

  if (!file) {
    return null;
  }

  const filePath = path.join(PENDING_DIR, file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    id,
    name: data.name,
    email: data.email,
    role: data.role,
    company: data.company,
    rating: data.rating,
    message: content,
    date: data.date,
    status: data.status,
  };
};

/**
 * Approve a testimonial (move from pending to approved)
 */
export const approveTestimonial = (id: string): boolean => {
  ensureDirectories();

  if (!fs.existsSync(PENDING_DIR)) {
    return false;
  }

  const files = fs.readdirSync(PENDING_DIR);
  const file = files.find((f) => f.startsWith(`${id}-`));

  if (!file) {
    return false;
  }

  const sourcePath = path.join(PENDING_DIR, file);
  const destPath = path.join(APPROVED_DIR, file);

  // Read the file and update status
  const fileContent = fs.readFileSync(sourcePath, 'utf-8');
  const { data, content } = matter(fileContent);

  data.status = 'approved';

  const updatedContent = matter.stringify(content, data);

  // Write to approved directory
  fs.writeFileSync(destPath, updatedContent, 'utf-8');

  // Delete from pending directory
  fs.unlinkSync(sourcePath);

  return true;
};

/**
 * Reject a testimonial (delete from pending)
 */
export const rejectTestimonial = (id: string): boolean => {
  if (!fs.existsSync(PENDING_DIR)) {
    return false;
  }

  const files = fs.readdirSync(PENDING_DIR);
  const file = files.find((f) => f.startsWith(`${id}-`));

  if (!file) {
    return false;
  }

  const filePath = path.join(PENDING_DIR, file);
  fs.unlinkSync(filePath);

  return true;
};

/**
 * Disable a testimonial (move from approved back to pending)
 */
export const disableTestimonial = (id: string): boolean => {
  ensureDirectories();

  if (!fs.existsSync(APPROVED_DIR)) {
    return false;
  }

  const files = fs.readdirSync(APPROVED_DIR);
  const file = files.find((f) => f.startsWith(`${id}-`));

  if (!file) {
    return false;
  }

  const sourcePath = path.join(APPROVED_DIR, file);
  const destPath = path.join(PENDING_DIR, file);

  // Read the file and update status
  const fileContent = fs.readFileSync(sourcePath, 'utf-8');
  const { data, content } = matter(fileContent);

  data.status = 'pending';

  const updatedContent = matter.stringify(content, data);

  // Write to pending directory
  fs.writeFileSync(destPath, updatedContent, 'utf-8');

  // Delete from approved directory
  fs.unlinkSync(sourcePath);

  return true;
};

/**
 * Update testimonial priority
 */
export const updateTestimonialPriority = (
  id: string,
  priority: number,
): boolean => {
  ensureDirectories();

  // Check in approved directory
  let directory = APPROVED_DIR;
  let files = fs.readdirSync(directory);
  let file = files.find((f) => f.startsWith(`${id}-`));

  // If not found in approved, check pending
  if (!file && fs.existsSync(PENDING_DIR)) {
    directory = PENDING_DIR;
    files = fs.readdirSync(directory);
    file = files.find((f) => f.startsWith(`${id}-`));
  }

  if (!file) {
    return false;
  }

  const filePath = path.join(directory, file);

  // Read the file and update priority
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  data.priority = priority;

  const updatedContent = matter.stringify(content, data);
  fs.writeFileSync(filePath, updatedContent, 'utf-8');

  return true;
};
