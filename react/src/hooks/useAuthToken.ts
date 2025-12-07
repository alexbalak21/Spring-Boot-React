// hooks/useAuthToken.ts
import { useState } from "react";

export function useAuthToken() {
  const [accessToken, setAccessTokenState] = useState<string | null>(
    localStorage.getItem("access_token")
  );

  const setAccessToken = (newToken: string) => {
    localStorage.setItem("access_token", newToken);
    setAccessTokenState(newToken);
  };

  const clearAccessToken = () => {
    localStorage.removeItem("access_token");
    setAccessTokenState(null);
  };

  return { accessToken, setAccessToken, clearAccessToken };
}
