// Canonical Exercise type for FatToFit
export interface MuscleCategory {
  id: string;
  label: string;
  icon: string;
  sortOrder: number;
  createdAt: any;
  updatedAt: any;
}

export interface Exercise {
  exerciseId: string;
  name: string;
  detail: string;
  muscleGroups: string[];
  equipment: string[];
  imageUrl?: string;
  videoUrl?: string;
  coachingNotes?: string;
  type: 'main' | 'warm-up' | 'warm-down';
  defaultSets?: number;
  repsPerSet?: number[];
  weightPerSet?: number[];
  duration?: number; // for warm-up
  [key: string]: any;
}
