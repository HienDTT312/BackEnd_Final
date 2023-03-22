exports.HTTP_RESPONSE = Object.freeze({
  OK: { code: 200, statusText: 'Ok' },
  CREATED: { code: 201, statusText: 'Created' },
  NOT_FOUND: { code: 404, statusText: 'Not Found' },
  BAD_REQUEST: { code: 400, statusText: 'Bad Request' },
  UNAUTHORIZED: { code: 401, statusText: 'Unauthorized' },
  FORBIDDEN: { code: 403, statusText: 'Forbidden' },
  UNPROCESSABLE_ENTITY: { code: 422, statusText: 'Unprocessable Entity' },
  INTERNAL_SERVER_ERROR: { code: 500, statusText: 'Internal Server Error' },
});

exports.ROLES =  Object.freeze({
  QA_COORDINATOR: 3,
  ADMIN: 2,
  STAFF: 1,
  QA_MANAGER: 4,
});

exports.IDEA_STATUS =  Object.freeze({
  FIRST_CLOSURE: 'first_closure',
  FINAL_CLOSURE: 'final_closure',
  CLOSED: 'closed',
});

exports.TERM_STATUS =  Object.freeze({
  ONGOING: 'ongoing',
  UPCOMING: 'upcoming',
  FINISHED: 'finished',
});
    