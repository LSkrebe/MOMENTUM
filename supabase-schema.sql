-- MOMENTUM App Database Schema for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  profile_image_url VARCHAR(500),
  level INTEGER DEFAULT 1,
  total_habits_completed INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  supporters_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. habits table
CREATE TABLE habits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  streak_count INTEGER DEFAULT 0,
  completed_today BOOLEAN DEFAULT false,
  supporters_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. supports table
CREATE TABLE supports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  supporter_id UUID REFERENCES users(id) ON DELETE CASCADE,
  habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
  support_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(supporter_id, habit_id, support_date)
);

-- 4. success_stories table
CREATE TABLE success_stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. daily_stats table
CREATE TABLE daily_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE DEFAULT CURRENT_DATE,
  supporters_count INTEGER DEFAULT 0,
  habits_done INTEGER DEFAULT 0,
  supporting_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Create indexes for better performance
CREATE INDEX idx_habits_user_id ON habits(user_id);
CREATE INDEX idx_supports_habit_id ON supports(habit_id);
CREATE INDEX idx_supports_supporter_id ON supports(supporter_id);
CREATE INDEX idx_supports_date ON supports(support_date);
CREATE INDEX idx_success_stories_user_id ON success_stories(user_id);
CREATE INDEX idx_daily_stats_user_date ON daily_stats(user_id, date);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE supports ENABLE ROW LEVEL SECURITY;
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (basic - you can customize these)
-- Users can read all users but only update their own
CREATE POLICY "Users can view all users" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid()::text = id::text);
CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (auth.uid()::text = id::text);

-- Habits policies
CREATE POLICY "Users can view all habits" ON habits FOR SELECT USING (true);
CREATE POLICY "Users can manage own habits" ON habits FOR ALL USING (auth.uid()::text = user_id::text);

-- Supports policies
CREATE POLICY "Users can view all supports" ON supports FOR SELECT USING (true);
CREATE POLICY "Users can create supports" ON supports FOR INSERT WITH CHECK (auth.uid()::text = supporter_id::text);

-- Success stories policies
CREATE POLICY "Users can view all success stories" ON success_stories FOR SELECT USING (true);
CREATE POLICY "Users can create own success stories" ON success_stories FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Daily stats policies
CREATE POLICY "Users can view own daily stats" ON daily_stats FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can manage own daily stats" ON daily_stats FOR ALL USING (auth.uid()::text = user_id::text);

-- Create functions to update counts automatically
CREATE OR REPLACE FUNCTION update_habit_supporters_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE habits 
    SET supporters_count = (
      SELECT COUNT(DISTINCT supporter_id) 
      FROM supports 
      WHERE habit_id = NEW.habit_id
    )
    WHERE id = NEW.habit_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE habits 
    SET supporters_count = (
      SELECT COUNT(DISTINCT supporter_id) 
      FROM supports 
      WHERE habit_id = OLD.habit_id
    )
    WHERE id = OLD.habit_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for supports table
CREATE TRIGGER trigger_update_habit_supporters
  AFTER INSERT OR DELETE ON supports
  FOR EACH ROW
  EXECUTE FUNCTION update_habit_supporters_count();

-- Function to update user supporters count
CREATE OR REPLACE FUNCTION update_user_supporters_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE users 
    SET supporters_count = (
      SELECT COUNT(DISTINCT s.supporter_id) 
      FROM habits h
      JOIN supports s ON h.id = s.habit_id
      WHERE h.user_id = NEW.user_id
    )
    WHERE id = NEW.user_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE users 
    SET supporters_count = (
      SELECT COUNT(DISTINCT s.supporter_id) 
      FROM habits h
      JOIN supports s ON h.id = s.habit_id
      WHERE h.user_id = OLD.user_id
    )
    WHERE id = OLD.user_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for habits table
CREATE TRIGGER trigger_update_user_supporters
  AFTER INSERT OR DELETE ON habits
  FOR EACH ROW
  EXECUTE FUNCTION update_user_supporters_count(); 