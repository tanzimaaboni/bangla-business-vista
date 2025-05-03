
import React, { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "@/services/api";
import { AuthState, User } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isAdmin: false
  });
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved token in localStorage
    const token = localStorage.getItem("auth_token");
    const savedUser = localStorage.getItem("auth_user");
    
    if (token && savedUser) {
      const user = JSON.parse(savedUser) as User;
      
      // Verify token is valid
      authApi.verifyToken(token).then((valid) => {
        if (valid) {
          setAuthState({
            user,
            token,
            isAuthenticated: true,
            isAdmin: user.isAdmin
          });
        } else {
          // Token is invalid, clean up localStorage
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await authApi.login(username, password);
      
      if (response) {
        const { user, token } = response;
        
        // Save to state and localStorage
        setAuthState({
          user,
          token,
          isAuthenticated: true,
          isAdmin: user.isAdmin
        });
        
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_user", JSON.stringify(user));
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.username}!`,
          duration: 3000
        });
        
        setLoading(false);
        return true;
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password",
          variant: "destructive",
          duration: 3000
        });
        
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "An error occurred during login",
        variant: "destructive",
        duration: 3000
      });
      
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    // Clear state and localStorage
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false
    });
    
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    
    toast({
      title: "Logged Out",
      description: "You've been successfully logged out",
      duration: 3000
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
