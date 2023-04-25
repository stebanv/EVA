import json

from . import models
from eva.estudiante import models as estudiante_models
from eva.usuario import models as usuario_models
from eva.institucion.clustering import Clustering
from eva.institucion.reporte import ReporteIE

from flask import Blueprint, request, jsonify, make_response, send_file
from flask_jwt_extended import jwt_required

# Blueprint Configuration
institucion_bp = Blueprint('institucion', __name__)


# Default route
@institucion_bp.route('/', methods=['GET'])
def default():
    return make_response(jsonify("Pagina de inicio de la API de Instituciones Educativas"), 200)


# Crear una IE y mostrar todas las IE
@institucion_bp.route('/instituciones', methods=['GET', 'POST'])
# @jwt_required()
def instituciones():
    if request.method == 'GET':
        try:
            return jsonify(models.consultar_instituciones()), 200
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": e}), 404)

    if request.method == 'POST':
        try:
            request_data = request.get_json()
            nombre = request_data['nombre']
            ubicacion = request_data['ubicacion']
            username = request_data['username']
            password = request_data['password']
            aux = models.crear_institucion(nombre, ubicacion)
            usuario_models.crear_usuario(username, password, 'institucion', aux.id)
            return make_response(jsonify({"Mensaje": "Institucion creada"}), 201)
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": e}), 400)


# Mostrar, modificar y eliminar una IE
@institucion_bp.route('/instituciones/<string:id>', methods=['GET', 'PUT', 'DELETE'])
# @jwt_required()
def instituciones_id(id):
    if request.method == 'GET':
        try:
            return make_response(jsonify(models.consultar_institucion(id)), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": "No existe una institución educativa con el id seleccionado."}),
                                 404)

    if request.method == 'PUT':
        try:
            request_data = request.get_json()
            nombre = request_data['nombre']
            ubicacion = request_data['ubicacion']
            models.modificar_institucion(id, nombre, ubicacion)
            return make_response(jsonify({"Mensaje": "Institucion modificada"}), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": e}), 400)

    if request.method == 'DELETE':
        try:
            models.eliminar_institucion(id)
            return make_response(jsonify({"Mensaje": "Institucion eliminada"}), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": e}), 400)


# Mostrar las actividades de una institucion
@institucion_bp.route('/instituciones/<string:id>/actividades_extracurriculares', methods=['GET', 'POST'])
# @jwt_required()
def actividades_extracurriculares(id):
    if request.method == 'GET':
        try:
            return jsonify(models.consultar_actividades_extracurriculares(id))
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": e}), 404)

    if request.method == 'POST':
        try:
            request_data = request.get_json()
            nombre = request_data['nombre']
            descripcion = request_data['descripcion']
            horario = request_data['horario']
            area = request_data['area']
            subarea = request_data['subarea']
            cupos = request_data['cupos']
            recursos = request_data['recursos']
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": "Error en los datos ingresados"}), 400)
        try:
            models.crear_actividad_extracurricular(id, nombre, descripcion, horario, area, subarea, cupos, recursos)
            return make_response(jsonify({"Mensaje": "Actividad creada"}), 201)
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": e}), 400)


# Mostrar, modificar y eliminar una actividad de una institucion
@institucion_bp.route('/instituciones/<string:id>/actividades_extracurriculares/<string:idAE>',
                      methods=['GET', 'PUT', 'DELETE'])
# @jwt_required()
def actividades_extracurriculares_id(id, idAE):
    if request.method == 'GET':
        try:
            return make_response(jsonify(models.consultar_actividad_extracurricular(id, idAE)), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": e}), 404)

    if request.method == 'PUT':
        try:
            request_data = request.get_json()
            nombre = request_data['nombre']
            descripcion = request_data['descripcion']
            horario = request_data['horario']
            area = request_data['area']
            subarea = request_data['subarea']
            cupos = request_data['cupos']
            recursos = request_data['recursos']
            models.modificar_actividad_extracurricular(id, idAE, nombre, descripcion, horario, area, subarea, cupos,
                                                       recursos)
            return make_response(jsonify({"Mensaje": "Actividad extracurricular modificada"}), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": e}), 400)

    if request.method == 'DELETE':
        try:
            models.eliminar_actividad_extracurricular(id, idAE)
            return make_response(jsonify({"Mensaje": "Actividad extracurricular eliminada"}), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": e}), 400)


# Crear un convenio y mostrar todos los convenios de una institucion
@institucion_bp.route('/instituciones/<string:id>/convenios', methods=['POST', 'GET'])
# @jwt_required()
def instituciones_convenios(id):
    if request.method == 'GET':
        try:
            return make_response(jsonify(models.consultar_convenios(id)), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": e}), 404)

    if request.method == 'POST':
        try:
            request_data = request.get_json()
            nombre = request_data['nombre']
            descripcion = request_data['descripcion']
            horario = request_data['horario']
            ubicacion = request_data['ubicacion']
            area = request_data['area']
            subarea = request_data['subarea']
            costo = request_data['costo']
            recursos = request_data['recursos']
            frecuencia = request_data['frecuencia']
            temporada = request_data['temporada']
            models.crear_convenio(id, nombre, descripcion, horario, ubicacion, area, subarea, costo, recursos,
                                  frecuencia, temporada)
            return jsonify({"Mensaje": "Convenio creado"}), 201
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": e}), 400)


# Mostrar, modificar y eliminar un convenio de una institucion
@institucion_bp.route('/instituciones/<string:id>/convenios/<string:idC>', methods=['GET', 'PUT', 'DELETE'])
# @jwt_required()
def instituciones_convenios_id(id, idC):
    if request.method == 'GET':
        try:
            return make_response(jsonify(models.consultar_convenio(id, idC)), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": e}), 400)

    if request.method == 'PUT':
        try:
            request_data = request.get_json()
            nombre = request_data['nombre']
            descripcion = request_data['descripcion']
            horario = request_data['horario']
            ubicacion = request_data['ubicacion']
            area = request_data['area']
            subarea = request_data['subarea']
            costo = request_data['costo']
            recursos = request_data['recursos']
            frecuencia = request_data['frecuencia']
            temporada = request_data['temporada']
            models.modificar_convenio(id, idC, nombre, descripcion, horario, ubicacion, area, subarea, costo, recursos,
                                      frecuencia, temporada)
            return jsonify({"Mensaje": "Convenio modificado"}), 200
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": e}), 400)

    if request.method == 'DELETE':
        try:
            models.eliminar_convenio(id, idC)
            return make_response(jsonify({"Mensaje": "Convenio eliminado"}), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": e}), 400)


# Mostrar y modificar el estado del test de una institucion
@institucion_bp.route('/instituciones/<string:id>/estado_test', methods=['GET', 'PUT'])
# @jwt_required()
def estado_test(id):
    if request.method == 'GET':
        try:
            return make_response(jsonify(models.consultar_estado_test(id)), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": e}), 404)

    if request.method == 'PUT':
        try:
            models.cambiar_test(id)
            return make_response(jsonify({"Mensaje": f"Estado de test modificado a {models.consultar_estado_test(id)}"})
                                 , 200)
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": e}), 400)


# Cambiar el perfil y contexto de una institución
@institucion_bp.route('/instituciones/<string:id>/perfil_contexto', methods=['PUT'])
# @jwt_required()
def perfil_contexto(id):
    if request.method == 'PUT':
        try:
            request_data = request.get_json()
            preferencias = request_data['preferencias']
            reglamentacion = request_data['reglamentacion']
            tecnologico = request_data['tecnologico']
            estructura = request_data['estructura']
            models.registro_perfil_institucion(id, preferencias)
            models.registro_contexto_institucion(id, reglamentacion, tecnologico, estructura)
            return make_response(jsonify({"Mensaje": "Perfil y contexto registrado"}), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": e}), 400)


# Clustering de los estudiantes de una institucion
@institucion_bp.route('/instituciones/<string:id>/analisis_clustering', methods=['GET'])
# @jwt_required()
def analisis_clustering(id):
    if request.method == 'GET':
        try:
            clustering = Clustering()
            return make_response(jsonify(clustering.organize_data(id)), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": e}), 404)


# Analisis de areas
@institucion_bp.route('/instituciones/<string:id>/analisis_areas', methods=['GET'])
# @jwt_required()
def analisis_areas(id):
    if request.method == 'GET':
        try:
            return make_response(jsonify(estudiante_models.analisis_areas(id)), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": e}), 404)


# Analisis sub_areas
@institucion_bp.route('/instituciones/<string:id>/analisis_sub_areas', methods=['GET'])
# @jwt_required()
def analisis_sub_areas(id):
    if request.method == 'GET':
        try:
            return make_response(json.dumps(estudiante_models.analisis_sub_areas(id), indent=4), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": e}), 404)


# Analisis de criterios
@institucion_bp.route('/instituciones/<string:id>/analisis_criterios', methods=['GET'])
# @jwt_required()
def analisis_criterios(id):
    if request.method == 'GET':
        try:
            return make_response(json.dumps(estudiante_models.analisis_criterios(id), indent=4), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": e}), 404)


#Recomendacio actividades
@institucion_bp.route('/instituciones/<string:id>/recomendacion_actividades', methods=['GET'])
# @jwt_required()
def recomendacion_actividad(id):
    if request.method == 'GET':
        try:
            dicc = estudiante_models.analisis_sub_areas(id)
            return make_response(jsonify(models.recomendacion_actividad(id, dicc)), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": e}), 404)


# Reporte individual de estudiantes en pdf
@institucion_bp.route('/instituciones/<string:id>/reporte_individual', methods=['GET'])
# @jwt_required()
def reporte_individual(id):
    if request.method == 'GET':
        try:
            reporte = ReporteIE(id)
            reporte.generar_reporte()
            filename = reporte.get_pdf()
            file = open("eva/institucion/reportes/{}".format(filename), 'rb')
            return send_file(file, as_attachment=True, attachment_filename=filename, mimetype='application/pdf')
        except Exception as e:
            print(e)
            return make_response(jsonify({"Mensaje": e}), 500)