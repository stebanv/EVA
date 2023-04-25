from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4

from eva.estudiante import models as estudiante_models
from eva.institucion import models as institucion_models
from eva import db

db.connect(host='mongodb+srv://evadb.l657k.mongodb.net/EvaDB', port=27017, username='oscar',
           password='iwCTSZT1h9Ky3FgQ')


class ReporteIE:
    def __init__(self, id_ie: str):
        self.id_ie = id_ie
        self.institucion = institucion_models.consultar_institucion(id_ie)
        self.estudiantes = estudiante_models.consultar_estudiantes_idie(id_ie)
        self.filename = "Reporte_IE_{}.pdf".format(self.institucion.nombre.replace(' ', '_'))
        self.path = "eva/institucion/reportes/{}".format(self.filename)
        self.c = canvas.Canvas(self.path, pagesize=A4)
        # self.c.setLineWidth(.3)
        self.c.setTitle("Reporte IE {}".format(self.institucion.nombre))
        self.w, self.h = A4

    def get_pdf(self):
        return self.filename

    # Realiza el formato para el título
    def put_title(self, title: str, x: int, y: int):
        self.c.setFont('Helvetica', 18)
        y -= 30
        self.c.drawCentredString(self.w / 2, y, title)
        y -= 5
        self.c.line(30, y, 550, y)
        y -= 30
        return x, y

    # Realiza el formato para el subtítulo
    def put_subtitle(self, title: str, x: int, y: int):
        self.c.setFont('Helvetica', 16)
        self.c.drawCentredString(x / 2, y, title)
        y -= 30
        return x, y

    # Realiza el formato para el texto
    def put_text(self, text: str, x: int, y: int):
        self.c.setFont('Helvetica', 12)
        self.c.drawString(30, y, text)
        y -= 20
        return x, y

    def generar_reporte(self):
        # Página inicial de la institución
        w_temp, h_temp = self.put_title("Reporte de {}".format(self.institucion.nombre),
                                        self.w, self.h)
        w_temp, h_temp = self.put_text("Nombre de la institución: {}".format(self.institucion.nombre), w_temp, h_temp)
        w_temp, h_temp = self.put_text("Ubicación: {}".format(self.institucion.ubicacion), w_temp, h_temp)
        w_temp, h_temp = self.put_text("Número de estudiantes: {}".format(len(self.estudiantes)), w_temp, h_temp)

        self.c.showPage()

        # Página de estudiantes
        for estudiante in self.estudiantes:
            w_temp, h_temp = self.w, self.h

            w_temp, h_temp = self.put_title("{} {}".format(estudiante.nombre, estudiante.apellido),
                                            w_temp, h_temp)

            w_temp, h_temp = self.put_subtitle("Datos básicos",
                                               w_temp, h_temp)
            w_temp, h_temp = self.put_text("Nombre: {}".format(estudiante.nombre.title()),
                                           w_temp, h_temp)
            w_temp, h_temp = self.put_text("Apellido: {}".format(estudiante.apellido.title()),
                                           w_temp, h_temp)
            try:
                w_temp, h_temp = self.put_text("Jornada: {}".format(estudiante.contexto_estudiante.temporal["jornada"]),
                                               w_temp, h_temp)
            except KeyError:
                pass
            w_temp, h_temp = self.put_text("Grado: {}".format(estudiante.grado),
                                           w_temp, h_temp)
            try:
                w_temp, h_temp = self.put_text("Curso: {}".format(estudiante.curso.title()),
                                               w_temp, h_temp)
            except AttributeError:
                w_temp, h_temp = self.put_text("Curso: {}".format(estudiante.curso),
                                               w_temp, h_temp)

            try:
                w_temp, h_temp = self.put_text(
                    "Género: {}".format(estudiante.perfil_estudiante.datos_basicos["genero"]),
                    w_temp, h_temp)

                w_temp, h_temp = self.put_subtitle("Intereses",
                                                   w_temp, h_temp)
                w_temp, h_temp = self.put_text(
                    "Tipo de espacio: {}".format(
                        estudiante.perfil_estudiante.interes["tipo_de_espacio"].title().replace('_', ' ')),
                    w_temp, h_temp)
                w_temp, h_temp = self.put_text(
                    "Modo de trabajo: {}".format(estudiante.perfil_estudiante.interes["modo_de_trabajo"].title()),
                    w_temp, h_temp)
                w_temp, h_temp = self.put_text(
                    "Tipo de metodología: {}".format(
                        estudiante.perfil_estudiante.interes["tipo_de_metodologia"].title()),
                    w_temp, h_temp)
                w_temp, h_temp = self.put_text(
                    "Objeto de trabajo: {}".format(estudiante.perfil_estudiante.interes["objeto_de_trabajo"].title()),
                    w_temp, h_temp)

                w_temp, h_temp = self.put_subtitle("Personalidad",
                                                   w_temp, h_temp)
                w_temp, h_temp = self.put_text(
                    "Actitud: {}".format(estudiante.perfil_estudiante.personalidad["Actitud"].title()),
                    w_temp, h_temp)
                w_temp, h_temp = self.put_text(
                    "Información: {}".format(estudiante.perfil_estudiante.personalidad["informacion"].title()),
                    w_temp, h_temp)
                w_temp, h_temp = self.put_text(
                    "Estilo de vida: {}".format(estudiante.perfil_estudiante.personalidad["estilo_de_vida"].title()),
                    w_temp, h_temp)
                w_temp, h_temp = self.put_text(
                    "Toma de decisiones: {}".format(
                        estudiante.perfil_estudiante.personalidad["toma_de_decisiones"].title()),
                    w_temp, h_temp)
                w_temp, h_temp = self.put_text(
                    "Perfil vocacional: {}".format(
                        estudiante.perfil_estudiante.personalidad["perfil_vocacional"].title()),
                    w_temp, h_temp)

                w_temp, h_temp = self.put_subtitle("Áreas del conocimiento",
                                                   w_temp, h_temp)
                w_temp, h_temp = self.put_text("Áreas del conocimiento del estudiante: ",
                                               w_temp, h_temp)
                for area in estudiante.area_conocimiento:
                    w_temp, h_temp = self.put_text("    - {} ".format(area["nombre_sub_area"]),
                                                   w_temp, h_temp)
            except Exception:
                pass
            self.c.showPage()

        self.c.save()
