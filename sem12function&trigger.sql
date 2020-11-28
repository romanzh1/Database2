SELECT * FROM client
SELECT * From menu
SELECT * FROM order_
SELECT * From order_menu

--функция которая иищет по фамилии id клиента
Create OR REPLACE FUNCTION get_client_id (name varchar ) RETURNS INT
AS $$
—объявление переменных
DECLARE
client_id int;
— исполняемая секция
BEGIN
SELECT client.id INTO client_id
FROM client
WHERE client.name = get_client_id.name;
RETURN client_id;
END;

$$ LANGUAGE plpgsql;

--ОБЪЯВЛЕНИЕ ПЕРЕМЕННОЙ ТОЛЬКО В DECLARE
SELECT get_client_id('Oleg');

-----------
Create OR REPLACE FUNCTION get_client_id (name varchar ) RETURNS INT
AS $$
—объявление переменных
DECLARE
client_id int;
— исполняемая секция
BEGIN
SELECT client.id INTO STRICT client_id
FROM client
WHERE client.name = get_client_id.name
LIMIT 1;
RETURN client_id;
— исключения
EXCEPTION
WHEN NO_DATA_FOUND THEN
RAISE EXCEPTION 'client % not found ', name;
WHEN TOO_MANY_ROWS THEN
RAISE EXCEPTION 'client % not unique', name;
END;

$$ LANGUAGE plpgsql;

SELECT get_client_id('oooOleg');

-----------------------
Create OR REPLACE FUNCTION get_client_id (name varchar ) RETURNS INT
AS $$
—объявление переменных
DECLARE
— похоже на объект, который содержит все атрибуты таблицы client, то есть имеет тип как объект, а не как определенный тип int varchar
T_CLIENT CLIENT%rowtype;
— t client.idTYPE; — еще вариант объявления типа
— исполняемая секция
BEGIN
SELECT client.id INTO STRICT client_id
FROM client
WHERE client.name = get_client_id.name
LIMIT 1;
RETURN client_id;
— исключения
EXCEPTION
WHEN NO_DATA_FOUND THEN
RAISE EXCEPTION 'client % not found ', name;
WHEN TOO_MANY_ROWS THEN
RAISE EXCEPTION 'client % not unique', name;
END;

$$ LANGUAGE plpgsql;

select get_ckient_info(3);
-----------------------
Create OR REPLACE FUNCTION get_client_info_in_query (id int) returns setof client
AS $$

BEGIN
RETURN QUERY
SELECT *
FROM client
WHERE client.id = get_client_info_in_query.id;

END;

$$ LANGUAGE plpgsql;
select * from get_client_info_in_query(1);

CREATE TABLE menu_audit (
operation varchar(1) NOT NULL,
tg_created_at TIMESTAMP DEFAULT now() NOT NULL,
menu_id INTEGER NOT NULL,
NAME varchar(255) NOT NULL,
pricw numeric(8,2) NOT NULL,
description varchar (3000),
weight INTEGER NOT NULL,
created_at TIMESTAMP NOT NULL,
update_at TIMESTAMP NOT NULL
);
drop table menu_audit

CREATE OR REPLACE FUNCTION menu_audit_tg() RETURNS TRIGGER AS $$
BEGIN
IF (TG_OP = 'INSERT') THEN
RAISE NOTICE 'RUN INSERT';
INSERT INTO menu_audit SELECT 'I', now(), NEW.*;
ELSIF (TG_OP = 'UPDATE') THEN
RAISE NOTICE 'RUN UPDATE';
INSERT INTO menu_audit SELECT 'U', now(), NEW.*;
ELSIF (TG_OP = 'DELETE') THEN
RAISE NOTICE 'RUN DELETE';
INSERT INTO menu_audit SELECT 'D', now(), OLD.*;
END IF;
RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER menu_audit
AFTER
INSERT OR UPDATE OR DELETE
ON menu
FOR EACH ROW
EXECUTE FUNCTION menu_audit_tg();

SELECT * FROM menu
SELECT * FROM menu_audit

INSERT INTO menu (name, price, description, weight)
VALUES ('COFFE,', 2, null, 300)

UPDATE MENU
SET description = 'kofee'
where id = 5;

delete from MENU
where id = 5;

UPDATE menu
SET description = 'класека'
where id= 1;