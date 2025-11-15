/*
  # Database Functions for BeatStars Marketplace
  
  ## Functions Created
  
  ### 1. `increment_plays` - Increment beat plays count
  Safely increments the plays_count for a beat
  
  ### 2. `increment_likes` - Increment beat likes count
  Safely increments the likes_count for a beat
  
  ### 3. `decrement_likes` - Decrement beat likes count
  Safely decrements the likes_count for a beat
  
  ### 4. `get_trending_beats` - Get trending beats based on recent activity
  Returns beats sorted by recent plays and likes
  
  ### 5. `search_beats` - Full-text search for beats
  Searches beats by title, description, genre, and tags
*/

-- Function to increment plays count
CREATE OR REPLACE FUNCTION increment_plays(beat_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE beats
  SET plays_count = plays_count + 1
  WHERE id = beat_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment likes count
CREATE OR REPLACE FUNCTION increment_likes(beat_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE beats
  SET likes_count = likes_count + 1
  WHERE id = beat_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrement likes count
CREATE OR REPLACE FUNCTION decrement_likes(beat_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE beats
  SET likes_count = GREATEST(likes_count - 1, 0)
  WHERE id = beat_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get trending beats
CREATE OR REPLACE FUNCTION get_trending_beats(limit_count integer DEFAULT 10)
RETURNS TABLE (
  id uuid,
  title text,
  producer_id uuid,
  description text,
  genre text,
  mood text,
  bpm integer,
  key text,
  duration integer,
  audio_url text,
  waveform_data jsonb,
  cover_image text,
  price_basic numeric,
  price_premium numeric,
  price_exclusive numeric,
  plays_count integer,
  likes_count integer,
  downloads_count integer,
  is_published boolean,
  created_at timestamptz,
  updated_at timestamptz,
  trending_score numeric
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    b.id,
    b.title,
    b.producer_id,
    b.description,
    b.genre,
    b.mood,
    b.bpm,
    b.key,
    b.duration,
    b.audio_url,
    b.waveform_data,
    b.cover_image,
    b.price_basic,
    b.price_premium,
    b.price_exclusive,
    b.plays_count,
    b.likes_count,
    b.downloads_count,
    b.is_published,
    b.created_at,
    b.updated_at,
    (
      (b.plays_count * 0.4) + 
      (b.likes_count * 0.6) + 
      (EXTRACT(EPOCH FROM (now() - b.created_at)) / 86400 * -1)
    ) AS trending_score
  FROM beats b
  WHERE b.is_published = true
  ORDER BY trending_score DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to search beats
CREATE OR REPLACE FUNCTION search_beats(search_query text)
RETURNS TABLE (
  id uuid,
  title text,
  producer_id uuid,
  description text,
  genre text,
  mood text,
  bpm integer,
  key text,
  duration integer,
  audio_url text,
  waveform_data jsonb,
  cover_image text,
  price_basic numeric,
  price_premium numeric,
  price_exclusive numeric,
  plays_count integer,
  likes_count integer,
  downloads_count integer,
  is_published boolean,
  created_at timestamptz,
  updated_at timestamptz
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    b.id,
    b.title,
    b.producer_id,
    b.description,
    b.genre,
    b.mood,
    b.bpm,
    b.key,
    b.duration,
    b.audio_url,
    b.waveform_data,
    b.cover_image,
    b.price_basic,
    b.price_premium,
    b.price_exclusive,
    b.plays_count,
    b.likes_count,
    b.downloads_count,
    b.is_published,
    b.created_at,
    b.updated_at
  FROM beats b
  WHERE 
    b.is_published = true
    AND (
      b.title ILIKE '%' || search_query || '%'
      OR b.description ILIKE '%' || search_query || '%'
      OR b.genre ILIKE '%' || search_query || '%'
      OR b.mood ILIKE '%' || search_query || '%'
      OR EXISTS (
        SELECT 1 FROM beat_tags bt
        WHERE bt.beat_id = b.id
        AND bt.tag ILIKE '%' || search_query || '%'
      )
    )
  ORDER BY b.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
