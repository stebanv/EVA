from bson import ObjectId
from werkzeug.security import check_password_hash, generate_password_hash
from flask import abort

from eva import db
from eva.institucion import models as institucion
from eva.estudiante import models as estudiante

from mongoengine import EmbeddedDocumentField, ListField, StringField, ReferenceField, DictField, connect


class usuario(db.Document):
    usuario = StringField(required=True, unique=True)
    clave = StringField(required=True)
    tipo_usuario = StringField(required=True)
    referencia_estudiante = db.ReferenceField(estudiante.Estudiante)
    referencia_institucion = db.ReferenceField(institucion.Institucion)


def crear_usuario(User: str, Clave: str, Tipo_usuario: str, Referencia_institucion=None, Referencia_estudiante=None) -> None:
    try:
        if Tipo_usuario == "institucion":
            referencia = institucion.Institucion.objects(id=Referencia_institucion).first()
            Usuario = usuario(usuario=User, clave=generate_password_hash(Clave), tipo_usuario=Tipo_usuario,
                              referencia_institucion=referencia)
            Usuario.save(force_insert=True)
        elif Tipo_usuario == "estudiante":
            referencia = estudiante.Estudiante.objects(id=Referencia_estudiante).first()
            Usuario = usuario(usuario=User, clave=generate_password_hash(Clave), tipo_usuario=Tipo_usuario,
                              referencia_estudiante=referencia, referencia_institucion=Referencia_institucion)
            Usuario.save(force_insert=True)
        elif Tipo_usuario == "administrador":
            Usuario = usuario(usuario=User, clave=generate_password_hash(Clave), tipo_usuario=Tipo_usuario)
            Usuario.save(force_insert=True)
        else:
            print("El tipo de usuario no es valido")
            abort(400)
    except Exception as e:
        print(e)
        abort(500)


def consultar_usuario(id):
    Usuario = usuario.objects(id=id).first()
    return Usuario[0]


def comprobar_usuario(User: str, Clave: str):
    Usuario = usuario.objects(usuario=User).first()
    if Usuario is not None:
        if check_password_hash(Usuario.clave, Clave):
            if Usuario.tipo_usuario == "institucion":
                usuario_dict = {"tipo_usuario": Usuario.tipo_usuario,
                                "referencia_institucion": str(Usuario.referencia_institucion.id)}
                return usuario_dict
            elif Usuario.tipo_usuario == "estudiante":
                usuario_dict = {"tipo_usuario": Usuario.tipo_usuario,
                                "referencia_estudiante": str(Usuario.referencia_estudiante.id),
                                "referencia_institucion": str(Usuario.referencia_institucion.id)}
                return usuario_dict
            elif Usuario.tipo_usuario == "administrador":
                usuario_dict = {"tipo_usuario": Usuario.tipo_usuario}
                return usuario_dict
        else:
            return None
    else:
        return None


def consultar_usuarios() -> list:
    Usuarios = usuario.objects()
    # return only the id of the user
    return [{"username": str(u.usuario)} for u in Usuarios]


def update_password(user, new_password):
    Usuario = usuario.objects(usuario=user).first()
    Usuario.update(clave=generate_password_hash(new_password))


