create schema sky;

alter schema sky owner to postgres;

set schema 'sky';

create table "SpaceType"
(
    "Id" serial not null
        constraint spacetype_pk
            primary key,
    "Name" varchar not null,
    "Description" text
);

alter table "SpaceType" owner to postgres;

create unique index spacetype_id_uindex
    on "SpaceType" ("Id");

create table "Space"
(
    "Id" serial not null
        constraint space_pk
            primary key,
    "Name" varchar not null,
    "Description" text,
    "Type_fk" integer not null
        constraint space_spacetype_id_fk
            references "SpaceType"
);

alter table "Space" owner to postgres;

create unique index space_id_uindex
    on "Space" ("Id");

create table "AccidentType"
(
    "Id" serial not null
        constraint accidenttype_pk
            primary key,
    "Name" varchar not null,
    "Description" text
);

alter table "AccidentType" owner to postgres;

create unique index accidenttype_id_uindex
    on "AccidentType" ("Id");

create table "Units"
(
    "Id" serial not null
        constraint units_pk
            primary key,
    "Name" varchar not null,
    "Description" text
);

alter table "Units" owner to postgres;

create unique index units_id_uindex
    on "Units" ("Id");

create table "Objects"
(
    "Id" serial not null
        constraint objects_pk
            primary key,
    "Name" varchar not null,
    "Description" text,
    "Space_fk" integer
        constraint objects_space_id_fk
            references "Space",
    "State_fk" integer
);

alter table "Objects" owner to postgres;

create table "States"
(
    "Id" serial not null
        constraint states_pk
            primary key,
    "Name" varchar not null,
    "Description" integer,
    "Value" double precision,
    "TimeChanged" timestamp,
    "Objects_fk" integer
        constraint states_objects_id_fk
            references "Objects"
);

alter table "States" owner to postgres;

create unique index states_id_uindex
    on "States" ("Id");

create table "Variable"
(
    "Id" serial not null
        constraint variable_pk
            primary key,
    "Name" varchar not null,
    "Value" real not null,
    "Description" text,
    "Unit_fk" integer
        constraint variable_units_id_fk
            references "Units",
    "Objects_fk" integer
        constraint variable_objects_id_fk
            references "Objects"
);

alter table "Variable" owner to postgres;

create unique index variable_id_uindex
    on "Variable" ("Id");

create unique index objects_id_uindex
    on "Objects" ("Id");

create table "Object_Has_Object"
(
    "Id" serial not null
        constraint object_has_object_pk
            primary key,
    "Parent" integer not null
        constraint "Parent_id_fk"
            references "Objects",
    "Child" integer not null
        constraint "Child_id_fk"
            references "Objects"
);

alter table "Object_Has_Object" owner to postgres;

create unique index object_has_object_id_uindex
    on "Object_Has_Object" ("Id");

create table "Accident"
(
    "Id" serial not null,
    "Objects_fk" integer
        constraint accident_objects_id_fk
            references "Objects",
    "Data" integer,
    "Timestamp" timestamp not null,
    "AccidentType_fk" integer
        constraint accident_accidenttype_id_fk
            references "AccidentType"
);

alter table "Accident" owner to postgres;

create unique index accident_id_uindex
    on "Accident" ("Id");

alter table "Accident"
    add constraint accident_pk
    primary key ("Id");

create table "VariableValue"
(
    "Id" serial not null
        constraint variablevalue_pk
            primary key,
    "Variable_fk" integer
        constraint variablevalue_variable_id_fk
            references "Variable",
    "Value" real not null,
    "Timestamp" timestamp not null
);

alter table "VariableValue" owner to postgres;

create unique index variablevalue_id_uindex
    on "VariableValue" ("Id");


create table "gateway_pass_event"
(
    "id" serial not null,
    "ext_id" integer,
    "is_passed" boolean,
    "gateway_id" integer,
    "is_in_direction" boolean,
    "s_persone_id" varchar,
    "s_card_id" varchar,
    "timestamp" integer not null
);

alter table "gateway_pass_event" owner to postgres;

create unique index gateway_pass_event_id_uindex
    on "gateway_pass_event" ("id");

alter table "gateway_pass_event"
    add constraint gateway_pass_event_pk
    primary key ("id");
