export const isSameDay = (a: Date, b: Date): boolean => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

export const filterToday = <T extends { completedAt: string }>(entries: T[] = []): T[] => {
  const today = new Date();
  return entries.filter((entry) => isSameDay(new Date(entry.completedAt), today));
};
