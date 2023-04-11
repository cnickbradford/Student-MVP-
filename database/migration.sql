DROP TABLE IF EXISTS task;

CREATE TABLE task (
    id serial,
    name varchar(40),
    priority varchar(15),
    completed boolean default false
);