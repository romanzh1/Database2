Create table menu(
	id serial Primary key,
	name varchar(255) Not NULL,
	price money Not NULL,
	description varchar(3000),
	weight integer Not NULL,
	created_at timestamp Not NULL Default now(),
	updated_at timestamp Not NULL Default now()
)
Insert into menu(name, price, weight) Values
('Пицца пепперони', 15, 700),
('Салат', 10, 3000),
('Шаурма', 2, 200);

Create table _client(
	id serial Primary key,
	name varchar(255) Not NULL,
	address varchar(1000) Not NULL,
	phone varchar(11) Not NULL
)
Insert into _client(name, address, phone) Values
('Иван', 'Боголюбова, 21, кв 14','88005553535'),
('Николай', 'Университетская, 2, кв 11','83004441122'),
('Вера', 'Пушкина, 4, кв 27','89153002222')

Create table order_(
	id serial Primary key,
	client_id integer Not NULL References _client(id)
)
Insert into order_(client_id) Values
(1),(1),(1),(2);

Create table order_menu(
	order_id integer Not NULL References order_(id),
	menu_id integer Not NULL References menu(id),
	count integer Not NULL,
	price money Not null,
	Primary key(order_id, menu_id)
)
Insert into order_menu(order_id, menu_id, count, price) Values
(5, 1, 1, 15),
(6, 2, 1, 10),
(6, 1, 2, 30),
(7, 3, 6, 12),
(8, 1, 2, 30)