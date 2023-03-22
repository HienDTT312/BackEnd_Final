exports.HTTP_RESPONSE = {
  OK: { code: 200, statusText: 'Ok' },
  CREATED: { code: 201, statusText: 'Created' },
  NOT_FOUND: { code: 404, statusText: 'Not Found' },
  BAD_REQUEST: { code: 400, statusText: 'Bad Request' },
  UNAUTHORIZED: { code: 401, statusText: 'Unauthorized' },
  FORBIDDEN: { code: 403, statusText: 'Forbidden' },
  UNPROCESSABLE_ENTITY: { code: 422, statusText: 'Unprocessable Entity' },
  INTERNAL_SERVER_ERROR: { code: 500, statusText: 'Internal Server Error' },
};
