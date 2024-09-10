/* eslint-disable no-unused-vars */

import { create } from 'zustand';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  jwt: string | null;
  login: (user: User, jwt: string) => void;
  logout: () => void;
  restoreAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  jwt: localStorage.getItem('jwt') ?? null,
  login: (user: User, jwt: string) => {
    localStorage.setItem('jwt', jwt);

    set({ user, jwt });
  },
  logout: () => {
    localStorage.removeItem('jwt');
    set({ user: null, jwt: null });
  },
  restoreAuth: () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      // Logique pour restaurer l'utilisateur à partir du token
      // set({ user: { id, username, email }, jwt: token });
      set({ jwt: token });
    }
  },
}));

export default useAuthStore;
