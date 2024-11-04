
"use client";
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from './components/ui/progress';

import { 
  Heart, Calendar, Film, MapPin, ArrowRight, 
  Stars, Sparkles, Music, Clock,School, Home, Navigation
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Movie {
  id: number;
  title: string;
  genre: string;
  description: string;
  time: string;
}

interface Cinema {
  id: number;
  name: string;
  distance: string;
  features: string;
}

interface DateOption {
  id: number;
  day: string;
  date: string;
  weather: string;
}


const MovieDateProposal = () => {
  const [step, setStep] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const movies = [
    { 
      id: 1, 
      title: "Venom: The Last Dance", 
      genre: "Sci-Fi",
      description: "Marvel is enough",
      time: "5:30 PM"
    },
    { 
      id: 2, 
      title: "Amaran", 
      genre: "Action",
      description: "A True Soldier Story",
      time: "4:00 PM"
    },
    { 
      id: 3, 
      title: "Singham Again", 
      genre: "Action",
      description: "An unforgettable Series",
      time: "2:45 PM"
    }
  ];

  const cinemas = [
    { 
      id: 1, 
      name: "Galaxy Blue Saphire", 
      distance: "26 Km",
      features: "Luxury Seats • Dolby Sound",
      routeDetails: {
        universityToHome: "16 mins",
        homeToTheater: "26 mins",
        totalTime: "42 mins",
      },
    },
    { 
      id: 2, 
      name: "Gulshan 129", 
      distance: "28 Km",
      features: "IMAX • Premium Experience",
      routeDetails: {
        universityToHome: "16 mins",
        homeToTheater: "33 mins",
        totalTime: "49 mins",
      },
    },
    { 
      id: 3, 
      name: "Logix Superflex", 
      distance: "38 Km",
      features: "Intimate Setting • Great View",
      routeDetails: {
        universityToHome: "16 mins",
        homeToTheater: "46 mins",
        totalTime: "1 hour 2 mins",
      },
    },
    // ... add any additional cinemas as needed
  ];
  
  const dates = [
    { 
      id: 1, 
      day: "Saturday", 
      date: "Nov 9",
      weather: "Weekend ✨"
    },
    { 
      id: 2, 
      day: "Sunday", 
      date: "Nov 10",
      weather: "Weekend 🌟"
    },
    { 
      id: 3, 
      day: "Monday", 
      date: "Nov 11",
      weather: "Before your lab  🌙"
    }
  ];
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        movie: selectedMovie,
        cinema: selectedCinema,
        date: selectedDate,
      };
  
      const response = await fetch('/api/submit-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      console.log('Response status:', response.status); // Log the response status
      console.log('Response body:', await response.text()); // Log the raw response body
  
      if (!response.ok) {
        throw new Error('Failed to submit response');
      }
  
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting response:', error);
      alert('There was an error submitting your response. Please try again.');
    } finally {
      setLoading(false);
    }
  };
   
  const renderWelcome = () => (
    <div className="text-center space-y-8 animate-fadeIn">
      <div className="relative">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <Sparkles className="w-8 h-8 text-pink-500 animate-spin-slow" />
        </div>
        <div className="flex justify-center">
          <Heart className="w-20 h-20 text-pink-500 animate-pulse" />
        </div>
      </div>
      <h1 className="text-4xl font-bold text-pink-500">Hey Devzzz! 💖</h1>
      <p className="text-xl text-gray-300">I have something special planned for us...</p>
      <div className="flex flex-col items-center space-y-4">
        <Stars className="w-8 h-8 text-yellow-500 animate-twinkle" />
        <Button 
          onClick={() => setStep(1)}
          className="bg-pink-500 hover:bg-pink-600 transform hover:scale-105 transition-all duration-300"
          size="lg"
        >
          Begin Our Journey <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );

  const renderMovieSelection = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-pink-500 mb-2">Pick a Movie</h2>
        <p className="text-gray-400">Choose the perfect film for our special evening</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {movies.map((movie) => (
          <Card 
            key={movie.id}
            className={`cursor-pointer transform transition-all duration-300 hover:scale-105 
              bg-gray-800/50 backdrop-blur-sm border-gray-700
              ${selectedMovie?.id === movie.id ? 'ring-2 ring-pink-500 shadow-lg shadow-pink-500/20' : ''}
            `}
            onClick={() => setSelectedMovie(movie)}
          >
            <CardContent className="p-6 text-center space-y-4">
              <Film className="w-10 h-10 mx-auto text-pink-500" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">{movie.title}</h3>
                <p className="text-gray-400 text-sm">{movie.genre}</p>
                <p className="text-pink-400 text-sm mt-2">{movie.description}</p>
                <div className="flex items-center justify-center mt-3 text-gray-300">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">{movie.time}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedMovie && (
        <div className="flex justify-center">
          <Button 
            onClick={() => setStep(2)}
            className="bg-pink-500 hover:bg-pink-600 transform hover:scale-105 transition-all duration-300"
            size="lg"
          >
            Continue Our Plan <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );

  const renderCinemaSelection = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-pink-500 mb-2">Choose Our Venue</h2>
        <p className="text-gray-400">Where shall we share this magical moment?</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {cinemas.map((cinema) => (
          <Card 
            key={cinema.id}
            className={`cursor-pointer transform transition-all duration-300 hover:scale-105 
              bg-gray-800/50 backdrop-blur-sm border-gray-700
              ${selectedCinema?.id === cinema.id ? 'ring-2 ring-pink-500 shadow-lg shadow-pink-500/20' : ''}
            `}
            onClick={() => setSelectedCinema(cinema)}
          >
            <CardContent className="p-6 text-center space-y-4">
              <MapPin className="w-10 h-10 mx-auto text-pink-500" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">{cinema.name}</h3>
                <p className="text-gray-400 text-sm">{cinema.distance}</p>
                <p className="text-pink-400 text-sm mt-2">{cinema.features}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedCinema && (
        <div className="flex justify-center">
          <Button 
            onClick={() => setStep(3)}
            className="bg-pink-500 hover:bg-pink-600 transform hover:scale-105 transition-all duration-300"
            size="lg"
          >
            View the journey <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
  const renderJourneyMap = () => {
    // Early return if selectedCinema is not set or routeDetails are not valid
    if (!selectedCinema || !selectedCinema.routeDetails) {
      return (
        <div className="text-red-500 text-center">
          Please select a cinema with valid route details.
        </div>
      );
    }
  
    const journeyData = [
      { name: 'University', time: 0, point: 0 },
      { name: 'Your Home', time: selectedCinema.routeDetails.universityToHome || 2, point: 1 },
      { name: selectedCinema.name, time: selectedCinema.routeDetails.totalTime || 4, point: 2 },
    ];
  
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-pink-500 text-center">Our Journey Together</h3>
        <div className="grid grid-cols-3 gap-4 text-center mb-8">
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <School className="w-8 h-8 text-pink-500 mx-auto mb-2" />
            <p className="text-gray-300">University</p>
            <p className="text-sm text-gray-400">Starting Point</p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <Home className="w-8 h-8 text-pink-500 mx-auto mb-2" />
            <p className="text-gray-300">Your Home</p>
            <p className="text-sm text-gray-400">{selectedCinema.routeDetails.universityToHome || 'N/A'} drive</p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <MapPin className="w-8 h-8 text-pink-500 mx-auto mb-2" />
            <p className="text-gray-300">{selectedCinema.name}</p>
            <p className="text-sm text-gray-400">{selectedCinema.routeDetails.homeToTheater || 'N/A'} drive</p>
          </div>
        </div>
  
        <div className="bg-gray-800/30 p-6 rounded-xl">
        <LineChart width={600} height={300} data={journeyData}>
  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
  <XAxis dataKey="name" stroke="#9CA3AF" />
  <YAxis stroke="#9CA3AF" />
  <Tooltip 
    contentStyle={{ 
      backgroundColor: '#1F2937', 
      border: 'none', 
      borderRadius: '0.5rem',
      color: '#F3F4F6' 
    }} 
    labelStyle={{ color: '#EC4899' }}
    itemStyle={{ color: '#F3F4F6' }}
  />
  <Line 
    type="monotone" 
    dataKey="time" 
    stroke="#1E40AF" // Updated line color
    strokeWidth={3}
    dot={{ fill: '#1E40AF', stroke: '#1E40AF', strokeWidth: 2 }} // Updated dot color
    activeDot={{ r: 8, fill: '#1E40AF', stroke: '#1E40AF', strokeWidth: 2 }} // Updated active dot color
    animationDuration={500}
  />
</LineChart>

        </div>
  
        <div className="flex justify-center">
          <Button 
            onClick={() => setStep(4)}
            className="bg-pink-500 hover:bg-pink-600 transform hover:scale-105 transition-all duration-300"
            size="lg"
          >
            Set the Date  <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    );
  };
  const renderDateSelection = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-pink-500 mb-2">Pick the Perfect Time</h2>
        <p className="text-gray-400">When shall our adventure begin?</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {dates.map((date) => (
          <Card 
            key={date.id}
            className={`cursor-pointer transform transition-all duration-300 hover:scale-105 
              bg-gray-800/50 backdrop-blur-sm border-gray-700
              ${selectedDate?.id === date.id ? 'ring-2 ring-pink-500 shadow-lg shadow-pink-500/20' : ''}
            `}
            onClick={() => setSelectedDate(date)}
          >
            <CardContent className="p-6 text-center space-y-4">
              <Calendar className="w-10 h-10 mx-auto text-pink-500" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">{date.day}</h3>
                <p className="text-gray-400 text-sm">{date.date}</p>
                <p className="text-pink-400 text-sm mt-2">{date.weather}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedDate && (
        <div className="flex justify-center">
          <Button 
            onClick={() => setStep(5)}
            className="bg-pink-500 hover:bg-pink-600 transform hover:scale-105 transition-all duration-300"
            size="lg"
          >
            Review Our Plans <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );

  const renderFinal = () => (
    <div className="text-center space-y-8">
      <div className="relative">
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <Stars className="w-12 h-12 text-yellow-500 animate-twinkle" />
        </div>
        <div className="flex justify-center">
          <Heart className="w-24 h-24 text-pink-500 animate-bounce" />
        </div>
      </div>
      <h2 className="text-4xl font-bold text-pink-500">Will you go on a date with me?</h2>
      <div className="space-y-4 text-lg text-gray-300">
        <p className="flex items-center justify-center gap-2">
          <Film className="w-5 h-5 text-pink-500" />
          {selectedMovie?.title} at {selectedMovie?.time}
        </p>
        <p className="flex items-center justify-center gap-2">
          <MapPin className="w-5 h-5 text-pink-500" />
          {selectedCinema?.name} ({selectedCinema?.distance})
        </p>
        <p className="flex items-center justify-center gap-2">
          <Calendar className="w-5 h-5 text-pink-500" />
          {selectedDate?.day}, {selectedDate?.date}
        </p>
      </div>
      {!submitted ? (
        <Button
          onClick={() => handleSubmit('yes')}
          disabled={loading}
          className="bg-pink-500 hover:bg-pink-600 transform hover:scale-105 transition-all duration-300 text-lg px-8 py-6"
        >
          {loading ? 'Saving...' : 'Yes! I would love to! 💖'}
        </Button>
      ) : (
        <Alert className="bg-pink-500/20 border-pink-500 text-pink-300">
          <AlertDescription className="text-lg">
            Wonderful! I can't wait for our special date! 💝
          </AlertDescription>
        </Alert>
      )}
    </div>
  );

  const steps = [
    renderWelcome,
    renderMovieSelection,
    renderCinemaSelection,
    renderJourneyMap,
    renderDateSelection,
    renderFinal,
    
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-gray-900/90 backdrop-blur-lg border-gray-800">
          <CardContent className="p-8">
            {steps[step]()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MovieDateProposal;