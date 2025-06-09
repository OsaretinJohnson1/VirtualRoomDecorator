'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Flooring } from '@/types/room';
import { Check } from 'lucide-react';

interface FlooringPanelProps {
    selectedFlooring: Flooring;
    onSelectFlooring: (flooring: Flooring) => void;
}

const floorings: Flooring[] = [
    { id: 'light-wood', name: 'Light Wood', pattern: 'bg-gradient-to-br from-amber-100 to-orange-200' },
    { id: 'dark-wood', name: 'Dark Wood', pattern: 'bg-gradient-to-br from-amber-800 to-orange-900' },
    { id: 'pink-carpet', name: 'Pink Carpet', pattern: 'bg-gradient-to-br from-pink-200 to-rose-300' },
    { id: 'white-marble', name: 'White Marble', pattern: 'bg-gradient-to-br from-gray-100 to-white' },
    { id: 'lavender-carpet', name: 'Lavender Carpet', pattern: 'bg-gradient-to-br from-purple-200 to-pink-200' },
    { id: 'checkerboard', name: 'Checkerboard', pattern: 'bg-gradient-to-br from-gray-200 to-pink-100' },
    { id: 'rose-tiles', name: 'Rose Tiles', pattern: 'bg-gradient-to-br from-rose-300 to-pink-400' },
    { id: 'bamboo', name: 'Bamboo', pattern: 'bg-gradient-to-br from-yellow-200 to-amber-300' },
];

export default function FlooringPanel({ selectedFlooring, onSelectFlooring }: FlooringPanelProps) {
    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-pink-700 text-center">Choose Flooring</h3>

            <ScrollArea className="h-80">
                <div className="grid grid-cols-2 gap-3">
                    {floorings.map((flooring) => (
                        <Button
                            key={flooring.id}
                            variant="outline"
                            className={`h-auto p-3 flex flex-col items-center gap-2 border-pink-200 hover:border-pink-300 ${selectedFlooring.id === flooring.id ? 'ring-2 ring-pink-500' : ''
                                }`}
                            onClick={() => onSelectFlooring(flooring)}
                        >
                            <div className={`w-full h-12 ${flooring.pattern} rounded-lg border border-pink-200 relative`}>
                                {selectedFlooring.id === flooring.id && (
                                    <div className="absolute inset-0 bg-black/10 rounded-lg flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                )}
                            </div>
                            <span className="text-xs text-center">{flooring.name}</span>
                        </Button>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}