import React from 'react';
import type { DashboardStats as Stats } from '@custom-types/dashboard';

interface Props {
  stats: Stats;
}

export const DashboardStats: React.FC<Props> = ({ stats }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-blue-500 text-white rounded-lg p-6">
        <h3 className="text-sm font-medium mb-2 text-left">Total Students</h3>
        <p className="text-3xl font-bold text-left">{stats.totalStudents}</p>
      </div>
      <div className="bg-white rounded-lg p-6 border">
        <h3 className="text-sm font-medium mb-2 text-left">Roadmaps Created</h3>
        <p className="text-3xl font-bold text-left">{stats.roadmapsCreated}</p>
      </div>
      <div className="bg-white rounded-lg p-6 border">
        <h3 className="text-sm font-medium mb-2 text-left">Quizzes Created</h3>
        <p className="text-3xl font-bold text-left">{stats.quizzesCreated}</p>
      </div>
    </div>
  );
}; 