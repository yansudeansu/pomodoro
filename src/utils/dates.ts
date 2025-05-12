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

export const getWeeklySummary = (entries: { completedAt: string }[]) => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));

  const summary = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    const dateKey = date.toISOString().slice(0, 10);
    return { date, dateKey, count: 0 };
  });

  for (const entry of entries) {
    const dateKey = new Date(entry.completedAt).toISOString().slice(0, 10);
    const match = summary.find((d) => d.dateKey === dateKey);
    if (match) match.count += 1;
  }

  return summary;
};
