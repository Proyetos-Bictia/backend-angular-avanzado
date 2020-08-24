exports.success = (req, res, message, status) => {
    res.status(status || 200).send({
        statusCode: status,
        error: '',
        message: message
    })
}

exports.error = (req, res, message, status) => {
    res.status(status || 500).send({
        statusCode: status,
        error: message,
        message: ''
    })
}