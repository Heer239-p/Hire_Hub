# Apply Dark Mode to All Remaining Tables

## Pattern to Apply

For each table file, replace these patterns:

### 1. Main Container
```jsx
// OLD:
<div className="p-6 bg-gray-50 min-h-screen">

// NEW:
<div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
```

### 2. Page Title
```jsx
// OLD:
<h1 className="text-3xl font-semibold mb-6 text-gray-800">

// NEW:
<h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
```

### 3. Search Input
```jsx
// OLD:
className="border border-gray-300 rounded-lg px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"

// NEW:
className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 w-1/3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
```

### 4. Action Buttons
```jsx
// Blue Button:
className="flex items-center bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"

// Green Button:
className="bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"

// Yellow Button:
className="bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-700 text-white px-4 py-2 rounded-lg shadow"
```

### 5. Table Container
```jsx
// OLD:
<div className="overflow-x-auto rounded-lg shadow">
  <table className="w-full bg-white text-sm border-t border-gray-300 border-collapse">
    <thead className="bg-blue-500 text-white uppercase text-sm">

// NEW:
<div className="overflow-x-auto rounded-lg shadow dark:shadow-gray-900">
  <table className="w-full bg-white dark:bg-gray-800 text-sm border-t border-gray-300 dark:border-gray-700 border-collapse">
    <thead className="bg-blue-500 dark:bg-blue-700 text-white uppercase text-sm">
```

### 6. Table Rows
```jsx
// OLD:
<tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 transition">

// NEW:
<tr key={item.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
```

### 7. Table Cells
```jsx
// OLD:
<td className="p-3">{item.field}</td>

// NEW:
<td className="p-3 text-gray-900 dark:text-gray-100">{item.field}</td>
```

### 8. Action Icons
```jsx
// OLD:
<button className="text-blue-500 hover:text-blue-700">
<button className="text-green-500 hover:text-green-700">
<button className="text-red-500 hover:text-red-700">

// NEW:
<button className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
<button className="text-green-500 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">
<button className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
```

### 9. Empty State
```jsx
// OLD:
<td colSpan="X" className="text-center p-5 text-gray-500 border-t border-gray-300">

// NEW:
<td colSpan="X" className="text-center p-5 text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700">
```

### 10. Pagination Text
```jsx
// OLD:
<span className="text-gray-700 text-sm font-medium">

// NEW:
<span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
```

## Files to Update

- [ ] applicationTable.jsx
- [ ] categoriesTable.jsx
- [ ] companyTable.jsx
- [ ] employerTable.jsx

## Already Updated

- [x] UserTable.jsx
- [x] JobTable.jsx
- [x] Dashboard.jsx
- [x] Header.jsx
- [x] Sidebar.jsx
- [x] AdminLayout.jsx
- [x] recentActivity.jsx
- [x] addModel.jsx (user)
