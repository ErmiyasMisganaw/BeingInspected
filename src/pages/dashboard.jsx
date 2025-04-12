import React, { useState } from 'react';
import { FiHome, FiCoffee, FiDroplet, FiSun, FiBell, FiCheckCircle, FiAlertCircle, FiClock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Dashboard = () => {

  const [activeTab, setActiveTab] = useState('pending');
  const navigate = useNavigate(); // Initialize useNavigate

  // Sample inspection areas
  const inspectionAreas = [
    { id: 1, name: 'Kitchen', icon: <FiCoffee className="text-3xl text-orange-500" />, count: 5 },
    { id: 2, name: 'Bathroom', icon: <FiDroplet className="text-3xl text-blue-500" />, count: 3 },
    { id: 3, name: 'Garden', icon: <FiSun className="text-3xl text-green-500" />, count: 2 },
    { id: 4, name: 'Bedroom', icon: <FiHome className="text-3xl text-purple-500" />, count: 7 },
  ];

  // Sample maintenance requests
  const maintenanceRequests = [
    { id: 1, area: 'Room 203', issue: 'Leaking faucet', priority: 'High', status: 'Pending', date: '2023-05-15', time: '10:30 AM' },
    { id: 2, area: 'Main Kitchen', issue: 'Oven not heating', priority: 'Critical', status: 'In Progress', date: '2023-05-14', time: '3:45 PM' },
    { id: 3, area: 'Pool Area', issue: 'Broken lounge chair', priority: 'Medium', status: 'Completed', date: '2023-05-13', time: '9:15 AM' },
    { id: 4, area: 'Lobby', issue: 'AC not working', priority: 'High', status: 'Pending', date: '2023-05-15', time: '11:20 AM' },
  ];

  const filteredRequests = maintenanceRequests.filter(request => 
    activeTab === 'all' || 
    (activeTab === 'pending' && request.status === 'Pending') ||
    (activeTab === 'progress' && request.status === 'In Progress') ||
    (activeTab === 'completed' && request.status === 'Completed')
  );

  const handleAreaClick = () => {
    navigate('/inspector'); // Redirect to /inspector
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Logo */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="data:image/jpeg;base64,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" 
              alt="Kuriftu Resort Logo" 
              className="h-16"
            />
            <h1 className="ml-4 text-2xl font-bold text-green-800">Inspection Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
              <FiBell className="mr-2" />
              Notifications
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Inspection Areas Grid */}
        <section className="mb-12">
 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {inspectionAreas.map(area => (
              <div 
                key={area.id}
                onClick={handleAreaClick} // Attach the click handler
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:transform hover:-translate-y-1"
              >
                <div className="p-6 flex items-center">
                  <div className="p-3 bg-green-50 rounded-full mr-4">
                    {area.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{area.name}</h3>
                    <p className="text-sm text-gray-500">{area.count} items to inspect</p>
                  </div>
                </div>
                <div className="bg-green-600 px-4 py-2 text-white text-sm font-medium text-center">
                  Start Inspection
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Maintenance Requests Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Maintenance Requests</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${activeTab === 'all' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${activeTab === 'pending' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Pending
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${activeTab === 'progress' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                In Progress
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${activeTab === 'completed' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Completed
              </button>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRequests.map(request => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{request.area}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{request.issue}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          request.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                          request.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {request.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {request.status === 'Completed' ? (
                            <FiCheckCircle className="text-green-500 mr-2" />
                          ) : request.status === 'In Progress' ? (
                            <FiClock className="text-blue-500 mr-2" />
                          ) : (
                            <FiAlertCircle className="text-orange-500 mr-2" />
                          )}
                          <span>{request.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {request.date} at {request.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-green-600 hover:text-green-900 mr-4">View</button>
                        <button className="text-orange-600 hover:text-orange-900">Assign</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;