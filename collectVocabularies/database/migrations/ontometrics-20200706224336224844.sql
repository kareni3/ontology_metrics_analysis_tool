CREATE TABLE public.vocabulary_external_metrics
(
    vocabulary_name text,
    incoming_links numeric,
    outgoing_links numeric
);

ALTER TABLE public.vocabulary_external_metrics
    OWNER to postgres;