import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { ActiveSubmenusType } from '@/components';

interface MainNavigationState {
  menuTitle: string;
  activeSubmenus: ActiveSubmenusType;
  isOpenedMenu: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  updateMenuTitle: (title: string) => void;
  updateSubmenus: (
    level: number,
    id: number,
    prevTitle?: string | null,
  ) => void;
  resetmenuTitle: () => void;
  backMenu: () => void;
}

const defaultTitle = 'Main menu';

const useMainNavigationStore = create<MainNavigationState>()(
  devtools(
    immer((set) => ({
      menuTitle: defaultTitle,
      prevTitle: null,
      isOpenedMenu: false,
      activeSubmenus: {},
      openMenu: () =>
        set((state) => {
          state.isOpenedMenu = true;
          ``;
        }),
      closeMenu: () =>
        set((state) => {
          state.isOpenedMenu = false;
        }),
      backMenu: () =>
        set((state) => {
          const copySubmenus = { ...state.activeSubmenus };
          const prevTitle =
            copySubmenus[Object.keys(copySubmenus).length].title;
          delete copySubmenus[Object.keys(copySubmenus).length];
          if (!Object.keys(copySubmenus).length) {
            state.menuTitle = defaultTitle;
          } else if (prevTitle) {
            state.menuTitle = prevTitle;
          }
          state.activeSubmenus = copySubmenus;
        }),
      updateMenuTitle: (title: string) =>
        set((state) => {
          state.menuTitle = title;
        }),
      updateSubmenus: (level: number, id: number, prevTitle?: string | null) =>
        set((state) => {
          const activatedSubmenus = state.activeSubmenus;

          let activeLinks: ActiveSubmenusType = {};
          if (!Object.entries(activatedSubmenus).length) {
            activeLinks = {
              [level]: {
                key: id,
              },
            };
          } else {
            for (const key in activatedSubmenus) {
              if (level > +key) {
                activeLinks = {
                  ...activatedSubmenus,
                  [level]: {
                    key: id,
                    title: prevTitle,
                  },
                };
              }
            }
          }

          state.activeSubmenus = activeLinks;
        }),
      resetmenuTitle: () =>
        set((state) => {
          state.menuTitle = defaultTitle;
        }),
    })),
  ),
);

export default useMainNavigationStore;
