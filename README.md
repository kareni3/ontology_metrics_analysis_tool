# Vocabularies Metrics Using OntoMetrics

## CollectVocabularies:

### Preparation:
- clone
- install python 3
- install libraries:
```sh
cd ./collectVocabularies
pip install -r libs.txt
```
- download vocabularies in rdf or owl format
- create folder ./vocabularies in ./collectVocabularies folder 
- put all versions of each vocabulary into ./vocabularies/{vocabulary_name} (you can find examples here https://drive.google.com/drive/folders/1PriRBtywgzUX9tGJ9QAPcaVPgRZ__Ibx?usp=sharing )
- name vocabularies by pattern (if it is possible): yyyy-mm-dd

### Run ./startApp.py

After running XML and CSV files of the metrics will be created in root directory with the program.
These files are creating from vocabularies in ./vocabularies directory.

### How to work with scipVocabularies.txt ?

#### 1st Rule: 
If you want to scip vocabularies, just add their folder name into ./scipVocabularies.txt. Each name should be added on new line. After that do next..
#### 2nd Rule:
If you assign the value "yes" to the variable "scip folders from vocabularies directory (scip downloading XML files)" then 1st Rule will work for downloading XML files
#### 3rd Rule:
If you assign the value "yes" to the variable "scip folders from metrics directory (scip creating CSV files)" then 1st Rule will work for creating CSV files
#### 4th Rule:
You can add "all" instead of list of vocabularies to scip all of them

### How to insert vocabularies into database ?

