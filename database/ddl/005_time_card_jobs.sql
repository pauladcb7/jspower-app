create table time_card_jobs (
  id SERIAL NOT NULL PRIMARY KEY,
  time_card_id integer,
  job_id integer,
  created_at timestamp without time zone,
  updated_at timestamp without time zone
);
