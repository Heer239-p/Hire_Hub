import { useEffect, useState } from "react";

const readUserFromStorage = () => {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("userInfo");
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn("Failed to parse stored user", error);
    return null;
  }
};

const useAuthUser = () => {
  const [user, setUser] = useState(() => readUserFromStorage());

  useEffect(() => {
    const syncUser = () => setUser(readUserFromStorage());

    window.addEventListener("storage", syncUser);
    window.addEventListener("authChange", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("authChange", syncUser);
    };
  }, []);

  return user;
};

export default useAuthUser;
