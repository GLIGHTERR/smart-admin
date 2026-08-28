"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createAuthAdapter } from "@/lib/auth/auth-client";
import type {
  AuthSession,
  AuthStatus,
  LoginCredentials,
} from "@/lib/auth/types";

interface AuthContextValue {
  status: AuthStatus;
  session: AuthSession | null;
  login(credentials: LoginCredentials): Promise<AuthSession>;
  logout(): Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const adapter = useMemo(() => createAuthAdapter(), []);
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    let isActive = true;

    adapter
      .restoreSession()
      .then((restoredSession) => {
        if (!isActive) return;
        setSession(restoredSession);
        setStatus(restoredSession ? "authenticated" : "unauthenticated");
      })
      .catch(() => {
        if (!isActive) return;
        setSession(null);
        setStatus("unauthenticated");
      });

    return () => {
      isActive = false;
    };
  }, [adapter]);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setStatus("loading");
      try {
        const nextSession = await adapter.login(credentials);
        setSession(nextSession);
        setStatus("authenticated");
        return nextSession;
      } catch (error) {
        setSession(null);
        setStatus("unauthenticated");
        throw error;
      }
    },
    [adapter],
  );

  const logout = useCallback(async () => {
    setStatus("loading");
    try {
      await adapter.logout();
    } finally {
      setSession(null);
      setStatus("unauthenticated");
    }
  }, [adapter]);

  const value = useMemo(
    () => ({ status, session, login, logout }),
    [status, session, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
