const accessCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  path: "/",
  maxAge: 15 * 60 * 1000, // 15 menit
};

const refreshCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
};

module.exports = {
  accessCookieOptions,
  refreshCookieOptions,
};
