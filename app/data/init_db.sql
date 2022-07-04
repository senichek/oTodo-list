DROP TABLE IF EXISTS "task_has_tag";
DROP TABLE IF EXISTS "tasks";
DROP TABLE IF EXISTS "tags";
DROP TABLE IF EXISTS "users";
DROP TABLE IF EXISTS "positions";

CREATE TABLE "users" (
    id SERIAL UNIQUE,
    email TEXT UNIQUE,
    password TEXT,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP
);

CREATE TABLE "tasks" (
    id SERIAL UNIQUE,
    name TEXT,
    owner INTEGER REFERENCES "users"(id),
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP
);

CREATE TABLE "tags" (
    id SERIAL UNIQUE,
    name TEXT,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP
);

CREATE TABLE "task_has_tag" (
    id SERIAL,
    task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP
);

CREATE TABLE "positions" (
    id SERIAL UNIQUE,
    owner INTEGER,
    positions TEXT,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP
);

/* Raw password is: pass111 */
INSERT INTO "users" (email, password) VALUES ('john@gmail.com', '$2a$10$x/jcYF51hxunlk5mObFAZ.Ojz7N75pC2Gxv2YeZ8dk9JjvIZ5607a');
INSERT INTO "users" (email, password) VALUES ('jane@gmail.com', '$2a$10$x/jcYF51hxunlk5mObFAZ.Ojz7N75pC2Gxv2YeZ8dk9JjvIZ5607a');

INSERT INTO "tasks" (name, owner) VALUES ('John task 1', 1);
INSERT INTO "tasks" (name, owner) VALUES ('John task 2', 1);
INSERT INTO "tasks" (name, owner) VALUES ('John task 3', 1);

INSERT INTO "tasks" (name, owner) VALUES ('Jane task 1', 2);
INSERT INTO "tasks" (name, owner) VALUES ('Jane task 2', 2);
INSERT INTO "tasks" (name, owner) VALUES ('Jane task 3', 2);

INSERT INTO "tags" (name) VALUES ('home');
INSERT INTO "tags" (name) VALUES ('work');
INSERT INTO "tags" (name) VALUES ('lesure');
INSERT INTO "tags" (name) VALUES ('training');

INSERT INTO "task_has_tag" (task_id, tag_id) VALUES (1, 1);
INSERT INTO "task_has_tag" (task_id, tag_id) VALUES (1, 3);
INSERT INTO "task_has_tag" (task_id, tag_id) VALUES (2, 2);
INSERT INTO "task_has_tag" (task_id, tag_id) VALUES (3, 2);
INSERT INTO "task_has_tag" (task_id, tag_id) VALUES (3, 4);

INSERT INTO "task_has_tag" (task_id, tag_id) VALUES (4, 1);
INSERT INTO "task_has_tag" (task_id, tag_id) VALUES (5, 3);
INSERT INTO "task_has_tag" (task_id, tag_id) VALUES (5, 2);
INSERT INTO "task_has_tag" (task_id, tag_id) VALUES (6, 2);
INSERT INTO "task_has_tag" (task_id, tag_id) VALUES (6, 4);

