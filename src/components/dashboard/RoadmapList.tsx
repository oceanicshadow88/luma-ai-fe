import React from 'react';
import type { Roadmap } from '@custom-types/dashboard';

interface Props {
  roadmaps: Roadmap[];
}

export const RoadmapList: React.FC<Props> = ({ roadmaps }) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Latest Roadmaps List</h2>
        <a href="#" className="text-blue-600 text-sm hover:underline">View All Roadmaps</a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-sm text-gray-500 border-b">
              <th className="pb-4 text-left w-[35%]">Roadmap Name</th>
              <th className="pb-4 text-left w-[15%]">Created By</th>
              <th className="pb-4 text-left w-[15%]">Created Date</th>
              <th className="pb-4 text-left w-[15%]">Status</th>
              <th className="pb-4 text-left w-[10%]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roadmaps.map((roadmap, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="py-4 text-left">{roadmap.name}</td>
                <td className="py-4 text-left">{roadmap.createdBy}</td>
                <td className="py-4 text-left">{roadmap.createdDate}</td>
                <td className="py-4 text-left">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full ${
                    roadmap.status === 'Published' 
                      ? 'bg-green-50' 
                      : 'bg-gray-50'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
                      roadmap.status === 'Published'
                        ? 'bg-green-600'
                        : 'bg-gray-600'
                    }`} />
                    <span className={roadmap.status === 'Published' ? 'text-green-600' : 'text-gray-600'}>
                      {roadmap.status}
                    </span>
                  </div>
                </td>
                <td className="py-4 text-left">
                  <a href="#" className="text-blue-600 hover:underline">View</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 