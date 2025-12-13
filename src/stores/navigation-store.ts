import { create } from 'zustand'

type NavItem = 'home' | 'favorites' | 'catalog' | 'cart'

interface NavigationState {
  activeTab: NavItem
  setActiveTab: (tab: NavItem) => void
}

export const useNavigationStore = create<NavigationState>((set) => ({
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),
}))