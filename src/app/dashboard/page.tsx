import React from 'react';
import { Dashboard } from '@components/dashboard/Dashboard';
import type { DashboardData } from '@custom-types/dashboard';

const mockData: DashboardData = {
  stats: {
    totalStudents: 100,
    roadmapsCreated: 20,
    quizzesCreated: 40
  },
  latestRoadmaps: [
    {
      name: "AI & ML Basic Pathway",
      createdBy: "Lucy Zhang",
      createdDate: "Apr 14, 2025",
      status: "Published"
    },
    {
      name: "Advanced JavaScript Concepts",
      createdBy: "Mike Chen",
      createdDate: "Apr 22, 2025",
      status: "Draft"
    }
  ],
  latestQuizzes: [
    {
      title: "Reading Diagnostic Test",
      createdBy: "John Wang",
      createdDate: "Apr 26, 2025",
      assigned: 45,
      status: "Published"
    },
    {
      title: "JavaScript Basics Assessment",
      createdBy: "Alice Brown",
      createdDate: "Apr 25, 2025",
      assigned: 30,
      status: "Draft"
    }
  ]
};

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="px-4 py-6">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <Dashboard data={mockData} />
      </main>
    </div>
  );
};

export default DashboardPage;