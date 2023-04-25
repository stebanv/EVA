from eva import db

from mongoengine import ListField, StringField, ObjectIdField

import json


class criterio(db.EmbeddedDocument):
    _id = ObjectIdField(required=True)
    nombre_criterio = StringField(required=True)
    descripcion_criterio = StringField(required=True)


class categoria(db.Document):
    nombre_categoria = StringField(required=True)
    categoria = StringField(required=True)
    descripcion_categoria = StringField(required=True)
    criterios = ListField()


def consultar_categorias():
    categorias = categoria.objects()
    return categorias


def consultar_categoria(id_categoria):
    Categoria = categoria.objects(id=id_categoria)
    return Categoria


def consultar_criterios(id_categoria):
    Categoria = categoria.objects(id=id_categoria)
    data = json.loads(Categoria.to_json())
    return data[0]['criterios']


def consultar_criterio(id_categoria, id_criterio):
    Categoria = categoria.objects(id=id_categoria)
    for i in Categoria.criterios:
        if i['_id'] == id_criterio:
            criterio = {"nombre_criterio": i['nombre_criterio'], "descripcion_criterio": i['descripcion_criterio']}
        return criterio
