import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiFilter, FiCheck } from 'react-icons/fi';

const Inspector = () => {
  // Sample inspection items data
  const initialItems = [
    { id: 1, name: 'Air Conditioning Unit', completed: false, description: '', category: '', priority: '' },
    { id: 2, name: 'Elevator Mechanism', completed: true, description: 'Routine check completed', category: 'Preventive', priority: 'Medium' },
    { id: 3, name: 'Fire Alarm System', completed: false, description: '', category: '', priority: '' },
    { id: 4, name: 'Plumbing in Room 201', completed: false, description: '', category: '', priority: '' },
    { id: 5, name: 'Kitchen Exhaust Fan', completed: true, description: 'Cleaned and serviced', category: 'Cleaning', priority: 'High' },
  ];

  const [items, setItems] = useState(initialItems);
  const [expandedItem, setExpandedItem] = useState(null);
  const [filter, setFilter] = useState('all');

  const categories = ['Electrical', 'Plumbing', 'HVAC', 'Structural', 'Cleaning', 'Preventive', 'Other'];
  const priorities = ['Low', 'Medium', 'High', 'Critical'];

  const toggleCompletion = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const toggleExpand = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const handleDescriptionChange = (id, value) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, description: value } : item
    ));
  };

  const handleCategoryChange = (id, value) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, category: value } : item
    ));
  };

  const handlePriorityChange = (id, value) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, priority: value } : item
    ));
  };

  const handleSubmit = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, submitted: true } : item
    ));
    console.log('Updated JSON:', items.find(item => item.id === id));
    setExpandedItem(null);
  };

  const filteredItems = items.filter(item => {
    if (filter === 'completed') return item.completed;
    if (filter === 'pending') return !item.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-green-800">Hotel Maintenance Inspection</h1>
          <p className="text-gray-600 mt-2">Digital inspection system for hospitality facilities</p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-green-700">Inspection Checklist</h2>
            <div className="flex items-center space-x-2">
              <FiFilter className="text-orange-500" />
              <select 
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Items</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredItems.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No items match your filter</p>
            ) : (
              filteredItems.map(item => (
                <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div 
                    className={`flex justify-between items-center p-4 cursor-pointer ${item.completed ? 'bg-green-50' : 'bg-red-50'}`}
                    onClick={() => toggleExpand(item.id)}
                  >
                    <div className="flex items-center">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleCompletion(item.id); }}
                        className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${item.completed ? 'bg-green-500 text-white' : 'border-2 border-red-500'}`}
                      >
                        {item.completed && <FiCheck />}
                      </button>
                      <span className={`font-medium ${item.completed ? 'text-green-700' : 'text-red-700'}`}>
                        {item.name}
                      </span>
                    </div>
                    <div className="text-gray-500">
                      {expandedItem === item.id ? <FiChevronUp /> : <FiChevronDown />}
                    </div>
                  </div>

                  {expandedItem === item.id && (
                    <div className="p-4 border-t border-gray-200 bg-white">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                          rows="3"
                          value={item.description}
                          onChange={(e) => handleDescriptionChange(item.id, e.target.value)}
                          placeholder="Enter details about the issue..."
                          disabled={item.submitted} // Disable after submission
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance Category</label>
                          <select
                            className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 ${
                              item.submitted ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : ''
                            }`}
                            value={item.category}
                            onChange={(e) => handleCategoryChange(item.id, e.target.value)}
                            disabled={item.submitted} // Disable after submission
                          >
                            <option value="">Select category</option>
                            {categories.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Priority Level</label>
                          <select
                            className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 ${
                              item.submitted ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : ''
                            }`}
                            value={item.priority}
                            onChange={(e) => handlePriorityChange(item.id, e.target.value)}
                            disabled={item.submitted} // Disable after submission
                          >
                            <option value="">Select priority</option>
                            {priorities.map(pri => (
                              <option key={pri} value={pri}>{pri}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() => handleSubmit(item.id)}
                          className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            item.submitted
                              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                              : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
                          }`}
                          disabled={item.submitted} // Disable after submission
                        >
                          {item.submitted ? 'Pending...' : 'Submit Inspection'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inspector;