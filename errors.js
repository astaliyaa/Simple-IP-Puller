function createError(errorCode, errorMessage, messageVars, numericErrorCode, error, statusCode, res) {
    res.set({
        'X-Error-Name': errorCode,
        'X-Error-Code': numericErrorCode
    });

    res.status(statusCode).json({
        errorCode: errorCode,
        errorMessage: errorMessage,
        messageVars: messageVars,
        numericErrorCode: numericErrorCode,
        originatingService: "any",
        intent: "prod",
        error_description: errorMessage,
        error: error
    });
}

module.exports = {
    createError
}