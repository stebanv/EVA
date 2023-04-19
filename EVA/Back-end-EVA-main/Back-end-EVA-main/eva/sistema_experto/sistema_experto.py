from experta import *

areas = {
    "Deportes": {
        "Deportes atléticos": 0,
        "Deportes de pelota": 0,
        "Deportes de combate": 0
    },
    "Artes": {
        "Música-Canto": 0,
        "Música-Instrumental": 0,
        "Danza": 0,
        "Teatro": 0,
        "Artes plásticas": 0
    },
    "Ciencias sociales y humanidades": {
        "Lengua castellana e idiomas extranjeros": 0,
        "Política y democracia": 0,
        "Obra social": 0
    },
    "Lógica y matemática": {
        "Estadística": 0,
        "Contabilidad": 0,
        "Lógica": 0
    },
    "Tecnología": {
        "Uso de herramientas ofimáticas": 0,
        "Uso de herramientas de desarrollo": 0,
        "Producción multimedia": 0,
        "Emprendimiento con base tecnológico": 0
    },
    "Ciencias naturales": {
        "Cuidado ambiental": 0,
        "Cuidado animal": 0,
        "Experimentación y laboratorio": 0
    },
}


class Criterios(Fact):
    criterios = Field(dict)


# Sistema experto para la evaluación de las áreas de conocimiento
class SistemaExperto(KnowledgeEngine):
    @Rule(Criterios(criterios__aire_libre=1))
    def aire_libre(self):
        areas["Deportes"]["Deportes atléticos"] += 1
        areas["Deportes"]["Deportes de pelota"] += 1
        areas["Ciencias sociales y humanidades"]["Obra social"] += 1
        areas["Ciencias naturales"]["Cuidado animal"] += 1
        areas["Ciencias naturales"]["Cuidado ambiental"] += 1

    @Rule(Criterios(criterios__espacio_cerrado=1))
    def espacio_cerrado(self):
        areas["Deportes"]["Deportes de combate"] += 1
        areas["Artes"]["Artes plásticas"] += 1
        areas["Artes"]["Música-Canto"] += 1
        areas["Artes"]["Música-Instrumental"] += 1
        areas["Artes"]["Danza"] += 1
        areas["Artes"]["Teatro"] += 1
        areas["Ciencias sociales y humanidades"]["Lengua castellana e idiomas extranjeros"] += 1
        areas["Ciencias sociales y humanidades"]["Política y democracia"] += 1
        areas["Lógica y matemática"]["Estadística"] += 1
        areas["Lógica y matemática"]["Contabilidad"] += 1
        areas["Lógica y matemática"]["Lógica"] += 1
        areas["Tecnología"]["Uso de herramientas ofimáticas"] += 1
        areas["Tecnología"]["Uso de herramientas de desarrollo"] += 1
        areas["Tecnología"]["Producción multimedia"] += 1
        areas["Tecnología"]["Emprendimiento con base tecnológico"] += 1
        areas["Ciencias naturales"]["Experimentación y laboratorio"] += 1

    @Rule(Criterios(criterios__individual=1))
    def individual(self):
        areas["Deportes"]["Deportes atléticos"] += 1
        areas["Deportes"]["Deportes de combate"] += 1
        areas["Artes"]["Música-Canto"] += 1
        areas["Artes"]["Artes plásticas"] += 1
        areas["Ciencias sociales y humanidades"]["Lengua castellana e idiomas extranjeros"] += 1
        areas["Lógica y matemática"]["Estadística"] += 1
        areas["Lógica y matemática"]["Contabilidad"] += 1
        areas["Lógica y matemática"]["Lógica"] += 1
        areas["Tecnología"]["Uso de herramientas ofimáticas"] += 1
        areas["Tecnología"]["Uso de herramientas de desarrollo"] += 1
        areas["Ciencias naturales"]["Experimentación y laboratorio"] += 1

    @Rule(Criterios(criterios__equipo=1))
    def equipo(self):
        areas["Deportes"]["Deportes de pelota"] += 1
        areas["Artes"]["Música-Instrumental"] += 1
        areas["Artes"]["Danza"] += 1
        areas["Artes"]["Teatro"] += 1
        areas["Ciencias sociales y humanidades"]["Obra social"] += 1
        areas["Ciencias sociales y humanidades"]["Política y democracia"] += 1
        areas["Tecnología"]["Producción multimedia"] += 1
        areas["Tecnología"]["Emprendimiento con base tecnológico"] += 1
        areas["Ciencias naturales"]["Cuidado animal"] += 1
        areas["Ciencias naturales"]["Cuidado ambiental"] += 1

    @Rule(Criterios(criterios__teorico=1))
    def teorico(self):
        areas["Ciencias sociales y humanidades"]["Lengua castellana e idiomas extranjeros"] += 1
        areas["Ciencias sociales y humanidades"]["Política y democracia"] += 1
        areas["Lógica y matemática"]["Estadística"] += 1
        areas["Lógica y matemática"]["Contabilidad"] += 1
        areas["Lógica y matemática"]["Lógica"] += 1

    @Rule(Criterios(criterios__practico=1))
    def practico(self):
        areas["Deportes"]["Deportes atléticos"] += 1
        areas["Deportes"]["Deportes de pelota"] += 1
        areas["Deportes"]["Deportes de combate"] += 1
        areas["Artes"]["Música-Canto"] += 1
        areas["Artes"]["Artes plásticas"] += 1
        areas["Artes"]["Música-Instrumental"] += 1
        areas["Artes"]["Danza"] += 1
        areas["Artes"]["Teatro"] += 1
        areas["Ciencias sociales y humanidades"]["Obra social"] += 1
        areas["Tecnología"]["Uso de herramientas ofimáticas"] += 1
        areas["Tecnología"]["Uso de herramientas de desarrollo"] += 1
        areas["Tecnología"]["Producción multimedia"] += 1
        areas["Tecnología"]["Emprendimiento con base tecnológico"] += 1
        areas["Ciencias naturales"]["Cuidado animal"] += 1
        areas["Ciencias naturales"]["Cuidado ambiental"] += 1
        areas["Ciencias naturales"]["Experimentación y laboratorio"] += 1

    @Rule(Criterios(criterios__ideas=1))
    def ideas(self):
        areas["Artes"]["Artes plásticas"] += 4
        areas["Artes"]["Música-Canto"] += 4
        areas["Artes"]["Música-Instrumental"] += 4
        areas["Artes"]["Danza"] += 2
        areas["Artes"]["Teatro"] += 4
        areas["Ciencias sociales y humanidades"]["Lengua castellana e idiomas extranjeros"] += 2
        areas["Ciencias sociales y humanidades"]["Política y democracia"] += 2
        areas["Ciencias sociales y humanidades"]["Obra social"] += 2
        areas["Lógica y matemática"]["Lógica"] += 2
        areas["Tecnología"]["Uso de herramientas ofimáticas"] += 1
        areas["Tecnología"]["Uso de herramientas de desarrollo"] += 2
        areas["Tecnología"]["Producción multimedia"] += 4
        areas["Tecnología"]["Emprendimiento con base tecnológico"] += 4
        areas["Ciencias naturales"]["Cuidado animal"] += 2
        areas["Ciencias naturales"]["Cuidado ambiental"] += 2

    @Rule(Criterios(criterios__cosas=1))
    def cosas(self):
        areas["Deportes"]["Deportes atléticos"] += 2
        areas["Deportes"]["Deportes de pelota"] += 4
        areas["Deportes"]["Deportes de combate"] += 2
        areas["Artes"]["Música-Instrumental"] += 2
        areas["Artes"]["Artes plásticas"] += 2
        areas["Lógica y matemática"]["Estadística"] += 2
        areas["Lógica y matemática"]["Contabilidad"] += 2
        areas["Tecnología"]["Uso de herramientas ofimáticas"] += 4
        areas["Tecnología"]["Uso de herramientas de desarrollo"] += 4
        areas["Tecnología"]["Producción multimedia"] += 2
        areas["Ciencias naturales"]["Cuidado ambiental"] += 4
        areas["Ciencias naturales"]["Cuidado animal"] += 4
        areas["Ciencias naturales"]["Experimentación y laboratorio"] += 4

    @Rule(Criterios(criterios__personas=1))
    def personas(self):
        areas["Deportes"]["Deportes atléticos"] += 4
        areas["Deportes"]["Deportes de pelota"] += 2
        areas["Deportes"]["Deportes de combate"] += 4
        areas["Artes"]["Música-Canto"] += 2
        areas["Artes"]["Danza"] += 4
        areas["Artes"]["Teatro"] += 2
        areas["Ciencias sociales y humanidades"]["Lengua castellana e idiomas extranjeros"] += 4
        areas["Ciencias sociales y humanidades"]["Política y democracia"] += 4
        areas["Ciencias sociales y humanidades"]["Obra social"] += 4
        areas["Tecnología"]["Emprendimiento con base tecnológico"] += 2

    @Rule(Criterios(criterios__datos=1))
    def datos(self):
        areas["Lógica y matemática"]["Estadística"] += 4
        areas["Lógica y matemática"]["Contabilidad"] += 4
        areas["Lógica y matemática"]["Lógica"] += 4
        areas["Tecnología"]["Uso de herramientas ofimáticas"] += 2
        areas["Ciencias naturales"]["Experimentación y laboratorio"] += 2

    @Rule(Criterios(criterios__introvertido=1))
    def introvertido(self):
        areas["Artes"]["Música-Instrumental"] += 1
        areas["Artes"]["Artes plásticas"] += 1
        areas["Lógica y matemática"]["Estadística"] += 1
        areas["Lógica y matemática"]["Contabilidad"] += 1
        areas["Lógica y matemática"]["Lógica"] += 1
        areas["Tecnología"]["Uso de herramientas ofimáticas"] += 1
        areas["Tecnología"]["Uso de herramientas de desarrollo"] += 1
        areas["Ciencias naturales"]["Cuidado ambiental"] += 1
        areas["Ciencias naturales"]["Experimentación y laboratorio"] += 1

    @Rule(Criterios(criterios__extrovertido=1))
    def extrovertido(self):
        areas["Deportes"]["Deportes atléticos"] += 1
        areas["Deportes"]["Deportes de pelota"] += 1
        areas["Deportes"]["Deportes de combate"] += 1
        areas["Artes"]["Música-Canto"] += 1
        areas["Artes"]["Danza"] += 1
        areas["Artes"]["Teatro"] += 1
        areas["Ciencias sociales y humanidades"]["Lengua castellana e idiomas extranjeros"] += 1
        areas["Ciencias sociales y humanidades"]["Política y democracia"] += 1
        areas["Ciencias sociales y humanidades"]["Obra social"] += 1
        areas["Tecnología"]["Emprendimiento con base tecnológico"] += 1
        areas["Tecnología"]["Producción multimedia"] += 1
        areas["Ciencias naturales"]["Cuidado animal"] += 1

    @Rule(Criterios(criterios__intuitivo=1))
    def intuitivo(self):
        areas["Deportes"]["Deportes atléticos"] += 1
        areas["Deportes"]["Deportes de pelota"] += 1
        areas["Artes"]["Danza"] += 1
        areas["Artes"]["Teatro"] += 1
        areas["Ciencias sociales y humanidades"]["Obra social"] += 1
        areas["Ciencias naturales"]["Cuidado ambiental"] += 1
        areas["Ciencias naturales"]["Cuidado animal"] += 1

    @Rule(Criterios(criterios__sensorial=1))
    def sensorial(self):
        areas["Deportes"]["Deportes de combate"] += 1
        areas["Artes"]["Música-Canto"] += 1
        areas["Artes"]["Música-Instrumental"] += 1
        areas["Artes"]["Artes plásticas"] += 1
        areas["Ciencias sociales y humanidades"]["Lengua castellana e idiomas extranjeros"] += 1
        areas["Ciencias sociales y humanidades"]["Política y democracia"] += 1
        areas["Lógica y matemática"]["Estadística"] += 1
        areas["Lógica y matemática"]["Contabilidad"] += 1
        areas["Lógica y matemática"]["Lógica"] += 1
        areas["Tecnología"]["Uso de herramientas ofimáticas"] += 1
        areas["Tecnología"]["Uso de herramientas de desarrollo"] += 1
        areas["Tecnología"]["Producción multimedia"] += 1
        areas["Tecnología"]["Emprendimiento con base tecnológico"] += 1
        areas["Ciencias naturales"]["Experimentación y laboratorio"] += 1

    @Rule(Criterios(criterios__emocional=1))
    def emocional(self):
        areas["Deportes"]["Deportes atléticos"] += 1
        areas["Deportes"]["Deportes de combate"] += 1
        areas["Artes"]["Música-Canto"] += 1
        areas["Artes"]["Música-Instrumental"] += 1
        areas["Artes"]["Danza"] += 1
        areas["Artes"]["Teatro"] += 1
        areas["Artes"]["Artes plásticas"] += 1
        areas["Ciencias sociales y humanidades"]["Obra social"] += 1
        areas["Ciencias naturales"]["Cuidado ambiental"] += 1
        areas["Ciencias naturales"]["Cuidado animal"] += 1

    @Rule(Criterios(criterios__racional=1))
    def racional(self):
        areas["Deportes"]["Deportes de pelota"] += 1
        areas["Ciencias sociales y humanidades"]["Lengua castellana e idiomas extranjeros"] += 1
        areas["Ciencias sociales y humanidades"]["Política y democracia"] += 1
        areas["Lógica y matemática"]["Estadística"] += 1
        areas["Lógica y matemática"]["Contabilidad"] += 1
        areas["Lógica y matemática"]["Lógica"] += 1
        areas["Tecnología"]["Uso de herramientas ofimáticas"] += 1
        areas["Tecnología"]["Uso de herramientas de desarrollo"] += 1
        areas["Tecnología"]["Producción multimedia"] += 1
        areas["Tecnología"]["Emprendimiento con base tecnológico"] += 1
        areas["Ciencias naturales"]["Experimentación y laboratorio"] += 1

    @Rule(Criterios(criterios__calificador=1))
    def calificador(self):
        areas["Deportes"]["Deportes atléticos"] += 1
        areas["Deportes"]["Deportes de pelota"] += 1
        areas["Artes"]["Teatro"] += 1
        areas["Ciencias sociales y humanidades"]["Lengua castellana e idiomas extranjeros"] += 1
        areas["Ciencias sociales y humanidades"]["Política y democracia"] += 1
        areas["Ciencias sociales y humanidades"]["Obra social"] += 1
        areas["Lógica y matemática"]["Estadística"] += 1
        areas["Lógica y matemática"]["Contabilidad"] += 1
        areas["Lógica y matemática"]["Lógica"] += 1
        areas["Tecnología"]["Uso de herramientas ofimáticas"] += 1
        areas["Tecnología"]["Uso de herramientas de desarrollo"] += 1
        areas["Tecnología"]["Emprendimiento con base tecnológico"] += 1
        areas["Ciencias naturales"]["Cuidado ambiental"] += 1
        areas["Ciencias naturales"]["Experimentación y laboratorio"] += 1

    @Rule(Criterios(criterios__perceptivo=1))
    def perceptivo(self):
        areas["Deportes"]["Deportes de combate"] += 1
        areas["Artes"]["Música-Canto"] += 1
        areas["Artes"]["Música-Instrumental"] += 1
        areas["Artes"]["Danza"] += 1
        areas["Artes"]["Artes plásticas"] += 1
        areas["Tecnología"]["Producción multimedia"] += 1
        areas["Ciencias naturales"]["Cuidado animal"] += 1

    @Rule(Criterios(criterios__investigador=1))
    def investigador(self):
        areas["Artes"]["Artes plásticas"] += 2
        areas["Lógica y matemática"]["Estadística"] += 2
        areas["Lógica y matemática"]["Contabilidad"] += 2
        areas["Lógica y matemática"]["Lógica"] += 4
        areas["Tecnología"]["Uso de herramientas ofimáticas"] += 2
        areas["Tecnología"]["Uso de herramientas de desarrollo"] += 4
        areas["Tecnología"]["Producción multimedia"] += 2
        areas["Ciencias naturales"]["Cuidado ambiental"] += 2
        areas["Ciencias naturales"]["Cuidado animal"] += 2
        areas["Ciencias naturales"]["Experimentación y laboratorio"] += 4

    @Rule(Criterios(criterios__artista=1))
    def artista(self):
        areas["Artes"]["Música-Canto"] += 4
        areas["Artes"]["Música-Instrumental"] += 4
        areas["Artes"]["Danza"] += 4
        areas["Artes"]["Teatro"] += 4
        areas["Artes"]["Artes plásticas"] += 4
        areas["Ciencias sociales y humanidades"]["Lengua castellana e idiomas extranjeros"] += 2
        areas["Ciencias sociales y humanidades"]["Política y democracia"] += 2
        areas["Ciencias sociales y humanidades"]["Obra social"] += 2
        areas["Tecnología"]["Producción multimedia"] += 4
        areas["Tecnología"]["Emprendimiento con base tecnológico"] += 2

    @Rule(Criterios(criterios__realista=1))
    def realista(self):
        areas["Deportes"]["Deportes atléticos"] += 4
        areas["Deportes"]["Deportes de pelota"] += 4
        areas["Deportes"]["Deportes de combate"] += 4
        areas["Artes"]["Música-Canto"] += 2
        areas["Artes"]["Artes plásticas"] += 2
        areas["Lógica y matemática"]["Contabilidad"] += 2
        areas["Lógica y matemática"]["Lógica"] += 2
        areas["Tecnología"]["Uso de herramientas ofimáticas"] += 2
        areas["Tecnología"]["Uso de herramientas de desarrollo"] += 2
        areas["Tecnología"]["Producción multimedia"] += 2
        areas["Ciencias naturales"]["Cuidado ambiental"] += 4
        areas["Ciencias naturales"]["Cuidado animal"] += 4
        areas["Ciencias naturales"]["Experimentación y laboratorio"] += 2

    @Rule(Criterios(criterios__social=1))
    def social(self):
        areas["Deportes"]["Deportes atléticos"] += 2
        areas["Deportes"]["Deportes de pelota"] += 2
        areas["Deportes"]["Deportes de combate"] += 2
        areas["Artes"]["Música-Canto"] += 2
        areas["Artes"]["Música-Instrumental"] += 2
        areas["Artes"]["Danza"] += 2
        areas["Artes"]["Teatro"] += 2
        areas["Ciencias sociales y humanidades"]["Lengua castellana e idiomas extranjeros"] += 4
        areas["Ciencias sociales y humanidades"]["Política y democracia"] += 2
        areas["Ciencias sociales y humanidades"]["Obra social"] += 4
        areas["Tecnología"]["Emprendimiento con base tecnológico"] += 2
        areas["Ciencias naturales"]["Cuidado ambiental"] += 2
        areas["Ciencias naturales"]["Cuidado animal"] += 2

    @Rule(Criterios(criterios__emprendedor=1))
    def emprendedor(self):
        areas["Deportes"]["Deportes atléticos"] += 2
        areas["Deportes"]["Deportes de pelota"] += 2
        areas["Deportes"]["Deportes de combate"] += 2
        areas["Artes"]["Música-Instrumental"] += 2
        areas["Artes"]["Danza"] += 2
        areas["Artes"]["Teatro"] += 2
        areas["Ciencias sociales y humanidades"]["Lengua castellana e idiomas extranjeros"] += 2
        areas["Ciencias sociales y humanidades"]["Política y democracia"] += 4
        areas["Ciencias sociales y humanidades"]["Obra social"] += 2
        areas["Lógica y matemática"]["Estadística"] += 2
        areas["Tecnología"]["Emprendimiento con base tecnológico"] += 4

    @Rule(Criterios(criterios__convencional=1))
    def convencional(self):
        areas["Lógica y matemática"]["Estadística"] += 4
        areas["Lógica y matemática"]["Contabilidad"] += 4
        areas["Lógica y matemática"]["Lógica"] += 2
        areas["Tecnología"]["Uso de herramientas ofimáticas"] += 4
        areas["Tecnología"]["Uso de herramientas de desarrollo"] += 2
        areas["Ciencias naturales"]["Experimentación y laboratorio"] += 2


def start_engine(criterios: dict):
    engine = SistemaExperto()
    engine.reset()
    engine.declare(Criterios(criterios=criterios))
    engine.run()
    return areas

