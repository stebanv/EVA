from bson import ObjectId
from mongoengine import ListField, StringField, DictField, BooleanField

from eva import db
from eva.institucion import models as institucion
from eva.area.models import consultar_areas


class contexto_estudiante(db.EmbeddedDocument):
    temporal = DictField()
    social = DictField()
    reglamentacion = DictField()
    tecnologico = DictField()


class perfil_estudiante(db.EmbeddedDocument):
    datos_basicos = DictField()
    preferencia = DictField()
    interes = DictField()
    personalidad = DictField()


class Estudiante(db.Document):
    nombre = StringField()
    apellido = StringField()
    curso = StringField()
    grado = StringField()
    perfil_estudiante = db.EmbeddedDocumentField('perfil_estudiante')
    contexto_estudiante = db.EmbeddedDocumentField('contexto_estudiante')
    institucion = db.ReferenceField(institucion.Institucion)
    resultado = ListField()
    area_conocimiento = ListField()
    autorizacion = BooleanField(default=False)


def crear_estudiante(Nombre, Apellido, Curso, Grado, id_institucion):  # Crea un estudiante con los datos basicos
    estudiante = Estudiante(nombre=Nombre, apellido=Apellido, curso=Curso, grado=Grado, institucion=id_institucion,
                            perfil_estudiante={},
                            contexto_estudiante={}, resultado=[], area_conocimiento=[])
    return estudiante.save(force_insert=True)


def registro_perfil_estudiante(id, datos_basicos, preferencia):  # Registra o modifica un perfil de estudiante
    estudiante = Estudiante.objects(id=id)
    estudiante.update(set__perfil_estudiante__datos_basicos=datos_basicos)
    estudiante.update(set__perfil_estudiante__preferencia=preferencia)


def registro_contexto_estudiante(id, temporal, social, reglamentacion, tecnologico):  # Registra
    # o modifica un contexto de estudiante
    estudiante = Estudiante.objects(id=id)
    contexto_estudiante = {'temporal': temporal, 'social': social,
                           'reglamentacion': reglamentacion, 'tecnologico': tecnologico}
    estudiante.update(set__contexto_estudiante=contexto_estudiante)


def eliminar_estudiante(id):  # Elimina un estudiante recibiendo su id
    estudiante = Estudiante.objects(id=id)
    estudiante.delete()


def consultar_estudiante(id):  # Consulta un estudiante por su id
    estudiante = Estudiante.objects(id=id)
    return estudiante[0]


def consultar_estudiantes():  # Consulta todos los estudiantes
    estudiantes = Estudiante.objects
    return estudiantes


def modificar_estudiante(id, nombre, apellido, curso, grado):  # Modifica un estudiante
    estudiante = Estudiante.objects(id=id)
    estudiante.update(nombre=nombre, apellido=apellido, curso=curso, grado=grado)


def consultar_estudiantes_idie(id_institucion):
    estudiante = Estudiante.objects()
    lista_estudiantes = []
    for i in estudiante:
        if i.institucion is not None:
            if i.institucion.id == ObjectId(id_institucion):
                lista_estudiantes.append(i)
    return lista_estudiantes


def consultar_resultados(id):
    estudiante = Estudiante.objects(id=id)
    return estudiante[0].resultado


def funcion_vergas(id, Diccionario):
    global personalidad, interes
    estudiante = Estudiante.objects(id=id)
    criterios = {
        "aire_libre": 0,
        "espacio_cerrado": 0,
        "individual": 0,
        "equipo": 0,
        "teorico": 0,
        "practico": 0,
        "ideas": 0,
        "cosas": 0,
        "personas": 0,
        "datos": 0,
        "introvertido": 0,
        "extrovertido": 0,
        "intuitivo": 0,
        "sensorial": 0,
        "emocional": 0,
        "racional": 0,
        "calificador": 0,
        "perceptivo": 0,
        "investigador": 0,
        "artista": 0,
        "realista": 0,
        "social": 0,
        "emprendedor": 0,
        "convencional": 0
    }
    """Diccionario = {"aire_libre": 80, "espacio_cerrado": 60, "individual": 70, "equipo": 90, "teorico": 70,
                   "practico": 30, "ideas": 70, "cosas": 30, "personas": 30, "datos": 30, "introvertido": 70,
                   "extrovertido": 90, "intuitivo": 70, "sensorial": 30, "emocional": 70, "racional": 30,
                   "calificador": 70, "perceptivo": 90, "investigador": 20, "artista": 30, "realista": 70,
                   "social": 30, "emprendedor": 30, "convencional": 70}"""
    vec = [{}, {}, {}, {}, {}, {}, {}, {}, {}]
    for element in Diccionario:
        if element == "aire_libre" or element == "espacio_cerrado":
            aux = vec[0]
            aux[element] = Diccionario[element]
            aux["categoria"] = "tipo_de_espacio"
            vec[0] = aux

        elif element == "trabajo_individual" or element == "trabajo_en_equipo":
            aux = vec[1]
            aux[element] = Diccionario[element]
            aux["categoria"] = "modo_de_trabajo"
            vec[1] = aux

        elif element == "teorico" or element == "practico":
            aux = vec[2]
            aux[element] = Diccionario[element]
            aux["categoria"] = "tipo_de_metodologia"
            vec[2] = aux

        elif element == "ideas" or element == "cosas" or element == "personas" or element == "datos":
            aux = vec[3]
            aux[element] = Diccionario[element]
            aux["categoria"] = "objeto_de_trabajo"
            vec[3] = aux

        elif element == "introvertido" or element == "extrovertido":
            aux = vec[4]
            aux[element] = Diccionario[element]
            aux["categoria"] = "Actitud"
            vec[4] = aux

        elif element == "intuitivo" or element == "sensorial":
            aux = vec[5]
            aux[element] = Diccionario[element]
            aux["categoria"] = "informacion"
            vec[5] = aux

        elif element == "emocional" or element == "racional":
            aux = vec[6]
            aux[element] = Diccionario[element]
            aux["categoria"] = "estilo_de_vida"
            vec[6] = aux

        elif element == "calificador" or element == "perceptivo":
            aux = vec[7]
            aux[element] = Diccionario[element]
            aux["categoria"] = "toma_de_decisiones"
            vec[7] = aux

        elif element == "investigador" or element == "artista" or element == "realista" or element == "social" \
                or element == "emprendedor" or element == "convencional":
            aux = vec[8]
            aux[element] = Diccionario[element]
            aux["categoria"] = "perfil_vocacional"
            vec[8] = (aux)
        interes = {}
        personalidad = {}
    for i in vec:
        try:
            if i["aire_libre"] > i["espacio_cerrado"]:
                criterios["aire_libre"] = 1
                aux2 = {i["categoria"]: "aire libre"}
                interes.update(aux2)

            else:
                criterios["espacio_cerrado"] = 1
                aux2 = {i["categoria"]: "espacio_cerrado"}
                interes.update(aux2)
        except Exception:
            pass
        try:
            if i["trabajo_individual"] > i["trabajo_en_equipo"]:
                criterios["individual"] = 1
                aux2 = {i["categoria"]: "individual"}
                interes.update(aux2)
            else:
                criterios["equipo"] = 1
                aux2 = {i["categoria"]: "equipo"}
                interes.update(aux2)
        except Exception:
            pass
        try:
            if i["teorico"] > i["practico"]:
                criterios["teorico"] = 1
                aux2 = {i["categoria"]: "teorico"}
                interes.update(aux2)
            else:
                criterios["practico"] = 1
                aux2 = {i["categoria"]: "practico"}
                interes.update(aux2)
        except Exception:
            pass
        try:
            if i["categoria"] == "objeto_de_trabajo":
                max = 0
                key = ""
                for j in i:
                    try:
                        if i[j] > max:
                            max = i[j]
                            key = j
                            aux2 = {i["categoria"]: key}
                            interes.update(aux2)
                    except Exception:
                        pass
                criterios[key] = 1
        except Exception:
            pass
        try:
            if i["introvertido"] > i["extrovertido"]:
                criterios["introvertido"] = 1
                aux2 = {i["categoria"]: "introvertido"}
                personalidad.update(aux2)
            else:
                criterios["extrovertido"] = 1
                aux2 = {i["categoria"]: "extrovertido"}
                personalidad.update(aux2)
        except Exception:
            pass
        try:
            if i["intuitivo"] > i["sensorial"]:
                criterios["intuitivo"] = 1
                aux2 = {i["categoria"]: "intuitivo"}
                personalidad.update(aux2)
            else:
                criterios["sensorial"] = 1
                aux2 = {i["categoria"]: "sensorial"}
                personalidad.update(aux2)
        except Exception:
            pass
        try:
            if i["emocional"] > i["racional"]:
                criterios["emocional"] = 1
                aux2 = {i["categoria"]: "emocional"}
                personalidad.update(aux2)
            else:
                criterios["racional"] = 1
                aux2 = {i["categoria"]: "racional"}
                personalidad.update(aux2)
        except Exception:
            pass
        try:
            if i["calificador"] > i["perceptivo"]:
                criterios["calificador"] = 1
                aux2 = {i["categoria"]: "calificador"}
                personalidad.update(aux2)
            else:
                criterios["perceptivo"] = 1
                aux2 = {i["categoria"]: "perceptivo"}
                personalidad.update(aux2)
        except Exception:
            pass
        try:
            if i["categoria"] == "perfil_vocacional":
                max = 0
                key = ""
                for j in i:
                    try:
                        if i[j] > max:
                            max = i[j]
                            key = j
                            aux2 = {i["categoria"]: key}
                            personalidad.update(aux2)
                    except Exception:
                        pass
                criterios[key] = 1
        except Exception:
            pass
    estudiante.update(set__perfil_estudiante__interes=interes)
    estudiante.update(set__perfil_estudiante__personalidad=personalidad)
    estudiante.update(set__resultado=vec)
    return criterios


def areas_definidas(areas, id):
    global area_conocimiento, maximo
    estudiante = Estudiante.objects(id=id)
    dic_final = {}
    for key in areas:
        max = 0
        dic_medio = {}
        for i in areas[key]:
            if areas[key][i] == max:
                dic = {i: max}
                dic_medio.update(dic)
            if areas[key][i] > max:
                max = areas[key][i]
                dic = {i: max}
                dic_medio.clear()
                dic_medio.update(dic)
        dic_final.update(dic_medio)
        maximo = 0
        area_conocimiento = {}
    for j in dic_final:
        if dic_final[j] == maximo:
            dic2 = {j: dic_final[j]}
            area_conocimiento.update(dic2)
        if dic_final[j] > maximo:
            maximo = dic_final[j]
            dic2 = {j: dic_final[j]}
            area_conocimiento.clear()
            area_conocimiento.update(dic2)

    areas = consultar_areas()
    resultado = []
    for i in areas:
        for j in i["sub_areas"]:
            dic3 = {}
            if j["nombre_sub_area"] in area_conocimiento.keys():
                dic3["nombre_sub_area"] = j["nombre_sub_area"]
                dic3["descripcion_sub_area"] = j["descripcion_sub_area"]
                resultado.append(dic3)
    estudiante.update(set__area_conocimiento=resultado)
    return resultado


def consultar_recomendacion_estudiantes(id_ie, id):
    actividades = []
    convenios = []
    estudiante = Estudiante.objects(id=id).first()  # Revisar ESTO
    presupuesto = int(estudiante.contexto_estudiante.social["presupuesto"])
    limite = int(estudiante.contexto_estudiante.reglamentacion["limite"]["limite"])
    horario_estudiante = str(estudiante.perfil_estudiante.preferencia["horario_de_actividades"][
                                 "jornada"])  # Encuentra la preferencia del estudiante en el horario de actividades
    instituto = institucion.Institucion.objects(id=id_ie).first()  # Revisar ESTO
    areas_conocimiento = list(
        estudiante.area_conocimiento)  # Trae las areas de conocimiento del estudiante y las guarda en una lista
    convenio = list(instituto.convenio)  # Trae los convenios del instituto y los guarda en una lista
    actividad = list(
        instituto.actividad_extracurricular)  # Trae las actividades extra curricular del instituto y las guarda en una lista
    for i in areas_conocimiento:
        for j in actividad:
            if i["nombre_sub_area"] == j["subarea"]:
                id = str(j["_id"])
                act = {"id": id, "nombre": j["nombre"], "descripcion": j["descripcion"], "horario": j["horario"],
                       "area": j["area"], "subarea": j["subarea"], "cupos": j["cupos"], "recursos": j["recursos"]}
                actividades.append(act)
        for k in convenio:
            if i["nombre_sub_area"] == k["subarea"]:
                ident = str(k["_id"])
                con = {"id": ident, "nombre": k["nombre"], "descripcion": k["descripcion"], "horario": k["horario"],
                       "ubicacion": k["ubicacion"], "area": k["area"], "subarea": k["subarea"], "costo": k["costo"],
                       "recursos": k["recursos"], "frecuencia": k["frecuencia"], "temporada": k["temporada"]}
                convenios.append(con)
    cont = 0
    while actividades.__len__() + convenios.__len__() > limite:
        total_actividades = actividades.__len__()
        total_convenios = convenios.__len__()
        if total_actividades >= total_convenios:
            for i in actividades:
                if i["horario"] != horario_estudiante:
                    actividades.remove(i)
                    break
        elif total_actividades < total_convenios:
            for j in convenios:
                if j["horario"] != horario_estudiante or presupuesto < j["costo"]:
                    convenios.remove(j)
                    break
        cont += 1
        if cont == actividades.__len__() + convenios.__len__():
            break
    recomendacion = {"actividades_extracurriculares": actividades, "convenios": convenios}
    return recomendacion


def cambiar_autorizacion(estudiantes, estado):
    for i in estudiantes:
        estudiante = Estudiante.objects(id=i).first()
        estudiante.update(set__autorizacion=estado)


def analisis_areas(id_institucion):
    estudiantes = Estudiante.objects()
    analisis = {}
    numero_estudiantes = 0
    deportes = 0
    artes = 0
    csociales = 0
    cnaturales = 0
    tecnologia = 0
    logica_matematica = 0
    for i in estudiantes.filter(institucion=id_institucion):
        bool_deportes = False
        bool_artes = False
        bool_csociales = False
        bool_cnaturales = False
        bool_tecnologia = False
        bool_logica_matematica = False
        if i.area_conocimiento != []:
            numero_estudiantes += 1
            for j in i.area_conocimiento:
                if "Deportes" in j["nombre_sub_area"] and bool_deportes is False:
                    deportes += 1
                    bool_deportes = True
                elif j["nombre_sub_area"] == "Música-Canto" or j["nombre_sub_area"] == "Música-Instrumental" or \
                        j["nombre_sub_area"] == "Danza" or j["nombre_sub_area"] == "Teatro" or j[
                    "nombre_sub_area"] == "Artes plásticas" and bool_artes is False:
                    artes += 1
                    bool_artes = True
                elif j["nombre_sub_area"] == "Lengua castellana e idiomas extranjeros" or j[
                    "nombre_sub_area"] == "Política y democracia" or \
                        j["nombre_sub_area"] == "Obra social" and bool_csociales is False:
                    csociales += 1
                    bool_csociales = True
                elif j["nombre_sub_area"] == "Estadísica" or j["nombre_sub_area"] == "Contabilidad" or \
                        j["nombre_sub_area"] == "Lógica" and bool_logica_matematica is False:
                    logica_matematica += 1
                    bool_logica_matematica = True
                elif j["nombre_sub_area"] == "Uso de herramientas de desarrollo" or j[
                    "nombre_sub_area"] == "Uso de herramientas ofimáticas" or \
                        j["nombre_sub_area"] == "Producción multimedia" or j[
                    "nombre_sub_area"] == "Emprendimiento con base tecnológico" and bool_tecnologia is False:
                    tecnologia += 1
                    bool_tecnologia = True
                elif j["nombre_sub_area"] == "Cuidado ambiental" or j["nombre_sub_area"] == "Cuidado natural" or \
                        j["nombre_sub_area"] == "Experimentación y laboratorio" and bool_cnaturales is False:
                    cnaturales += 1
                    bool_cnaturales = True
    analisis["Deportes"] = deportes
    analisis["Artes"] = artes
    analisis["Ciencias Sociales"] = csociales
    analisis["Ciencias Naturales"] = cnaturales
    analisis["Tecnología"] = tecnologia
    analisis["Lógica Matemática"] = logica_matematica
    analisis["Numero estudiantes"] = numero_estudiantes
    return analisis


def analisis_sub_areas(id_institucion):
    analisis = {}
    deportes_atleticos = 0
    deportes_pelota = 0
    deportes_combate = 0
    musica_canto = 0
    musica_instrumental = 0
    danza = 0
    teatro = 0
    artes_plasticas = 0
    lengua_castellana = 0
    politica = 0
    obra_social = 0
    estadistica = 0
    contabilidad = 0
    logica_matematica = 0
    uso_herramientas_desarrollo = 0
    uso_herramientas_ofimaticas = 0
    produccion_multimedia = 0
    emprendimiento_tecnologico = 0
    cuidado_ambiental = 0
    cuidado_natural = 0
    experimentacion_laboratorio = 0
    numero_estudiantes = 0
    estudiantes = Estudiante.objects.filter(institucion=id_institucion)
    for i in estudiantes:
        bool_deportes_atleticos = False
        bool_deportes_pelota = False
        bool_deportes_combate = False
        bool_musica_canto = False
        bool_musica_instrumental = False
        bool_danza = False
        bool_teatro = False
        bool_artes_plasticas = False
        bool_lengua_castellana = False
        bool_politica = False
        bool_obra_social = False
        bool_estadistica = False
        bool_contabilidad = False
        bool_logica_matematica = False
        bool_uso_herramientas_desarrollo = False
        bool_uso_herramientas_ofimaticas = False
        bool_produccion_multimedia = False
        bool_emprendimiento_tecnologico = False
        bool_cuidado_ambiental = False
        bool_cuidado_natural = False
        bool_experimentacion_laboratorio = False
        if i.area_conocimiento != []:
            numero_estudiantes += 1
            for j in i.area_conocimiento:
                if j["nombre_sub_area"] == "Deportes atléticos" and bool_deportes_atleticos is False:
                    deportes_atleticos += 1
                    bool_deportes_atleticos = True
                elif j["nombre_sub_area"] == "Deportes de pelota" and bool_deportes_pelota is False:
                    deportes_pelota += 1
                    bool_deportes_pelota = True
                elif j["nombre_sub_area"] == "Deportes de combate" and bool_deportes_combate is False:
                    deportes_combate += 1
                    bool_deportes_combate = True
                elif j["nombre_sub_area"] == "Música-Canto" and bool_musica_canto is False:
                    musica_canto += 1
                    bool_musica_canto = True
                elif j["nombre_sub_area"] == "Música-Instrumental" and bool_musica_instrumental is False:
                    musica_instrumental += 1
                    bool_musica_instrumental = True
                elif j["nombre_sub_area"] == "Danza" and bool_danza is False:
                    danza += 1
                    bool_danza = True
                elif j["nombre_sub_area"] == "Teatro" and bool_teatro is False:
                    teatro += 1
                    bool_teatro = True
                elif j["nombre_sub_area"] == "Artes plásticas" and bool_artes_plasticas is False:
                    artes_plasticas += 1
                    bool_artes_plasticas = True
                elif j[
                    "nombre_sub_area"] == "Lengua castellana e idiomas extranjeros" and bool_lengua_castellana is False:
                    lengua_castellana += 1
                    bool_lengua_castellana = True
                elif j["nombre_sub_area"] == "Política y democracia" and bool_politica is False:
                    politica += 1
                    bool_politica = True
                elif j["nombre_sub_area"] == "Obra social" and bool_obra_social is False:
                    obra_social += 1
                    bool_obra_social = True
                elif j["nombre_sub_area"] == "Estadística" and bool_estadistica is False:
                    estadistica += 1
                    bool_estadistica = True
                elif j["nombre_sub_area"] == "Contabilidad" and bool_contabilidad is False:
                    contabilidad += 1
                    bool_contabilidad = True
                elif j["nombre_sub_area"] == "Lógica" and bool_logica_matematica is False:
                    logica_matematica += 1
                    bool_logica_matematica = True
                elif j[
                    "nombre_sub_area"] == "Uso de herramientas de desarrollo" and bool_uso_herramientas_desarrollo is False:
                    uso_herramientas_desarrollo += 1
                    bool_uso_herramientas_desarrollo = True
                elif j[
                    "nombre_sub_area"] == "Uso de herramientas ofimáticas" and bool_uso_herramientas_ofimaticas is False:
                    uso_herramientas_ofimaticas += 1
                    bool_uso_herramientas_ofimaticas = True
                elif j["nombre_sub_area"] == "Producción multimedia" and bool_produccion_multimedia is False:
                    produccion_multimedia += 1
                    bool_produccion_multimedia = True
                elif j[
                    "nombre_sub_area"] == "Emprendimiento con base tecnológico" and bool_emprendimiento_tecnologico is False:
                    emprendimiento_tecnologico += 1
                    bool_emprendimiento_tecnologico = True
                elif j["nombre_sub_area"] == "Cuidado animal" and bool_cuidado_natural is False:
                    cuidado_natural += 1
                    bool_cuidado_natural = True
                elif j["nombre_sub_area"] == "Cuidado ambiental" and bool_cuidado_ambiental is False:
                    cuidado_ambiental += 1
                    bool_cuidado_ambiental = True
                elif j[
                    "nombre_sub_area"] == "Experimentación y laboratorio" and bool_experimentacion_laboratorio is False:
                    experimentacion_laboratorio += 1
                    bool_experimentacion_laboratorio = True

    analisis["Deportes de pelota"] = deportes_pelota
    analisis["Deportes de combate"] = deportes_combate
    analisis["Deportes atléticos"] = deportes_atleticos
    analisis["Música-Canto"] = musica_canto
    analisis["Música-Instrumental"] = musica_instrumental
    analisis["Danza"] = danza
    analisis["Teatro"] = teatro
    analisis["Artes plásticas"] = artes_plasticas
    analisis["Lengua castellana e idiomas extranjeros"] = lengua_castellana
    analisis["Política y democracia"] = politica
    analisis["Obra social"] = obra_social
    analisis["Estadística"] = estadistica
    analisis["Contabilidad"] = contabilidad
    analisis["Lógica"] = logica_matematica
    analisis["Uso de herramientas de desarrollo"] = uso_herramientas_desarrollo
    analisis["Uso de herramientas ofimáticas"] = uso_herramientas_ofimaticas
    analisis["Producción multimedia"] = produccion_multimedia
    analisis["Emprendimiento con base tecnológico"] = emprendimiento_tecnologico
    analisis["Cuidado natural"] = cuidado_natural
    analisis["Cuidado ambiental"] = cuidado_ambiental
    analisis["Experimentación y laboratorio"] = experimentacion_laboratorio
    analisis["Numero estudiantes"] = numero_estudiantes
    return analisis


def analisis_criterios(id_institucion):
    analisis = {}
    Aire_Libre = 0
    Espacio_Cerrado = 0
    Individual = 0
    Trabajo_en_equipo = 0
    Practico = 0
    Teorico = 0
    Introvertido = 0
    Extrovertido = 0
    Intuitivo = 0
    Sensorial = 0
    Calificador = 0
    Perceptivo = 0
    Emocional = 0
    Racional = 0
    Ideas = 0
    Cosas = 0
    Datos = 0
    Personas = 0
    Investigador = 0
    Artista = 0
    Social = 0
    Realista = 0
    Emprendedor = 0
    Convencional = 0
    estudiantes = Estudiante.objects.filter(institucion=id_institucion)
    for i in estudiantes:
        if i.perfil_estudiante != {} and i.perfil_estudiante.interes != {}:
            if i.perfil_estudiante.interes["tipo_de_espacio"] == "espacio_cerrado":
                Espacio_Cerrado += 1
            else:
                Aire_Libre += 1
            if i.perfil_estudiante.interes["modo_de_trabajo"] == "individual":
                Individual += 1
            else:
                Trabajo_en_equipo += 1
            if i.perfil_estudiante.interes["tipo_de_metodologia"] == "practico":
                Practico += 1
            else:
                Teorico += 1
            if i.perfil_estudiante.interes["objeto_de_trabajo"] == "cosas":
                Cosas += 1
            elif i.perfil_estudiante.interes["objeto_de_trabajo"] == "ideas":
                Ideas += 1
            elif i.perfil_estudiante.interes["objeto_de_trabajo"] == "personas":
                Personas += 1
            elif i.perfil_estudiante.interes["objeto_de_trabajo"] == "datos":
                Datos += 1
        if i.perfil_estudiante.personalidad != {}:
            if i.perfil_estudiante.personalidad["Actitud"] == "introvertido":
                Introvertido += 1
            else:
                Extrovertido += 1

            if i.perfil_estudiante.personalidad["informacion"] == "intuitivo":
                Intuitivo += 1
            else:
                Sensorial += 1
            if i.perfil_estudiante.personalidad["estilo_de_vida"] == "racional":
                Racional += 1
            else:
                Emocional += 1
            if i.perfil_estudiante.personalidad["toma_de_decisiones"] == "perceptivo":
                Perceptivo += 1
            else:
                Calificador += 1
            if i.perfil_estudiante.personalidad["perfil_vocacional"] == "investigador":
                Investigador += 1
            elif i.perfil_estudiante.personalidad["perfil_vocacional"] == "artista":
                Artista += 1
            elif i.perfil_estudiante.personalidad["perfil_vocacional"] == "social":
                Social += 1
            elif i.perfil_estudiante.personalidad["perfil_vocacional"] == "realista":
                Realista += 1
            elif i.perfil_estudiante.personalidad["perfil_vocacional"] == "emprendedor":
                Emprendedor += 1
            elif i.perfil_estudiante.personalidad["perfil_vocacional"] == "convencional":
                Convencional += 1
    analisis["Aire libre"] = Aire_Libre
    analisis["Espacio cerrado"] = Espacio_Cerrado
    analisis["Individual"] = Individual
    analisis["Trabajo en equipo"] = Trabajo_en_equipo
    analisis["Practico"] = Practico
    analisis["Teorico"] = Teorico
    analisis["Cosas"] = Cosas
    analisis["Ideas"] = Ideas
    analisis["Personas"] = Personas
    analisis["Datos"] = Datos
    analisis["Introvertido"] = Introvertido
    analisis["Extrovertido"] = Extrovertido
    analisis["Intuitivo"] = Intuitivo
    analisis["Sensorial"] = Sensorial
    analisis["Racional"] = Racional
    analisis["Emocional"] = Emocional
    analisis["Perceptivo"] = Perceptivo
    analisis["Calificador"] = Calificador
    analisis["Investigador"] = Investigador
    analisis["Artista"] = Artista
    analisis["Social"] = Social
    analisis["Realista"] = Realista
    analisis["Emprendedor"] = Emprendedor
    analisis["Convencional"] = Convencional
    return analisis
