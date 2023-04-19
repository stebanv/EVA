import logging
from typing import Any

from flask import Flask

from flask_mongoengine import MongoEngine

from flask_cors import CORS

from flask_jwt_extended import JWTManager
from flask_jwt_extended import get_jwt
from flask_jwt_extended import verify_jwt_in_request


""" Globally accessible libraries """
db = MongoEngine()


def init_app(config_file_path: str = "settings.py", **config: Any) -> Flask:
    """Initialize the core application."""
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_pyfile(config_file_path)
    app.config.update(**config)

    """Logging configuration"""
    logging.basicConfig(filename='./logs/logs.log', level=logging.DEBUG,
                        format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')
    app.logger.info('Info level log')
    app.logger.warning('Warning level log')
    app.logger.error('Error level log')

    """ Initialize Plugins """
    db.init_app(app)
    CORS(app)
    JWTManager(app)

    """ Flask context """
    with app.app_context():
        # Include our Routes
        from .estudiante import estudiante_routes
        from .institucion import institucion_routes
        from .test import test_routes
        from .area import area_routes
        from .categoria import categoria_routes
        from .usuario import usuario_routes

        # Register Blueprints
        app.register_blueprint(estudiante_routes.estudiante_bp)
        app.register_blueprint(institucion_routes.institucion_bp)
        app.register_blueprint(test_routes.test_bp)
        app.register_blueprint(area_routes.area_bp)
        app.register_blueprint(categoria_routes.categoria_bp)
        app.register_blueprint(usuario_routes.usuario_bp)

        return app
