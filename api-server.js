const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const authConfig = require("./src/auth_config.json");
const jwtAuthz = require("express-jwt-authz");

const app = express();

const port = process.env.API_PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;

//disabled for testing
//if (!authConfig.domain || !authConfig.audience) {
//  throw new Error(
//    "Please make sure that auth_config.json is in place and populated"
//  );
//}

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"]
});

const checkPermissions = jwtAuthz(["access:tools"], {
  customScopeKey: "permissions",
  checkAllScopes: true
});

app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your access token was successfully validated!"
  });
});

app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});

app.get("/api/role", checkJwt, checkPermissions, (req, res) => {
  res.send({
    msg: "You called the role endpoint!"
  });
});

app.listen(port, () => console.log(`API Server listening on port ${port}`));
