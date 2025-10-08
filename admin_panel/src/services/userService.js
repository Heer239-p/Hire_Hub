// /services/userService.js
export const fetchUsers = async (page = 1, searchTerm = "") => {
  // Mock user data
  const allUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 555-1234",
      role: "Admin",
      date: "2025-10-01",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+44 20 7946 0958",
      role: "User",
      date: "2025-09-25",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "+1 555-5678",
      role: "Moderator",
      date: "2025-09-20",
    },
    {
      id: 4,
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      phone: "+49 30 123456",
      role: "User",
      date: "2025-09-18",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@example.com",
      phone: "+1 555-8765",
      role: "Admin",
      date: "2025-09-10",
    },
    {
      id: 6,
      name: "Sophia Lee",
      email: "sophia.lee@example.com",
      phone: "+44 20 1234 5678",
      role: "User",
      date: "2025-09-05",
    },
  ];

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
