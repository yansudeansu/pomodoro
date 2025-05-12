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
  X,
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
  close: X,
};

export type IconName = keyof typeof AppIcons;
