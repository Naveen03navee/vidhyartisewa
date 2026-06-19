-- Enable RLS
alter table if exists inquiries enable row level security;
alter table if exists callbacks enable row level security;
alter table if exists contacts enable row level security;
alter table if exists assessments enable row level security;

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT,
  tenth_percentage TEXT,
  twelfth_percentage TEXT,
  board TEXT,
  stream TEXT,
  primary_interest TEXT,
  secondary_interest TEXT,
  budget_range TEXT,
  preferred_colleges TEXT[],
  location_preference TEXT,
  hostel_required BOOLEAN DEFAULT FALSE,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'converted', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create callbacks table
CREATE TABLE IF NOT EXISTS callbacks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  best_time TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  course TEXT,
  college TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  answers JSONB NOT NULL,
  recommended_stream TEXT,
  recommended_courses TEXT[],
  suggested_colleges TEXT[],
  salary_insights JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
CREATE POLICY "Allow anonymous inserts" ON inquiries
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON callbacks
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON contacts
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON assessments
  FOR INSERT TO anon WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at);
CREATE INDEX IF NOT EXISTS idx_callbacks_status ON callbacks(status);
