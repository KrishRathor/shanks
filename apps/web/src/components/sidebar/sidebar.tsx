import { useUser } from "@clerk/clerk-react";
import { SiPolygon } from "react-icons/si";
import { FcContacts, FcSettings, FcSalesPerformance, FcCollaboration, FcMenu, FcComments } from "react-icons/fc";

export const Sidebar = () => {
  const { user } = useUser();

  const options = [
    { name: "Dashboard", icon: <FcMenu className="w-[30px] h-[30px]" /> },
    { name: "Campaigns", icon: <FcCollaboration className="w-[30px] h-[30px]"  /> },
    { name: "Contacts", icon: <FcContacts className="w-[30px] h-[30px]"  /> },
    { name: "Analytics", icon: <FcSalesPerformance className="w-[30px] h-[30px]"  /> },
    { name: "Email Builder", icon: <FcComments className="w-[30px] h-[30px]"  /> },
    { name: "Settings", icon: <FcSettings className="w-[30px] h-[30px]"  /> },
  ];

  return (
    <div className="w-[15%] h-screen bg-[#000] flex flex-col justify-between">
      <div className="mt-4 flex items-center justify-center">
        <SiPolygon className="mr-4 h-[40px] w-[35px]" />
        <h1 className="text-3xl font-bold text-center">Shanks</h1>
      </div>

      <div className="flex flex-col items-center justify-center">
        {options.map((option) => (
          <div
            key={option.name}
            className="w-[90%] h-[50px] flex items-center cursor-pointer hover:bg-[#1a1a1a] rounded-md mt-[10px]
            transition-colors duration-200"
          >
            <div className="text-white mr-3 ml-2">{option.icon}</div>
            <p className="text-xl font-bold text-[#A1A1AA]">{option.name}</p>
          </div>
        ))}
      </div>

      <div>
        <hr className="h-[1px] border-[#27272A] w-[100%]" />
        <div className="flex items-center p-4 text-white">
          <img
            src={user?.imageUrl}
            alt="User Icon"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-semibold">{user?.fullName}</p>
            <p className="text-sm">{user?.emailAddresses[0].emailAddress}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
