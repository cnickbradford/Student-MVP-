DROP TABLE IF EXISTS task;

CREATE TABLE task (
    id serial,
    name text,
    priority varchar(15)
);