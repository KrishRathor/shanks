import { Dashboard } from "../components/dashboard/dashboard";
import { Sidebar } from "../components/sidebar/sidebar";
import { Campaign } from "../components/campaigns/Campaign";
import { useState } from "react";

export const DashboardPage = () => {

  const [selectedComponent, setSelectedComponent] = useState<string>("Dashboard");

  return (
    <div>
      <div className="flex">
        <Sidebar setSelectedComponent={setSelectedComponent} />
        {selectedComponent === "Dashboard" && <Dashboard />}
        {selectedComponent === "Campaigns" && 
          <div className="mx-auto mt-16" >
            <Campaign />
          </div>
        }
      </div>
    </div>
  );
};
