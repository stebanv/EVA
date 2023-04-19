from eva import db

from mongoengine import ListField, StringField, ObjectIdField

import json


class sub_area(db.EmbeddedDocumentField):
    _id = ObjectIdField(required=True)
    nombre_sub_area = StringField(required=True)
    descripcion_sub_area = StringField(required=True)


class area(db.Document):
    nombre_area = StringField(required=True)
    descripcion_area = StringField(required=True)
    sub_areas = ListField()


def consultar_areas():  # consultar todas las areas, devuelve <class 'mongoengine.queryset.queryset.QuerySet'>
    Area = area.objects()
    return Area


def consultar_area(id_area):  # consultar una area, devuelve <class 'eva.area.models.area'>
    Area = area.objects(id=id_area)
    return Area


def consultar_sub_areas(id_area):  # consultar una sub area, devuelve un json
    Area = area.objects(id=id_area)
    data = json.loads(Area.to_json())
    return data[0]['sub_areas']


def consultar_sub_area(id_area, id_sub_area):
    Area = area.objects(id=id_area).first()
    for i in Area.sub_areas:
        if i['_id'] == id_sub_area:
            sub_area = {"nombre_sub_area": i['nombre_sub_area'], "descripcion_sub_area": i['descripcion_sub_area']}
        return sub_area