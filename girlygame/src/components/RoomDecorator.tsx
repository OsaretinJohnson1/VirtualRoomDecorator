'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FurniturePanel from './FurniturePanel';
import RoomCanvas from './RoomCanvas';
import WallpaperPanel from '../components/WallpaperPanel';
import FlooringPanel from './FlooringPanel';
import { RoomItem, Wallpaper, Flooring } from '@/types/room';
import { Home, Palette, Package, Save, Share2, RotateCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function RoomDecorator() {
  const [roomItems, setRoomItems] = useState<RoomItem[]>([]);
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper>({
    id: 'pink-floral',
    name: 'Pink Floral',
    pattern: 'bg-gradient-to-br from-pink-100 to-rose-200',
  });
  const [selectedFlooring, setSelectedFlooring] = useState<Flooring>({
    id: 'light-wood',
    name: 'Light Wood',
    pattern: 'bg-gradient-to-br from-amber-100 to-orange-200',
  });
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const { toast } = useToast();

  const addItem = useCallback((item: Omit<RoomItem, 'id' | 'x' | 'y'>) => {
    const newItem: RoomItem = {
      ...item,
      id: Date.now().toString(),
      x: Math.floor(Math.random() * 8) + 1,
      y: Math.floor(Math.random() * 8) + 1,
    };
    setRoomItems(prev => [...prev, newItem]);
  }, []);

  const updateItem = useCallback((id: string, updates: Partial<RoomItem>) => {
    setRoomItems(prev => 
      prev.map(item => item.id === id ? { ...item, ...updates } : item)
    );
  }, []);

  const deleteItem = useCallback((id: string) => {
    setRoomItems(prev => prev.filter(item => item.id !== id));
    if (selectedItem === id) {
      setSelectedItem(null);
    }
  }, [selectedItem]);

  const rotateSelectedItem = useCallback(() => {
    if (!selectedItem) {
      toast({
        title: "No item selected",
        description: "Please select an item to rotate",
        variant: "destructive",
      });
      return;
    }
    
    updateItem(selectedItem, { rotation: ((roomItems.find(item => item.id === selectedItem)?.rotation || 0) + 90) % 360 });
  }, [selectedItem, roomItems, updateItem, toast]);

  const saveRoom = useCallback(() => {
    const roomData = {
      items: roomItems,
      wallpaper: selectedWallpaper,
      flooring: selectedFlooring,
      savedAt: new Date().toISOString(),
    };
    
    localStorage.setItem('savedRoom', JSON.stringify(roomData));
    toast({
      title: "Room saved!",
      description: "Your beautiful room design has been saved successfully.",
    });
  }, [roomItems, selectedWallpaper, selectedFlooring, toast]);

  const shareRoom = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Room shared!",
      description: "Room link copied to clipboard. Share it with your friends!",
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Room Designer
          </h1>
          <div className="flex gap-2">
            <Button
              onClick={rotateSelectedItem}
              variant="outline"
              size="sm"
              className="border-pink-200 hover:bg-pink-50"
            >
              <RotateCw className="w-4 h-4 mr-2" />
              Rotate
            </Button>
            <Button
              onClick={saveRoom}
              variant="outline"
              size="sm"
              className="border-pink-200 hover:bg-pink-50"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button
              onClick={shareRoom}
              variant="outline"
              size="sm"
              className="border-pink-200 hover:bg-pink-50"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Panel */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="border-pink-200 shadow-lg">
              <CardContent className="p-4">
                <Tabs defaultValue="furniture" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-pink-50">
                    <TabsTrigger value="furniture" className="data-[state=active]:bg-pink-200">
                      <Package className="w-4 h-4 mr-1" />
                      Items
                    </TabsTrigger>
                    <TabsTrigger value="wallpaper" className="data-[state=active]:bg-pink-200">
                      <Palette className="w-4 h-4 mr-1" />
                      Walls
                    </TabsTrigger>
                    <TabsTrigger value="flooring" className="data-[state=active]:bg-pink-200">
                      <Home className="w-4 h-4 mr-1" />
                      Floor
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="furniture" className="mt-4">
                    <FurniturePanel onAddItem={addItem} />
                  </TabsContent>
                  
                  <TabsContent value="wallpaper" className="mt-4">
                    <WallpaperPanel 
                      selectedWallpaper={selectedWallpaper}
                      onSelectWallpaper={setSelectedWallpaper}
                    />
                  </TabsContent>
                  
                  <TabsContent value="flooring" className="mt-4">
                    <FlooringPanel
                      selectedFlooring={selectedFlooring}
                      onSelectFlooring={setSelectedFlooring}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Main Canvas */}
          <div className="lg:col-span-3">
            <Card className="border-pink-200 shadow-lg">
              <CardContent className="p-6">
                <RoomCanvas
                  items={roomItems}
                  wallpaper={selectedWallpaper}
                  flooring={selectedFlooring}
                  selectedItem={selectedItem}
                  onSelectItem={setSelectedItem}
                  onUpdateItem={updateItem}
                  onDeleteItem={deleteItem}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}