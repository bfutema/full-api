function log(request, response, next): void {
  const { NODE_ENV } = process.env;

  if (NODE_ENV !== 'develop') console.info(`Request a ${request.path}`);

  return next();
}

export { log };
