from flask import Blueprint, make_response, jsonify, request, abort
from flask_jwt_extended import jwt_required

from . import models
from eva.estudiante import models as estudiante_models
from eva.sistema_experto.sistema_experto import start_engine

import json

test_bp = Blueprint('test', __name__)


@test_bp.route('/test', methods=['GET'])
#@jwt_required()
def test():
    try:
        return make_response(jsonify(models.consultar_test()), 200)
    except Exception as e:
        print(e)
        return make_response(jsonify(str(e)), 500)


@test_bp.route('/analizar_resultados/<string:id>', methods=['POST', 'GET', 'OPTIONS'])
#@jwt_required()
def analizar_resultados(id):
    def get_average_score(respuestas):
        temp_values = {}
        repeat_values = {}
        del respuestas[0]
        for respuesta in respuestas:
            try:
                temp_values[respuesta['nombre_criterio']] += int(respuesta['puntaje_criterio'])
                repeat_values[respuesta['nombre_criterio']] += 1
            except KeyError:
                temp_values[respuesta['nombre_criterio']] = int(respuesta['puntaje_criterio'])
                repeat_values[respuesta['nombre_criterio']] = 1
        for key in temp_values:
            temp_values[key] = int(temp_values[key]) // repeat_values[key]
        return temp_values
    # End of get_average_score

    # Normalize the names
    def normalize_names(respuestas):
        respuestas_normalizadas = respuestas.copy()
        for respuesta in respuestas_normalizadas:
            # Replace ' ' with '_'
            respuesta['nombre_criterio'] = respuesta['nombre_criterio'].replace(' ', '_')
            # lowercase the name
            respuesta['nombre_criterio'] = respuesta['nombre_criterio'].lower()
            # remove accents
            respuesta['nombre_criterio'] = respuesta['nombre_criterio'].replace('á', 'a')
            respuesta['nombre_criterio'] = respuesta['nombre_criterio'].replace('é', 'e')
            respuesta['nombre_criterio'] = respuesta['nombre_criterio'].replace('í', 'i')
            respuesta['nombre_criterio'] = respuesta['nombre_criterio'].replace('ó', 'o')
            respuesta['nombre_criterio'] = respuesta['nombre_criterio'].replace('ú', 'u')
        return respuestas_normalizadas

    # If request is POST
    if request.method == 'POST':
        try:
            request_data = request.get_json()
            respuestas = request_data['respuestas']
            average_score = get_average_score(respuestas)
            respuestas_normalized = normalize_names(respuestas)
            respuestas_normalized = get_average_score(respuestas_normalized)
            resultados = estudiante_models.funcion_vergas(id, respuestas_normalized)
            # Start the expert system engine
            areas = start_engine(resultados)
            # print(json.dumps(areas, indent=4))
            estudiante_models.areas_definidas(areas, id)
            return make_response(jsonify(average_score), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify(str(e)), 500)
    # End of if request is POST

    # If request is OPTIONS
    if request.method == 'OPTIONS':
        return make_response(jsonify({"Mensaje": "OK"}), 200)
    # End of if request is OPTIONS

    # If request is GET
    if request.method == 'GET':
        try:
            return make_response(jsonify(estudiante_models.consultar_resultados(id)), 200)
        except Exception as e:
            print(e)
            return make_response(jsonify(str(e)), 500)
    # End of if request is GET
