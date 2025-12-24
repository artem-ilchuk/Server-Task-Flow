import { isHttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  // Используем встроенную функцию проверки из библиотеки
  if (isHttpError(err)) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message, // Выводим реальное сообщение ошибки
    });
  }

  // Логируем системные ошибки (500), чтобы видеть их в консоли Render
  console.error('SERVER_ERROR:', err);

  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
};
