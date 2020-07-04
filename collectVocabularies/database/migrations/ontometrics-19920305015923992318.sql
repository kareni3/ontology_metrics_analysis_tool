ALTER TABLE "class"
    DROP CONSTRAINT vocabulary_id;
ALTER TABLE vocabulary_metrics
    DROP CONSTRAINT vocabulary_id;
ALTER TABLE public.vocabulary_metrics
    ADD CONSTRAINT vocabulary_id PRIMARY KEY (name, version);
ALTER TABLE "class" 
	ADD COLUMN IF NOT EXISTS vocabulary_name text;
ALTER TABLE "class" 
	ADD COLUMN IF NOT EXISTS vocabulary_version_number numeric;

DELETE FROM "class"
	WHERE "Classconnectivity" ISNULL;

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
		SET vocabulary_name = rec.name, vocabulary_version_number = rec.version
		WHERE vocabulary_id = rec.id;
   END LOOP;
   CLOSE cur;
END; $$
LANGUAGE plpgsql;

CALL fun();
DROP PROCEDURE fun();

ALTER TABLE "class" 
	DROP COLUMN IF EXISTS vocabulary_id;

ALTER TABLE "class"
    DROP CONSTRAINT class_id;
ALTER TABLE public."class"
    ADD CONSTRAINT class_id PRIMARY KEY (name, vocabulary_name, vocabulary_version_number);