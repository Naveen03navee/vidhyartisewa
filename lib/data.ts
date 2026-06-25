import { College, Course, Testimonial, BlogPost, TeamMember, Service, FAQ } from '@/types';

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About Us' },
  { href: '/career-guidance/', label: 'Career Guidance' },
  { href: '/colleges/', label: 'Colleges' },
  { href: '/courses/', label: 'Courses' },
  { href: '/success-stories/', label: 'Success Stories' },
  { href: '/blog/', label: 'Blog' },
  { href: '/contact/', label: 'Contact' },
];

export const STATS = [
  { value: 10000, suffix: '+', label: 'Students Guided', icon: 'Users' },
  { value: 500, suffix: '+', label: 'Partner Colleges', icon: 'Building2' },
  { value: 98, suffix: '%', label: 'Admission Success', icon: 'TrendingUp' },
  { value: 15, suffix: '+', label: 'Years Experience', icon: 'Award' },
];

export const SERVICES: Service[] = [
  {
    id: 'career-counseling',
    title: 'Career Counseling',
    description: 'Discover your ideal career path with our expert aptitude assessment and personalized guidance.',
    icon: 'Compass',
    features: ['Aptitude Testing', 'Stream Selection', 'Course Recommendations', 'Future Planning'],
  },
  {
    id: 'college-admissions',
    title: 'College Admissions',
    description: 'Secure admissions in top Engineering, Medical, Nursing & Management colleges across Karnataka.',
    icon: 'Building2',
    features: ['Engineering', 'Medical', 'Nursing', 'Management', 'Commerce'],
  },
  {
    id: 'documentation',
    title: 'Documentation Support',
    description: 'End-to-end application assistance, verification & admission processing support.',
    icon: 'FileCheck',
    features: ['Application Filling', 'Document Verification', 'Admission Processing', 'Follow-up'],
  },
  {
    id: 'placement',
    title: 'Placement Guidance',
    description: 'Industry mentorship, internship opportunities & placement preparation support.',
    icon: 'Briefcase',
    features: ['Industry Mentorship', 'Internship Support', 'Resume Building', 'Interview Prep'],
  },
  {
    id: 'scholarship',
    title: 'Scholarship Assistance',
    description: 'Find and apply for scholarships to reduce your education costs significantly.',
    icon: 'Award',
    features: ['Scholarship Search', 'Application Help', 'Merit-based Aid', 'Need-based Aid'],
  },
  {
    id: 'hostel',
    title: 'Hostel & Travel',
    description: 'Assistance with accommodation, airport & station pickups for outstation students.',
    icon: 'Home',
    features: ['Hostel Booking', 'Travel Arrangement', 'Airport Pickup', 'Local Guidance'],
  },
];

// PARTNER COLLEGES - From PRD + Real Karnataka colleges
export const PARTNER_COLLEGES: College[] = [
  {
    id: '1',
    name: 'Marwadi University',
    slug: 'marwadi-university',
    location: 'Rajkot, Gujarat',
    rating: 4.5,
    established: 2016,
    accreditation: 'UGC Approved',
    type: 'Private University',
    courses: ['Engineering', 'Management', 'Commerce', 'Computer Applications'],
    facilities: ['Library', 'Labs', 'Hostel', 'Sports Complex', 'Cafeteria'],
    placement_stats: {
      companies: ['TCS', 'Infosys', 'Wipro', 'Amazon', 'Microsoft'],
      average_package: '4.5 LPA',
      highest_package: '18 LPA',
      placement_rate: '85%',
    },
    description: 'Marwadi University is a leading private university offering world-class education in Engineering, Management, and more.',
    website: 'https://www.marwadiuniversity.ac.in',
  },
  {
    id: '2',
    name: 'Bangalore Technological Institute',
    slug: 'bangalore-technological-institute',
    location: 'Bangalore, Karnataka',
    rating: 4.3,
    established: 2008,
    accreditation: 'AICTE Approved',
    type: 'Engineering College',
    courses: ['Engineering', 'Computer Applications'],
    facilities: ['Library', 'Labs', 'Hostel', 'Sports', 'Wi-Fi Campus'],
    placement_stats: {
      companies: ['Infosys', 'TCS', 'Cognizant', 'IBM', 'Accenture'],
      average_package: '3.8 LPA',
      highest_package: '12 LPA',
      placement_rate: '78%',
    },
    description: 'Premier engineering institute in Bangalore with state-of-the-art infrastructure and excellent placement record.',
    website: 'https://www.btibangalore.org',
  },
  {
    id: '3',
    name: 'Akash Medical College',
    slug: 'akash-medical-college',
    location: 'Bangalore, Karnataka',
    rating: 4.6,
    established: 2014,
    accreditation: 'MCI Approved',
    type: 'Medical College',
    courses: ['Medical', 'Nursing', 'Allied Health Sciences'],
    facilities: ['Hospital', 'Labs', 'Library', 'Hostel', 'Research Center'],
    placement_stats: {
      companies: ['Apollo', 'Fortis', 'Manipal', 'Narayana Health'],
      average_package: '6.5 LPA',
      highest_package: '15 LPA',
      placement_rate: '92%',
    },
    description: 'Top-rated medical college with attached hospital providing hands-on clinical training to students.',
    website: 'https://www.aimsrc.com',
  },
  {
    id: '4',
    name: 'Brindavan Group of Institutions',
    slug: 'brindavan-group',
    location: 'Bangalore, Karnataka',
    rating: 4.2,
    established: 2005,
    accreditation: 'AICTE & UGC Approved',
    type: 'Multi-Disciplinary',
    courses: ['Engineering', 'Management', 'Commerce', 'Computer Applications'],
    facilities: ['Library', 'Labs', 'Hostel', 'Sports', 'Auditorium'],
    placement_stats: {
      companies: ['Wipro', 'Infosys', 'TCS', 'HDFC Bank', 'ICICI'],
      average_package: '3.5 LPA',
      highest_package: '10 LPA',
      placement_rate: '75%',
    },
    description: 'Comprehensive educational group offering diverse courses with focus on holistic student development.',
    website: 'https://www.brindavancollege.com',
  },
  {
    id: '5',
    name: 'Sridevi Medical College',
    slug: 'sridevi-medical-college',
    location: 'Bangalore, Karnataka',
    rating: 4.4,
    established: 2010,
    accreditation: 'MCI Approved',
    type: 'Medical College',
    courses: ['Medical', 'Nursing', 'Allied Health Sciences', 'Pharmacy'],
    facilities: ['Hospital', 'Labs', 'Library', 'Hostel', 'Sports'],
    placement_stats: {
      companies: ['Fortis', 'Apollo', 'Max Healthcare', 'Manipal'],
      average_package: '6.0 LPA',
      highest_package: '14 LPA',
      placement_rate: '88%',
    },
    description: 'Renowned medical institution known for quality education and excellent clinical exposure.',
    website: 'https://www.shridevimedical.org',
  },
  {
    id: '6',
    name: 'Sparsh Hospital & College',
    slug: 'sparsh-hospital',
    location: 'Bangalore, Karnataka',
    rating: 4.3,
    established: 2012,
    accreditation: 'MCI & INC Approved',
    type: 'Medical & Nursing',
    courses: ['Medical', 'Nursing', 'Allied Health Sciences'],
    facilities: ['Hospital', 'Labs', 'Library', 'Hostel', 'Cafeteria'],
    placement_stats: {
      companies: ['Sparsh Hospital', 'Apollo', 'Fortis', 'Manipal'],
      average_package: '5.5 LPA',
      highest_package: '12 LPA',
      placement_rate: '85%',
    },
    description: 'Hospital-affiliated college providing excellent practical training in medical and nursing fields.',
    website: 'https://www.sparshhospital.com',
  },
  {
    id: '7',
    name: 'Sri Shankara Cancer Hospital',
    slug: 'sri-shankara-cancer-hospital',
    location: 'Bangalore, Karnataka',
    rating: 4.5,
    established: 2015,
    accreditation: 'MCI Approved',
    type: 'Specialized Medical',
    courses: ['Medical', 'Allied Health Sciences'],
    facilities: ['Cancer Center', 'Labs', 'Library', 'Hostel', 'Research'],
    placement_stats: {
      companies: ['Tata Memorial', 'AIIMS', 'Apollo Cancer', 'HCG'],
      average_package: '7.0 LPA',
      highest_package: '16 LPA',
      placement_rate: '90%',
    },
    description: 'Specialized cancer care institution offering unique oncology education and research opportunities.',
    website: 'https://www.srishankaracancerhospital.org',
  },
  {
    id: '8',
    name: 'Primus B School',
    slug: 'primus-b-school',
    location: 'Bangalore, Karnataka',
    rating: 4.4,
    established: 2011,
    accreditation: 'AICTE Approved',
    type: 'Management Institute',
    courses: ['Management', 'Commerce'],
    facilities: ['Library', 'Labs', 'Hostel', 'Sports', 'Incubation Center'],
    placement_stats: {
      companies: ['Amazon', 'Flipkart', 'Deloitte', 'KPMG', 'EY'],
      average_package: '5.0 LPA',
      highest_package: '14 LPA',
      placement_rate: '82%',
    },
    description: 'Premier business school with industry-focused curriculum and strong corporate connections.',
    website: 'https://primusbschool.com',
  },
 
];

// COURSES - From PRD categories + real Vidhyarthi Sewa course info
export const COURSES: Course[] = [
  {
    id: '1',
    name: 'B.Tech - Computer Science',
    slug: 'btech-computer-science',
    category: 'Engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM, 50% minimum',
    fees_range: '₹2,00,000 - ₹4,00,000/year',
    description: 'Bachelor of Technology in Computer Science Engineering covers programming, algorithms, data structures, AI, and software development.',
    career_opportunities: ['Software Developer', 'Data Scientist', 'AI Engineer', 'Cloud Architect', 'Cybersecurity Analyst'],
    salary_insights: { entry: '4-6 LPA', mid: '8-15 LPA', senior: '20-40 LPA' },
    partner_colleges: ['Marwadi University', 'Bangalore Technological Institute', 'Brindavan Group'],
  },
  {
    id: '2',
    name: 'B.Tech - Mechanical',
    slug: 'btech-mechanical',
    category: 'Engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM, 50% minimum',
    fees_range: '₹1,80,000 - ₹3,50,000/year',
    description: 'Mechanical Engineering program covering design, manufacturing, thermal systems, and automation.',
    career_opportunities: ['Design Engineer', 'Production Manager', 'Automotive Engineer', 'Robotics Engineer', 'HVAC Engineer'],
    salary_insights: { entry: '3.5-5 LPA', mid: '7-12 LPA', senior: '15-30 LPA' },
    partner_colleges: ['Marwadi University', 'Bangalore Technological Institute', 'Brindavan Group'],
  },
  {
    id: '3',
    name: 'MBBS',
    slug: 'mbbs',
    category: 'Medical',
    duration: '5.5 Years (including internship)',
    eligibility: '10+2 with PCB, 50% minimum, NEET qualified',
    fees_range: '₹8,00,000 - ₹25,00,000/year',
    description: 'Bachelor of Medicine and Bachelor of Surgery - comprehensive medical education with clinical training.',
    career_opportunities: ['Doctor', 'Surgeon', 'Medical Researcher', 'Public Health Officer', 'Medical Administrator'],
    salary_insights: { entry: '6-10 LPA', mid: '12-25 LPA', senior: '30-60 LPA' },
    partner_colleges: ['Akash Medical College', 'Sridevi Medical College'],
  },
  {
    id: '4',
    name: 'BDS',
    slug: 'bds',
    category: 'Medical',
    duration: '5 Years (including internship)',
    eligibility: '10+2 with PCB, 50% minimum, NEET qualified',
    fees_range: '₹3,00,000 - ₹8,00,000/year',
    description: 'Bachelor of Dental Surgery - comprehensive dental education with clinical practice.',
    career_opportunities: ['Dentist', 'Dental Surgeon', 'Orthodontist', 'Oral Pathologist', 'Dental Researcher'],
    salary_insights: { entry: '5-8 LPA', mid: '10-20 LPA', senior: '25-50 LPA' },
    partner_colleges: ['Akash Medical College', 'Sridevi Medical College'],
  },
  {
    id: '5',
    name: 'B.Sc Nursing',
    slug: 'bsc-nursing',
    category: 'Nursing',
    duration: '4 Years',
    eligibility: '10+2 with PCB, 45% minimum',
    fees_range: '₹80,000 - ₹2,00,000/year',
    description: 'Bachelor of Science in Nursing - comprehensive nursing education with clinical training.',
    career_opportunities: ['Registered Nurse', 'Nurse Practitioner', 'Nursing Administrator', 'ICU Nurse', 'Pediatric Nurse'],
    salary_insights: { entry: '3-5 LPA', mid: '6-12 LPA', senior: '15-30 LPA' },
    partner_colleges: ['Sparsh Hospital', 'Sridevi Medical College', 'Akash Medical College'],
  },
  {
    id: '6',
    name: 'GNM - General Nursing & Midwifery',
    slug: 'gnm',
    category: 'Nursing',
    duration: '3 Years',
    eligibility: '10+2 with any stream, 40% minimum',
    fees_range: '₹50,000 - ₹1,50,000/year',
    description: 'General Nursing and Midwifery diploma program for nursing professionals.',
    career_opportunities: ['Staff Nurse', 'Community Health Nurse', 'Midwife', 'Nursing Tutor', 'Home Care Nurse'],
    salary_insights: { entry: '2.5-4 LPA', mid: '5-8 LPA', senior: '10-18 LPA' },
    partner_colleges: ['Sparsh Hospital', 'Sridevi Medical College'],
  },
  {
    id: '7',
    name: 'B.Pharm',
    slug: 'bpharm',
    category: 'Pharmacy',
    duration: '4 Years',
    eligibility: '10+2 with PCB/PCM, 50% minimum',
    fees_range: '₹1,00,000 - ₹2,50,000/year',
    description: 'Bachelor of Pharmacy - comprehensive pharmaceutical sciences education.',
    career_opportunities: ['Pharmacist', 'Quality Control Analyst', 'Medical Representative', 'Regulatory Affairs', 'Research Scientist'],
    salary_insights: { entry: '3-5 LPA', mid: '6-12 LPA', senior: '15-25 LPA' },
    partner_colleges: ['Sridevi Medical College', 'Brindavan Group'],
  },
  {
    id: '8',
    name: 'BBA',
    slug: 'bba',
    category: 'Management',
    duration: '3 Years',
    eligibility: '10+2 with any stream, 50% minimum',
    fees_range: '₹1,50,000 - ₹3,00,000/year',
    description: 'Bachelor of Business Administration - foundation in management principles and practices.',
    career_opportunities: ['Business Analyst', 'Marketing Executive', 'HR Manager', 'Operations Manager', 'Entrepreneur'],
    salary_insights: { entry: '3-5 LPA', mid: '7-15 LPA', senior: '20-40 LPA' },
    partner_colleges: ['Primus B School', 'Marwadi University', 'Brindavan Group'],
  },
  {
    id: '9',
    name: 'MBA',
    slug: 'mba',
    category: 'Management',
    duration: '2 Years',
    eligibility: 'Graduation with 50% minimum, CAT/MAT/XAT',
    fees_range: '₹3,00,000 - ₹8,00,000/year',
    description: 'Master of Business Administration - advanced management education with specialization options.',
    career_opportunities: ['Management Consultant', 'Product Manager', 'Finance Manager', 'Strategy Consultant', 'CEO'],
    salary_insights: { entry: '6-10 LPA', mid: '12-25 LPA', senior: '30-80 LPA' },
    partner_colleges: ['Primus B School', 'Marwadi University'],
  },
  {
    id: '10',
    name: 'B.Com',
    slug: 'bcom',
    category: 'Commerce',
    duration: '3 Years',
    eligibility: '10+2 with Commerce, 45% minimum',
    fees_range: '₹50,000 - ₹1,50,000/year',
    description: 'Bachelor of Commerce - comprehensive commerce education covering accounting, finance, and economics.',
    career_opportunities: ['Accountant', 'Financial Analyst', 'Tax Consultant', 'Banking Professional', 'CA/CS/CMA'],
    salary_insights: { entry: '2.5-4 LPA', mid: '5-10 LPA', senior: '15-30 LPA' },
    partner_colleges: ['Marwadi University', 'Brindavan Group', 'Primus B School'],
  },
  {
    id: '11',
    name: 'BCA',
    slug: 'bca',
    category: 'Computer Applications',
    duration: '3 Years',
    eligibility: '10+2 with any stream, 45% minimum',
    fees_range: '₹80,000 - ₹2,00,000/year',
    description: 'Bachelor of Computer Applications - software development and IT fundamentals.',
    career_opportunities: ['Software Developer', 'Web Developer', 'Database Administrator', 'System Analyst', 'IT Consultant'],
    salary_insights: { entry: '3-5 LPA', mid: '6-12 LPA', senior: '15-30 LPA' },
    partner_colleges: ['Marwadi University', 'Bangalore Technological Institute', 'Brindavan Group'],
  },
  {
    id: '12',
    name: 'MCA',
    slug: 'mca',
    category: 'Computer Applications',
    duration: '2 Years',
    eligibility: 'BCA/B.Sc CS with 50% minimum',
    fees_range: '₹1,50,000 - ₹3,00,000/year',
    description: 'Master of Computer Applications - advanced computing with specialization in emerging technologies.',
    career_opportunities: ['Software Architect', 'Data Engineer', 'Cloud Specialist', 'AI/ML Engineer', 'Technical Lead'],
    salary_insights: { entry: '5-8 LPA', mid: '10-20 LPA', senior: '25-50 LPA' },
    partner_colleges: ['Marwadi University', 'Bangalore Technological Institute'],
  },
  {
    id: '13',
    name: 'B.Tech - Biotechnology',
    slug: 'btech-biotechnology',
    category: 'Engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCB/PCM, 50% minimum',
    fees_range: '₹2,00,000 - ₹4,00,000/year',
    description: 'B.Tech in Biotechnology combining biology and technology for research and development.',
    career_opportunities: ['Biotech Engineer', 'Research Scientist', 'Quality Analyst', 'Lab Manager'],
    salary_insights: { entry: '3.5-5 LPA', mid: '6-12 LPA', senior: '15-25 LPA' },
    partner_colleges: ['Marwadi University', 'Bangalore Technological Institute'],
  },
  {
    id: '14',
    name: 'BAMS',
    slug: 'bams',
    category: 'Medical',
    duration: '5.5 Years',
    eligibility: '10+2 with PCB, NEET qualified',
    fees_range: '₹3,00,000 - ₹8,00,000/year',
    description: 'Bachelor of Ayurvedic Medicine and Surgery - traditional Indian medicine system.',
    career_opportunities: ['Ayurvedic Doctor', 'Research Officer', 'Medical Officer', 'Lecturer'],
    salary_insights: { entry: '4-6 LPA', mid: '8-15 LPA', senior: '20-35 LPA' },
    partner_colleges: ['Akash Medical College', 'Sridevi Medical College'],
  },
  {
    id: '15',
    name: 'BHMS',
    slug: 'bhms',
    category: 'Medical',
    duration: '5.5 Years',
    eligibility: '10+2 with PCB, NEET qualified',
    fees_range: '₹2,50,000 - ₹6,00,000/year',
    description: 'Bachelor of Homeopathic Medicine and Surgery - alternative medicine practice.',
    career_opportunities: ['Homeopathic Doctor', 'Medical Officer', 'Researcher', 'Consultant'],
    salary_insights: { entry: '3-5 LPA', mid: '6-12 LPA', senior: '15-25 LPA' },
    partner_colleges: ['Akash Medical College'],
  },
  {
    id: '16',
    name: 'BPT - Physiotherapy',
    slug: 'bpt',
    category: 'Allied Health Sciences',
    duration: '4 Years',
    eligibility: '10+2 with PCB, 50% minimum',
    fees_range: '₹1,00,000 - ₹2,50,000/year',
    description: 'Bachelor of Physiotherapy - rehabilitation and physical therapy education.',
    career_opportunities: ['Physiotherapist', 'Sports Therapist', 'Rehabilitation Specialist', 'Clinical Researcher'],
    salary_insights: { entry: '3-5 LPA', mid: '6-12 LPA', senior: '15-25 LPA' },
    partner_colleges: ['Sparsh Hospital', 'Sri Shankara Cancer Hospital'],
  },
  {
    id: '17',
    name: 'B.Sc - Optometry',
    slug: 'bsc-optometry',
    category: 'Allied Health Sciences',
    duration: '4 Years',
    eligibility: '10+2 with PCB, 50% minimum',
    fees_range: '₹80,000 - ₹2,00,000/year',
    description: 'Bachelor of Science in Optometry - eye care and vision science education.',
    career_opportunities: ['Optometrist', 'Eye Specialist', 'Clinical Researcher', 'Lens Consultant'],
    salary_insights: { entry: '3-5 LPA', mid: '6-10 LPA', senior: '12-20 LPA' },
    partner_colleges: ['Sparsh Hospital', 'Sridevi Medical College'],
  },
  {
    id: '18',
    name: 'D.Pharm',
    slug: 'dpharm',
    category: 'Pharmacy',
    duration: '2 Years',
    eligibility: '10+2 with PCB/PCM, 45% minimum',
    fees_range: '₹50,000 - ₹1,50,000/year',
    description: 'Diploma in Pharmacy - entry-level pharmaceutical education.',
    career_opportunities: ['Pharmacist', 'Medical Representative', 'Quality Control', 'Retail Pharmacy'],
    salary_insights: { entry: '2-3.5 LPA', mid: '4-7 LPA', senior: '10-15 LPA' },
    partner_colleges: ['Sridevi Medical College', 'Brindavan Group'],
  },
  {
    id: '19',
    name: 'M.Pharm',
    slug: 'mpharm',
    category: 'Pharmacy',
    duration: '2 Years',
    eligibility: 'B.Pharm with 55% minimum',
    fees_range: '₹1,50,000 - ₹3,00,000/year',
    description: 'Master of Pharmacy - advanced pharmaceutical research and development.',
    career_opportunities: ['Research Scientist', 'Formulation Scientist', 'Regulatory Manager', 'PhD Researcher'],
    salary_insights: { entry: '5-8 LPA', mid: '10-18 LPA', senior: '20-35 LPA' },
    partner_colleges: ['Sridevi Medical College'],
  },
  {
    id: '20',
    name: 'M.Tech',
    slug: 'mtech',
    category: 'Engineering',
    duration: '2 Years',
    eligibility: 'B.Tech with 60% minimum, GATE qualified',
    fees_range: '₹1,50,000 - ₹3,50,000/year',
    description: 'Master of Technology - advanced engineering specialization.',
    career_opportunities: ['R&D Engineer', 'Technical Lead', 'Professor', 'Project Manager'],
    salary_insights: { entry: '6-10 LPA', mid: '12-20 LPA', senior: '25-50 LPA' },
    partner_colleges: ['Marwadi University', 'Bangalore Technological Institute'],
  },
 
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    college: 'Akash Medical College',
    course: 'MBBS',
    year: '2023',
    rating: 5,
    text: 'Vidhyarthi Sewa helped me secure admission in my dream medical college. Their guidance throughout the NEET counseling process was invaluable. I\'m now pursuing MBBS at Akash Medical College!',
    placement: { company: 'Apollo Hospitals', package: '12 LPA' },
  },
  {
    id: '2',
    name: 'Priya Patel',
    college: 'Bangalore Technological Institute',
    course: 'B.Tech CSE',
    year: '2022',
    rating: 5,
    text: 'The career counseling session helped me realize my potential in Computer Science. From college selection to admission, Vidhyarthi Sewa was with me at every step. Placed at Amazon now!',
    placement: { company: 'Amazon', package: '18 LPA' },
  },
  {
    id: '3',
    name: 'Amit Kumar',
    college: 'Primus B School',
    course: 'MBA',
    year: '2023',
    rating: 5,
    text: 'I was confused about which B-School to choose. Vidhyarthi Sewa\'s team analyzed my profile and suggested Primus B School. Best decision ever! Got placed at Deloitte with a great package.',
    placement: { company: 'Deloitte', package: '14 LPA' },
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    college: 'Sridevi Medical College',
    course: 'B.Sc Nursing',
    year: '2022',
    rating: 5,
    text: 'As a nursing aspirant, I needed guidance on the best colleges. Vidhyarthi Sewa not only helped with admission but also with hostel arrangements. Forever grateful!',
    placement: { company: 'Fortis Healthcare', package: '6 LPA' },
  },
  {
    id: '5',
    name: 'Vikram Singh',
    college: 'Marwadi University',
    course: 'B.Tech Mechanical',
    year: '2023',
    rating: 4,
    text: 'The documentation support was excellent. They handled all the paperwork while I focused on my studies. Now studying at one of the best universities in Gujarat.',
    placement: { company: 'Tata Motors', package: '8 LPA' },
  },
  {
    id: '6',
    name: 'Ananya Gupta',
    college: 'Brindavan Group',
    course: 'BBA',
    year: '2022',
    rating: 5,
    text: 'From confused about my career to confidently pursuing BBA - Vidhyarthi Sewa transformed my journey. Their scholarship assistance also helped reduce my fees significantly.',
    placement: { company: 'HDFC Bank', package: '5.5 LPA' },
  },
];

// --- SMART INDIAN ACADEMIC YEAR LOGIC ---
const today = new Date();
const currentMonth = today.getMonth(); // 0 is Jan, 11 is Dec
let baseYear = today.getFullYear();

// In India, admission cycles typically close by October. 
// If it is November (10) or December (11), automatically show next year's admission guides.
const admissionYear = currentMonth >= 10 ? baseYear + 1 : baseYear;
const academicSession = `${admissionYear}-${(admissionYear + 1).toString().slice(-2)}`;
// ----------------------------------------

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: `KCET ${admissionYear}: Complete Admission Guide for Karnataka Students`,
    slug: 'kcet-complete-admission-guide',
    excerpt: `Everything you need to know about KCET ${admissionYear} - eligibility, important dates, application process, and top colleges.`,
    category: 'KCET Guidance',
    author: 'Dr. Rajesh Kumar',
    published_at: `${baseYear}-06-15`, 
    read_time: '8 min read',
    tags: ['KCET', 'Engineering', 'Karnataka', 'Admission'],
    content: `
      <p>The Karnataka Common Entrance Test (KCET) is the ultimate gateway for students domiciled in Karnataka looking to secure seats in professional courses like Engineering, Pharmacy, and Agriculture. Here is your comprehensive roadmap for the ${academicSession} academic session.</p>
      
      <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">1. Eligibility Criteria</h3>
      <p>Before applying, ensure you meet the strict criteria set by the Karnataka Examinations Authority (KEA):</p>
      <ul class="list-disc pl-5 space-y-2 mt-4 mb-8">
        <li><strong>Academic:</strong> Must have passed the 2nd PUC / 12th standard examination.</li>
        <li><strong>Subjects:</strong> Physics and Mathematics are compulsory, along with Chemistry/Biology/Biotechnology as an optional subject.</li>
        <li><strong>Marks:</strong> Minimum 45% aggregate (40% for SC/ST/OBC).</li>
        <li><strong>Domicile:</strong> Must have studied and passed from a recognized institution in Karnataka for a minimum period of 7 years.</li>
      </ul>

      <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">2. Important Dates (Tentative)</h3>
      <p>Missing a deadline can cost you an entire academic year. Keep these timelines in mind for ${admissionYear}:</p>
      <ul class="list-disc pl-5 space-y-2 mt-4 mb-8">
        <li><strong>Application Opens:</strong> Second week of February ${admissionYear}</li>
        <li><strong>Admit Card Release:</strong> First week of April ${admissionYear}</li>
        <li><strong>Examination Dates:</strong> Third week of April ${admissionYear}</li>
        <li><strong>Results Declaration:</strong> First week of June ${admissionYear}</li>
      </ul>

      <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">3. Top Colleges Accepting KCET</h3>
      <p>A good KCET rank opens doors to prestigious institutions. Historically, the top choices include RV College of Engineering, BMS College of Engineering, Ramaiah Institute of Technology (MSRIT), and PES University.</p>

      <div class="bg-amber-50 rounded-2xl p-6 border border-amber-100 my-8">
        <h4 class="flex items-center gap-2 font-bold text-amber-800 text-lg mb-2">💡 Pro Tip from our Counselors</h4>
        <p class="text-amber-700 text-sm m-0">Do not wait for your 12th board results to start your KCET preparation. The syllabus heavily overlaps, but KCET requires high-speed problem-solving skills that take months to develop. Focus on taking timed mock tests starting in January!</p>
      </div>
    `,
  },
  {
    id: '2',
    title: `NEET ${admissionYear}: Last Minute Preparation Tips & College Selection Strategy`,
    slug: 'neet-preparation-tips',
    excerpt: `Expert tips for NEET ${admissionYear} preparation and how to strategically select medical colleges based on your expected rank.`,
    category: 'NEET Guidance',
    author: 'Dr. Priya Sharma',
    published_at: `${baseYear}-06-10`,
    read_time: '10 min read',
    tags: ['NEET', 'Medical', 'Preparation', 'Tips'],
    content: `
      <p>With over 20 lakh students competing for limited medical seats, NEET is arguably the most competitive exam in India. As we approach NEET ${admissionYear}, your strategy matters just as much as your knowledge.</p>
      
      <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Last-Minute Preparation Strategy</h3>
      <ul class="list-disc pl-5 space-y-2 mt-4 mb-8">
        <li><strong>NCERT is your Bible:</strong> In Biology, 90% of the questions are directly framed from NCERT lines. Read the summaries, diagrams, and "points to ponder" carefully.</li>
        <li><strong>Formula Sheets:</strong> For Physics and Physical Chemistry, keep a consolidated 5-page formula sheet. Revise this every morning.</li>
        <li><strong>Stop Learning New Concepts:</strong> In the final 30 days, absolutely do not pick up new, heavy topics. Consolidate what you already know to reduce negative marking.</li>
      </ul>

      <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">College Selection Framework</h3>
      <p>Scoring well is only half the battle; filling out your counseling preference list correctly is the other half.</p>
      <ol class="list-decimal pl-5 space-y-2 mt-4 mb-8">
        <li><strong>Analyze Previous Cutoffs:</strong> Look at the state quota vs. All India Quota (AIQ) cutoffs for the past 3 years.</li>
        <li><strong>Factor in Bonds:</strong> State-run colleges often have rural service bonds (ranging from 1 to 5 years) and high penalty amounts. Weigh this before choosing a college in a different state.</li>
        <li><strong>PG Quota Advantage:</strong> Colleges affiliated with large hospitals or central institutes often offer internal quotas for PG admissions—a massive advantage for your future.</li>
      </ol>

      <div class="bg-amber-50 rounded-2xl p-6 border border-amber-100 my-8">
        <h4 class="flex items-center gap-2 font-bold text-amber-800 text-lg mb-2">💡 Pro Tip from our Counselors</h4>
        <p class="text-amber-700 text-sm m-0">If your expected score is on the borderline for a Government Medical College, ensure you participate actively in the Mop-Up rounds and Stray Vacancy rounds. Many students abandon counseling early out of panic, leaving unexpected seats available for patient candidates.</p>
      </div>
    `,
  },
  {
    id: '3',
    title: `Top 10 Engineering Colleges in Bangalore for the ${academicSession} Session`,
    slug: 'top-engineering-colleges-bangalore',
    excerpt: `Discover affordable yet quality engineering colleges in Bangalore for the upcoming ${academicSession} academic year.`,
    category: 'College Comparisons',
    author: 'Amit Verma',
    published_at: `${baseYear}-06-05`,
    read_time: '7 min read',
    tags: ['Engineering', 'Bangalore', 'Affordable', 'Colleges'],
    content: `
      <p>Bangalore is the Silicon Valley of India, making it the premier destination for aspiring engineers. However, with hundreds of colleges, finding the right balance of affordable fees, strong academics, and high placement rates for the ${academicSession} session can be tricky.</p>
      
      <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">What to Look For</h3>
      <p>When evaluating an engineering college, look beyond the shiny brochures. The most critical metrics are:</p>
      <ul class="list-disc pl-5 space-y-2 mt-4 mb-8">
        <li><strong>Average Package:</strong> Do not fall for the "Highest Package" trap. A single 40 LPA package does not represent the batch. Look for the median/average package (usually around 4.5 to 7 LPA for mid-tier colleges).</li>
        <li><strong>Industry Tie-ups:</strong> Colleges with Centers of Excellence (CoE) backed by companies like IBM, AWS, or Cisco provide better hands-on training.</li>
        <li><strong>Location:</strong> Colleges closer to IT hubs (like Electronic City or Whitefield) often have better internship opportunities and guest lectures from industry professionals.</li>
      </ul>

      <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Top Budget-Friendly Picks</h3>
      <p>While top-tier private universities can charge upwards of ₹4 Lakhs per year, several colleges provide excellent ROI (Return on Investment) through KCET/COMEDK quotas:</p>
      <ul class="list-disc pl-5 space-y-2 mt-4 mb-8">
        <li><strong>Bangalore Technological Institute (BTI):</strong> Known for its strong CSE department and consistent IT placements.</li>
        <li><strong>Brindavan Group of Institutions:</strong> Offers great multi-disciplinary exposure and a highly active placement cell.</li>
      </ul>

      <div class="bg-amber-50 rounded-2xl p-6 border border-amber-100 my-8">
        <h4 class="flex items-center gap-2 font-bold text-amber-800 text-lg mb-2">💡 Pro Tip from our Counselors</h4>
        <p class="text-amber-700 text-sm m-0">If you are aiming for CS/IT but don't have the rank for top colleges, consider allied branches like AI/ML, Data Science, or Information Science. The syllabus is 85% identical to core Computer Science, and you will be eligible for the exact same IT placements!</p>
      </div>
    `,
  },
  {
    id: '4',
    title: 'How to Choose Between MBBS and BDS: A Comprehensive Comparison',
    slug: 'mbbs-vs-bds-comparison',
    excerpt: 'Confused between MBBS and BDS? This detailed comparison covers career scope, salary, work-life balance, and future opportunities.',
    category: 'Career Tips',
    author: 'Dr. Neha Gupta',
    published_at: `${baseYear}-05-28`,
    read_time: '12 min read',
    tags: ['MBBS', 'BDS', 'Medical', 'Career'],
    content: `
      <p>Every year, thousands of medical aspirants find themselves at a crossroads: "If I don't get an MBBS seat, should I take BDS or take a drop year?" Let's break down the realities of both paths to help you make an informed decision.</p>
      
      <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Academic Journey & Rigor</h3>
      <p><strong>MBBS (5.5 Years):</strong> Covers the entire human anatomy, pharmacology, and surgery. The syllabus is vast, exhausting, and requires rigorous hospital rotations. After MBBS, specialization (MD/MS) is almost mandatory today to build a lucrative career.</p>
      <p><strong>BDS (5 Years):</strong> Highly focused on oral anatomy, maxillofacial surgery, and dental materials. BDS is incredibly skill-based; you will spend hours carving wax teeth and doing practical lab work. Specialization (MDS) is valuable but not strictly mandatory to start a private practice.</p>

      <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Career Scope & Financials</h3>
      <table class="min-w-full bg-white border border-slate-200 mt-4 mb-8 rounded-lg overflow-hidden">
        <thead class="bg-slate-50">
          <tr>
            <th class="py-3 px-4 border-b text-left text-sm font-bold text-slate-700">Aspect</th>
            <th class="py-3 px-4 border-b text-left text-sm font-bold text-slate-700">MBBS</th>
            <th class="py-3 px-4 border-b text-left text-sm font-bold text-slate-700">BDS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="py-3 px-4 border-b text-sm text-slate-600">Starting Salary (Fresher)</td>
            <td class="py-3 px-4 border-b text-sm text-slate-600">₹60k - ₹90k / month</td>
            <td class="py-3 px-4 border-b text-sm text-slate-600">₹20k - ₹40k / month</td>
          </tr>
          <tr>
            <td class="py-3 px-4 border-b text-sm text-slate-600">Setup Cost for Private Clinic</td>
            <td class="py-3 px-4 border-b text-sm text-slate-600">Low (Stethoscope & basic tools)</td>
            <td class="py-3 px-4 border-b text-sm text-slate-600">Very High (Dental chair, X-ray, tools)</td>
          </tr>
          <tr>
            <td class="py-3 px-4 border-b text-sm text-slate-600">Work-Life Balance</td>
            <td class="py-3 px-4 border-b text-sm text-slate-600">Poor (Night shifts, emergencies)</td>
            <td class="py-3 px-4 border-b text-sm text-slate-600">Excellent (Fixed clinic hours)</td>
          </tr>
        </tbody>
      </table>

      <div class="bg-amber-50 rounded-2xl p-6 border border-amber-100 my-8">
        <h4 class="flex items-center gap-2 font-bold text-amber-800 text-lg mb-2">💡 Pro Tip from our Counselors</h4>
        <p class="text-amber-700 text-sm m-0">Do not take BDS just as a "backup plan" if you hate dental work. Dentistry requires steady hands, artistic skill, and business acumen to run a clinic. If your true passion is general medicine, taking a drop year for MBBS is a better long-term choice.</p>
      </div>
    `,
  },
  {
    id: '5',
    title: `Scholarship Opportunities for Engineering Students in Karnataka ${admissionYear}`,
    slug: 'scholarships-engineering-karnataka',
    excerpt: `Complete list of scholarships available for engineering students in Karnataka for ${admissionYear}, including government and private scholarships.`,
    category: 'Scholarship Information',
    author: 'Rahul Mehta',
    published_at: `${baseYear}-05-20`,
    read_time: '6 min read',
    tags: ['Scholarship', 'Engineering', 'Karnataka', 'Financial Aid'],
    content: `
      <p>Quality engineering education is expensive, but financial constraints should never stop a deserving student. For the ${academicSession} academic year, the Government of Karnataka, along with various private trusts, has opened multiple scholarship portals.</p>
      
      <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">1. Government Scholarships (SSP Portal)</h3>
      <p>The State Scholarship Portal (SSP) is a unified platform for all Karnataka government scholarships:</p>
      <ul class="list-disc pl-5 space-y-2 mt-4 mb-8">
        <li><strong>Vidyasiri Scholarship (ePass):</strong> Aimed at backward class (OBC) students. It provides a monthly stipend to students who do not secure government hostel accommodation.</li>
        <li><strong>SC/ST Post-Matric Scholarship:</strong> Covers almost the entire tuition fee for SC/ST students whose family income is below ₹2.5 Lakhs per annum.</li>
        <li><strong>Minority Welfare Scholarship:</strong> For students belonging to Muslim, Christian, Jain, Buddhist, Sikh, and Parsi communities.</li>
      </ul>

      <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">2. Top Private Corporate Scholarships</h3>
      <p>Many corporations fund engineering students through their CSR initiatives. Keep an eye out for these in August/September:</p>
      <ul class="list-disc pl-5 space-y-2 mt-4 mb-8">
        <li><strong>Reliance Foundation Scholarships:</strong> Offers up to ₹2 Lakhs over the degree duration for meritorious first-year students.</li>
        <li><strong>Foundation for Excellence (FFE):</strong> Provides financial aid and intensive soft-skills training specifically to students entering B.E/B.Tech.</li>
        <li><strong>Siemens Scholarship Program:</strong> Targets first-year students of government colleges, providing tuition fees and holistic development training.</li>
      </ul>

      <div class="bg-amber-50 rounded-2xl p-6 border border-amber-100 my-8">
        <h4 class="flex items-center gap-2 font-bold text-amber-800 text-lg mb-2">💡 Pro Tip from our Counselors</h4>
        <p class="text-amber-700 text-sm m-0">The biggest mistake students make is lacking proper documentation. Get your Income Certificate, Caste Certificate, and Aadhaar-Bank mapping (NPCI linking) sorted in May/June before you even apply to colleges. Missing a deadline due to a pending certificate is a common tragedy.</p>
      </div>
    `,
  },
  {
    id: '6',
    title: 'Nursing Career in India: Scope, Salary, and Growth Opportunities',
    slug: 'nursing-career-india',
    excerpt: 'Explore the growing field of nursing in India. Learn about career paths, salary expectations, and international opportunities.',
    category: 'Career Tips',
    author: 'Sister Mary Thomas',
    published_at: `${baseYear}-05-15`,
    read_time: '9 min read',
    tags: ['Nursing', 'Career', 'Healthcare', 'India'],
    content: `
      <p>The global healthcare industry is facing a massive shortage of trained professionals. Today, a degree in Nursing (B.Sc Nursing or GNM) is one of the most secure and globally respected career paths available to science students.</p>
      
      <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Understanding the Degrees</h3>
      <ul class="list-disc pl-5 space-y-2 mt-4 mb-8">
        <li><strong>B.Sc Nursing (4 Years):</strong> A comprehensive degree program. Highly preferred by premium corporate hospitals and foreign healthcare recruiters. Eligibility generally requires 10+2 with Physics, Chemistry, and Biology.</li>
        <li><strong>GNM (3 Years):</strong> General Nursing and Midwifery is a diploma course. It is faster to complete and gets you into the workforce quicker, but promotions to senior administrative roles are harder compared to a B.Sc graduate.</li>
      </ul>

      <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">The Global Opportunity</h3>
      <p>While starting salaries for nurses in Indian private hospitals range from ₹18,000 to ₹35,000 per month, the real financial growth lies abroad.</p>
      <p>Countries like the UK, Canada, Australia, and the Middle East heavily recruit Indian nurses. After clearing exams like the NCLEX-RN or OET/IELTS, registered Indian nurses often secure starting packages ranging from ₹2.5 Lakhs to ₹4 Lakhs <em>per month</em> internationally, with excellent work-life balance and benefits.</p>

      <div class="bg-amber-50 rounded-2xl p-6 border border-amber-100 my-8">
        <h4 class="flex items-center gap-2 font-bold text-amber-800 text-lg mb-2">💡 Pro Tip from our Counselors</h4>
        <p class="text-amber-700 text-sm m-0">If you are planning to eventually work abroad, always opt for B.Sc Nursing over GNM. Most Western countries require a formal 4-year degree for Visa processing and nursing board registrations. Also, ensure your college is strictly approved by the Indian Nursing Council (INC).</p>
      </div>
    `,
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Ramakrishna',
    role: 'Founder & CEO',
    expertise: 'Educational Consulting, Career Guidance',
    bio: 'With over 15 years of experience in education, Ramakrishna founded Vidhyarthi Sewa to help students find their perfect educational path.',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    role: 'Head of Admissions',
    expertise: 'College Admissions, Documentation',
    bio: 'Priya has helped over 5,000 students secure admissions in top colleges across India.',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '3',
    name: 'Amit Verma',
    role: 'Career Counselor',
    expertise: 'Career Assessment, Stream Selection',
    bio: 'Certified career counselor with expertise in psychometric testing and student profiling.',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '4',
    name: 'Dr. Neha Gupta',
    role: 'Medical Admissions Expert',
    expertise: 'NEET Counseling, Medical Admissions',
    bio: 'Former medical college professor with deep understanding of medical admission processes.',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '5',
    name: 'Rahul Mehta',
    role: 'Technical Lead',
    expertise: 'Engineering Admissions, Technology',
    bio: 'IIT alumnus guiding students toward top engineering institutions.',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '6',
    name: 'Sneha Reddy',
    role: 'Student Relations Manager',
    expertise: 'Student Support, Hostel & Travel',
    bio: 'Dedicated to ensuring smooth transition for outstation students.',
    linkedin: 'https://linkedin.com',
  },
];

export const FAQS: FAQ[] = [
  {
    id: '1',
    question: 'What is the admission process for engineering colleges through Vidhyarthi Sewa?',
    answer: 'Our admission process involves: 1) Free counseling session to understand your goals, 2) Career assessment and college shortlisting, 3) Application and documentation support, 4) Follow-up with colleges, 5) Admission confirmation and fee payment guidance.',
    category: 'Admission Process',
  },
  {
    id: '2',
    question: 'Do you charge for the initial counseling session?',
    answer: 'No, the initial counseling session is completely free. We believe every student deserves guidance without financial barriers. Our counselors will understand your profile and provide personalized recommendations at no cost.',
    category: 'Admission Process',
  },
  {
    id: '3',
    question: 'Which courses do you provide admission support for?',
    answer: 'We provide admission support for Engineering (B.Tech, M.Tech), Medical (MBBS, BDS, BAMS), Nursing (B.Sc Nursing, GNM), Allied Health Sciences, Pharmacy (B.Pharm, D.Pharm), Management (BBA, MBA), Commerce (B.Com), and Computer Applications (BCA, MCA).',
    category: 'Courses',
  },
  {
    id: '4',
    question: 'What are the fees for your services?',
    answer: 'Our counseling services are free. For documentation and admission processing, we charge a nominal fee ranging from ₹5,000 to ₹25,000 depending on the course and college. Scholarship assistance is included at no extra cost.',
    category: 'Fees',
  },
  {
    id: '5',
    question: 'Can you help with scholarship applications?',
    answer: 'Yes, we provide comprehensive scholarship assistance including identifying suitable scholarships, helping with application preparation, documentation, and follow-up. We\'ve helped students secure scholarships worth over ₹5 crores.',
    category: 'Scholarships',
  },
  {
    id: '6',
    question: 'Do you provide hostel accommodation assistance?',
    answer: 'Yes, we assist with hostel bookings for outstation students. We have tie-ups with verified hostels and PG accommodations near partner colleges. Airport and railway station pickup services are also available.',
    category: 'Hostel',
  },
  {
    id: '7',
    question: 'What is your success rate for admissions?',
    answer: 'We have a 98% admission success rate. Our experienced team ensures proper documentation, timely applications, and effective follow-up with colleges to maximize your chances of securing admission.',
    category: 'Admission Process',
  },
  {
    id: '8',
    question: 'How long does the admission process take?',
    answer: 'The timeline varies by course and college. Typically, the entire process takes 2-6 weeks from counseling to admission confirmation. Medical admissions may take longer due to counseling procedures.',
    category: 'Admission Process',
  },
];

export const CAREER_ROADMAP_STEPS = [
  { step: 1, title: 'Discover', description: 'Career Assessment & Aptitude Test', icon: 'Search' },
  { step: 2, title: 'Plan', description: 'Stream Selection & Course Recommendations', icon: 'Map' },
  { step: 3, title: 'Apply', description: 'College Selection & Documentation', icon: 'FileText' },
  { step: 4, title: 'Secure', description: 'Admission Confirmation & Offer Letter', icon: 'CheckCircle' },
  { step: 5, title: 'Grow', description: 'Placement Support & Career Mentorship', icon: 'TrendingUp' },
];

export const ADMISSION_STEPS = [
  { step: 1, title: 'Free Counseling Session', description: 'One-on-one discussion with our expert counselors to understand your goals, academic background, and preferences.' },
  { step: 2, title: 'Career Assessment', description: 'Comprehensive aptitude test and personality analysis to identify your strengths and ideal career paths.' },
  { step: 3, title: 'College Shortlisting', description: 'Personalized list of colleges based on your profile, budget, location preference, and career goals.' },
  { step: 4, title: 'Application & Documentation', description: 'End-to-end support for filling applications, document verification, and submission to colleges.' },
  { step: 5, title: 'Admission Confirmation', description: 'Follow-up with colleges, interview preparation, and final admission offer letter.' },
  { step: 6, title: 'Post-Admission Support', description: 'Hostel booking, travel arrangements, scholarship applications, and ongoing mentorship.' },
];

export const COURSE_CATEGORIES = [
  'All', 'Engineering', 'Medical', 'Nursing', 'Allied Health Sciences', 'Pharmacy', 'Management', 'Commerce', 'Computer Applications', 'PU (Pre-University)',
];

export const COLLEGE_CATEGORIES = [
  'All', 'Engineering', 'Medical', 'Nursing', 'Management', 'Multi-Disciplinary',
];

export const BLOG_CATEGORIES = [
  'All', 'Admission Updates', 'KCET Guidance', 'NEET Guidance', 'Career Tips', 'Scholarship Information', 'College Comparisons',
];

export const ASSESSMENT_QUESTIONS = [
  {
    id: 'q1',
    question: 'Which subjects do you enjoy the most?',
    options: [
      { text: 'Mathematics & Physics', stream: 'Engineering', score: 10 },
      { text: 'Biology & Chemistry', stream: 'Medical', score: 10 },
      { text: 'Economics & Business', stream: 'Management', score: 10 },
      { text: 'Computers & Technology', stream: 'Computer Applications', score: 10 },
    ],
  },
  {
    id: 'q2',
    question: 'What type of work environment do you prefer?',
    options: [
      { text: 'Technical & Problem-solving', stream: 'Engineering', score: 10 },
      { text: 'Helping & Caring for others', stream: 'Medical', score: 10 },
      { text: 'Leading & Managing teams', stream: 'Management', score: 10 },
      { text: 'Creative & Innovative', stream: 'Computer Applications', score: 10 },
    ],
  },
  {
    id: 'q3',
    question: 'What is your preferred work style?',
    options: [
      { text: 'Hands-on building & creating', stream: 'Engineering', score: 10 },
      { text: 'Research & Analysis', stream: 'Medical', score: 10 },
      { text: 'Communication & Negotiation', stream: 'Management', score: 10 },
      { text: 'Coding & Development', stream: 'Computer Applications', score: 10 },
    ],
  },
  {
    id: 'q4',
    question: 'Which of these activities interests you most?',
    options: [
      { text: 'Designing machines or structures', stream: 'Engineering', score: 10 },
      { text: 'Studying diseases & treatments', stream: 'Medical', score: 10 },
      { text: 'Starting a business', stream: 'Management', score: 10 },
      { text: 'Building apps or websites', stream: 'Computer Applications', score: 10 },
    ],
  },
  {
    id: 'q5',
    question: 'What is your academic strength?',
    options: [
      { text: 'Problem-solving with numbers', stream: 'Engineering', score: 10 },
      { text: 'Memorization & understanding concepts', stream: 'Medical', score: 10 },
      { text: 'Critical thinking & strategy', stream: 'Management', score: 10 },
      { text: 'Logical reasoning & algorithms', stream: 'Computer Applications', score: 10 },
    ],
  },
  {
    id: 'q6',
    question: 'How do you handle stress?',
    options: [
      { text: 'Break problems into smaller parts', stream: 'Engineering', score: 10 },
      { text: 'Stay calm and focused on patients', stream: 'Medical', score: 10 },
      { text: 'Delegate and prioritize tasks', stream: 'Management', score: 10 },
      { text: 'Debug and find solutions', stream: 'Computer Applications', score: 10 },
    ],
  },
  {
    id: 'q7',
    question: 'What motivates you professionally?',
    options: [
      { text: 'Creating innovative solutions', stream: 'Engineering', score: 10 },
      { text: 'Saving lives & improving health', stream: 'Medical', score: 10 },
      { text: 'Building successful organizations', stream: 'Management', score: 10 },
      { text: 'Building impactful technology', stream: 'Computer Applications', score: 10 },
    ],
  },
  {
    id: 'q8',
    question: 'Which skill would you like to develop most?',
    options: [
      { text: 'Technical design & analysis', stream: 'Engineering', score: 10 },
      { text: 'Clinical diagnosis & care', stream: 'Medical', score: 10 },
      { text: 'Leadership & decision making', stream: 'Management', score: 10 },
      { text: 'Programming & system design', stream: 'Computer Applications', score: 10 },
    ],
  },
  {
    id: 'q9',
    question: 'What is your ideal salary expectation after 5 years?',
    options: [
      { text: '₹10-15 LPA', stream: 'Engineering', score: 10 },
      { text: '₹15-25 LPA', stream: 'Medical', score: 10 },
      { text: '₹12-20 LPA', stream: 'Management', score: 10 },
      { text: '₹15-30 LPA', stream: 'Computer Applications', score: 10 },
    ],
  },
  {
    id: 'q10',
    question: 'Which industry excites you the most?',
    options: [
      { text: 'Manufacturing & Infrastructure', stream: 'Engineering', score: 10 },
      { text: 'Healthcare & Pharmaceuticals', stream: 'Medical', score: 10 },
      { text: 'Finance & Consulting', stream: 'Management', score: 10 },
      { text: 'IT & Technology', stream: 'Computer Applications', score: 10 },
    ],
  },
];