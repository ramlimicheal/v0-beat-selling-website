/*
  # BeatStars Music Marketplace - Core Database Schema
  
  ## Overview
  Complete database schema for a music marketplace platform including beats, users, transactions,
  playlists, and social features.
  
  ## New Tables Created
  
  ### 1. `profiles` - Extended user profile data
    - `id` (uuid, primary key, references auth.users)
    - `username` (text, unique) - User's unique username
    - `full_name` (text) - User's full name
    - `avatar_url` (text) - Profile picture URL
    - `bio` (text) - User biography
    - `is_producer` (boolean) - Producer status flag
    - `is_verified` (boolean) - Verification badge status
    - `social_links` (jsonb) - Social media links
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)
  
  ### 2. `beats` - Core beats/tracks table
    - `id` (uuid, primary key)
    - `title` (text) - Beat title
    - `producer_id` (uuid) - Reference to producer's profile
    - `description` (text) - Beat description
    - `genre` (text) - Music genre
    - `mood` (text) - Beat mood/vibe
    - `bpm` (integer) - Beats per minute
    - `key` (text) - Musical key
    - `duration` (integer) - Duration in seconds
    - `audio_url` (text) - Audio file URL
    - `waveform_data` (jsonb) - Waveform visualization data
    - `cover_image` (text) - Cover art URL
    - `price_basic` (numeric) - Basic license price
    - `price_premium` (numeric) - Premium license price
    - `price_exclusive` (numeric) - Exclusive license price
    - `plays_count` (integer) - Total plays
    - `likes_count` (integer) - Total likes
    - `downloads_count` (integer) - Total downloads
    - `is_published` (boolean) - Publication status
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)
  
  ### 3. `beat_tags` - Tags for beat categorization
    - `id` (uuid, primary key)
    - `beat_id` (uuid) - Reference to beat
    - `tag` (text) - Tag name
    - `created_at` (timestamptz)
  
  ### 4. `favorites` - User favorites/likes
    - `id` (uuid, primary key)
    - `user_id` (uuid) - Reference to user profile
    - `beat_id` (uuid) - Reference to beat
    - `created_at` (timestamptz)
  
  ### 5. `playlists` - User playlists
    - `id` (uuid, primary key)
    - `user_id` (uuid) - Reference to user profile
    - `name` (text) - Playlist name
    - `description` (text) - Playlist description
    - `cover_image` (text) - Playlist cover
    - `is_public` (boolean) - Public/private flag
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)
  
  ### 6. `playlist_beats` - Junction table for playlists and beats
    - `id` (uuid, primary key)
    - `playlist_id` (uuid) - Reference to playlist
    - `beat_id` (uuid) - Reference to beat
    - `position` (integer) - Order in playlist
    - `created_at` (timestamptz)
  
  ### 7. `cart_items` - Shopping cart items
    - `id` (uuid, primary key)
    - `user_id` (uuid) - Reference to user profile
    - `beat_id` (uuid) - Reference to beat
    - `license_type` (text) - License type (basic, premium, exclusive)
    - `quantity` (integer) - Quantity
    - `created_at` (timestamptz)
  
  ### 8. `orders` - Purchase orders
    - `id` (uuid, primary key)
    - `user_id` (uuid) - Reference to user profile
    - `total_amount` (numeric) - Total order amount
    - `status` (text) - Order status
    - `payment_intent_id` (text) - Stripe payment intent ID
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)
  
  ### 9. `order_items` - Individual items in orders
    - `id` (uuid, primary key)
    - `order_id` (uuid) - Reference to order
    - `beat_id` (uuid) - Reference to beat
    - `license_type` (text) - License type purchased
    - `price` (numeric) - Price paid
    - `download_url` (text) - Download link
    - `download_count` (integer) - Number of downloads
    - `created_at` (timestamptz)
  
  ### 10. `reviews` - Beat reviews and ratings
    - `id` (uuid, primary key)
    - `beat_id` (uuid) - Reference to beat
    - `user_id` (uuid) - Reference to user profile
    - `rating` (integer) - Rating 1-5
    - `comment` (text) - Review text
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)
  
  ### 11. `follows` - User following system
    - `id` (uuid, primary key)
    - `follower_id` (uuid) - User doing the following
    - `following_id` (uuid) - User being followed
    - `created_at` (timestamptz)
  
  ### 12. `play_history` - User listening history
    - `id` (uuid, primary key)
    - `user_id` (uuid) - Reference to user profile
    - `beat_id` (uuid) - Reference to beat
    - `played_at` (timestamptz)
  
  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Policies for authenticated users to manage their own data
  - Public read access for published content
  - Producer-specific policies for content management
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  bio text,
  is_producer boolean DEFAULT false,
  is_verified boolean DEFAULT false,
  social_links jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Beats table
CREATE TABLE IF NOT EXISTS beats (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  producer_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  description text,
  genre text,
  mood text,
  bpm integer,
  key text,
  duration integer DEFAULT 0,
  audio_url text,
  waveform_data jsonb DEFAULT '[]'::jsonb,
  cover_image text,
  price_basic numeric(10,2) DEFAULT 24.99,
  price_premium numeric(10,2) DEFAULT 49.99,
  price_exclusive numeric(10,2) DEFAULT 299.99,
  plays_count integer DEFAULT 0,
  likes_count integer DEFAULT 0,
  downloads_count integer DEFAULT 0,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE beats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published beats are viewable by everyone"
  ON beats FOR SELECT
  TO authenticated, anon
  USING (is_published = true OR producer_id = auth.uid());

CREATE POLICY "Producers can insert own beats"
  ON beats FOR INSERT
  TO authenticated
  WITH CHECK (producer_id = auth.uid());

CREATE POLICY "Producers can update own beats"
  ON beats FOR UPDATE
  TO authenticated
  USING (producer_id = auth.uid())
  WITH CHECK (producer_id = auth.uid());

CREATE POLICY "Producers can delete own beats"
  ON beats FOR DELETE
  TO authenticated
  USING (producer_id = auth.uid());

-- Beat tags table
CREATE TABLE IF NOT EXISTS beat_tags (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  beat_id uuid REFERENCES beats(id) ON DELETE CASCADE NOT NULL,
  tag text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(beat_id, tag)
);

ALTER TABLE beat_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Beat tags are viewable by everyone"
  ON beat_tags FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Producers can manage tags for own beats"
  ON beat_tags FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM beats
      WHERE beats.id = beat_tags.beat_id
      AND beats.producer_id = auth.uid()
    )
  );

-- Favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  beat_id uuid REFERENCES beats(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, beat_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own favorites"
  ON favorites FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own favorites"
  ON favorites FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Playlists table
CREATE TABLE IF NOT EXISTS playlists (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  cover_image text,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public playlists are viewable by everyone"
  ON playlists FOR SELECT
  TO authenticated, anon
  USING (is_public = true OR user_id = auth.uid());

CREATE POLICY "Users can manage own playlists"
  ON playlists FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Playlist beats junction table
CREATE TABLE IF NOT EXISTS playlist_beats (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  playlist_id uuid REFERENCES playlists(id) ON DELETE CASCADE NOT NULL,
  beat_id uuid REFERENCES beats(id) ON DELETE CASCADE NOT NULL,
  position integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(playlist_id, beat_id)
);

ALTER TABLE playlist_beats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Playlist beats viewable if playlist is viewable"
  ON playlist_beats FOR SELECT
  TO authenticated, anon
  USING (
    EXISTS (
      SELECT 1 FROM playlists
      WHERE playlists.id = playlist_beats.playlist_id
      AND (playlists.is_public = true OR playlists.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage beats in own playlists"
  ON playlist_beats FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM playlists
      WHERE playlists.id = playlist_beats.playlist_id
      AND playlists.user_id = auth.uid()
    )
  );

-- Cart items table
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  beat_id uuid REFERENCES beats(id) ON DELETE CASCADE NOT NULL,
  license_type text NOT NULL CHECK (license_type IN ('basic', 'premium', 'exclusive')),
  quantity integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, beat_id, license_type)
);

ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cart"
  ON cart_items FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage own cart"
  ON cart_items FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  total_amount numeric(10,2) NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_intent_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  beat_id uuid REFERENCES beats(id) ON DELETE RESTRICT NOT NULL,
  license_type text NOT NULL,
  price numeric(10,2) NOT NULL,
  download_url text,
  download_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  beat_id uuid REFERENCES beats(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(beat_id, user_id)
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Users can create reviews for purchased beats"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own reviews"
  ON reviews FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Follows table
CREATE TABLE IF NOT EXISTS follows (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  following_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Follows are viewable by everyone"
  ON follows FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Users can manage own follows"
  ON follows FOR ALL
  TO authenticated
  USING (follower_id = auth.uid())
  WITH CHECK (follower_id = auth.uid());

-- Play history table
CREATE TABLE IF NOT EXISTS play_history (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  beat_id uuid REFERENCES beats(id) ON DELETE CASCADE NOT NULL,
  played_at timestamptz DEFAULT now()
);

ALTER TABLE play_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own play history"
  ON play_history FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Anyone can record plays"
  ON play_history FOR INSERT
  TO authenticated, anon
  WITH CHECK (user_id IS NULL OR user_id = auth.uid());

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_beats_producer ON beats(producer_id);
CREATE INDEX IF NOT EXISTS idx_beats_genre ON beats(genre);
CREATE INDEX IF NOT EXISTS idx_beats_published ON beats(is_published);
CREATE INDEX IF NOT EXISTS idx_beats_created ON beats(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_beat ON favorites(beat_id);
CREATE INDEX IF NOT EXISTS idx_cart_user ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_beat ON reviews(beat_id);
CREATE INDEX IF NOT EXISTS idx_follows_follower ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following ON follows(following_id);
CREATE INDEX IF NOT EXISTS idx_play_history_user ON play_history(user_id);
CREATE INDEX IF NOT EXISTS idx_play_history_beat ON play_history(beat_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_beats_updated_at BEFORE UPDATE ON beats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_playlists_updated_at BEFORE UPDATE ON playlists
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
