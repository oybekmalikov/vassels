const config = require("config");
const jwt = require("jsonwebtoken");
class JwtService {
  constructor(accessKey, refreshKey) {
    (this.accessKey = accessKey),
      (this.refreshKey = refreshKey),
      (this.accessTime = config.get("ACCESS_TIME")),
      (this.refreshTime = config.get("REFRESH_TIME"));
  }
  genereteTokens(payload) {
    const accessToken = jwt.sign(payload, this.accessKey, {
      expiresIn: this.accessTime,
    });
    const refreshToken = jwt.sign(payload, this.refreshKey, {
      expiresIn: this.refreshTime,
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  async verifyAccessToken(token) {
    return jwt.verify(token, this.accessKey);
  }
  async verifyRefreshToken(token) {
    return jwt.verify(token, this.refreshKey);
  }
}
module.exports = JwtService;
