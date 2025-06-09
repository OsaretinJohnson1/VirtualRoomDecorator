'use client';

import { useState, useRef, useCallback } from 'react';
import { RoomItem, Wallpaper, Flooring } from '@/types/room';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface RoomCanvasProps {
  items: RoomItem[];
  wallpaper: Wallpaper;
  flooring: Flooring;
  selectedItem: string | null;
  onSelectItem: (id: string | null) => void;
  onUpdateItem: (id: string, updates: Partial<RoomItem>) => void;
  onDeleteItem: (id: string) => void;
}

export default function RoomCanvas({
  items,
  wallpaper,
  flooring,
  selectedItem,
  onSelectItem,
  onUpdateItem,
  onDeleteItem,
}: RoomCanvasProps) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent, itemId: string) => {
    e.preventDefault();
    setDraggedItem(itemId);
    onSelectItem(itemId);
    
    const rect = canvasRef.current?.getBoundingClientRect();
    const item = items.find(i => i.id === itemId);
    if (rect && item) {
      const cellSize = rect.width / 10;
      setDragOffset({
        x: e.clientX - rect.left - (item.x * cellSize),
        y: e.clientY - rect.top - (item.y * cellSize),
      });
    }
  }, [items, onSelectItem]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!draggedItem || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const cellSize = rect.width / 10;
    
    const newX = Math.max(0, Math.min(9, Math.floor((e.clientX - rect.left - dragOffset.x) / cellSize)));
    const newY = Math.max(0, Math.min(9, Math.floor((e.clientY - rect.top - dragOffset.y) / cellSize)));
    
    // Get current item position
    const currentItem = items.find(item => item.id === draggedItem);
    
    // Only update if position has actually changed
    if (currentItem && (currentItem.x !== newX || currentItem.y !== newY)) {
      onUpdateItem(draggedItem, { x: newX, y: newY });
    }
  }, [draggedItem, dragOffset, onUpdateItem, items]);

  const handleMouseUp = useCallback(() => {
    setDraggedItem(null);
    setDragOffset({ x: 0, y: 0 });
  }, []);

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onSelectItem(null);
    }
  }, [onSelectItem]);

  return (
    <div className="space-y-4">
      <div
        ref={canvasRef}
        className={`relative w-full aspect-square border-2 border-pink-200 rounded-lg overflow-hidden ${wallpaper.pattern} cursor-crosshair`}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleCanvasClick}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(236, 72, 153, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(236, 72, 153, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '10% 10%',
        }}
      >
        {/* Floor overlay */}
        <div 
          className={`absolute inset-0 opacity-30 ${flooring.pattern}`}
          style={{ mixBlendMode: 'multiply' }}
        />
        
        {/* Grid items */}
        {items.map((item) => (
          <div
            key={item.id}
            className={`absolute cursor-move transition-all duration-200 ${
              selectedItem === item.id ? 'ring-2 ring-pink-500 ring-offset-2' : ''
            } ${draggedItem === item.id ? 'z-50' : 'z-10'}`}
            style={{
              left: `${item.x * 10}%`,
              top: `${item.y * 10}%`,
              width: `${item.width * 10}%`,
              height: `${item.height * 10}%`,
              transform: `rotate(${item.rotation || 0}deg)`,
            }}
            onMouseDown={(e) => handleMouseDown(e, item.id)}
          >
            <div className={`w-full h-full rounded-lg ${item.color} ${item.icon} flex items-center justify-center text-2xl shadow-lg border-2 border-white/30`}>
              {item.emoji}
            </div>
          </div>
        ))}
      </div>

      {/* Item Controls */}
      {selectedItem && (
        <div className="flex justify-between items-center p-4 bg-pink-50 rounded-lg border border-pink-200">
          <div className="text-sm text-gray-600">
            Selected: {items.find(item => item.id === selectedItem)?.name}
          </div>
          <Button
            onClick={() => onDeleteItem(selectedItem)}
            variant="destructive"
            size="sm"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}