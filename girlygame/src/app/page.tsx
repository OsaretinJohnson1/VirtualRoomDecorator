'use client';

import { useState } from 'react';
import RoomDecorator from '@/components/RoomDecorator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home as HomeIcon, Sparkles, Heart } from 'lucide-react';

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);

  if (gameStarted) {
    return <RoomDecorator />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4 rounded-full shadow-lg">
              <HomeIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
            Virtual Room Decorator
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Design your dream room with beautiful furniture, stunning wallpapers, and gorgeous decorations. 
            Let your creativity shine in this magical decorating experience!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto bg-pink-100 p-3 rounded-full w-fit mb-4">
                <Sparkles className="w-6 h-6 text-pink-600" />
              </div>
              <CardTitle className="text-pink-700">Furniture Collection</CardTitle>
              <CardDescription>
                Choose from hundreds of beautiful furniture pieces
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto bg-rose-100 p-3 rounded-full w-fit mb-4">
                <HomeIcon className="w-6 h-6 text-rose-600" />
              </div>
              <CardTitle className="text-rose-700">Room Styles</CardTitle>
              <CardDescription>
                Customize wallpapers, flooring, and room layouts
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto bg-pink-100 p-3 rounded-full w-fit mb-4">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <CardTitle className="text-pink-700">Share & Save</CardTitle>
              <CardDescription>
                Save your designs and share with friends
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            onClick={() => setGameStarted(true)}
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            Start Decorating
            <Sparkles className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}