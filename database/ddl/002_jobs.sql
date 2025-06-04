-- Script to add new columns into Jobs table
alter table jobs add column manager text not null;
alter table jobs add column company_name text not null;
alter table jobs add column company_phone text not null;
alter table jobs add column billing_address text not null;
alter table jobs add column working_address text not null;
alter table jobs add column main_contact_name text not null;
alter table jobs add column main_contact_number text not null;
alter table jobs add column job_desc text not null;
alter table jobs add column any_material_yn text not null;
alter table jobs add column start_date timestamp not null;
alter table jobs add column end_date timestamp not null;
alter table jobs add column quoted_or_tm text not null;

create table employee_job (
  id SERIAL NOT NULL PRIMARY KEY,
  employee_id integer,
  job_description integer,

  created_at timestamp without time zone,
  updated_at timestamp without time zone
);
