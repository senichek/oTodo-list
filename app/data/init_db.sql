DROP TABLE IF EXISTS "task_has_tag_todo";
DROP TABLE IF EXISTS "tasks_todo";
DROP TABLE IF EXISTS "tags_todo";
DROP TABLE IF EXISTS "users_todo";
DROP TABLE IF EXISTS "positions_todo";

CREATE TABLE "users_todo" (
    id SERIAL UNIQUE,
    email TEXT UNIQUE,
    password TEXT,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP
);

CREATE TABLE "tasks_todo" (
    id SERIAL UNIQUE,
    name TEXT,
    owner INTEGER REFERENCES "users_todo"(id),
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP
);

CREATE TABLE "tags_todo" (
    id SERIAL UNIQUE,
    name TEXT,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP
);

CREATE TABLE "task_has_tag_todo" (
    id SERIAL,
    task_id INTEGER REFERENCES tasks_todo(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags_todo(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP
);

CREATE TABLE "positions_todo" (
    id SERIAL UNIQUE,
    owner INTEGER,
    positions TEXT,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP
);

/* Raw password is: pass111 */
INSERT INTO "users_todo" (email, password) VALUES ('john@gmail.com', '$2a$10$x/jcYF51hxunlk5mObFAZ.Ojz7N75pC2Gxv2YeZ8dk9JjvIZ5607a');
INSERT INTO "users_todo" (email, password) VALUES ('jane@gmail.com', '$2a$10$x/jcYF51hxunlk5mObFAZ.Ojz7N75pC2Gxv2YeZ8dk9JjvIZ5607a');

INSERT INTO "tasks_todo" (name, owner) VALUES ('John task 1', 1);
INSERT INTO "tasks_todo" (name, owner) VALUES ('John task 2', 1);
INSERT INTO "tasks_todo" (name, owner) VALUES ('John task 3', 1);

INSERT INTO "tasks_todo" (name, owner) VALUES ('Jane task 1', 2);
INSERT INTO "tasks_todo" (name, owner) VALUES ('Jane task 2', 2);
INSERT INTO "tasks_todo" (name, owner) VALUES ('Jane task 3', 2);

INSERT INTO "tags_todo" (name) VALUES ('home');
INSERT INTO "tags_todo" (name) VALUES ('work');
INSERT INTO "tags_todo" (name) VALUES ('lesure');
INSERT INTO "tags_todo" (name) VALUES ('training');

INSERT INTO "task_has_tag_todo" (task_id, tag_id) VALUES (1, 1);
INSERT INTO "task_has_tag_todo" (task_id, tag_id) VALUES (1, 3);
INSERT INTO "task_has_tag_todo" (task_id, tag_id) VALUES (2, 2);
INSERT INTO "task_has_tag_todo" (task_id, tag_id) VALUES (3, 2);
INSERT INTO "task_has_tag_todo" (task_id, tag_id) VALUES (3, 4);

INSERT INTO "task_has_tag_todo" (task_id, tag_id) VALUES (4, 1);
INSERT INTO "task_has_tag_todo" (task_id, tag_id) VALUES (5, 3);
INSERT INTO "task_has_tag_todo" (task_id, tag_id) VALUES (5, 2);
INSERT INTO "task_has_tag_todo" (task_id, tag_id) VALUES (6, 2);
INSERT INTO "task_has_tag_todo" (task_id, tag_id) VALUES (6, 4);

INSERT INTO "positions_todo" (owner, positions) VALUES (1, '1|2|3');
INSERT INTO "positions_todo" (owner, positions) VALUES (2, '1|2|3');

