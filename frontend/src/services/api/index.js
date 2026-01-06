// API Index - Export all API functions

export * as authApi from './authApi';
export * as userApi from './userApi';
export * as jobApi from './jobApi';
export * as applicationApi from './applicationApi';
export * as companyApi from './companyApi';

// Export individual functions for easier imports
export { 
  // Auth API
  registerUser, 
  loginUser, 
  logoutUser 
} from './authApi';

export { 
  // User API
  getOnlyUsers, 
  updateUserProfile,
  getUserProfile
} from './userApi';

export { 
  // Job API
  getAllJobs, 
  createJob, 
  getMyJobs, 
  updateJob, 
  deleteJob 
} from './jobApi';

export { 
  // Application API
  applyJob, 
  getMyApplications, 
  withdrawApplication,
  getMyJobApplications,
  updateApplicationStatus
} from './applicationApi';

export { 
  // Company API
  createCompany,
  getCompanyById,
  getCompanies,
  updateCompany,
  deleteCompany,
  getMyCompanies
} from './companyApi';