from sklearn.cluster import SpectralClustering
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

import collections
from bson import ObjectId

from eva.estudiante.models import Estudiante
from eva import db

db.connect(host='mongodb+srv://evadb.l657k.mongodb.net/EvaDB', port=27017, username='oscar',
           password='iwCTSZT1h9Ky3FgQ')


class Clustering:
    # Constructor
    def __init__(self, n_clusters=6):
        self.n_clusters = n_clusters
        # set up the clustering object
        self.sc = SpectralClustering(n_clusters=self.n_clusters, affinity='rbf', assign_labels='kmeans',
                                     n_neighbors=8)
        self.labels = None
        self.data = None

    def get_data(self, id_institucion: str):
        estudiantes = Estudiante.objects()
        arreglo_estudiantes = []
        data_analyzed = []
        for i in estudiantes:
            arreglo = []
            if i.institucion is not None and i.institucion.id == ObjectId(id_institucion) and i.area_conocimiento != []:
                try:
                    if i.perfil_estudiante.interes["tipo_de_espacio"] == "espacio_cerrado":
                        arreglo.append(1)
                    else:
                        arreglo.append(0)
                except Exception as e:
                    continue

                array_areas = []
                for i.area_conocimiento in i.area_conocimiento:
                    try:
                        array_areas.append(i.area_conocimiento["nombre_sub_area"])
                    except Exception as e:
                        continue
                data_analyzed.append(array_areas)

                if i.perfil_estudiante.interes["modo_de_trabajo"] == "equipo":
                    arreglo.append(1)
                else:
                    arreglo.append(0)

                if i.perfil_estudiante.interes["tipo_de_metodologia"] == "teorico":
                    arreglo.append(1)
                else:
                    arreglo.append(0)

                if i.perfil_estudiante.interes["objeto_de_trabajo"] == "ideas":
                    arreglo.append(0)
                elif i.perfil_estudiante.interes["objeto_de_trabajo"] == "cosas":
                    arreglo.append(1)
                elif i.perfil_estudiante.interes["objeto_de_trabajo"] == "datos":
                    arreglo.append(2)
                elif i.perfil_estudiante.interes["objeto_de_trabajo"] == "personas":
                    arreglo.append(3)

                if i.perfil_estudiante.personalidad["estilo_de_vida"] == "racional":
                    arreglo.append(1)
                else:
                    arreglo.append(0)

                if i.perfil_estudiante.personalidad["informacion"] == "intuitivo":
                    arreglo.append(1)
                else:
                    arreglo.append(0)

                if i.perfil_estudiante.personalidad["toma_de_decisiones"] == "perceptivo":
                    arreglo.append(1)
                else:
                    arreglo.append(0)

                if i.perfil_estudiante.personalidad["Actitud"] == "introvertido":
                    arreglo.append(1)
                else:
                    arreglo.append(0)

                if i.perfil_estudiante.personalidad["perfil_vocacional"] == "realista":
                    arreglo.append(1)
                elif i.perfil_estudiante.personalidad["perfil_vocacional"] == "artista":
                    arreglo.append(2)
                elif i.perfil_estudiante.personalidad["perfil_vocacional"] == "convencional":
                    arreglo.append(3)
                elif i.perfil_estudiante.personalidad["perfil_vocacional"] == "social":
                    arreglo.append(4)
                elif i.perfil_estudiante.personalidad["perfil_vocacional"] == "emprendedor":
                    arreglo.append(5)
                elif i.perfil_estudiante.personalidad["perfil_vocacional"] == "investigador":
                    arreglo.append(6)

                arreglo_estudiantes.append(arreglo)
        self.data = np.array(arreglo_estudiantes)
        return data_analyzed

    # Run the clustering algorithm
    def fit(self):
        self.sc.fit(self.data)
        self.labels = self.sc.labels_

    # Plot the result
    def plot(self):
        plt.scatter(self.data[:, 0], self.data[:, 1], c=self.labels)
        plt.show()

    def organize_data(self, id_institucion: str):
        data_analized = self.get_data(id_institucion)
        d1 = []

        for i in data_analized:
            d1.append(i)

        # Fit the data in the clustering algorithm
        self.fit()

        # Based on the labels, create a dictionary with the data
        d = {'areas': d1, 'cluster': self.labels}
        df = pd.DataFrame(data=d)

        arrayvgs = []
        array2 = []

        # Grouping the dataframe by cluster
        for i in df.groupby('cluster'):
            for k in i[1]['areas']:
                array2 += k
            arrayvgs.append(array2.copy())
            array2.clear()

        arrayvgs = pd.DataFrame(arrayvgs)
        return_value = []

        # Count the number of repeated elements in each cluster
        for i in arrayvgs.values:
            return_value.append(dict(collections.Counter(i).most_common()))

        # remove the None values from the dictionary
        for i in return_value:
            for k in list(i.keys()):
                if k is None:
                    i.pop(k)

        return return_value
