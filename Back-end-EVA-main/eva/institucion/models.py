from eva import db

from bson import ObjectId
from mongoengine import EmbeddedDocumentField, ListField, StringField, ReferenceField, DictField, BooleanField

import json


class contexto_institucion(db.EmbeddedDocument):
    reglamentacion = DictField()
    tecnologico = DictField()
    estructura = DictField()


class perfil_institucion(db.EmbeddedDocument):
    preferencias = DictField()


class Institucion(db.Document):
    nombre = StringField(required=True, unique=True)
    ubicacion = StringField(required=True)
    perfil_institucion = db.EmbeddedDocumentField('perfil_institucion')
    contexto_institucion = db.EmbeddedDocumentField('contexto_institucion')
    convenio = ListField()
    actividad_extracurricular = ListField()
    test = BooleanField(default=True)


def crear_institucion(nombre, ubicacion):
    institucion = Institucion(nombre=nombre, ubicacion=ubicacion, perfil_institucion={}, contexto_institucion={})
    return institucion.save(force_insert=True)


def registro_perfil_institucion(id_institucion, preferencias):
    institucion = Institucion.objects(id=id_institucion)
    perfil_institucion = {"preferencias": preferencias}
    institucion.update_one(perfil_institucion=perfil_institucion)


def registro_contexto_institucion(id_institucion, reglamentacion, tecnologico,
                                  estructura):
    institucion = Institucion.objects(id=id_institucion)
    contexto_institucion = {"reglamentacion": reglamentacion, "tecnologico": tecnologico, "estructura": estructura}
    institucion.update_one(contexto_institucion=contexto_institucion)


def consultar_instituciones():
    instituciones = Institucion.objects()
    return instituciones


def eliminar_institucion(id_institucion):
    institucion = consultar_institucion(id_institucion)
    institucion.delete()


def consultar_institucion(id_institucion):
    institucion = Institucion.objects(id=id_institucion)
    return institucion[0]


def modificar_institucion(id_institucion, nombre, ubicacion):
    institucion = Institucion.objects(id=id_institucion)
    institucion.update_one(nombre=nombre, ubicacion=ubicacion)


def crear_actividad_extracurricular(id_institucion, nombre, descripcion, horario, area, subarea, cupos, recursos):
    institucion = Institucion.objects(id=id_institucion)
    id = ObjectId()
    actividad_extracurricular = {"_id": id, "nombre": nombre, "descripcion": descripcion, "horario": horario,
                                 "area": area,
                                 "subarea": subarea, "cupos": cupos, "recursos": recursos}
    institucion.update_one(push__actividad_extracurricular=actividad_extracurricular)


def eliminar_actividad_extracurricular(id_institucion, id_actividad):
    institucion = Institucion.objects(id=id_institucion)
    institucion.update_one(pull__actividad_extracurricular={"_id": ObjectId(id_actividad)})


def consultar_actividades_extracurriculares(id_institucion):
    institucion = Institucion.objects(id=id_institucion)
    data = json.loads(institucion.to_json())
    return data[0]['actividad_extracurricular']


def consultar_actividad_extracurricular(id_institucion, id_actividad):
    institucion = Institucion.objects(id=id_institucion).first()
    for i in institucion.actividad_extracurricular:
        if i['_id'] == ObjectId(id_actividad):
            actividad = {"nombre": i['nombre'], "descripcion": i['descripcion'],
                         "horario": i['horario'], "area": i['area'], "subarea": i['subarea'],
                         "cupos": i['cupos'], "recursos": i['recursos']}
            return actividad


def modificar_actividad_extracurricular(id_institucion, id_actividad, nombre, descripcion, horario, area, subarea,
                                        cupos, recursos):
    institucion = Institucion.objects(id=id_institucion)
    actividad_extracurricular = {"_id": ObjectId(id_actividad), "nombre": nombre, "descripcion": descripcion,
                                 "horario": horario, "area": area, "subarea": subarea, "cupos": cupos,
                                 "recursos": recursos}
    institucion.update_one(pull__actividad_extracurricular={"_id": ObjectId(id_actividad)})
    institucion.update_one(push__actividad_extracurricular=actividad_extracurricular)


def crear_convenio(id_institucion, nombre, descripcion, horario, ubicacion, area, subarea, costo, recursos,
                   frecuencia, temporada):
    institucion = Institucion.objects(id=id_institucion)
    id = ObjectId()
    convenio = {"_id": id, "nombre": nombre, "descripcion": descripcion, "horario": horario, "ubicacion": ubicacion,
                "area": area,
                "subarea": subarea, "costo": costo, "recursos": recursos, "frecuencia": frecuencia,
                "temporada": temporada}
    institucion.update_one(push__convenio=convenio)


def eliminar_convenio(id_institucion, id_convenio):
    institucion = Institucion.objects(id=id_institucion)
    institucion.update_one(pull__convenio={"_id": ObjectId(id_convenio)})


def consultar_convenios(id_institucion):
    institucion = Institucion.objects(id=id_institucion)
    data = json.loads(institucion.to_json())
    return data[0]['convenio']


def consultar_convenio(id_institucion, id_convenio):
    institucion = Institucion.objects(id=id_institucion).first()
    for i in institucion.convenio:
        if i['_id'] == ObjectId(id_convenio):
            convenio = {"nombre": i['nombre'], "descripcion": i['descripcion'], "horario": i['horario'],
                        "ubicacion": i['ubicacion'], "area": i['area'], "subarea": i['subarea'], "costo": i['costo'],
                        "recursos": i['recursos'], "frecuencia": i['frecuencia'], "temporada": i['temporada']}
            return convenio


def modificar_convenio(id_institucion, id_convenio, nombre, descripcion, horario, ubicacion, area, subarea, costo,
                       recursos, frecuencia, temporada):
    institucion = Institucion.objects(id=id_institucion)
    convenio = {"_id": ObjectId(id_convenio), "nombre": nombre, "descripcion": descripcion, "horario": horario,
                "ubicacion": ubicacion,
                "area": area,
                "subarea": subarea, "costo": costo, "recursos": recursos, "frecuencia": frecuencia,
                "temporada": temporada}
    institucion.update_one(pull__convenio={"_id": ObjectId(id_convenio)})
    institucion.update_one(push__convenio=convenio)


def agregar_sede_institucion(id_institucion, nombre, ubicacion):
    institucion = Institucion.objects(id=id_institucion)
    sede = {"nombre_sede": nombre, "ubicacion_sede": ubicacion}
    institucion.update_one(push__contexto_institucion_espacial_sede_colegio=sede)


def agregar_sede_convenio(id_institucion, nombre, ubicacion):
    institucion = Institucion.objects(id=id_institucion)
    sede = {"nombre_sede": nombre, "ubicacion_sede": ubicacion}
    institucion.update_one(push__contexto_institucion_espacial_sede_convenio=sede)


def cambiar_test(id_institucion):
    institucion = Institucion.objects(id=id_institucion).first()
    if institucion.test is True:
        institucion.update(test=False)
    else:
        institucion.update(test=True)


def consultar_estado_test(id_institucion):
    institucion = Institucion.objects(id=id_institucion).first()
    return institucion.test


def recomendacion_actividad(id_institucion, dicc):
    institucion = Institucion.objects(id=id_institucion).first()
    return_value = []
    recomendacion = {}
    numero_estudiantes = dicc['Numero estudiantes']
    for i in dicc:
        aux = {}
        if i == "Numero estudiantes":
            recomendacion["Numero total estudiantes"] = dicc[i]
        else:
            aux["Subarea"] = i
            aux["Numero Estudiantes"] = dicc[i]
            aux["Numero Actividades"] = 0
            return_value.append(aux)
            porcentaje_estudiantes = round((dicc[i]*100) / numero_estudiantes, 2)
            aux["Porcentaje estudiantes"] = porcentaje_estudiantes

    for i in dicc:
        for j in institucion.actividad_extracurricular:
            if j["subarea"] == i:
                pos = next((k for k, x in enumerate(return_value) if i in x["Subarea"]), None)
                return_value[pos]["Numero Actividades"] = return_value[pos].get("Numero Actividades", 0) + 1
                return_value[pos]["Cupos"] = return_value[pos].get("Cupos", 0) + j["cupos"]
    if numero_estudiantes < 0:
        recomendacion["Recomendacion"] = "Es necesario que más estudiantes diligencien el test para dar un resultado más preciso"
    else:
        for i in return_value:
            print(i)
            dicc = {}
            if i["Numero Actividades"] == 0 and i["Porcentaje estudiantes"] > 10:
                respuesta = "Actualmente la institución no cuenta con actividades extracurriculares para esta area; sin embargo, existen " + str(i["Numero Estudiantes"]) + " Estudiantes que representan el " + str(i["Porcentaje estudiantes"]) + "% de los estudiantes, por lo que se recomienda que se agreguen actividades extracurriculares para " + i["Subarea"]
                dicc[i["Subarea"]] = respuesta
                dicc["Numero Estudiantes"] = i["Numero Estudiantes"]
                recomendacion[i["Subarea"]] = dicc
            elif i["Numero Actividades"] == 0 and i["Porcentaje estudiantes"] in range(1, 11):
                respuesta = "Actualmente la institucion no cuenta con ninguna actividad extracurricular para " + i["Subarea"] + " hay " + str(
                    i["Numero Estudiantes"]) + " estudiante(s) que representan el " + str(i["Porcentaje estudiantes"]) + "% de los estudiantes"
                dicc[i["Subarea"]] = respuesta
                dicc["Numero Estudiantes"] = i["Numero Estudiantes"]
                recomendacion[i["Subarea"]] = dicc
            elif i["Numero Actividades"] == 0 and i["Numero Estudiantes"] == 0:
                respuesta = "Actualmente no hay estudiantes interesados ni actividades extracurriculares para la sub " \
                            "area de " + i["Subarea"]
                dicc[i["Subarea"]] = respuesta
                dicc["Numero Estudiantes"] = i["Numero Estudiantes"]
                recomendacion[i["Subarea"]] = dicc
            elif i["Numero Estudiantes"] == 0 and i["Numero Actividades"] > 0:
                if i["Cupos"] > (30/100)*numero_estudiantes:
                    respuesta = "Actualmente la institución no cuenta con estudiantes interesados en esta area que tiene " + str(i["Cupos"]) + " cupos disponibles"
                    dicc[i["Subarea"]] = respuesta
                    dicc["Numero Estudiantes"] = i["Numero Estudiantes"]
                    recomendacion[i["Subarea"]] = dicc
                elif i["Cupos"] <= (30/100)*numero_estudiantes:
                    respuesta = "Actualmente la institución no cuenta con estudiantes interesados en esta area que tiene " + str(i["Cupos"]) + " cupos disponibles"
                    dicc[i["Subarea"]] = respuesta
                    dicc["Numero Estudiantes"] = i["Numero Estudiantes"]
                    recomendacion[i["Subarea"]] = dicc
            elif i["Numero Estudiantes"] > 0 and i["Numero Actividades"] > 0:
                if (i["Numero Estudiantes"] * 100)/i["Cupos"] > 60:
                    respuesta = "Actualmente la institución cuenta con " + str(i["Numero Estudiantes"]) + " estudiante(s) que representan más del 60% de los cupos de las " + str(i["Numero Actividades"]) + " actividades extracurriculares para esta sub area, por lo tanto, se recomienda ampliar el numero de cupos o agregar nuevas actividades extracurriculares"
                    dicc[i["Subarea"]] = respuesta
                    dicc["Numero Estudiantes"] = i["Numero Estudiantes"]
                    recomendacion[i["Subarea"]] = dicc
                elif (i["Numero Estudiantes"] * 100)/i["Cupos"] in range(20, 61):
                    respuesta = "Actualmente la institución cuenta con " + str(
                        i["Numero Estudiantes"]) + " estudiante(s) que representan mas del 20% y menos del 60% e los " \
                                                   "cupos de la(s) " + str(i["Numero Actividades"]) + " actividad(es) " \
                                                                                                    "extracurriculares para esta sub area. "
                    dicc[i["Subarea"]] = respuesta
                    dicc["Numero Estudiantes"] = i["Numero Estudiantes"]
                    recomendacion[i["Subarea"]] = dicc
                elif (i["Numero Estudiantes"] * 100)/i["Cupos"] < 20:
                    respuesta = "Actualmente la institución cuenta con " + str(
                        i["Numero Estudiantes"]) + " estudiante(s) que representan menos del 20% de los cupos de la(s) " + str(i["Numero Actividades"]) + " actividad(es) extracurriculares para esta subarea."
                    dicc["Numero Estudiantes"] = i["Numero Estudiantes"]
                    recomendacion[i["Subarea"]] = dicc

    return recomendacion

