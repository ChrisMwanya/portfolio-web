export interface Testimonial {
  id: string;
  name: string;
  email: string;
  role: string;
  company?: string;
  rating: number;
  message: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  priority?: number; // Higher number = higher priority (displayed first)
}

export interface TestimonialFormData {
  name: string;
  email: string;
  role: string;
  company?: string;
  rating: number;
  message: string;
}
