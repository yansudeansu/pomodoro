import {
  Trash2,
  CirclePlus,
  Sparkle,
  Sparkles,
  Info,
  Brain,
  CalendarDays,
  Split,
} from "lucide-react";

export const AppIcons = {
  trash: Trash2,
  add: CirclePlus,
  sparkle: Sparkle,
  sparkles: Sparkles,
  info: Info,
  brain: Brain,
  calendar: CalendarDays,
  split: Split,
};

export type IconName = keyof typeof AppIcons;
