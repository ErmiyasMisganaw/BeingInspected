import { useState } from "react";
import { items } from "../assets/data";

function MaintenancePage() {
  const electricianItems = items.filter((item) => item.assigned_to === "electrician");

  const [statusFilter, setStatusFilter] = useState("needs maintenance");
  const [dateFilter, setDateFilter] = useState("");

  const filteredItems = electricianItems.filter((item) => {
    const matchesStatus = statusFilter ? item.status[1] === statusFilter : true;
    const matchesDate = dateFilter ? item.status[0] === dateFilter : true;
    return matchesStatus && matchesDate;
  });

  const updateItemStatus = (itemId, newStatus) => {
    const updatedItems = electricianItems.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          status: [new Date().toISOString().split("T")[0], newStatus],
        };
      }
      return item;
    });
    console.log(`Updated item ${itemId} to status ${newStatus}`, updatedItems);
  };

  const uniqueDates = [...new Set(electricianItems.map((item) => item.status[0]))];

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg mb-6 p-6">
        <h2 className="text-xl font-bold mb-4">Electrician Maintenance Dashboard</h2>

        <div className="flex items-center flex-wrap gap-4 mb-6">
          {/* Status Filter */}
          <select
            className="border border-gray-300 rounded-md px-4 py-2 w-60"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="needs maintenance">Needs Maintenance</option>
            <option value="already maintained">Already Maintained</option>
            <option value="uninspected">Uninspected</option>
          </select>

          {/* Date Filter */}
          <select
            className="border border-gray-300 rounded-md px-4 py-2 w-60"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="">All Dates</option>
            {uniqueDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>

          <button
            className="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-200"
            onClick={() => {
              setStatusFilter("");
              setDateFilter("");
            }}
          >
            Clear Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 text-black">
            <caption className="text-sm text-left mb-2 px-2 text-gray-500">
              List of items requiring maintenance
            </caption>
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">ID</th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Category</th>
                <th className="border px-4 py-2 text-left">Location</th>
                <th className="border px-4 py-2 text-left">Model</th>
                <th className="border px-4 py-2 text-left">Status</th>
                <th className="border px-4 py-2 text-left">Last Checked</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{item.id}</td>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.category}</td>
                  <td className="border px-4 py-2">{`Block ${item.block}, Room ${item.room}`}</td>
                  <td className="border px-4 py-2">{item.model}</td>
                  <td className="border px-4 py-2">
                    <span
                      className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                        item.status[1] === "needs maintenance"
                          ? "bg-red-100 text-red-700"
                          : item.status[1] === "already maintained"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status[1]}
                    </span>
                  </td>
                  <td className="border px-4 py-2">{item.status[0]}</td>
                  <td className="border px-4 py-2">
                    <select
                      className="border border-gray-300 rounded px-2 py-1 w-44 disabled:opacity-60 text-white"
                      onChange={(e) => updateItemStatus(item.id, e.target.value)}
                      disabled={item.status[1] === "already maintained"}
                      defaultValue=""
                    >
                      <option disabled value="">
                        Update status
                      </option>
                      <option value="already maintained">Mark as Maintained</option>
                      <option value="needs maintenance">Needs Maintenance</option>
                      <option value="uninspected">Mark as Uninspected</option>
                    </select>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-gray-500">
                    No items match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MaintenancePage;
