const VIPER_PRIVATE = `-----BEGIN EC PRIVATE KEY-----
MIHcAgEBBEIAo2FybNLdufSnkj7nEtgZB1RQddKRAiu9mAZk4AFlTBnl4EKiaa2P
+UBtKpvCSAeS3baz9ydIFE8OFNNAw4WVLFqgBwYFK4EEACOhgYkDgYYABAH9Tqio
8bifM5UF3yrrLafQCLuAN3vQW14gx49eToEH/rpxlDaYtrc4PAC/T8raz1FfJsI7
JEPmv3z6ybHDtWI7pAFyhfs3GYihcpn9l/NjHcqBqLh/K5xJd3anNDXGUv+IhUiB
/jOItuqFasdeDUW8XEp1REeDmW0M06yppUp//bEe0A==
-----END EC PRIVATE KEY-----`;

const VIPER_PUBLIC = `-----BEGIN PUBLIC KEY-----
MIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQB/U6oqPG4nzOVBd8q6y2n0Ai7gDd7
0FteIMePXk6BB/66cZQ2mLa3ODwAv0/K2s9RXybCOyRD5r98+smxw7ViO6QBcoX7
NxmIoXKZ/ZfzYx3Kgai4fyucSXd2pzQ1xlL/iIVIgf4ziLbqhWrHXg1FvFxKdURH
g5ltDNOsqaVKf/2xHtA=
-----END PUBLIC KEY-----`;

export const VIPER = {
  url:
    "https://api.manifold.co/v1/users?bar=foo&abc=cba&ts=1543916298&sig=MIGHAkFckAIo44-3mjpwqW6bDZKiTE5T38Dc5ZabW0DFJfXW-PMbTp--8_28E3LozceHIhdW9_tBLmvm9TaDukT--TKP-QJCAfkrW3NgnrB4LQZS6HOiwj-gY83CllMfsx_ut3lvP65z8dJSYXErxMBxglzk24LVeRR440W86LT5U5OdVIfjHQnt",
  private: VIPER_PRIVATE,
  public: VIPER_PUBLIC
};