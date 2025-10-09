import React, { useEffect, useState } from "react";

// Function to add a new activity globally
export const addActivity = (action, entity, name) => {
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const message = `${action} ${entity}: ${name}`;

  // Fetch existing activities from localStorage
  const existing = JSON.parse(localStorage.getItem("recentActivities")) || [];
  const updated = [{ id: Date.now(), message, time }, ...existing];

  // Save back to localStorage
  localStorage.setItem("recentActivities", JSON.stringify(updated));

  return updated;
};

// Function to get activities from localStorage
export const getActivities = () => {
  return JSON.parse(localStorage.getItem("recentActivities")) || [];
};

const RecentActivity = ({ activitiesProp }) => {
  const [activities, setActivities] = useState(activitiesProp || []);

  // Sync with localStorage changes
  useEffect(() => {
    const handleStorage = () => {
      setActivities(getActivities());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">🕒 Recent Activity</h2>
      <ul className="divide-y divide-gray-200">
        {activities.length === 0 ? (
          <li className="py-3 text-gray-500">No recent activity</li>
        ) : (
          activities.map((activity) => (
            <li key={activity.id} className="py-3 flex justify-between items-center">
              <p className="text-gray-700">{activity.message}</p>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RecentActivity;
