import {
  Trash2,
  CirclePlus,
  CircleMinus,
  Sparkle,
  Sparkles,
  Info,
  Brain,
  CalendarDays,
  Split,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const AppIcons = {
  trash: Trash2,
  add: CirclePlus,
  remove: CircleMinus,
  sparkle: Sparkle,
  sparkles: Sparkles,
  info: Info,
  brain: Brain,
  calendar: CalendarDays,
  split: Split,
  link: ExternalLink,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
};

export type IconName = keyof typeof AppIcons;
