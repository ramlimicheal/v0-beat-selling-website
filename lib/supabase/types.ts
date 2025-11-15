export interface Beat {
  id: string
  title: string
  producer_id: string
  description?: string
  genre?: string
  mood?: string
  bpm?: number
  key?: string
  duration: number
  audio_url?: string
  waveform_data?: number[]
  cover_image?: string
  price_basic: number
  price_premium: number
  price_exclusive: number
  plays_count: number
  likes_count: number
  downloads_count: number
  is_published: boolean
  created_at: string
  updated_at: string
  producer?: Profile
}

export interface Profile {
  id: string
  username: string
  full_name?: string
  avatar_url?: string
  bio?: string
  is_producer: boolean
  is_verified: boolean
  social_links?: Record<string, string>
  created_at: string
  updated_at: string
}

export interface Favorite {
  id: string
  user_id: string
  beat_id: string
  created_at: string
  beat?: Beat
}

export interface Playlist {
  id: string
  user_id: string
  name: string
  description?: string
  cover_image?: string
  is_public: boolean
  created_at: string
  updated_at: string
  beats?: Beat[]
}

export interface CartItem {
  id: string
  user_id: string
  beat_id: string
  license_type: 'basic' | 'premium' | 'exclusive'
  quantity: number
  created_at: string
  beat?: Beat
}

export interface Order {
  id: string
  user_id: string
  total_amount: number
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  payment_intent_id?: string
  created_at: string
  updated_at: string
  items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  beat_id: string
  license_type: string
  price: number
  download_url?: string
  download_count: number
  created_at: string
  beat?: Beat
}

export interface Review {
  id: string
  beat_id: string
  user_id: string
  rating: number
  comment?: string
  created_at: string
  updated_at: string
  user?: Profile
}

export interface Follow {
  id: string
  follower_id: string
  following_id: string
  created_at: string
}
