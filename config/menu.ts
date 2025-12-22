import type { MenuItemProps } from '@/components/navbar/menu-item';
// Menu principal pour la navbar
export const menuItems: MenuItemProps[] = [
  {
    title: 'Feed',
    href: '/',
  },
  {
    title: 'Moi',
    href: '/about',
  },
  {
    title: "Livre d'or",
    href: '/guestbook',
  },
];

// Menu pour la sidebar (burger menu)
export const sidebarMenuItems: MenuItemProps[] = [
  {
    title: 'Développeur Fullstack',
    href: '/roles/developpeur-fullstack',
    icon: 'icon-[mdi--code-braces]',
  },
  {
    title: 'Formateur',
    href: '/roles/formateur',
    icon: 'icon-[mdi--teach]',
  },
  {
    title: 'IA Enthusiast',
    href: '/roles/ia-enthusiast',
    icon: 'icon-[mdi--robot-outline]',
  },
  {
    title: 'Playlists',
    href: '/playlists',
    icon: 'icon-[mdi--music]',
  },
];
