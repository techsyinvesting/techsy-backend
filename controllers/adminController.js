exports.getDashboardData = async (req, res) => {
  // In a real app, you would fetch data from the database
  const data = {
    totalUsers: 1248,
    courses: 24,
    revenue: 184950,
    activeSessions: 86
  };
  
  res.json(data);
};