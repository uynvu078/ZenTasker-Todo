import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: null,

  login: (user, token) => {
    console.log("✅ [AuthStore] User logged in:", user, token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    set({ user, token });
  },

  logout: () => {
    console.log("🚪 [AuthStore] User logged out");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("lastSeenReminders");
    set({ user: null, token: null });
  },

  rehydrate: () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      set({ user: storedUser, token: storedToken });
    }
  },
}));

// Rehydrate Zustand state on app start
useAuthStore.getState().rehydrate();

export default useAuthStore;
