export interface MovieSelection {
    id: number;
    title: string;
    genre: string;
    description: string;
    time: string;
  }
  
  export interface CinemaSelection {
    id: number;
    name: string;
    distance: string;
    features: string;
  }
  
  export interface DateSelection {
    id: number;
    day: string;
    date: string;
    weather: string;
  }
  
  export interface DateResponse {
    response: 'yes';
    movie: MovieSelection | null;
    cinema: CinemaSelection | null;
    date: DateSelection | null;
    timestamp: string;
  }
  
  export type SubmitResponseType = {
    success: boolean;
    id?: string;
    error?: string;
  };