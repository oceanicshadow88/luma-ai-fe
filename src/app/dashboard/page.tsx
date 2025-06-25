import AdminSidebar from "@features/dashboard/components/AdminSidebar";
import NavigationBar from "@features/dashboard/components/NavigationBar";

const DashboardPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      
      <div className="flex flex-1">
        <AdminSidebar />
        
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold">Welcome to Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Here is your admin main content area.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;