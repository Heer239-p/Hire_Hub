// /services/userService.js

// Initialize default users in localStorage if not present
const initializeUsers = () => {
  const stored = localStorage.getItem("users");
  if (!stored) {
    const defaultUsers = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 555-1234",
        role: "Admin",
        category: "IT",
        profile: "",
        date: "2025-10-01",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+44 20 7946 0958",
        role: "User",
        category: "Design",
        profile: "",
        date: "2025-09-25",
      },
      {
        id: 3,
        name: "Michael Brown",
        email: "michael.brown@example.com",
        phone: "+1 555-5678",
        role: "Moderator",
        category: "QA",
        profile: "",
        date: "2025-09-20",
      },
      {
        id: 4,
        name: "Emily Johnson",
        email: "emily.johnson@example.com",
        phone: "+49 30 123456",
        role: "User",
        category: "Management",
        profile: "",
        date: "2025-09-18",
      },
      {
        id: 5,
        name: "David Wilson",
        email: "david.wilson@example.com",
        phone: "+1 555-8765",
        role: "Admin",
        category: "IT",
        profile: "",
        date: "2025-09-10",
      },
      {
        id: 6,
        name: "Sophia Lee",
        email: "sophia.lee@example.com",
        phone: "+44 20 1234 5678",
        role: "User",
        category: "Design",
        profile: "",
        date: "2025-09-05",
      },
    ];
    localStorage.setItem("users", JSON.stringify(defaultUsers));
  }
};

export const fetchUsers = async (page = 1, searchTerm = "") => {
  // Initialize users if not present
  initializeUsers();
  
  // Get users from localStorage
  const allUsers = JSON.parse(localStorage.getItem("users") || "[]");

  // Filter by search term
  const filtered = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination setup
  const usersPerPage = 2;
  const totalPages = Math.ceil(filtered.length / usersPerPage);
  const start = (page - 1) * usersPerPage;
  const end = start + usersPerPage;
  const users = filtered.slice(start, end);

  // Simulate API delay
  await new Promise((res) => setTimeout(res, 500));

  return { users, totalPages, total: filtered.length };
};

// Add a new user
export const addUser = async (userData) => {
  initializeUsers();
  const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
  
  // Generate new ID
  const newId = allUsers.length > 0 ? Math.max(...allUsers.map(u => u.id)) + 1 : 1;
  
  // Create new user object
  const newUser = {
    id: newId,
    name: `${userData.first_name} ${userData.last_name}`,
    email: userData.email,
    phone: userData.phone,
    role: userData.role,
    category: userData.category || 'IT',
    profile: userData.profile || '',
    date: new Date().toISOString().split('T')[0],
  };
  
  // Add to array and save
  allUsers.push(newUser);
  localStorage.setItem("users", JSON.stringify(allUsers));
  
  console.log("✅ User added to localStorage:", newUser);
  console.log("✅ Total users in localStorage:", allUsers.length);
  console.log("✅ All users:", allUsers);
  
  // Dispatch custom event to notify other components in the same window
  window.dispatchEvent(new Event("localStorageUpdated"));
  
  // Simulate API delay
  await new Promise((res) => setTimeout(res, 300));
  
  return newUser;
};

// Update a user
export const updateUser = async (userId, userData) => {
  const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
  const index = allUsers.findIndex(u => u.id === userId);
  
  if (index !== -1) {
    allUsers[index] = { ...allUsers[index], ...userData };
    localStorage.setItem("users", JSON.stringify(allUsers));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("localStorageUpdated"));
  }
  
  await new Promise((res) => setTimeout(res, 300));
  return allUsers[index];
};

// Delete a user
export const deleteUser = async (userId) => {
  const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
  const filtered = allUsers.filter(u => u.id !== userId);
  localStorage.setItem("users", JSON.stringify(filtered));
  
  // Dispatch custom event to notify other components
  window.dispatchEvent(new Event("localStorageUpdated"));
  
  await new Promise((res) => setTimeout(res, 300));
  return true;
};
