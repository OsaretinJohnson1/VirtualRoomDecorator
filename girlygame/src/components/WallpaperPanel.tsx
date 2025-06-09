'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Wallpaper } from '@/types/room';
import { Check } from 'lucide-react';

interface WallpaperPanelProps {
  selectedWallpaper: Wallpaper;
  onSelectWallpaper: (wallpaper: Wallpaper) => void;
}

const wallpapers: Wallpaper[] = [
  { id: 'pink-floral', name: 'Pink Floral', pattern: 'bg-gradient-to-br from-pink-100 to-rose-200' },
  { id: 'rose-garden', name: 'Rose Garden', pattern: 'bg-gradient-to-br from-rose-200 to-pink-300' },
  { id: 'lavender-dreams', name: 'Lavender Dreams', pattern: 'bg-gradient-to-br from-purple-100 to-pink-200' },
  { id: 'coral-sunset', name: 'Coral Sunset', pattern: 'bg-gradient-to-br from-orange-200 to-pink-200' },
  { id: 'bubblegum', name: 'Bubblegum', pattern: 'bg-gradient-to-br from-pink-200 to-pink-400' },
  { id: 'cotton-candy', name: 'Cotton Candy', pattern: 'bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100' },
  { id: 'princess-pink', name: 'Princess Pink', pattern: 'bg-gradient-to-br from-pink-300 to-rose-400' },
  { id: 'fairy-tale', name: 'Fairy Tale', pattern: 'bg-gradient-to-br from-purple-200 to-pink-300' },
  { id: 'strawberry-cream', name: 'Strawberry Cream', pattern: 'bg-gradient-to-br from-red-100 to-pink-200' },
  { id: 'cherry-blossom', name: 'Cherry Blossom', pattern: 'bg-gradient-to-br from-pink-50 to-rose-200' },
];

export default function WallpaperPanel({ selectedWallpaper, onSelectWallpaper }: WallpaperPanelProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-pink-700 text-center">Choose Wallpaper</h3>
      
      <ScrollArea className="h-80">
        <div className="grid grid-cols-2 gap-3">
          {wallpapers.map((wallpaper) => (
            <Button
              key={wallpaper.id}
              variant="outline"
              className={`h-auto p-3 flex flex-col items-center gap-2 border-pink-200 hover:border-pink-300 ${
                selectedWallpaper.id === wallpaper.id ? 'ring-2 ring-pink-500' : ''
              }`}
              onClick={() => onSelectWallpaper(wallpaper)}
            >
              <div className={`w-full h-12 ${wallpaper.pattern} rounded-lg border border-pink-200 relative`}>
                {selectedWallpaper.id === wallpaper.id && (
                  <div className="absolute inset-0 bg-black/10 rounded-lg flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <span className="text-xs text-center">{wallpaper.name}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}