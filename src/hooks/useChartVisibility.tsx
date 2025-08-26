import { useState } from 'react';

export const useChartVisibility = () => {
  const [showChart, setShowChart] = useState(false);

  const toggleChart = () => setShowChart((prev) => !prev);

  return {
    showChart,
    toggleChart,
  };
};
