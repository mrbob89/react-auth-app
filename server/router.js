const Authentification = require('./controllers/authentification');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
    app.get('/', requireAuth, function(req, res) {
        res.send({ message: 'Super secret code is ABC123' });
    });
    app.post('/signin', requireSignin, Authentification.signin);
    app.post('/signup', Authentification.signup);
}