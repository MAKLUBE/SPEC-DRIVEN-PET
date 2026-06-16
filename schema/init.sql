create table users (
id bigserial primary key,
tg_id text unique,
name text,
created_at timestamp default now()
);

create table relatives (
id bigserial primary key,
user_id bigint not null references users(id) on delete cascade,
name text not null,
relation text not null,
reminder_interval_days int not null default 14,
last_contact_at date,
created_at timestamp default now()
);

create table reminders (
id bigserial primary key,
relative_id bigint not null references relatives(id) on delete cascade,
remind_at timestamp not null,
status text not null default 'pending',
created_at timestamp default now()
);

create table interactions (
id bigserial primary key,
relative_id bigint not null references relatives(id) on delete cascade,
interaction_type text not null,
interaction_at timestamp not null default now(),
note text,
created_at timestamp default now()
);
