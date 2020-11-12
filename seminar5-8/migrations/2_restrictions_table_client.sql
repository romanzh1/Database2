Begin;

Create unique index email_unique_idx On client(email);
Alter table _client Alter column email Set not null;
Alter table _client Alter column password Set not null;

Commit;