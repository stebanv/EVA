from eva import db
from eva.institucion import models as institucion

from mongoengine import EmbeddedDocumentField, ListField, StringField, ReferenceField, DictField, connect

import json


# TODO - all database models should be in this file

class test(db.Document):
    pregunta = StringField()
    criterio1 = StringField()
    criterio2 = StringField()
    Opciones = ListField()


def consultar_test():
    preguntas = test.objects()
    data = json.loads(preguntas.to_json())
    return data



