create table receipts (
	id SERIAL NOT NULL PRIMARY KEY,
	job_id integer,
	work_order_id integer,
	receipt_file text not null,
	comments text null,
	created_at timestamp with time zone,
    updated_at timestamp with time zone,
	deleted_at timestamp with time zone,
	CONSTRAINT receipts_fk1 FOREIGN KEY (id)
		REFERENCES jobs (id) MATCH SIMPLE
		ON UPDATE NO ACTION
		ON DELETE NO ACTION,
	CONSTRAINT receipts_fk2 FOREIGN KEY (id)
		REFERENCES work_orders (id) MATCH SIMPLE
		ON UPDATE NO ACTION
		ON DELETE NO ACTION
);
