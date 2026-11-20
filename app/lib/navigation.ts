export type NavIconName = "home" | "children" | "bell" | "user";

export type NavItem = {
  id: "feed" | "children" | "notices" | "account";
  label: string;
  icon: NavIconName;
  active?: boolean;
};

export const navItems: NavItem[] = [
  { id: "feed", label: "Feed", icon: "home", active: true },
  { id: "children", label: "Niños", icon: "children" },
  { id: "notices", label: "Avisos", icon: "bell" },
  { id: "account", label: "Mi cuenta", icon: "user" },
];