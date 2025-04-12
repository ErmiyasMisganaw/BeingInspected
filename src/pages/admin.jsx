import React, { useState } from 'react';
import { FiHome, FiTrendingUp, FiAlertTriangle, FiCheckCircle, FiCalendar, FiSettings } from 'react-icons/fi';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('year');
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data - replace with API calls in production
  const maintenanceData = {
    year: {
      maintained: [120, 190, 150, 210, 180, 200, 220, 240, 210, 230, 250, 280],
      unmaintained: [30, 40, 35, 45, 50, 40, 35, 30, 25, 20, 15, 10],
      inProgress: [15, 20, 18, 22, 25, 30, 28, 25, 20, 18, 15, 12]
    },
    month: {
      maintained: [18, 22, 25, 20, 23, 27, 30, 28, 25, 22, 20, 18, 15, 12, 10, 8, 12, 15, 18, 22, 25, 28, 30, 32, 30, 28, 25, 22, 20, 18],
      unmaintained: [5, 6, 7, 8, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 6, 5],
      inProgress: [2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1]
    }
  };

  const areaData = {
    labels: ['Kitchen', 'Bathroom', 'Bedroom', 'Lobby', 'Pool', 'Garden'],
    datasets: [{
      data: [45, 30, 60, 25, 15, 20],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40'
      ]
    }]
  };

  const priorityData = {
    labels: ['Critical', 'High', 'Medium', 'Low'],
    datasets: [{
      data: [15, 35, 40, 10],
      backgroundColor: [
        '#FF6384',
        '#FF9F40',
        '#FFCE56',
        '#36A2EB'
      ]
    }]
  };

  const timeLabels = timeRange === 'year' 
    ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    : Array.from({length: 30}, (_, i) => (i + 1).toString());

  const lineChartData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Maintained',
        data: maintenanceData[timeRange].maintained,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Unmaintained',
        data: maintenanceData[timeRange].unmaintained,
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'In Progress',
        data: maintenanceData[timeRange].inProgress,
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const stats = [
    { title: 'Total Inspections', value: '1,248', change: '+12%', icon: <FiHome />, color: 'bg-blue-100 text-blue-600' },
    { title: 'Completed', value: '984', change: '+8%', icon: <FiCheckCircle />, color: 'bg-green-100 text-green-600' },
    { title: 'Pending', value: '156', change: '-5%', icon: <FiAlertTriangle />, color: 'bg-yellow-100 text-yellow-600' },
    { title: 'Overdue', value: '108', change: '+3%', icon: <FiTrendingUp />, color: 'bg-red-100 text-red-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="https://kurifturesorts.com/wp-content/uploads/2020/12/kuriftu-logo.png" 
              alt="Kuriftu Resort" 
              className="h-10"
            />
            <h1 className="ml-4 text-xl font-bold text-gray-800">Maintenance Analytics Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-1">
              <FiCalendar className="text-gray-500" />
              <select 
                className="bg-transparent border-none focus:ring-0 text-sm"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="year">Yearly</option>
                <option value="month">Monthly</option>
              </select>
            </div>
            <button className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">
              <FiSettings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div className={`rounded-full p-3 ${stat.color}`}>
                  {stat.icon}
                </div>
                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="mt-4 text-sm font-medium text-gray-500">{stat.title}</h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'analytics' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reports' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Reports
            </button>
          </nav>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Maintenance Trend */}
          <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Maintenance Trend ({timeRange === 'year' ? 'Yearly' : 'Monthly'})</h3>
            <div className="h-80">
              <Line 
                data={lineChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Issues by Area */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Issues by Area</h3>
            <div className="h-80">
              <Pie 
                data={areaData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Priority Distribution */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Priority Distribution</h3>
            <div className="h-64">
              <Pie 
                data={priorityData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                  }
                }}
              />
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Maintenance Requests</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { area: 'Kitchen', issue: 'Oven not heating', priority: 'High', status: 'In Progress' },
                    { area: 'Room 203', issue: 'Leaking faucet', priority: 'Critical', status: 'Pending' },
                    { area: 'Lobby', issue: 'AC not working', priority: 'High', status: 'Pending' },
                    { area: 'Pool', issue: 'Broken lounge chair', priority: 'Medium', status: 'Completed' },
                    { area: 'Garden', issue: 'Sprinkler malfunction', priority: 'Low', status: 'Completed' },
                  ].map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.area}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.issue}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                          item.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {item.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          item.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;