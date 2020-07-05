from yoyo import read_migrations
from yoyo import get_backend
import json

db_str = ""
print("please, stand by...")
with open('../database.config.json') as json_file:
    data = json.load(json_file)
    db_str = 'postgresql://' + data['user_name'] + ':' + data['password'] + '@' + data['host'] + ':' + data['port'] + '/' + data['db_name']

backend = get_backend(db_str)
migrations = read_migrations('./database/migrations')


with backend.lock():

    # Rollback all migrations
    backend.rollback_migrations(backend.to_rollback(migrations))
    print("ok")