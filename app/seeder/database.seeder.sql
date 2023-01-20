create table if not exists public.users 
(
	id serial PRIMARY KEY not null,
     username varchar(255),
	 password VARCHAR(255),
 	 created_at TIMESTAMP
);

alter table public.users
    owner to postgres;

create table if not exists public.urls
(
	id serial PRIMARY KEY not null,
	user_id integer,
	created_at TIMESTAMP,
	threshold integer,
	failed_times integer,
	address varchar(255),
	
	CONSTRAINT FK_Users FOREIGN KEY (user_id)
    REFERENCES users(id)
);

alter table public.urls
    owner to postgres;


create table if not exists public.requests 
(
	id serial PRIMARY KEY not null,
	url_id integer,
	created_at TIMESTAMP,
	threshold integer,
	result integer,
	
	CONSTRAINT FK_Urls FOREIGN KEY (url_id)
    REFERENCES urls(id)
);

alter table public.requests
    owner to postgres;



