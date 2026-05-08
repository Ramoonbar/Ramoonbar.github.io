import os

def mostrar_estructura(ruta, nivel=0):
    for nombre in os.listdir(ruta):
        ruta_completa = os.path.join(ruta, nombre)
        print("    " * nivel + "|-- " + nombre)
        if os.path.isdir(ruta_completa):
            mostrar_estructura(ruta_completa, nivel + 1)

# ruta del proyecto
ruta_proyecto = r"D:\Programación\Proyectos\Rakemon"
mostrar_estructura(ruta_proyecto)
