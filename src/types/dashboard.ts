export interface Roadmap {
  name: string;
  createdBy: string;
  createdDate: string;
  status: 'Published' | 'Draft';
  students?: number;
}

export interface Quiz {
  title: string;
  createdBy?: string;
  createdDate: string;
  assigned: number;
  status: 'Published' | 'Draft';
}

export interface DashboardStats {
  totalStudents: number;
  roadmapsCreated: number;
  quizzesCreated: number;
}

export interface DashboardData {
  stats: DashboardStats;
  latestRoadmaps: Roadmap[];
  latestQuizzes: Quiz[];
} 