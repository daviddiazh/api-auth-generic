const passport = require('passport');

const LocalStrategies = require('./strategies/local.strategies');
const JwtStrategy = require('./strategies/jwt.strategies');

passport.use(LocalStrategies);
passport.use(JwtStrategy);