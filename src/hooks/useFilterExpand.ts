import { create } from "zustand";

interface FangyFilter {
  expand: boolean;
  setExpand: (expand: boolean) => void;
}

export const useFangyFilter = create<FangyFilter>((set) => ({
  expand: false,
  setExpand: (expand) => set(() => ({ expand })),
}));
