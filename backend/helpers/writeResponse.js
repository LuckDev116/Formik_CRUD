const writeResponse = (res, response, successCode = 200) => {
  if (response.success) {
    res.status(successCode).json(response);
  } else {
    res.status(response.code).json(response);
  }
}
module.exports = writeResponse;