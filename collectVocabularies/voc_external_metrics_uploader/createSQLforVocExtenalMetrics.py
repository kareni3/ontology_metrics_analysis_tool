from numpy import genfromtxt

data = genfromtxt('./vocabularyExternalMetrics.csv', delimiter=',', dtype= None)

query = "insert into vocabulary_external_metrics values "
values = "" 

for line in data:
    values += '('
    for (ind, item) in enumerate(line):
        val = ("'" + item.decode('UTF-8').lower() + "'") if (ind == 0) else item
        values += str(val) + ', '
    values = values[:len(values) - 2] + '), '
values = values[:len(values) - 2]
print(query + values)