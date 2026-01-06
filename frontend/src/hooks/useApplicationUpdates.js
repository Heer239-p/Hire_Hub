import { useState, useEffect, useRef } from "react";
import { getMyApplications } from "../api/applicationApi";
import { toast } from "react-toastify";

/**
 * Custom hook to poll for application status updates
 * @param {Array} initialApplications - Initial applications array
 * @param {Function} setApplications - State setter for applications
 * @param {number} interval - Polling interval in milliseconds (default: 30000)
 */
const useApplicationUpdates = (initialApplications, setApplications, interval = 30000) => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isPolling, setIsPolling] = useState(false);
  const pollIntervalRef = useRef(null);
  const applicationsRef = useRef(initialApplications);

  // Update the ref when applications change
  useEffect(() => {
    applicationsRef.current = initialApplications;
  }, [initialApplications]);

  const checkForUpdates = async () => {
    try {
      setIsPolling(true);
      const data = await getMyApplications();
      
      // Check if any application status has changed
      let hasUpdates = false;
      const updatedApplications = data.map(newApp => {
        const oldApp = applicationsRef.current.find(app => app._id === newApp._id);
        if (oldApp && oldApp.status !== newApp.status) {
          hasUpdates = true;
          // Show a toast notification for status change
          toast.info(
            `Application status for "${newApp.job.title}" updated to "${newApp.status}"`,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );
        }
        return newApp;
      });
      
      if (hasUpdates) {
        setApplications(updatedApplications);
        applicationsRef.current = updatedApplications;
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error("Error checking for application updates:", error);
    } finally {
      setIsPolling(false);
    }
  };

  const startPolling = () => {
    if (pollIntervalRef.current) return; // Prevent multiple intervals
    
    // Initial check
    checkForUpdates();
    
    // Set up recurring checks
    pollIntervalRef.current = setInterval(checkForUpdates, interval);
  };

  const stopPolling = () => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, []);

  return {
    lastUpdated,
    isPolling,
    startPolling,
    stopPolling,
    checkForUpdates
  };
};

export default useApplicationUpdates;