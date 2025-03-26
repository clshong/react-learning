import { create } from "zustand";

type LayoutState = {
  collapsed: boolean;
  changeCollapsed: () => void;
};

const useLayout = create<LayoutState>((set) => ({
  collapsed: false,
  changeCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
}));

export default useLayout;
