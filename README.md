# Vocabularies Metrics Using OntoMetrics

## CollectVocabularies:

### Preparation:
- install python 3
- install libraries:
```sh
cd ./collectVocabularies
pip install -r libs.txt
```
- download vocabularies in rdf or owl format
- create folder ./vocabularies in ./collectVocabularies folder 
- put all versions of each vocabulary into ./vocabularies/{vocabulary_name} (you can find examples here https://drive.google.com/drive/folders/1PriRBtywgzUX9tGJ9QAPcaVPgRZ__Ibx?usp=sharing )
- name vocabularies by pattern: yyyy-mm-dd.{rdf/n3/...}

### Run ./startApp.py

After running, XML and CSV files of the metrics will be created in root directory with the program.
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

#### Restore Database
- install Postgresql
- db backup is in ./collectVocabularies/database/init/onto_metrics.sql. Restore this db
- change db settings in database.config.json
- migrations is in ./collectVocabularies/database/migrations/
- run ./applyMigrations.py

#### Add New Data
- before adding new vocabularies into db you should be sure that all ONLY NEW vocabularies are in ./vocabularies folder (see CollectVocabularies -> Preparation in this file)
- run ./addMigrations.py
- run ./applyMigrations.py
- if something wrong, run ./rollbackMigrations.py, delete last files with migrations, solve the problem, and try again

## Run App:

### Sever

#### Preparation
- install last version of Node.js
- install libraries:
```sh
cd ./server
npm install
```

#### Run Server
- Be sure that your db server is running
- run:
```sh
cd ./server
npm start
```


### Client

#### Preparation
- install vue and vue-cli
- install libraries:
```sh
cd ./client
npm install
```

#### Run Client
- be sure that your server is running
- run:
```sh
cd ./client
npm run serve
```
