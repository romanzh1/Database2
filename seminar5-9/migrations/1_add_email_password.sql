Begin;

Alter table _client
Add column email varchar(255);

Alter table _client
Add column password varchar(255);

Commit;