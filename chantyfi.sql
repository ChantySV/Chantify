drop database if exists chantify2;
create database if not exists chantify2;
use chantify2;

create table data_user(
ID_user int not null primary key,
name_user varchar (20) not null,
last_name varchar (20) not null,
mail varchar (30) not null unique,
user_pass varchar(60) not null
);

create table artist(
ID_artist int primary key default 0,
nickname varchar(30) not null unique,

ID_user int unique,
FOREIGN KEY (ID_user) REFERENCES data_user(ID_user)
);

create table album(
ID_album int primary key,
name_album varchar(40) not null,
realese date not null,
tipe set('Sencillo', 'Album') not null,

ID_artist int,
FOREIGN KEY (ID_artist) REFERENCES artist(ID_artist)
);

create table info_song(
ID_song int primary key,
name_song varchar(30) not null,
lyrics varchar(30) not null,
melody varchar(30) not null,
gender varchar(20) not null,
URL varchar(100) not null,

ID_album int not null,
FOREIGN KEY (ID_album) REFERENCES album(ID_album)
);


create table playlist (
ID_playlist int primary key ,
name_playlist varchar(20) not null,

ID_user int not null,
FOREIGN KEY (ID_user) REFERENCES data_user(ID_user)
);


create table detail_playlist(
ID_playlist int not null,
FOREIGN KEY (ID_playlist) REFERENCES playlist(ID_playlist),

ID_song int not null,
FOREIGN KEY (ID_song) REFERENCES info_song(ID_song)
);

/* INFO_SONG */
drop procedure if exists pinfo_song;
delimiter //
create procedure pinfo_song(
	in pID_song int,
    in pname_song varchar(30),
    in plyrics varchar(40),
	in pmelody varchar(30),
    in pgender varchar(30),
    in prealese_song date,    
	in pURL varchar(100),
    in pID_album int
)
begin
declare codigo int default 0;
if pID_song = 0 then
	set codigo=(select ifnull(max(ID_song),0)+1 from info_song);
    insert into info_song(ID_song, name_song,lyrics, melody, gender, realese_song, URL, ID_album)
	values(codigo, pname_song, plyrics, pmelody, pgender, curdate(), pURL, pID_album);
else
	update info_song set name_song = pname_song, lyrics = plyrics, melody = pmelody, gender = pgender, 
    realese_song = prealese_song, URL = pURL, ID_album = pID_album
    where ID_song = pID_song;
end if;
end //

/* ALBUM */
drop procedure if exists palbum;
delimiter //
create procedure palbum(
	in pID_album int,
    in pname_album varchar(40),	
    in ptipe set('Sencillo', 'Album'),
    in pID_artist int
)
begin
declare codigo int default 0;
if pID_album = 0 then
	set codigo=(select ifnull(max(ID_album),0)+1 from album);
    insert into album(ID_album, name_album, realese, tipe, ID_artist)
	values(codigo, pname_album, curdate(), ptipe, pID_artist);
else
	update album set name_album = pname_album, realese = prealese, ID_artist = pID_artist
    where ID_album = pID_album;
end if;
end //
delimiter ;