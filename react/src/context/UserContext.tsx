import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
import type { UserInfo, UserContextType } from "../types";

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const { apiClient, authenticated } = useAuth();

  // Prevent React Strict Mode from running the effect twice
  const didRun = useRef(false);

  useEffect(() => {
    if (!authenticated) {
      console.log("%c[User] Not authenticated → skipping user fetch", "color: gray");
      setUser(null);
      return;
    }

    if (didRun.current) {
      console.log("%c[User] Effect prevented (Strict Mode second run)", "color: gray");
      return;
    }
    didRun.current = true;

    const fetchUser = async () => {
      console.log("%c[User] Fetching /api/user...", "color: blue");

      try {
        const response = await apiClient("/api/user");

        console.log("%c[User] /api/user status:", "color: blue", response.status);

        if (response.ok) {
          const userData = await response.json();
          console.log("%c[User] User loaded:", "color: green", userData);
          setUser(userData);
        } else {
          console.log("%c[User] Unauthorized → user = null (but NOT clearing token)", "color: orange");
          setUser(null);
        }
      } catch (err) {
        console.error("%c[User] Failed to fetch user:", "color: red", err);
        setUser(null);
      }
    };

    fetchUser();
  }, [authenticated, apiClient]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
