DROP USER Quip CASCADE;
CREATE USER Quip
IDENTIFIED BY p4ssw0rd
DEFAULT TABLESPACE users
TEMPORARY TABLESPACE temp
QUOTA 10M ON users;
GRANT connect to Quip;
GRANT resource to Quip;
GRANT create session TO Quip;
GRANT create table TO Quip;
GRANT create view TO Quip;

conn Quip/p4ssw0rd
