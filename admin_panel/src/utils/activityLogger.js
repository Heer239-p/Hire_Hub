// Utility to log activities to localStorage
// This can be used from any component to add activities to the Dashboard

export const addActivity = (action, entity, name) => {
  try {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const message = `${action} ${entity}: ${name}`;

    let color = "text-gray-700";
    if (action === "Added") color = "text-green-600";
    else if (action === "Updated") color = "text-blue-600";
    else if (action === "Deleted") color = "text-red-600";

    // Get existing activities from localStorage
    const existingActivities = JSON.parse(localStorage.getItem("recentActivities") || "[]");
    
    // Add new activity at the beginning and keep only last 20
    const newActivity = { id: Date.now(), message, time, color };
    const updatedActivities = [newActivity, ...existingActivities].slice(0, 20);
    
    // Save back to localStorage
    localStorage.setItem("recentActivities", JSON.stringify(updatedActivities));
    
    // Dispatch custom event to notify Dashboard to reload activities
    window.dispatchEvent(new Event("activityUpdated"));
    
    console.log("📝 Activity logged:", message);
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
};
