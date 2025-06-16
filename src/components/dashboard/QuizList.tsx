import React from 'react';
import type { Quiz } from '@custom-types/dashboard';

interface Props {
  quizzes: Quiz[];
}

export const QuizList: React.FC<Props> = ({ quizzes }) => {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Latest Quizzes Overview</h2>
        <a href="#" className="text-blue-600 text-sm hover:underline">View All Quizzes</a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-sm text-gray-500 border-b">
              <th className="pb-4 text-left w-1/4">Quiz Title</th>
              <th className="pb-4 text-left w-1/6">Created By</th>
              <th className="pb-4 text-left w-1/6">Created Date</th>
              <th className="pb-4 text-left w-1/6">Assigned</th>
              <th className="pb-4 text-left w-1/6">Status</th>
              <th className="pb-4 text-left w-1/6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="py-4 text-left">{quiz.title}</td>
                <td className="py-4 text-left">{quiz.createdBy || '-'}</td>
                <td className="py-4 text-left">{quiz.createdDate}</td>
                <td className="py-4 text-left">{quiz.assigned} Students</td>
                <td className="py-4 text-left">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full ${
                    quiz.status === 'Published' 
                      ? 'bg-green-50' 
                      : 'bg-gray-50'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
                      quiz.status === 'Published'
                        ? 'bg-green-600'
                        : 'bg-gray-600'
                    }`} />
                    <span className={quiz.status === 'Published' ? 'text-green-600' : 'text-gray-600'}>
                      {quiz.status}
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