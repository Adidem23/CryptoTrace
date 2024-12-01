import Header from '../../components/components/Header';
import Sidebar from '../../components/components/Sidebar';
import LineChartComponent from '../../components/components/LineChart';
import BarChartComponent from '../../components/components/BarChart';
import PieChartComponent from '../../components/components/PieChart';


const DashBoardPage = () => {
  
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Line Chart</h2>
              <LineChartComponent />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Bar Chart</h2>
              <BarChartComponent />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Pie Chart</h2>
              <PieChartComponent />
            </div>
            <div className="bg-white p-6 rounded-lg shadow md:col-span-2 lg:col-span-3">
              <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-100 p-4 rounded">
                  <h3 className="font-semibold text-blue-800">Total Users</h3>
                  <p className="text-2xl font-bold">10,234</p>
                </div>
                <div className="bg-green-100 p-4 rounded">
                  <h3 className="font-semibold text-green-800">Revenue</h3>
                  <p className="text-2xl font-bold">$54,321</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded">
                  <h3 className="font-semibold text-yellow-800">Conversion Rate</h3>
                  <p className="text-2xl font-bold">12.3%</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashBoardPage;