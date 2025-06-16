import { useLocation, useNavigate } from 'react-router-dom';
import logo from '@assets/logo.svg';
import dashboardIcon from '@assets/icons/dashboard.png';
import roadmapIcon from '@assets/icons/roadmap.png';
import quizIcon from '@assets/icons/quiz.png';
import aiTutorIcon from '@assets/icons/ai-tutor.png';
import studentsIcon from '@assets/icons/students.png';
import adminIcon from '@assets/icons/admin.png';
import instructorIcon from '@assets/icons/instructor.png';
import analyticsIcon from '@assets/icons/analytics.png';

interface SidebarItemProps {
  icon: string;
  label: string;
  path: string;
  isActive?: boolean;
  onClick: (path: string) => void;
}

const SidebarItem = ({ icon, label, path, isActive, onClick }: SidebarItemProps) => {
  return (
    <div
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 ${
        isActive 
          ? 'bg-blue-50 text-blue-600 font-medium' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
      onClick={() => onClick(path)}
    >
      <img src={icon} alt={`${label} icon`} className="w-5 h-5" />
      <span className="text-sm">{label}</span>
    </div>
  );
};

interface AdminSidebarProps {
  organizationName?: string;
  adminEmail?: string;
  className?: string;
}

const AdminSidebar = ({ 
  organizationName = "Organisation Name",
  adminEmail = "Admin@example.com",
  className = ""
}: AdminSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: dashboardIcon, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: roadmapIcon, label: 'Roadmaps', path: '/admin/roadmaps' },
    { icon: quizIcon, label: 'Quizzes', path: '/admin/quizzes' },
    { icon: aiTutorIcon, label: 'AI Tutor', path: '/admin/ai-tutor' },
    { icon: studentsIcon, label: 'Students', path: '/admin/students' },
    { icon: adminIcon, label: 'Admins', path: '/admin/admins' },
    { icon: instructorIcon, label: 'Instructors', path: '/admin/instructors' },
    { icon: analyticsIcon, label: 'Analytics', path: '/admin/analytics' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className={`w-64 bg-white border-r border-gray-200 flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <img src={logo} alt="Luma AI Logo" className="w-24 h-auto mb-4" />
        <div>
          <h3 className="text-sm font-medium text-gray-900 truncate">{organizationName}</h3>
          <p className="text-xs text-gray-500 truncate">{adminEmail}</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isActive={location.pathname === item.path}
            onClick={handleNavigation}
          />
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;