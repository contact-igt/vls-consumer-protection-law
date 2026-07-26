import {
  Scale,
  Search,
  FileText,
  Compass,
  GraduationCap,
  BookOpen,
  Briefcase,
  Landmark,
  Building,
  Users,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  scale: Scale,
  search: Search,
  "file-text": FileText,
  compass: Compass,
  "graduation-cap": GraduationCap,
  "book-open": BookOpen,
  briefcase: Briefcase,
  landmark: Landmark,
  building: Building,
  users: Users,
  "shield-check": ShieldCheck,
};

interface IconProps {
  name: string;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  const LucideIconComponent = ICONS[name] ?? Scale;
  return <LucideIconComponent className={className} aria-hidden="true" />;
}
