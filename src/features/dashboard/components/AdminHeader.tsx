import { Menu, Plus, UserPlus, Calendar } from 'lucide-react';
import { Button } from '@components/buttons/Button';

const AdminHeader = () => {
  const handleCreateRoadmap = () => {
    console.log('Create Roadmap clicked');
  };

  const handleCreateQuiz = () => {
    console.log('Create Quiz clicked');
  };

  const handleInviteInstructor = () => {
    console.log('Invite Instructor clicked');
  };

  const handleManagePlan = () => {
    console.log('Manage Plan clicked');
  };

  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            onClick={handleCreateRoadmap}
            className="whitespace-nowrap px-6 min-w-fit flex items-center gap-2"
          >
            <Plus className="h-4 w-4 flex-shrink-0" />
            <span>Create Roadmap</span>
          </Button>
          
          <Button
            variant="primary"
            onClick={handleCreateQuiz}
            className="whitespace-nowrap px-6 min-w-fit flex items-center gap-2"
          >
            <Plus className="h-4 w-4 flex-shrink-0" />
            <span>Create Quiz</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={handleInviteInstructor}
            className="whitespace-nowrap px-6 min-w-fit flex items-center gap-2 border border-gray-900 text-gray-900 hover:bg-gray-100"
          >
            <UserPlus className="h-4 w-4 flex-shrink-0" />
            <span>Invite Instructor</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={handleManagePlan}
            className="whitespace-nowrap px-6 min-w-fit flex items-center gap-2 border border-gray-900 text-gray-900 hover:bg-gray-100"
          >
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>Manage Plan</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;