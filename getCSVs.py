
from xml.etree import ElementTree
import numpy as np
import os
import re
import pandas as pd

def run():
    path = './metrics'
    pathForExcel = r"./excel/union.xlsx"
    sheets = []
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
        if dir in scipFolders and toScip:
            continue
        try:
            os.mkdir('./csvs/'+dir)
        except OSError:
            print ("Directory has not been created")
    
        metrics = []
        toWriteFirstColumn = True
        for mIndex, metric in enumerate(reversed(os.listdir(path+'/'+dir))):
            print(path+'/'+dir+'/'+metric)
            tree = ElementTree.parse(path+'/'+dir+'/'+metric)
            ontology = tree.getroot().find('ontology')
            metrics.append([])
            if toWriteFirstColumn:
                metrics.append([])
                metrics[0].append('metric\\version')
            metrics[mIndex+1].append(metric[ : metric.find(".")])
            
            for tags1 in ontology:
                for tags2 in tags1:
                    # all metrics except class metrics
                    if type(tags2.tag) != str or type(tags2.text) != str:
                        continue
                    if toWriteFirstColumn:
                        metrics[0].append(tags2.tag)
                    metrics[mIndex+1].append(convert(tags2.text))
                   
            toWriteFirstColumn = False
        npMetrics = np.array(metrics)
        npMetrics = npMetrics.transpose()
       
        f = open('./csvs/'+dir+'/'+dir+'.csv', 'tw', encoding='utf-8')
        for i in range(npMetrics.shape[0]):
            line = ""
            for j in range(npMetrics.shape[1]):
                line += npMetrics[i][j] + ','
            f.write(line+'\n')
        f.close()
        
        sheets.append(pd.DataFrame(data=npMetrics[1:,1:], index=npMetrics[1:,0], columns=npMetrics[0,1:]))
        sheetNames.append(dir)
        
    writer = pd.ExcelWriter(pathForExcel, engine = 'xlsxwriter')
    for i, sheet in  enumerate(sheets):
        sheet.to_excel(writer, sheet_name = sheetNames[i])
    writer.save()
    writer.close()

def convert(string):
    if string.isdigit():
       return int(string)
    else:
        try:
            return float(string)
        except ValueError:
            return string