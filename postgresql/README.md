# PostgreSQL

## PostgreSQL Tutorials
- [PostgreSQL Tutorial](https://www.tutorialspoint.com/postgresql/index.htm)

## Project Details
- PostgreSQL
- C++

## To Install
- https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
   
## To Open Database 
1. Go to `Applications/PostgreSQL 15/`
2. Run pgAdmin (GUI)
    OR
   Run SQL Shell (command line)
    ```
    /Library/PostgreSQL/15/scripts/runpsql.sh; exit
    Server [localhost]: 
    Database [postgres]: 
    Port [5432]: 
    Username [postgres]: 
    Password for user postgres: 
    psql (15.1)
    Type "help" for help.
    ```

## To Run Files
- `g++ -I/usr/local/include filename.cpp -lpqxx -lpq`

---

## Example PostgreSQL Commands
- `CREATE DATABASE testdb;`
  ```
  CREATE DATABASE
  ```

- `\l`
  ```
                                                List of databases
    Name    |  Owner   | Encoding | Collate | Ctype | ICU Locale | Locale Provider |   Access privileges   
    -----------+----------+----------+---------+-------+------------+-----------------+-----------------------
    postgres  | postgres | UTF8     | C       | C     |            | libc            | 
    template0 | postgres | UTF8     | C       | C     |            | libc            | =c/postgres          +
            |          |          |         |       |            |                 | postgres=CTc/postgres
    template1 | postgres | UTF8     | C       | C     |            | libc            | =c/postgres          +
            |          |          |         |       |            |                 | postgres=CTc/postgres
    testdb    | postgres | UTF8     | C       | C     |            | libc            | 
    (4 rows)
  ```

- `\c testdb;`
  ```
  You are now connected to database "testdb" as user "postgres".
  ```

- `CREATE TABLE COMPANY(
    ID INT PRIMARY KEY NOT NULL,
    NAME TEXT NOT NULL,
    AGE INT NOT NULL,
    ADDRESS CHAR(50),
    SALARY REAL);`
  ```
  CREATE TABLE
  ```

- `testdb=# CREATE TABLE DEPARTMENT(
testdb(# ID INT PRIMARY KEY NOT NULL,
testdb(# DEPT CHAR(50) NOT NULL,
testdb(# EMP_ID INT NOT NULL);`
  ```
  CREATE TABLE
  ```

- `\d`
  ```
                List of relations
    Schema |    Name    | Type  |  Owner   
    --------+------------+-------+----------
    public | company    | table | postgres
    public | department | table | postgres
    (2 rows)
  ```

- `\d company`
  ```
                        Table "public.company"
    Column  |     Type      | Collation | Nullable | Default 
    ---------+---------------+-----------+----------+---------
    id      | integer       |           | not null | 
    name    | text          |           | not null | 
    age     | integer       |           | not null | 
    address | character(50) |           |          | 
    salary  | real          |           |          | 
    Indexes:
        "company_pkey" PRIMARY KEY, btree (id)
  ```

- `create schema myschema;`
  ```
  CREATE SCHEMA
  ```

- `create table myschema.company(
ID INT NOT NULL,
NAME VARCHAR(20) NOT NULL,
AGE INT NOT NULL,
ADDRESS CHAR(25),
SALARY DECIMAL (18, 2),
PRIMARY KEY (ID));
`
  ```
  CREATE TABLE
  ```

- `INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY) VALUES (1, 'Paul', 32, 'California', 20000.00);`
  ```
  INSERT 0 1
  ```

- `INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS) VALUES (2, 'Allen', 25, 'Texas');`
  ```
  INSERT 0 1
  ```

- `\d company`
  ```
                        Table "public.company"
    Column  |     Type      | Collation | Nullable | Default 
    ---------+---------------+-----------+----------+---------
    id      | integer       |           | not null | 
    name    | text          |           | not null | 
    age     | integer       |           | not null | 
    address | character(50) |           |          | 
    salary  | real          |           |          | 
    Indexes:
        "company_pkey" PRIMARY KEY, btree (id)
  ```

- `INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY) VALUES (4, 'Mark', 25, 'Rich-Mond ', 65000.00), (5, 'David', 27, 'Texas', 85000.00);`
  ```
  INSERT 0 2
  ```

- `SELECT * FROM COMPANY;`
  ```
    id | name  | age |                      address                       | salary 
    ----+-------+-----+----------------------------------------------------+--------
    1 | Paul  |  32 | California                                         |  20000
    2 | Allen |  25 | Texas                                              |       
    4 | Mark  |  25 | Rich-Mond                                          |  65000
    5 | David |  27 | Texas                                              |  85000
    (4 rows)
  ```

- `INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY) VALUES (3, 'Teddy', 23, 'Norway', 20000.00);`
  ```
  INSERT 0 1
  ```

- `SELECT * FROM company;`
  ```
    id | name  | age |                      address                       | salary 
    ----+-------+-----+----------------------------------------------------+--------
    1 | Paul  |  32 | California                                         |  20000
    2 | Allen |  25 | Texas                                              |       
    4 | Mark  |  25 | Rich-Mond                                          |  65000
    5 | David |  27 | Texas                                              |  85000
    3 | Teddy |  23 | Norway                                             |  20000
    (5 rows)
  ```

- `SELECT ID, NAME, SALARY FROM COMPANY;`
  ```
    id | name  | salary 
    ----+-------+--------
    1 | Paul  |  20000
    2 | Allen |       
    4 | Mark  |  65000
    5 | David |  85000
    3 | Teddy |  20000
    (5 rows)
  ```

- `SELECT (15 + 6) AS ADDITON;`
  ```
    additon 
    ---------
        21
    (1 row)
  ```

- `SELECT CURRENT_TIMESTAMP;`
  ```
            current_timestamp       
    -------------------------------
    2023-01-02 23:41:46.508716-05
    (1 row)
  ```

- `SELECT COUNT (*) AS "RECORDS" FROM COMPANY;`
  ```
    RECORDS 
    ---------
        5
    (1 row)
  ```

- `SELECT * FROM COMPANY WHERE AGE >= 25;`
  ```
    id | name  | age |                      address                       | salary 
    ----+-------+-----+----------------------------------------------------+--------
    1 | Paul  |  32 | California                                         |  20000
    2 | Allen |  25 | Texas                                              |       
    4 | Mark  |  25 | Rich-Mond                                          |  65000
    5 | David |  27 | Texas                                              |  85000
    (4 rows)
  ```

- `SELECT * FROM COMPANY WHERE AGE IS NOT NULL;`
  ```
    id | name  | age |                      address                       | salary 
    ----+-------+-----+----------------------------------------------------+--------
    1 | Paul  |  32 | California                                         |  20000
    2 | Allen |  25 | Texas                                              |       
    4 | Mark  |  25 | Rich-Mond                                          |  65000
    5 | David |  27 | Texas                                              |  85000
    3 | Teddy |  23 | Norway                                             |  20000
    (5 rows)
  ```

- `SELECT * FROM COMPANY WHERE NAME LIKE 'Pa%';`
  ```
    id | name | age |                      address                       | salary 
    ----+------+-----+----------------------------------------------------+--------
    1 | Paul |  32 | California                                         |  20000
    (1 row)
  ```

- `SELECT * FROM COMPANY WHERE AGE IN (25, 27);`
  ```
    id | name  | age |                      address                       | salary 
    ----+-------+-----+----------------------------------------------------+--------
    2 | Allen |  25 | Texas                                              |       
    4 | Mark  |  25 | Rich-Mond                                          |  65000
    5 | David |  27 | Texas                                              |  85000
    (3 rows)
  ```

- `SELECT * FROM COMPANY WHERE AGE NOT IN (25, 27);`
  ```
    id | name  | age |                      address                       | salary 
    ----+-------+-----+----------------------------------------------------+--------
    1 | Paul  |  32 | California                                         |  20000
    3 | Teddy |  23 | Norway                                             |  20000
    (2 rows)
  ```

- `SELECT * FROM COMPANY WHERE AGE BETWEEN 25 AND 27;`
  ```
    id | name  | age |                      address                       | salary 
    ----+-------+-----+----------------------------------------------------+--------
    2 | Allen |  25 | Texas                                              |       
    4 | Mark  |  25 | Rich-Mond                                          |  65000
    5 | David |  27 | Texas                                              |  85000
    (3 rows)
  ```

- `SELECT AGE FROM COMPANY WHERE EXISTS (SELECT AGE FROM COMPANY WHERE AGE BETWEEN 25 AND 27);`
  ```
    age 
    -----
    32
    25
    25
    27
    23
    (5 rows)
  ```

- `update company set salary = 15000 where id = 3;`
  ```
  UPDATE 1
  ```

- `select * from company;`
  ```
    id | name  | age |                      address                       | salary 
    ----+-------+-----+----------------------------------------------------+--------
    1 | Paul  |  32 | California                                         |  20000
    2 | Allen |  25 | Texas                                              |       
    4 | Mark  |  25 | Rich-Mond                                          |  65000
    5 | David |  27 | Texas                                              |  85000
    3 | Teddy |  23 | Norway                                             |  15000
    (5 rows)
  ```
