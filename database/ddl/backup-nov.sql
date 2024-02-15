CREATE DATABASE jspowerdev WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';

-- Table: users

-- DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users
(
    id SERIAL NOT NULL PRIMARY KEY,
    email text ,
    password_digest text  ,
    first_name text  ,
    last_name text  ,
    phone_number text  ,
    token text  ,
    role text  ,
    address text  ,
    profile_img text  ,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

-- Table: reference_codes

-- DROP TABLE IF EXISTS reference_codes;

CREATE TABLE IF NOT EXISTS reference_codes
(
    id SERIAL NOT NULL PRIMARY KEY,
    name text,
    code text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    CONSTRAINT unique_name UNIQUE (name)
);


-- Table: reference_code_values

-- DROP TABLE IF EXISTS reference_code_values;

CREATE TABLE IF NOT EXISTS reference_code_values
(
    id SERIAL NOT NULL PRIMARY KEY,
    reference_code_id integer NOT NULL,
    value text,
    code text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    CONSTRAINT unique_reference_code_and_value UNIQUE (reference_code_id, value, code),
    CONSTRAINT reference_code_values_reference_code_id_fkey FOREIGN KEY (reference_code_id)
        REFERENCES reference_codes (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

-- Table: jobs

-- DROP TABLE IF EXISTS jobs;

CREATE TABLE IF NOT EXISTS jobs
(
    id SERIAL NOT NULL PRIMARY KEY,
    job_number text,
    job_name text,
    percentage text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);

-- Table: circuit_directory

-- DROP TABLE IF EXISTS circuit_directory;

CREATE TABLE IF NOT EXISTS circuit_directory
(
    id SERIAL NOT NULL PRIMARY KEY,
    circuit_type_rc integer,
    entry_date date,
    voltage text,
    user_id integer,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    CONSTRAINT circuit_directory_circuit_type_rc_fkey FOREIGN KEY (circuit_type_rc)
        REFERENCES reference_code_values (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

-- Table: circuit_directory_details

-- DROP TABLE IF EXISTS circuit_directory_details;

CREATE TABLE IF NOT EXISTS circuit_directory_details
(
    id SERIAL NOT NULL PRIMARY KEY,
    circuit_directory_id integer,
    ckt integer,
    load text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    CONSTRAINT circuit_directory_details_circuit_directory_id_fkey FOREIGN KEY (circuit_directory_id)
        REFERENCES circuit_directory (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

-- Table: customers

-- DROP TABLE IF EXISTS customers;

CREATE TABLE IF NOT EXISTS customers
(
    id SERIAL NOT NULL PRIMARY KEY,
    name text,
    address text,
    phone_number text,
    email text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);

-- Table: material_requisition

-- DROP TABLE IF EXISTS material_requisition;

CREATE TABLE IF NOT EXISTS material_requisition
(
    id SERIAL NOT NULL PRIMARY KEY,
    job_name text NOT NULL,
    job_location text NOT NULL,
    entry_date date NOT NULL,
    need_by date NOT NULL,
    description text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    deleted_at timestamp without time zone,
    requested_by integer,
    status text
);


-- Table: material_requisition_details

-- DROP TABLE IF EXISTS material_requisition_details;

CREATE TABLE IF NOT EXISTS material_requisition_details
(
    id SERIAL NOT NULL PRIMARY KEY,
    material_requisition_id integer,
    quantity text,
    size text,
    part_number text,
    item_description text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    deleted_at timestamp without time zone,
    CONSTRAINT material_requisition_details_material_requisition_id_fkey FOREIGN KEY (material_requisition_id)
        REFERENCES material_requisition (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

-- Table: safety_sheet_signatures

-- DROP TABLE IF EXISTS safety_sheet_signatures;

CREATE TABLE IF NOT EXISTS safety_sheet_signatures
(
    id SERIAL NOT NULL PRIMARY KEY,
    safety_sheet_id integer,
    user_id integer,
    esignature text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    user_name text COLLATE pg_catalog."default",
    CONSTRAINT safety_sheet_signatures_fk2 FOREIGN KEY (user_id)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

-- Table: safety_sheets

-- DROP TABLE IF EXISTS safety_sheets;

CREATE TABLE IF NOT EXISTS safety_sheets
(
    id SERIAL NOT NULL PRIMARY KEY,
    user_id integer,
    job_location text,
    entry_date date,
    start_time text,
    end_time text,
    safety_suggestions text,
    safety_violations text,
    safety_sheet_type_rc integer,
    safety_sheet_type text,
    supervisor_signature text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    CONSTRAINT safety_sheets_fk1 FOREIGN KEY (user_id)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

-- Table: time_entry

-- DROP TABLE IF EXISTS time_entry;

CREATE TABLE IF NOT EXISTS time_entry
(
    id SERIAL NOT NULL PRIMARY KEY,
    user_id integer,
    entry_date date NOT NULL,
    lunch_in text ,
    lunch_out text ,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    lunch_in_gps text ,
    lunch_out_gps text ,
    lunch_in_lat numeric,
    lunch_out_lng numeric,
    status text ,
    lunch_in_lng numeric,
    lunch_out_lat numeric,
    deleted_at timestamp with time zone,
    CONSTRAINT time_entry_fk1 FOREIGN KEY (user_id)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

-- Table: time_cards

-- DROP TABLE IF EXISTS time_cards;

CREATE TABLE IF NOT EXISTS time_cards
(
    id SERIAL NOT NULL PRIMARY KEY,
    entry_date date,
    job_name text,
    job_description text,
    other text,
    clock_in_gps text,
    clock_out_gps text,
    clock_in_lat numeric,
    clock_in_lng numeric,
    clock_out_lat numeric,
    clock_out_lng numeric,
    all_week_ind boolean,
    clock_in text COLLATE pg_catalog."default",
    clock_out text COLLATE pg_catalog."default",
    time_entry_id integer NOT NULL,
    status text COLLATE pg_catalog."default",
    esignature text COLLATE pg_catalog."default",
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    deleted_at timestamp with time zone,
    CONSTRAINT time_entry_fk1 FOREIGN KEY (time_entry_id)
        REFERENCES time_entry (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);


-- Table: time_card_locations

-- DROP TABLE IF EXISTS time_card_locations;

CREATE TABLE IF NOT EXISTS time_card_locations
(
    id SERIAL NOT NULL PRIMARY KEY,
    time_card_id integer NOT NULL,
    job_location_rc integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    CONSTRAINT unique_time_card_id_and_ref UNIQUE (time_card_id, job_location_rc),
    CONSTRAINT time_card_locations_time_card_id_fkey FOREIGN KEY (time_card_id)
        REFERENCES time_cards (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

COPY public.reference_code_values (id, reference_code_id, value, code, ) FROM stdin;
1	1	Ceres	CERES	\N
3	1	Modesto	MODESTO	\N
4	1	Lodi Bowling	LODI_BOWLING	\N
5	1	Sensient Livingston	SENSIENT_LIVINGSTON	\N
6	1	Sensient Turlock	SENSIENT_TURLOCK	\N
7	1	PepsiCo	PEPSICO	\N
2	1	Frito Lay	FRITO_LAY	\N
8	2	Service Call	SERVICE_CALL	\N
10	2	Extra	EXTRA	\N
9	2	Work Order	WORK_ORDER	\N

insert into reference_codes (name,code,created_at) 
values ('Job Locations','JOB_LOCATIONS',CURRENT_DATE);
insert into reference_codes (name,code,created_at) 
values ('Type of Work','WORK_TYPES',CURRENT_DATE);
insert into reference_codes (name,code,created_at) 
values ('Circuit Directory Types','CIRCUIT_DIRECTORY_TYPES',CURRENT_DATE);

INSERT INTO reference_code_values(reference_code_id,value,code,created_at) 
VALUES (1, 'Ceres', 'CERES', CURRENT_DATE);
INSERT INTO reference_code_values(reference_code_id,value,code,created_at) 
VALUES (1, 'Modesto', 'MODESTO', CURRENT_DATE);
INSERT INTO reference_code_values(reference_code_id,value,code,created_at) 
VALUES (1, 'Lodi Bowling', 'LODI_BOWLING', CURRENT_DATE);
INSERT INTO reference_code_values(reference_code_id,value,code,created_at) 
VALUES (1, 'Sensient Livingston', 'SENSIENT_LIVINGSTON', CURRENT_DATE);
INSERT INTO reference_code_values(reference_code_id,value,code,created_at) 
VALUES (1, 'Sensient Turlock', 'SENSIENT_TURLOCK', CURRENT_DATE);
INSERT INTO reference_code_values(reference_code_id,value,code,created_at) 
VALUES (1, 'PepsiCo', 'PEPSICO', CURRENT_DATE);
INSERT INTO reference_code_values(reference_code_id,value,code,created_at) 
VALUES (1, 'Frito Lay', 'FRITO_LAY', CURRENT_DATE);
INSERT INTO reference_code_values(reference_code_id,value,code,created_at) 
VALUES (2, 'Service Call', 'SERVICE_CALL',CURRENT_DATE);
INSERT INTO reference_code_values(reference_code_id,value,code,created_at) 
VALUES (2, 'Extra', 'EXTRA',CURRENT_DATE);
INSERT INTO reference_code_values(reference_code_id,value,code,created_at) 
VALUES (2, 'Work Order', 'WORK_ORDER',CURRENT_DATE);

insert into reference_code_values (reference_code_id,value,code,created_at) 
values (3,'Home','HOME',CURRENT_DATE);
insert into reference_code_values (reference_code_id,value,code,created_at) 
values (3,'Business 208V','BUSINESS_208V',CURRENT_DATE);
insert into reference_code_values (reference_code_id,value,code,created_at) 
values (3,'Business 480V','BUSINESS_480V',CURRENT_DATE);






create table motor_cheat_sheet_480v (
	id			SERIAL NOT NULL PRIMARY KEY,
	motor_hp	text,
	nema_amp	numeric,
	starter_size numeric,
	overload	text,
	mcp_type	integer,
	conduit_size	text,
	awg			text,
	awg_gnd		text,
	created_at		timestamp with time zone,
	updated_at		timestamp with time zone,
	deleted_at		timestamp with time zone
	

);