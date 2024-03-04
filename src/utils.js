const getToken = (authorization) => {
  const [, token] = authorization.split("Bearer");
  return token?.trim();
};

module.exports = { getToken };