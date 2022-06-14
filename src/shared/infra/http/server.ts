import { app } from './app';

app.listen(process.env.PORT, () => {
  console.info(`🚀 Server started on port ${process.env.PORT}!`);
});
