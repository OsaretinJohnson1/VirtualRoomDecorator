'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RoomItem } from '@/types/room';

interface FurniturePanelProps {
  onAddItem: (item: Omit<RoomItem, 'id' | 'x' | 'y'>) => void;
}

const furnitureCategories = {
  bedroom: [
    { name: 'Single Bed', emoji: '🛏️', color: 'bg-pink-200', width: 2, height: 3 },
    { name: 'Double Bed', emoji: '🛏️', color: 'bg-rose-200', width: 3, height: 3 },
    { name: 'Nightstand', emoji: '🪑', color: 'bg-pink-100', width: 1, height: 1 },
    { name: 'Dresser', emoji: '🗄️', color: 'bg-rose-100', width: 2, height: 1 },
    { name: 'Wardrobe', emoji: '🚪', color: 'bg-pink-300', width: 2, height: 1 },
    { name: 'Mirror', emoji: '🪞', color: 'bg-blue-100', width: 1, height: 1 },
  ],
  seating: [
    { name: 'Pink Chair', emoji: '🪑', color: 'bg-pink-200', width: 1, height: 1 },
    { name: 'Sofa', emoji: '🛋️', color: 'bg-rose-200', width: 3, height: 1 },
    { name: 'Bean Bag', emoji: '🎒', color: 'bg-pink-300', width: 1, height: 1 },
    { name: 'Ottoman', emoji: '🪑', color: 'bg-rose-300', width: 1, height: 1 },
    { name: 'Rocking Chair', emoji: '🪑', color: 'bg-pink-100', width: 1, height: 1 },
  ],
  study: [
    { name: 'Desk', emoji: '🪑', color: 'bg-amber-100', width: 2, height: 1 },
    { name: 'Office Chair', emoji: '🪑', color: 'bg-pink-200', width: 1, height: 1 },
    { name: 'Bookshelf', emoji: '📚', color: 'bg-amber-200', width: 1, height: 2 },
    { name: 'Computer', emoji: '💻', color: 'bg-gray-200', width: 1, height: 1 },
    { name: 'Lamp', emoji: '💡', color: 'bg-yellow-200', width: 1, height: 1 },
  ],
  decorations: [
    { name: 'Plant', emoji: '🪴', color: 'bg-green-200', width: 1, height: 1 },
    { name: 'Flowers', emoji: '💐', color: 'bg-pink-100', width: 1, height: 1 },
    { name: 'Picture Frame', emoji: '🖼️', color: 'bg-purple-100', width: 1, height: 1 },
    { name: 'Clock', emoji: '🕐', color: 'bg-blue-100', width: 1, height: 1 },
    { name: 'Teddy Bear', emoji: '🧸', color: 'bg-pink-200', width: 1, height: 1 },
    { name: 'Unicorn', emoji: '🦄', color: 'bg-purple-200', width: 1, height: 1 },
    { name: 'Heart Pillow', emoji: '💗', color: 'bg-pink-300', width: 1, height: 1 },
  ],
};

export default function FurniturePanel({ onAddItem }: FurniturePanelProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-pink-700 text-center">Add Furniture</h3>
      
      <Tabs defaultValue="bedroom" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-pink-50">
          <TabsTrigger value="bedroom" className="text-xs data-[state=active]:bg-pink-200">Bedroom</TabsTrigger>
          <TabsTrigger value="seating" className="text-xs data-[state=active]:bg-pink-200">Seating</TabsTrigger>
        </TabsList>
        <TabsList className="grid w-full grid-cols-2 bg-pink-50 mt-1">
          <TabsTrigger value="study" className="text-xs data-[state=active]:bg-pink-200">Study</TabsTrigger>
          <TabsTrigger value="decorations" className="text-xs data-[state=active]:bg-pink-200">Decor</TabsTrigger>
        </TabsList>
        
        {Object.entries(furnitureCategories).map(([category, items]) => (
          <TabsContent key={category} value={category} className="mt-4">
            <ScrollArea className="h-80">
              <div className="grid grid-cols-2 gap-2">
                {items.map((item, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-3 flex flex-col items-center gap-2 border-pink-200 hover:bg-pink-50 hover:border-pink-300"
                    onClick={() => onAddItem(item)}
                  >
                    <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center text-lg`}>
                      {item.emoji}
                    </div>
                    <span className="text-xs text-center">{item.name}</span>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}