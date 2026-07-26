export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { id: "overview", label: "Overview", href: "#overview" },
  { id: "why-attend", label: "Why Attend", href: "#why-attend" },
  { id: "curriculum", label: "What You'll Learn", href: "#curriculum" },
  { id: "session-flow", label: "Session Flow", href: "#session-flow" },
  { id: "faculty", label: "Faculty", href: "#faculty" },
  { id: "audience", label: "Who Can Join", href: "#audience" },
  { id: "faq", label: "FAQ", href: "#faq" },
];
