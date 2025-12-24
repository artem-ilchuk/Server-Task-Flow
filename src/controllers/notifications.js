export const getNotifications = async (req, res) => {
  const events = [
    'New task assigned to you',
    'Project status updated',
    "Deadline approaching for 'Fix bugs'",
    'New comment on your task',
  ];

  const randomEvent = events[Math.floor(Math.random() * events.length)];

  const hasNew = Math.random() > 0.7;

  res.status(200).json({
    status: 200,
    data: hasNew
      ? {
          id: Date.now().toString(),
          message: randomEvent,
          createdAt: new Date(),
        }
      : null,
  });
};
