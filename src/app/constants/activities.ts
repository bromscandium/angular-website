export interface Activity {
  id: string;
  name: string;
  icon: string;
  unit: boolean;
}

export const ACTIVITIES: Record<string, Activity> = {
  WIND: {
    id: 'wind',
    name: 'Wind',
    icon: 'wind',
    unit: true,
  },
  AIR_QUALITY: {
    id: 'air_quality',
    name: 'Air Quality',
    icon: 'lungs',
    unit: false,
  },
  HUMIDITY: {
    id: 'humidity',
    name: 'Humidity',
    icon: 'humidity',
    unit: true,
  },
  TREE_POLLEN: {
    id: 'tree_pollen',
    name: 'Tree Pollen',
    icon: 'tree',
    unit: false,
  },
  MOLD: {
    id: 'mold',
    name: 'Mold',
    icon: 'mask',
    unit: false,
  },
  RUNNING: {
    id: 'running',
    name: 'Running',
    icon: 'shoe',
    unit: false,
  },
  DRIVING: {
    id: 'driving',
    name: 'Driving',
    icon: 'car',
    unit: false,
  },
  CYCLING: {
    id: 'cycling',
    name: 'Cycling',
    icon: 'bicycle',
    unit: false,
  },
  FISHING: {
    id: 'fishing',
    name: 'Fishing',
    icon: 'fishing',
    unit: false,
  },
  GOLF: {
    id: 'golf',
    name: 'Golf',
    icon: 'golf',
    unit: false,
  },
};

export const ACTIVITY_ORDER: Activity[] = [
  ACTIVITIES['WIND'],
  ACTIVITIES['AIR_QUALITY'],
  ACTIVITIES['HUMIDITY'],
  ACTIVITIES['TREE_POLLEN'],
  ACTIVITIES['MOLD'],
  ACTIVITIES['RUNNING'],
  ACTIVITIES['DRIVING'],
  ACTIVITIES['CYCLING'],
  ACTIVITIES['FISHING'],
  ACTIVITIES['GOLF'],
];
