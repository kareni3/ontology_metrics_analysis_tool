
from xml.etree import ElementTree
import numpy as np
import os
import re
import pandas as pd

class PathsForExcel:
    def __init__(self):
        class Paths:
            def __init__(self, numericalMetrics, DLexpressivity, classMetrics):
                 self.numericalMetrics = numericalMetrics
                 self.DLexpressivity = DLexpressivity
                 self.classMetrics = classMetrics
            def __getitem__(self, i):
                if i=="numericalMetrics":
                    return self.numericalMetrics
                elif i=="DLexpressivity":
                    return self.DLexpressivity
                elif i=="classMetrics":
                    return self.classMetrics
        self.directOrder = Paths(r"./excel/directOrder/numericalMetrics.xlsx",
                                 r"./excel/directOrder/DLexpressivity.xlsx",
                                 r"./excel/directOrder/classMetrics.xlsx")
        self.reverseOrder = Paths(r"./excel/reverseOrder/numericalMetrics.xlsx",
                                  r"./excel/reverseOrder/DLexpressivity.xlsx",
                                  r"./excel/reverseOrder/classMetrics.xlsx")
    def __getitem__(self, i):
        if i=="directOrder":
            return self.directOrder
        elif i=="reverseOrder":
            return self.reverseOrder

pathsForExcel = PathsForExcel()
path = './metrics'

def run():
    dLexpressivitySheets = []
    numericSheets = []
    reversedNumericSheets = []
    classSheets = []
    sheetNames = []
    
    toScip = False
    scipFolders = []
    try:
        with open('./scipVocabularies.txt', 'r') as f:
            f.readline()
            line = f.readline()
            toScip = re.search('yes', line[line.find(":") : ])
            f.readline()
            line = f.readline().rstrip('\n')
            if line == 'all':
                for dir in os.listdir(path):
                    scipFolders.append(dir)
            else:
                while line:
                    scipFolders.append(line)
                    line = f.readline().rstrip('\n')
    except:
        print ("WARN: scipVocabularies.txt was broken. None of vocabularies will be scipped")
        
    if toScip:
        print('These vocabularies will be scipped: ' + str(scipFolders))
    
    for dir in os.listdir(path):
        print(dir)
        if dir in scipFolders and toScip:
            continue
        try:
            os.mkdir('./csvs/'+dir)
        except OSError:
            print ("Directory has not been created")
    
        npMetrics, npClassMetrics = fillMetrics(dir, countClassMetrics=True)
        npReversedMetrics, itsNone = fillMetrics(dir, reversed=True)
       
        writeCSV(dir,npMetrics)
        
        dLexpressivityMetrics = getDLexpressivityMetrics(npMetrics)
        numericMetrics = getNumericMetrics(npMetrics)
        reversedNumericMetrics = getNumericMetrics(npReversedMetrics)


        dLexpressivitySheets.append(pd.DataFrame(data=dLexpressivityMetrics[1:,1:], index=dLexpressivityMetrics[1:,0], columns=dLexpressivityMetrics[0,1:]))
        numericSheets.append(pd.DataFrame(data=numericMetrics[1:,1:], index=numericMetrics[1:,0], columns=numericMetrics[0,1:],dtype='float'))
        reversedNumericSheets.append(pd.DataFrame(data=reversedNumericMetrics[1:,1:], index=reversedNumericMetrics[1:,0], columns=reversedNumericMetrics[0,1:],dtype='float'))
        classSheets.append(pd.DataFrame(data=npClassMetrics[1:,1:], index=npClassMetrics[1:,0], columns=npClassMetrics[0,1:]))

        sheetNames.append(dir)
    print("Please stand by...")
    writeAllExcels(["directOrder", "reverseOrder", "directOrder", "directOrder"],
                   ["numericalMetrics", "numericalMetrics", "DLexpressivity", "classMetrics"],
                   [numericSheets, reversedNumericSheets, dLexpressivitySheets, classSheets],
                   sheetNames)


def fillMetrics(dir,reversed=False,countClassMetrics=False):
    metrics = []
    classMetrics = []
    classes = []
    classAttrNumber = 0
    vocabularyNames = os.listdir(path+'/'+dir)
    versionsNumber = len(vocabularyNames)
    # for metrics
    toWriteFirstColumn = True
    for i in range(len(vocabularyNames)):
        mIndex = len(vocabularyNames) - i - 1 if reversed else i
        print(path+'/'+dir+'/'+vocabularyNames[mIndex])
        tree = ElementTree.parse(path+'/'+dir+'/'+vocabularyNames[mIndex])
        ontology = tree.getroot().find('ontology')
        metrics.append([])
        if toWriteFirstColumn:
            metrics.append([])
            metrics[0].append('version name')
        metrics[i+1].append(vocabularyNames[mIndex][ : vocabularyNames[mIndex].find(".")])

        for tags1 in ontology:
            for tags2 in tags1:
                if type(tags2.tag) != str or type(tags2.text) != str:
                    if tags2.tag == "class" and countClassMetrics:
                        if tags2.attrib['name'] not in classes:
                            classes.append(tags2.attrib['name'])
                        if classAttrNumber == 0:
                            classAttrNumber = len(tags2)
                    continue
                if toWriteFirstColumn:
                    metrics[0].append(tags2.tag)
                metrics[i+1].append(convert(tags2.text))
               
        toWriteFirstColumn = False
    if countClassMetrics:
        # for classes
        classMetrics = [['NULL' for x in range(classAttrNumber*len(classes)+3+len(classes))] for x in range(versionsNumber + 1)]
        classMetrics[0][0] = 'version name'
        for i in range(len(vocabularyNames)):
            mIndex = len(vocabularyNames) - i - 1 if reversed else i
            tree = ElementTree.parse(path+'/'+dir+'/'+vocabularyNames[mIndex])
            ontology = tree.getroot().find('ontology')
            classMetrics[i+1][0] = vocabularyNames[mIndex][ : vocabularyNames[mIndex].find(".")]
            for tags1 in ontology:
                for m, tags2 in enumerate(tags1):
                    if type(tags2.tag) != str or type(tags2.text) != str:
                        if tags2.tag == "class" and countClassMetrics:
                            classListNumber = classes.index(tags2.attrib['name'])
                            classMetrics[0][classListNumber*len(tags2) + 1 + classListNumber] = "NAME: " + tags2.attrib['name']
                            classMetrics[i+1][classListNumber*len(tags2) + 1 + classListNumber] = ""
                            for k, tags3 in enumerate(tags2):
                                classMetrics[0][classListNumber*len(tags2) + k + 2 + classListNumber] = tags3.tag
                                classMetrics[i+1][classListNumber*len(tags2) + k + 2 + classListNumber] = tags3.text
                        continue
                   
    npMetrics = np.array(metrics)
    npClassMetrics = np.array(classMetrics)
    return (expandHeader(npMetrics.transpose(), reversed), (npClassMetrics.transpose() if countClassMetrics else None))

def writeCSV(dir,npMetrics):
    f = open('./csvs/'+dir+'/'+dir+'.csv', 'tw', encoding='utf-8')
    for i in range(npMetrics.shape[0]):
        line = ""
        for j in range(npMetrics.shape[1]):
            line += npMetrics[i][j] + ','
        f.write(line+'\n')
    f.close()

def writeExcel(order,fileName,sheets,sheetNames):
    writer = pd.ExcelWriter(pathsForExcel[order][fileName], engine = 'xlsxwriter')
    for i, sheet in  enumerate(sheets):
        sheet.to_excel(writer, sheet_name = sheetNames[i])
    writer.save()
    writer.close()

def writeAllExcels(orders, fileNames, excels, sheetNames):
    for i in range(len(excels)):
        writeExcel(orders[i], fileNames[i], excels[i], sheetNames)
    
def getNumericMetrics(npMetrics):
    k, m = np.where(npMetrics == "DLexpressivity")
    return np.delete(npMetrics, (k), axis=0)
    
def getDLexpressivityMetrics(npMetrics):
    k, m = np.where(npMetrics == "DLexpressivity")
    return np.concatenate((npMetrics[[0]], npMetrics[[1]], npMetrics[[2]], npMetrics[k]), axis=0)

def expandHeader(npMetrics, reversed=False):
    numbers = []
    numbers.append("version number")
    lifePreiods = []
    lifePreiods.append("version life (0 - birth; 1 - current version)")
    for i in range(npMetrics.shape[1] - 1):
        number = npMetrics.shape[1] - i - 1 if reversed else i+1
        numbers.append(number)
        if npMetrics.shape[1] > 2:
            lifePreiod = (npMetrics.shape[1] - i - 2)/(npMetrics.shape[1] - 2) if reversed else i/(npMetrics.shape[1] - 2)
            lifePreiods.append(lifePreiod)
        elif npMetrics.shape[1] == 2:
            lifePreiods.append(1)
    expandMetrics = np.insert(npMetrics, 1, numbers, axis = 0)
    expandMetrics = np.insert(expandMetrics, 2, lifePreiods, axis = 0)
    return expandMetrics

def convert(string):
    if string.isdigit():
       return int(string)
    else:
        try:
            return float(string)
        except ValueError:
            return string