import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  FileQuestion,
  Bot,
  Users,
  UserCheck,
  GraduationCap,
  BarChart3,
  LucideIcon,
  LogOut,
} from 'lucide-react';
import { useLogout } from '../../auth/hooks/useLogout';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
  isActive?: boolean;
  onClick: (path: string) => void;
}

const SidebarItem = ({ icon: Icon, label, path, isActive, onClick }: SidebarItemProps) => {
  return (
    <div
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 ${
        isActive
          ? 'bg-blue-50 text-blue-600 font-medium'
          : 'text-gray-600 hover:bg-blue-50 hover:text-gray-900'
      }`}
      onClick={() => onClick(path)}
    >
      <Icon className="w-5 h-5" />
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
  organizationName = 'Organisation Name',
  adminEmail = 'Admin@example.com',
  className = '',
}: AdminSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Map, label: 'Roadmaps', path: '/admin/roadmaps' },
    { icon: FileQuestion, label: 'Quizzes', path: '/admin/quizzes' },
    { icon: Bot, label: 'AI Tutor', path: '/admin/ai-tutor' },
    { icon: Users, label: 'Students', path: '/admin/students' },
    { icon: UserCheck, label: 'Admins', path: '/admin/admins' },
    { icon: GraduationCap, label: 'Instructors', path: '/admin/instructors' },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    { icon: LogOut, label: 'Logout', path: '/logout' },
  ];

  const handleNavigation = (path: string) => {
    if (path === '/logout') {
      logout(); 
    } else {
      navigate(path);
    }
  };

  return (
    <div className={`w-58 bg-white border-r border-gray-200 flex flex-col ${className}`}>
      {/* Top spacing for logo */}
      <div className="h-20"></div>

      {/* Header */}
      <div className="mx-4 px-4 py-4 bg-gray-100 rounded-lg text-left">
        <div>
          <h3 className="text-base font-semibold text-gray-900 truncate mb-1">
            {organizationName}
          </h3>
          <p className="text-sm text-gray-500 truncate">{adminEmail}</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.slice(0, 4).map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isActive={location.pathname === item.path}
            onClick={handleNavigation}
          />
        ))}

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {menuItems.slice(4).map((item) => (
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
