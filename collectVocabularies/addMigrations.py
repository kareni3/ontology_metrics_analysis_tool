
from xml.etree import ElementTree
import numpy as np
import os
import re
import pandas as pd
from datetime import datetime
import time

path = './metrics'

def run():
    check = True
    sqlstr = ""

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
    
        npMetrics, npClassMetrics = fillMetrics(dir, countClassMetrics=True)

        # classes
        npClassMetrics = npClassMetrics.transpose()
        cName=""
        query_sql = 'INSERT INTO public.class(name, vocabulary_name, vocabulary_version_number, "Classconnectivity", "Classfulness", "Classimportance", "Classinheritancerichness", "Classreadability", "Classrelationshiprichness", "Classchildrencount", "Classinstancescount", "Classpropertiescount") VALUES '
        check_class_query = False   

        for ind1, asd in enumerate(npClassMetrics):
            check = False
            if ind1 < 1: 
                continue
            for ind, metric in enumerate(asd):
                if ind < 1: 
                    print(metric)
                    continue
                if (ind-1) % 10 == 0:
                    if check and sqlstr != "":
                        query_sql+='('+sqlstr+'), ' 
                        check_class_query = True
                        sqlstr = ""
                    if npClassMetrics[ind1][ind] != "NULL":
                        cName = npClassMetrics[0][ind][6:]
                        sqlstr += "'"+cName+"'" + ", '" + str(dir) + "', " + str(ind1)
                        check = True
                    else:
                        cName = ""
                elif cName != "":
                    sqlstr += ", "
                    sqlstr += metric
        query_sql = query_sql[:len(query_sql)-2]
        query_sql += ';'
        if (check_class_query):
            timestamp = datetime.now().strftime("%Y%m%d%H%M%S%f")
            f = open('./database/migrations/ontometrics-'+timestamp+'.sql', 'tw', encoding='utf-8')
            f.write(query_sql)
            f.close()
            f = open('./database/migrations/ontometrics-'+timestamp+'.rollback.sql', 'tw', encoding='utf-8')
            f.write("DELETE FROM public.class WHERE vocabulary_name = '" + dir + "'")
            f.close()
        query_sql = ""
        sqlstr = ""
        time.sleep(0.01)

        # vocabularies
        query_sql = 'INSERT INTO public.vocabulary_metrics(name, version, version_name, axioms, logicalaxiomscount, classcount, totalclassescount, objectpropertycount, totalobjectpropertiescount, datapropertycount, totaldatapropertiescount, propertiescount, individualcount, totalindividualscount, dlexpressivity, subclassofaxiomscount, equivalentclassesaxiomscount, disjointclassesaxiomscount, gcicount, hiddengcicount, subobjectpropertyofaxiomscount, equivalentobjectpropertiesaxiomscount, inverseobjectpropertiesaxiomscount, disjointobjectpropertiesaxiomscount, functionalobjectpropertiesaxiomscount, inversefunctionalobjectpropertiesaxiomscount, transitiveobjectpropertyaxiomscount, symmetricobjectpropertyaxiomscount, asymmetricobjectpropertyaxiomscount, reflexiveobjectpropertyaxiomscount, irreflexiveobjectpropertyaxiomscount, objectpropertydomainaxiomscount, objectpropertyrangeaxiomscount, subpropertychainofaxiomscount, subdatapropertyofaxiomscount, equivalentdatapropertiesaxiomscount, disjointdatapropertiesaxiomscount, functionaldatapropertyaxiomscount, datapropertydomainaxiomscount, datapropertyrangeaxiomscount, classassertionaxiomscount, objectpropertyassertionaxiomscount, datapropertyassertionaxiomscount, negativeobjectpropertyassertionaxiomscount, negativedatapropertyassertionaxiomscount, sameindividualsaxiomscount, differentindividualsaxiomscount, annotationaxiomscount, annotationassertionaxiomscount, annotationpropertydomainaxiomscount, annotationpropertyrangeaxiomscount, attributerichness, inheritancerichness, relationshiprichness, attributeclassratio, equivalenceratio, axiomclassratio, inverserelationsratio, classrelationratio, averagepopulation, classrichness, absoluterootcardinality, absoluteleafcardinality, absolutesiblingcardinality, absolutedepth, averagedepth, maximaldepth, absolutebreadth, averagebreadth, maximalbreadth, ratioofleaffanoutness, ratioofsiblingfanoutness, tangledness, totalnumberofpaths, averagenumberofpaths) VALUES '

        npMetrics = npMetrics.transpose()
        for ind1, asd in enumerate(npMetrics):
            if ind1 < 1: 
                continue
            check = True
            sqlstr += "'"+dir+"'" + ", " + str(ind1)
            for ind, metric in enumerate(asd):
                if ind == 0:
                    sqlstr += ", " + "'"+metric+"'"
                if ind < 1: 
                    continue
                sqlstr += ", "
                if ind == 12:
                    sqlstr += "'"+metric+"'"
                else:
                    sqlstr += metric
                check = False
            query_sql+='('+sqlstr+'), ' 
            sqlstr = ""
        query_sql = query_sql[:len(query_sql)-2]
        query_sql += ';'
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S%f")
        f = open('./database/migrations/ontometrics-'+datetime.now().strftime("%Y%m%d%H%M%S%f")+'.sql', 'tw', encoding='utf-8')
        f.write(query_sql)
        f.close()
        f = open('./database/migrations/ontometrics-'+timestamp+'.rollback.sql', 'tw', encoding='utf-8')
        f.write("DELETE FROM public.vocabulary_metrics WHERE name = '" + dir + "'")
        f.close()
        query_sql = ""
        sqlstr = ""
        time.sleep(0.01)
        
        # table
        #if check:
        #    for ind, metric in enumerate(npMetrics):
        #        if ind < 1: 
        #            continue
        #        if not check:
        #            sqlstr += ", "
        #        if metric[0] == "DLexpressivity":
        #            sqlstr += metric[0] + " text"
        #        else:
        #            sqlstr += metric[0] + " numeric"
        #        print(metric[0])
        #        check = False


    
    #print(sqlstr)
    #with conn.cursor() as cursor:
    #    conn.autocommit = True
    #    create_table = sql.SQL('CREATE TABLE public.vocabulary ('+sqlstr+'); ALTER TABLE public.vocabulary OWNER to postgres;')
    #    cursor.execute(create_table)

    #with conn.cursor() as cursor:
    #    conn.autocommit = True
    #    insert_vocabularies = sql.SQL('INSERT INTO public.vocabulary_metrics(name, version, version_name, axioms, logicalaxiomscount, classcount, totalclassescount, objectpropertycount, totalobjectpropertiescount, datapropertycount, totaldatapropertiescount, propertiescount, individualcount, totalindividualscount, dlexpressivity, subclassofaxiomscount, equivalentclassesaxiomscount, disjointclassesaxiomscount, gcicount, hiddengcicount, subobjectpropertyofaxiomscount, equivalentobjectpropertiesaxiomscount, inverseobjectpropertiesaxiomscount, disjointobjectpropertiesaxiomscount, functionalobjectpropertiesaxiomscount, inversefunctionalobjectpropertiesaxiomscount, transitiveobjectpropertyaxiomscount, symmetricobjectpropertyaxiomscount, asymmetricobjectpropertyaxiomscount, reflexiveobjectpropertyaxiomscount, irreflexiveobjectpropertyaxiomscount, objectpropertydomainaxiomscount, objectpropertyrangeaxiomscount, subpropertychainofaxiomscount, subdatapropertyofaxiomscount, equivalentdatapropertiesaxiomscount, disjointdatapropertiesaxiomscount, functionaldatapropertyaxiomscount, datapropertydomainaxiomscount, datapropertyrangeaxiomscount, classassertionaxiomscount, objectpropertyassertionaxiomscount, datapropertyassertionaxiomscount, negativeobjectpropertyassertionaxiomscount, negativedatapropertyassertionaxiomscount, sameindividualsaxiomscount, differentindividualsaxiomscount, annotationaxiomscount, annotationassertionaxiomscount, annotationpropertydomainaxiomscount, annotationpropertyrangeaxiomscount, attributerichness, inheritancerichness, relationshiprichness, attributeclassratio, equivalenceratio, axiomclassratio, inverserelationsratio, classrelationratio, averagepopulation, classrichness, absoluterootcardinality, absoluteleafcardinality, absolutesiblingcardinality, absolutedepth, averagedepth, maximaldepth, absolutebreadth, averagebreadth, maximalbreadth, ratioofleaffanoutness, ratioofsiblingfanoutness, tangledness, totalnumberofpaths, averagenumberofpaths) VALUES ();')
    #    cursor.execute(insert_vocabularies)

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
    return npMetrics.transpose(), npClassMetrics.transpose() if countClassMetrics else None


def convert(string):
    if string.isdigit():
       return int(string)
    else:
        try:
            return float(string)
        except ValueError:
            return string

run()