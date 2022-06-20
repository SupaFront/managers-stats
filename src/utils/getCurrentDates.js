const getCurrentDates = () => {
  const now = new Date();

  const dates = {
    start: new Date(now.getFullYear(), now.getMonth(), 1),
    end: new Date(now.getFullYear(), now.getMonth() + 1, 0),
  };

  return dates;
};

export default getCurrentDates;
