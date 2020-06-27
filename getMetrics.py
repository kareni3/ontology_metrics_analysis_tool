import requests
import re
import os
from os.path import isfile

def run():
    path = './vocabularies'
    
    toScip = False
    scipFolders = []
    try:
        with open('./scipVocabularies.txt', 'r') as f:
            line = f.readline()
            f.readline()
            toScip = re.search('yes', line[line.find(":") : ])
            f.readline()
            line = f.readline().rstrip('\n')
            if line == 'all':
                for dir in os.listdir(path):
                    print(dir)
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
            os.mkdir('./metrics/'+dir)
        except OSError:
            print ("Directory has not been created")
        for vocabuary in os.listdir(path+'/'+dir):
            if not isfile(path+'/'+dir+'/'+vocabuary):
                continue
            print(path+'/'+dir+'/'+vocabuary+' - in process', end="\r")
            f = open(path+'/'+dir+'/'+vocabuary, "r", encoding='utf-8')
            text = f.read()
            
            r = postRequest(text, 'on')
            linkToXML = ''
            m = re.search('https://ontometrics.informatik.uni-rostock.de/tmp/(.+?).xml', r.text)
            if m:
                linkToXML = m.group(0)
            else:
                r = postRequest(text, None)
                m = re.search('https://ontometrics.informatik.uni-rostock.de/tmp/(.+?).xml', r.text)
                if m:
                    linkToXML = m.group(0)
                else:
                    print(path+'/'+dir+'/'+vocabuary+' - ontoMetrics did not generate XML file. Put this vocabulary into broken folder.')
                    continue
    
            # print(linkToXML)
            try: 
                r = requests.get(linkToXML)
            except:
                print(path+'/'+dir+'/'+vocabuary+' - Something bad happened. Try again. But before check the link to the XML file - ' + linkToXML)
                continue
    
            xml = r.text
            f = open('./metrics/'+dir+'/'+vocabuary[ : vocabuary.find(".")]+'.xml', 'tw', encoding='utf-8')
            f.write(xml)
            f.close()
    
            print(path+'/'+dir+'/'+vocabuary+' - metrics successfully received')
    
def postRequest(text, rClass):
    return requests.post('https://ontometrics.informatik.uni-rostock.de/ontologymetrics/ServletController', 
                              data = {
                                  'text':text,
                                  'path':'C:\fakepath\dublin_core_terms.rdf',
                                  'base':'on',
                                  'schema':'on',
                                  'knowledge':'on',
                                  'class':rClass,
                                  'graph':'on',
                                  'store_aggreement':'on',
                                  })
