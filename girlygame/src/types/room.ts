export interface RoomItem {
    id: string;
    name: string;
    emoji: string;
    color: string;
    width: number;
    height: number;
    x: number;
    y: number;
    rotation?: number;
    icon?: string;
  }
  
  export interface Wallpaper {
    id: string;
    name: string;
    pattern: string;
  }
  
  export interface Flooring {
    id: string;
    name: string;
    pattern: string;
  }
  
  export interface RoomDesign {
    items: RoomItem[];
    wallpaper: Wallpaper;
    flooring: Flooring;
    savedAt: string;
  }