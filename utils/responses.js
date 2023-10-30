const statusCodes = {
    OK: 200,
    CREATED: 201,
    DELETED: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
};

const responseMessages = {
    OK: 'ok',
    CREATED: 'created',
    DELETED: 'deleted',
    BAD_REQUEST: 'Bad request',
    NOT_FOUND: 'Not found',
    UNAUTHORIZED: 'Unauthorized',
    FORBIDDEN: 'forbidden',
    INTERNAL_SERVER_ERROR: 'Internal server error',
}
module.exports = { statusCodes, responseMessages };