import getCSVs
import getMetrics
import os

if not os.path.exists('./excel'):
    os.mkdir('./excel')
if not os.path.exists('./csvs'):
    os.mkdir('./csvs')
if not os.path.exists('./metrics'):
    os.mkdir('./metrics')
if not os.path.exists('./vocabularies'):
    os.mkdir('./vocabularies')

print("getMetrics is running...")
getMetrics.run()

print("getCSVs is running...")
getCSVs.run()

print("Congrads. All processes have been completed.")
input('Press ENTER to exit') 
