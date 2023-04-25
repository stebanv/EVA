from flask import Blueprint, make_response, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from . import models
from eva.usuario import models as usuario_models

estudiante_bp = Blueprint('estudiante', __name__)


@estudiante_bp.route('/instituciones/<string:id_ie>/estudiantes', methods=['GET', 'POST'])
#@jwt_required()
def get_estudiantes(id_ie):
    if request.method == 'GET':
        try:
            return make_response(jsonify(models.consultar_estudiantes_idie(id_ie)), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify(str(e)), 400)

    if request.method == 'POST':
        try:
            data = request.get_json()
            nombre = data['nombre']
            apellido = data['apellido']
            curso = data['curso']
            grado = str(data['grado'])
            username = data['username']
            password = data['password']
            aux = models.crear_estudiante(nombre, apellido, curso, grado, id_ie)
            usuario_models.crear_usuario(username, password, "estudiante", id_ie, aux.id)
            return make_response(jsonify("Estudiante creado"), 201)
        except Exception as e:
            print(e)
            return make_response(jsonify(str(e)), 400)


@estudiante_bp.route('/instituciones/<string:id_ie>/estudiantes/<string:id>', methods=['GET', 'PUT', 'DELETE'])
#@jwt_required()
def get_estudiante(id_ie, id):
    if request.method == 'GET':
        try:
            return make_response(jsonify(models.consultar_estudiante(id)), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify(str(e)), 400)

    if request.method == 'PUT':
        try:
            data = request.get_json()
            nombre = data['nombre']
            apellido = data['apellido']
            curso = data['curso']
            grado = str(data['grado'])
            models.modificar_estudiante(id, nombre, apellido, curso, grado)
            return make_response(jsonify("Estudiante modificado"), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify(str(e)), 400)

    if request.method == 'DELETE':
        try:
            models.eliminar_estudiante(id)
            return make_response(jsonify("Estudiante eliminado"), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify(str(e)), 400)


@estudiante_bp.route('/instituciones/<string:id_ie>/estudiantes/<string:id>/perfil_contexto', methods=['PUT'])
#@jwt_required()
def get_perfil_contexto_estudiante(id_ie, id):
    if request.method == 'PUT':
        try:
            data = request.get_json()
            datos_basicos = data['datos_basicos']
            preferencia = data['preferencia']
            temporal = data['temporal']
            social = data['social']
            reglamentacion = data['reglamentacion']
            tecnologico = data['tecnologico']
            models.registro_perfil_estudiante(id, datos_basicos, preferencia)
            models.registro_contexto_estudiante(id, temporal, social, reglamentacion, tecnologico)
            return make_response(jsonify("Perfil y Contexto modificado"), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify(str(e)), 400)


@estudiante_bp.route('/instituciones/<string:id_ie>/estudiantes/<string:id>/recomendaciones', methods=['GET'])
#@jwt_required()
def get_recomendacion(id_ie, id):
    if request.method == 'GET':
        try:
            return make_response(jsonify(models.consultar_recomendacion_estudiantes(id_ie, id)), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify(str(e)), 400)


@estudiante_bp.route('/instituciones/<string:id_ie>/estudiantes/habilitar_autorizacion', methods=['PUT'])
#@jwt_required()
def habilitar_autorizacion(id_ie):
    if request.method == 'PUT':
        try:
            data = request.get_json()
            estudiantes = data['estudiantes']
            models.cambiar_autorizacion(estudiantes, True)
            return make_response(jsonify("Autorizacion habilitada"), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify(str(e)), 400)


@estudiante_bp.route('/instituciones/<string:id_ie>/estudiantes/deshabilitar_autorizacion', methods=['PUT'])
#@jwt_required()
def deshabilitar_autorizacion(id_ie):
    if request.method == 'PUT':
        try:
            data = request.get_json()
            estudiantes = data['estudiantes']
            models.cambiar_autorizacion(estudiantes, False)
            return make_response(jsonify("Autorizacion deshabilitada"), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify(str(e)), 400)


