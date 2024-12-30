# # Instalar git filter-repo si no lo tienes
# # (puede variar según tu SO)
# pip install git-filter-repo
#
# # Clona tu repo en local si no lo tienes ya
# git clone https://github.com/JesusRamosMembrive/uptask.git
# cd tu-repo
#
# # Ejecutar git filter-repo para eliminar el archivo sensible
# git filter-repo --path .env --invert-paths
#
# # Forzar el push al remoto para sobrescribir historial
# git push origin --force
