export interface Movie {
  id: string;
  title: string;
  description: string;
  rating: number;
  year: number;
  duration: string;
  genre: string[];
  thumbnail: string;
  backdrop: string;
  videoUrl: string;
  isTrending?: boolean;
  isPopular?: boolean;
  isLatest?: boolean;
  type?: 'movie' | 'tv';
  seasons?: number;
}

export interface MovieFilters {
  genres?: string[];
  minRating?: number;
  yearStart?: number;
  yearEnd?: number;
  sortBy?: 'rating' | 'year' | 'title';
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  myList: string[]; // Array of movie IDs
  history: {
    movieId: string;
    watchedAt: number;
    progress: number; // 0 to 100
  }[];
}

