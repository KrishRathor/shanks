import { Dashboard } from "../components/dashboard/dashboard";
import { Sidebar } from "../components/sidebar/sidebar";

export const DashboardPage = () => {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <Dashboard />
      </div>
    </div>
  );
};
