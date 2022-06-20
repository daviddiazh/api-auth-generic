const passport = require('passport');
const LocalStrategies = require('./strategies/local.strategies')

passport.use(LocalStrategies);