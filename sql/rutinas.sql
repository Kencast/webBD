create or replace function upPath(id varchar) return varchar as
    camino varchar(1000):='';
    padre varchar(20);
    nom varchar(100);
    idd varchar(20);
    begin
        idd:=id;
        loop
            if idd='5T6MX' then
                exit;
            end if;
            select taxon.nombre, taxon.padre into nom, padre from taxon where taxon.id=idd;
            camino:= '/'||nom||camino;
            idd:=padre;
        end loop;
        return camino;
    end upPath;


select taxon.id, taxon.nombre, SYS_CONNECT_BY_PATH(taxon.nombre,'/') "p"
from taxon
connect by prior taxon.id = taxon.padre
start with id='N';

create or replace function login(corr varchar, contr varchar) return int as
    res number;
    begin
        select usuario.id into res from usuario where usuario.correo=corr and usuario.contra=contr;
        return res;
    exception
        when no_data_found then return -1;
        when others then return -2;
    end login;

create or replace procedure registro(nam varchar, adress varchar, email varchar, pass varchar, country varchar, firs varchar, res out int) is
    cant int;
    begin
        select count(*) into cant from usuario where usuario.correo = email;
        if cant < 1 then
            insert into usuario(nombre,correo,contra,pais,direccion,apellido) values(nam,email,pass,country,adress,firs);
            select id into res from usuario where correo = email;
        else res := -1;
        end if;
    exception
        when others then res:=-2;
    end registro;

declare
res int;
begin
registro('juen','por alla','@gmail.com','kol','argelia','perez',res);
dbms_output.put_line(res);
end;

create or replace function validarInsUsu(email varchar) return int as
    res int;
    begin
        select id into res from usuario where correo = email;
        return res;
    exception
    when no_data_found then return 0;
    when others then return -1;
    end validarInsUsu;

create or replace procedure insertarImaObs(dat varchar,owne varchar, way varchar, licence varchar,
    user int, coment varchar, lat real, lon real, taxo varchar) is
    ima int;
    begin
        insert into imagen(fecha,licencia,ruta,duenov) values(to_date(dat,'DD-MM-YYYY'),licence,way,owne);
        select id into ima from imagen where ruta = way;
        insert into observacion(imagen_id, usuario_id, taxon_id, comentario, longitud, latitud, fecha) values(ima,user,
            taxo,coment,lon,lat,sysdate);
    end insertarImaObs;

create or replace procedure insertarIde(obs int,user int, tax varchar) as
    begin
        insert into identificacion(observacion_id,usuario_id,taxon_id,fecha) values(obs,user,tax,sysdate);
    end insertarIde;