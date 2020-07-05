ALTER TABLE "class" 
	ADD COLUMN IF NOT EXISTS vocabulary_id numeric;

CREATE PROCEDURE fun() AS $$
DECLARE 
	rec RECORD;
	cur CURSOR 
		 FOR SELECT "id", "name", "version"
		 FROM vocabulary_metrics;
BEGIN
   OPEN cur;
   LOOP
      FETCH cur INTO rec;
      EXIT WHEN NOT FOUND;
	  UPDATE "class"
		SET vocabulary_id = rec.id 
		WHERE vocabulary_name = rec.name and vocabulary_version_number = rec.version;
   END LOOP;
   CLOSE cur;
END; $$
LANGUAGE plpgsql;

CALL fun();
DROP PROCEDURE fun();
