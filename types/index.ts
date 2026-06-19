export interface Inquiry {
  id?: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  tenth_percentage?: string;
  twelfth_percentage?: string;
  board?: string;
  stream?: string;
  primary_interest?: string;
  secondary_interest?: string;
  budget_range?: string;
  preferred_colleges?: string[];
  location_preference?: string;
  hostel_required?: boolean;
  message?: string;
  status?: 'new' | 'contacted' | 'in_progress' | 'converted' | 'closed';
  created_at?: string;
}

export interface CallbackRequest {
  id?: string;
  name: string;
  phone: string;
  best_time: string;
  status?: 'pending' | 'completed';
  created_at?: string;
}

export interface AssessmentResult {
  id?: string;
  answers: Record<string, number>;
  recommended_stream: string;
  recommended_courses: string[];
  suggested_colleges: string[];
  salary_insights: Record<string, string>;
  created_at?: string;
}

export interface College {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  image?: string;
  location: string;
  rating: number;
  established: number;
  accreditation: string;
  type: string;
  courses: string[];
  facilities: string[];
  placement_stats: {
    companies: string[];
    average_package: string;
    highest_package: string;
    placement_rate: string;
  };
  description: string;
  website?: string;
}

export interface Course {
  id: string;
  name: string;
  slug: string;
  category: string;
  duration: string;
  eligibility: string;
  fees_range: string;
  description: string;
  career_opportunities: string[];
  salary_insights: {
    entry: string;
    mid: string;
    senior: string;
  };
  partner_colleges: string[];
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  photo?: string;
  college: string;
  course: string;
  year: string;
  rating: number;
  text: string;
  video_url?: string;
  placement?: {
    company: string;
    package: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  published_at: string;
  read_time: string;
  image?: string;
  tags: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo?: string;
  expertise: string;
  bio: string;
  linkedin?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}
