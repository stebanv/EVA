from flask import Blueprint, make_response, jsonify
from . import models

area_bp = Blueprint('area', __name__)


@area_bp.route('/areas', methods=['GET'])
def areas():
    try:
        return make_response(jsonify(models.consultar_areas()), 200)
    except Exception as e:
        print(e)
        return make_response(jsonify(str(e)), 500)


@area_bp.route('/areas/<id_area>', methods=['GET'])
def area(id_area):
    try:
        return make_response(jsonify(models.consultar_area(id_area)), 200)
    except Exception as e:
        print(e)
        return make_response(jsonify(str(e)), 500)


@area_bp.route('/areas/<id_area>/sub_areas', methods=['GET'])
def sub_areas(id_area):
    try:
        return make_response(jsonify(models.consultar_sub_areas(id_area)), 200)
    except Exception as e:
        print(e)
        return make_response(jsonify(str(e)), 500)


@area_bp.route('/areas/<id_area>/sub_areas/<id_sub_area>', methods=['GET'])
def sub_area(id_area, id_sub_area):
    try:
        return make_response(jsonify(models.consultar_sub_area(id_area, id_sub_area)), 200)
    except Exception as e:
        print(e)
        return make_response(jsonify(str(e)), 500)
