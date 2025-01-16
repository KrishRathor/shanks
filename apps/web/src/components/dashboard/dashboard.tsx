export const Dashboard = () => {
  const dashboardData = [
    {
      title: "Total Campaigns",
      data: "122",
      change: "+5% from last month",
      changeColor: "text-green-500",
    },
    {
      title: "Total Subscribers",
      data: "108",
      change: "-3% from last month",
      changeColor: "text-red-500",
    },
    {
      title: "Open Rate",
      data: "34%",
      change: "+2% from last month",
      changeColor: "text-green-500",
    },
    {
      title: "Click Rate",
      data: "27%",
      change: "-1% from last month",
      changeColor: "text-red-500",
    },
  ];

  const largeBoxData = [
    { title: "Box 1", content: "Content for Box 1" },
    { title: "Box 2", content: "Content for Box 2" },
  ];

  return (
    <div className="w-full h-full justify-center flex flex-col">
      <div className="w-[85%] flex justify-center pt-[4vh] p-4">
        {dashboardData.map((item, index) => (
          <DashboardBox
            key={index}
            title={item.title}
            data={item.data}
            change={item.change}
            changeColor={item.changeColor}
          />
        ))}
      </div>

      <div className="flex justify-center space-x-6 w-[85%]">
        <div className="bg-[#1D1F20] text-white p-4 w-[50%] h-[50vh] flex flex-col justify-between rounded-md transform transition-transform duration-300 hover:scale-105">
          <h3 className="mb-1"></h3>
          <div>
            <p></p>
          </div>
        </div>

        <div className="bg-[#1D1F20] text-white p-4 w-[18%] h-92 flex flex-col justify-between rounded-md transform transition-transform duration-300 hover:scale-105">
          <h3 className="mb-1"></h3>
          <div>
            <p></p>
          </div>
        </div>
      </div>

      <div className="flex justify-center w-[85%]">
        <div className="bg-[#1D1F20] text-white p-4 w-[70%] mt-4 h-[20vh] flex flex-col justify-between rounded-md transform transition-transform duration-300 hover:scale-105">
          <h3 className="mb-1"></h3>
          <div>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

// DashboardBox.tsx
interface DashboardBoxProps {
  title: string;
  data: string;
  change: string;
  changeColor: string;
}

const DashboardBox: React.FC<DashboardBoxProps> = ({
  title,
  data,
  change,
  changeColor,
}) => {
  return (
    <div
      className="bg-[#1D1F20] mx-[10px] text-white p-4 w-1/6 h-40 flex flex-col justify-between rounded-md
      transform transition-transform duration-500 cursor-pointer hover:scale-105"
    >
      <h3 className="text-xl">{title}</h3>
      <div>
        <p className="mt-[-70px] text-[#9E9EA7]">{data}</p>
        <p className={changeColor}>{change}</p>
      </div>
    </div>
  );
};

interface LargeDashboardBoxProps {
  title: string;
  content: string;
}

const LargeDashboardBox: React.FC<LargeDashboardBoxProps> = ({
  title,
  content,
}) => {
  return (
    <div className="bg-[#1D1F20] text-white p-4 w-[34.8%] h-80 flex flex-col justify-between rounded-md transform transition-transform duration-300 hover:scale-105">
      <h3 className="mb-1">{title}</h3>
      <div>
        <p>{content}</p>
      </div>
    </div>
  );
};
