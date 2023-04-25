from flask import Blueprint, make_response, jsonify
from . import models

categoria_bp = Blueprint('categoria', __name__)


@categoria_bp.route('/categorias', methods=['GET'])
def consultar_categorias():
    try:
        return make_response(jsonify(models.consultar_categorias()), 200)
    except Exception as e:
        print(e)
        return make_response(jsonify({"error": "Error al consultar las categorias"}), 500)


@categoria_bp.route('/categorias/<id_categoria>', methods=['GET'])
def consultar_categoria(id_categoria):
    try:
        return make_response(jsonify(models.consultar_categoria(id_categoria)), 200)
    except Exception as e:
        print(e)
        return make_response(jsonify({"error": "Error al consultar la categoria"}), 500)


@categoria_bp.route('/categorias/<id_categoria>/criterios', methods=['GET'])
def consultar_criterios(id_categoria):
    try:
        return make_response(jsonify(models.consultar_criterios(id_categoria)), 200)
    except Exception as e:
        print(e)
        return make_response(jsonify({"error": "Error al consultar los criterios"}), 500)


@categoria_bp.route('/categorias/<id_categoria>/criterios/<id_criterio>', methods=['GET'])
def consultar_criterio(id_categoria, id_criterio):
    try:
        return make_response(jsonify(models.consultar_criterio(id_categoria, id_criterio)), 200)
    except Exception as e:
        print(e)
        return make_response(jsonify({"error": "Error al consultar el criterio"}), 500)