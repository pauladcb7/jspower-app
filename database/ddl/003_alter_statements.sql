-- Time Cards
alter table time_cards add column start_time text;
alter table time_cards add column end_time text;
alter table time_cards add column service_call_ind text;
alter table time_cards add column work_order_id numeric;

-- Time Entry
alter table time_entry add column clock_in text;
alter table time_entry add column clock_out text;
alter table time_entry add column clock_in_gps text;
alter table time_entry add column clock_out_gps text;
alter table time_entry add column clock_in_lat numeric;
alter table time_entry add column clock_out_lat numeric;
alter table time_entry add column clock_in_lng numeric;
alter table time_entry add column clock_out_lng numeric;
