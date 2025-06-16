import React from 'react';
import { DashboardStats } from './DashboardStats';
import { RoadmapList } from './RoadmapList';
import { QuizList } from './QuizList';
import { DashboardData } from '../../types/dashboard';

interface Props {
  data: DashboardData;
}

export const Dashboard: React.FC<Props> = ({ data }) => {
  return (
    <div className="p-6">
      <DashboardStats stats={data.stats} />
      <RoadmapList roadmaps={data.latestRoadmaps} />
      <QuizList quizzes={data.latestQuizzes} />
    </div>
  );
}; 