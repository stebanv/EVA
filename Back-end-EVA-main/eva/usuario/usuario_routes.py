from flask import Blueprint, make_response, jsonify, request, abort
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity

from . import models

#
usuario_bp = Blueprint('usuario', __name__)


# Login route
@usuario_bp.route('/login', methods=['POST', 'GET', 'OPTIONS'])
def login():
    if request.method == 'POST':
        try:
            request_data = request.get_json()
            username = request_data['username']
            password = request_data['password']
            usuario = models.comprobar_usuario(username, password)
            if usuario is not None:
                access_token = create_access_token(identity=username,
                                                   additional_claims={'tipo_usuario': usuario['tipo_usuario']})
                usuario['access_token'] = access_token
                return make_response(jsonify(usuario), 200)
            else:
                return make_response(jsonify({"Mensaje": "Usuario o contraseña incorrecto"}), 400)
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": e}), 500)
    if request.method == 'OPTIONS':
        return make_response(jsonify({"Mensaje": "OK"}), 200)
    if request.method == 'GET':
        return make_response(jsonify({"Mensaje": "OK"}), 200)


# reset password route
@usuario_bp.route('/change_password', methods=['POST', 'GET', 'OPTIONS'])
@jwt_required()
def change_password():
    if request.method == 'POST':
        try:
            username = get_jwt_identity()
            request_data = request.get_json()
            password = request_data['password']
            new_password = request_data['new_password']
            usuario = models.comprobar_usuario(username, password)
            if usuario is not None:
                models.update_password(username, new_password)
                return make_response(jsonify({"Mensaje": "Contraseña actualizada"}), 200)
            else:
                return make_response(jsonify({"Mensaje": "Usuario o contraseña incorrecto"}), 400)
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": e}), 500)
    if request.method == 'OPTIONS':
        return make_response(jsonify({"Mensaje": "OK"}), 200)
    if request.method == 'GET':
        return make_response(jsonify({"Mensaje": "OK"}), 200)


@usuario_bp.route('/signup_admin', methods=['POST', 'GET', 'OPTIONS'])
def signup_admin():
    if request.method == 'POST':
        try:
            request_data = request.get_json()
            username = request_data['username']
            password = request_data['password']
            models.crear_usuario(username, password, "administrador")
            return make_response(jsonify({"Mensaje": "Usuario creado"}), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": e}), 500)
    if request.method == 'OPTIONS':
        return make_response(jsonify({"Mensaje": "OK"}), 200)
    if request.method == 'GET':
        return make_response(jsonify({"Mensaje": "OK"}), 200)


# List all users
@usuario_bp.route('/usuarios', methods=['GET'])
def get_usuarios():
    if request.method == 'GET':
        try:
            return make_response(jsonify(models.consultar_usuarios()), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify(str(e)), 400)