import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef
} from "react";

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  clearAccessToken: () => void;
  authenticated: boolean;
  refreshAccessToken: () => Promise<string | null>;
  apiClient: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log("%c[AuthProvider] RENDER", "color: purple");

  const [accessToken, setAccessTokenState] = useState<string | null>(() => {
    try {
      const stored = localStorage.getItem("access_token");
      console.log("%c[INIT] Loaded access token:", "color: purple", stored);
      return stored;
    } catch {
      return null;
    }
  });

  const isRefreshing = useRef(false);
  const refreshSubscribers = useRef<Array<(token: string | null) => void>>([]);

  useEffect(() => {
    console.log("%c[AuthProvider] useEffect(storage listener)", "color: purple");
    const onStorage = (e: StorageEvent) => {
      if (e.key === "access_token") {
        console.log("%c[STORAGE] access_token changed:", "color: purple", e.newValue);
        setAccessTokenState(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setAccessToken = (token: string | null) => {
    console.log("%c[SET TOKEN] New token:", "color: green", token);
    try {
      if (token) localStorage.setItem("access_token", token);
      else localStorage.removeItem("access_token");
    } catch {}
    setAccessTokenState(token);
  };

  const clearAccessToken = useCallback(() => {
    console.log("%c[CLEAR TOKEN]", "color: red");
    localStorage.removeItem("access_token");
    setAccessTokenState(null);
  }, []);

  // -----------------------------
  // REFRESH TOKEN
  // -----------------------------
  const refreshAccessToken = useCallback(async (): Promise<string | null> => {
    console.log("%c[REFRESH] Called refreshAccessToken()", "color: orange");

    if (isRefreshing.current) {
      console.log("%c[REFRESH] Already refreshing → queue subscriber", "color: orange");
      return new Promise(resolve => {
        refreshSubscribers.current.push(token => {
          console.log("%c[REFRESH] Subscriber resolved:", "color: orange", token);
          resolve(token);
        });
      });
    }

    isRefreshing.current = true;
    console.log("%c[REFRESH] Starting refresh request...", "color: orange");

    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      console.log("%c[REFRESH] Response status:", "color: orange", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[REFRESH] FAILED:", response.status, errorText);
        throw new Error("Refresh failed");
      }

      const data = await response.json();
      console.log("%c[REFRESH] Response JSON:", "color: orange", data);

      const newToken = data.access_token;
      console.log("%c[REFRESH] New access token:", "color: orange", newToken);

      setAccessToken(newToken);

      refreshSubscribers.current.forEach(cb => cb(newToken));
      refreshSubscribers.current = [];

      return newToken;
    } catch (err) {
      console.error("%c[REFRESH] ERROR:", "color: red", err);
      refreshSubscribers.current.forEach(cb => cb(null));
      refreshSubscribers.current = [];
      clearAccessToken();
      return null;
    } finally {
      console.log("%c[REFRESH] Finished", "color: orange");
      isRefreshing.current = false;
    }
  }, [clearAccessToken]);

  // -----------------------------
  // API CLIENT
  // -----------------------------
  const apiClient = useCallback(
    async (input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> => {
      const url = input.toString();
      console.log("%c[API] Request started:", "color: cyan", url);

      const isPublic = ["/api/auth/refresh", "/api/csrf"].some(p => url.includes(p));
      console.log("%c[API] Is public endpoint:", "color: cyan", isPublic);

      const makeRequest = async (token: string | null, label: string) => {
        console.log(`%c[API] makeRequest(${label}) token:`, "color: cyan", token);

        const headers = new Headers(init.headers);
        if (token && !isPublic) {
          headers.set("Authorization", `Bearer ${token}`);
        }

        const res = await fetch(url, {
          ...init,
          headers,
          credentials: "include"
        });

        console.log(`%c[API] Response (${label}) status:`, "color: cyan", res.status);
        console.log(
          `%c[API] Response (${label}) X-Token-Expired:`,
          "color: cyan",
          res.headers.get("X-Token-Expired")
        );

        return res;
      };

      // FIRST ATTEMPT
      const first = await makeRequest(accessToken, "FIRST");

      const expired = first.headers.get("X-Token-Expired") === "true";
      console.log("%c[API] Token expired?", "color: cyan", expired);

      if (!expired) {
        console.log("%c[API] Returning FIRST response", "color: cyan");
        return first;
      }

      // REFRESH
      console.log("%c[API] Token expired → refreshing...", "color: yellow");
      const newToken = await refreshAccessToken();
      console.log("%c[API] New token after refresh:", "color: yellow", newToken);

      if (!newToken) {
        console.log("%c[API] Refresh failed → throwing", "color: red");
        throw new Error("Unable to refresh token");
      }

      // RETRY ONCE
      console.log("%c[API] Retrying with new token...", "color: yellow");
      const second = await makeRequest(newToken, "SECOND");

      console.log("%c[API] Returning SECOND response", "color: yellow");
      return second;
    },
    [accessToken, refreshAccessToken]
  );

  const value = useMemo(
    () => ({
      accessToken,
      setAccessToken,
      clearAccessToken,
      authenticated: !!accessToken,
      refreshAccessToken,
      apiClient
    }),
    [accessToken, refreshAccessToken, apiClient, clearAccessToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
