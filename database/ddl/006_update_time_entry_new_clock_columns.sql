-- Script to update Clock In and Clock Out data on Time Entry table from Time Card table
do
$do$
declare
	i RECORD;
begin
	for i in
		select tc.clock_in
		 	 , tc.clock_in_gps
		     , tc.clock_in_lat
		     , tc.clock_in_lng
		     , tc.clock_out
		     , tc.clock_out_gps
		     , tc.clock_out_lat
		     , tc.clock_out_lng
		     , tc.time_entry_id
		  from time_cards tc
		  join time_entry te on te.id = tc.time_entry_id
		 where tc.status in ('NEW', 'CLOCK_IN')

	 loop
		update  time_entry
		set clock_in = i.clock_in,
		    clock_in_gps = i.clock_in_gps,
			clock_in_lat = i.clock_in_lat,
			clock_in_lng = i.clock_in_lng,
			clock_out = i.clock_out,
		    clock_out_gps = i.clock_out_gps,
			clock_out_lat = i.clock_out_lat,
			clock_out_lng = i.clock_out_lng
		where id = i.time_entry_id;

	end loop;
end;

$do$
