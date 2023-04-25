from prettyconf import config as pconfig
from datetime import timedelta

DEBUG = pconfig("DEBUG", default=False)

SENTRY_DSN = pconfig("SENTRY_DSN", default=None)

VERSION = pconfig("VERSION", default="2.4.0")

MONGODB_SETTINGS = {
    'host': pconfig("MONGODB_HOST", default='mongodb+srv://evadb.l657k.mongodb.net/EvaDB'),
    'port': pconfig("MONGODB_PORT", default=27017),
    'username': pconfig("MONGODB_USERNAME", default='oscar'),
    'password': pconfig("MONGODB_PASSWORD", default='iwCTSZT1h9Ky3FgQ'),
}

SECRET_KEY = pconfig("SECRET_KEY", default="iwCTSZT1h9Ky3FgQ")

JWT_SECRET_KEY = pconfig("JWT_SECRET_KEY", default="iwCTSZT1h9Ky3FgQ")
JWT_EXPIRATION_DELTA = pconfig("JWT_EXPIRATION_DELTA", default=timedelta(days=1))
JWT_REFRESH_EXPIRATION_DELTA = pconfig("JWT_REFRESH_EXPIRATION_DELTA", default=timedelta(days=30))

JSONIFY_PRETTYPRINT_REGULAR = pconfig("JSONIFY_PRETTYPRINT_REGULAR", default=True)
