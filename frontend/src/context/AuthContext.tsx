import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'researcher' | 'faculty' | 'admin';
  institution: string;
  avatar?: string;
  authProvider: 'google' | 'email';
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginAsDemoStudent: () => void;
  switchRole: (role: 'student' | 'researcher' | 'faculty' | 'admin') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('campus_ai_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('campus_ai_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('campus_ai_user');
    }
  }, [user]);

  const loginWithGoogle = async () => {
    const googleUser: AuthUser = {
      id: 'google-student-01',
      name: 'Alex Morgan',
      email: 'alex.morgan@university.edu',
      role: 'student',
      institution: 'Faculty of Computer Science & Engineering',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
      authProvider: 'google',
    };
    setUser(googleUser);
  };

  const loginWithEmail = async (email: string, _password: string) => {
    const username = email.split('@')[0] || 'Student';
    const emailUser: AuthUser = {
      id: 'email-student-01',
      name: username.charAt(0).toUpperCase() + username.slice(1),
      email: email,
      role: 'student',
      institution: 'University Academic Portal',
      authProvider: 'email',
    };
    setUser(emailUser);
  };

  const loginAsDemoStudent = () => {
    const demoUser: AuthUser = {
      id: 'demo-student-01',
      name: 'Geetesh Kumar',
      email: 'geetesh.kumar@university.edu',
      role: 'student',
      institution: 'Department of Computer Science & Engineering',
      authProvider: 'email',
    };
    setUser(demoUser);
  };

  const switchRole = (role: 'student' | 'researcher' | 'faculty' | 'admin') => {
    if (user) {
      setUser({ ...user, role });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('campus_ai_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginWithGoogle,
        loginWithEmail,
        loginAsDemoStudent,
        switchRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
