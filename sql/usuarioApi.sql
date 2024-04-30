create or replace procedure apiLogin(datos Clob) as
    correo varchar(100);
    contra varchar(20);
    nomb varchar(100);
    apel varchar(100);
    ps varchar(100);
    res number;
    dir varchar(500);
    obj JSON_OBJECT_T;
    begin
        SELECT json_value(datos, '$.correo'),
        json_value(datos, '$.contra')
        INTO correo, contra
        FROM dual;
        res:=login(correo, contra);
        obj:=JSON_OBJECT_T();
        owa_util.mime_header('application/json', TRUE);
        owa_util.http_header_close;
        if res>0 then
            select nombre, apellido, pais, DIRECCION into nomb, apel, ps, dir from USUARIO where id=res;
            obj.put('respuesta', res);
            obj.put('nombre', nomb);
            obj.put('apellido', apel);
            obj.put('pais', ps);
            obj.put('direccion', dir);
            htp.prn(obj.to_string());
        else
            obj.put('respuesta', res);
            htp.prn(obj.to_string());
        end if;
    end apiLogin;

create or replace procedure apiRegistro(datos clob) as
    correo varchar(100);
    contra varchar(20);
    nombre varchar(20);
    apellido varchar(20);
    pais varchar(20);
    direccion varchar(500);
    res int;
    begin
        SELECT json_value(datos, '$.correo'),
        json_value(datos, '$.contra'),json_value(datos, '$.nombre'), json_value(datos, '$.apellido'),json_value(datos, '$.pais'),
        json_value(datos, '$.direccion')
        INTO correo, contra, nombre,apellido,pais,direccion
        FROM dual;
        registro(nombre,direccion,correo, contra, pais, apellido, res);
         owa_util.mime_header('application/json', TRUE);
         owa_util.http_header_close;
         htp.prn('{"respuesta": ' || res || '}');
    exception
        when others then
            owa_util.mime_header('application/json', TRUE);
            owa_util.http_header_close;
            htp.prn('{"respuesta": -1}');
    end apiRegistro;

    create or replace procedure apiSubirOb(datos clob) as
        dat varchar(20);
        dueno varchar(100);
        way varchar(500);
        licencia varchar(500);
        usuario int;
        coment varchar(1000);
        lat real;
        lon real;
        taxon varchar(20);
    begin
        select json_value(datos, '$.fecha'), json_value(datos, '$.dueno'), json_value(datos, '$.ruta'),
        json_value(datos, '$.licencia'),json_value(datos, '$.usuario'), json_value(datos, '$.comentario'),
        json_value(datos, '$.latitud'), json_value(datos, '$.longitud'), json_value(datos, '$.taxon') into
        dat, dueno, way, licencia, usuario, coment, lat, lon, taxon from dual;
        INSERTARIMAOBS(dat, dueno, way, licencia, usuario, coment, lat, lon, taxon);
        owa_util.mime_header('application/json', TRUE);
        owa_util.http_header_close;
        htp.prn('{"respuesta": ' || 1 || '}');
    exception
            when others then
            owa_util.mime_header('application/json', TRUE);
            owa_util.http_header_close;
            htp.prn('{"respuesta": ' || -1 || '}');
    end apiSubirOb;

create or replace procedure apiBuscarTaxon(datos clob) as
    nom varchar(100);
    idd varchar(20):='null';
    begin
    select json_value(datos, '$.taxon') into nom from dual;
    select taxon.id into idd from taxon where taxon.NOMBRE=nom;
    owa_util.mime_header('application/json', TRUE);
    owa_util.http_header_close;
    htp.prn('{"respuesta": "' || idd || '"}');
    exception
        when no_data_found then
        owa_util.mime_header('application/json', TRUE);
        owa_util.http_header_close;
        htp.prn('{"respuesta": ' || '"null"' || '}');
        when others then
        owa_util.mime_header('application/json', TRUE);
        owa_util.http_header_close;
        htp.prn('{"respuesta": ' || '"null"' || '}');
    end apiBuscarTaxon;

create or replace procedure apiAgregarIdent(datos clob) as
    us_id int;
    ob_id int;
    nom varchar(200);
    tax_id varchar(20);
    cont int;
    begin
        select json_value(datos, '$.taxon'), json_value(datos, '$.usuario'), json_value(datos, '$.observacion') into
        nom, us_id, ob_id from dual;
        select taxon.id into tax_id from taxon where taxon.NOMBRE=nom;
        select count(*) into cont from IDENTIFICACION where USUARIO_ID=us_id and OBSERVACION_ID=ob_id;
        owa_util.mime_header('application/json', TRUE);
        owa_util.http_header_close;
        if cont>0 then
            update IDENTIFICACION set TAXON_ID=tax_id where OBSERVACION_ID=ob_id and USUARIO_ID=us_id;
            htp.prn('{"respuesta": ' || -2 || '}');
        else
            INSERTARIDE(ob_id, us_id, tax_id);
            htp.prn('{"respuesta": ' || 1 || '}');
        end if;
    exception
        when no_data_found then
        owa_util.mime_header('application/json', TRUE);
        owa_util.http_header_close;
        htp.prn('{"respuesta": ' || -1 || '}');
        when others then
        owa_util.mime_header('application/json', TRUE);
        owa_util.http_header_close;
        htp.prn('{"respuesta": ' || -3 || '}');
    end;

create or replace procedure apiBorrarOb(datos clob) as
cod int;
idd int;
begin
    select json_value(datos, '$.id') into idd from dual;
    delete from IDENTIFICACION where OBSERVACION_ID=idd;
    select imagen_id into cod from OBSERVACION where id=idd;
    delete from OBSERVACION where id=idd;
    delete from imagen where id=cod;
    owa_util.mime_header('application/json', TRUE);
    owa_util.http_header_close;
    htp.prn('{"respuesta": ' || 1 || '}');
exception
    when others then
    owa_util.mime_header('application/json', TRUE);
    owa_util.http_header_close;
    htp.prn('{"respuesta": ' || -1 || '}');
end;

create or replace procedure apiActualizarOb(datos clob) as
    ob_id int;
    coment varchar(1000);
    tax_nom varchar(100);
    tax_id varchar(20);
    begin
        select json_value(datos, '$.id'), json_value(datos, '$.taxon'), json_value(datos, '$.comentario')
            into ob_id, tax_nom, coment from dual;
        if tax_nom!='null' then
            select id into tax_id from taxon where nombre=tax_nom;
            update OBSERVACION set TAXON_ID=tax_id where id=ob_id;
        end if;
        if coment!='null' then
            update OBSERVACION set COMENTARIO=coment where id=ob_id;
        end if;
        owa_util.mime_header('application/json', TRUE);
        owa_util.http_header_close;
        htp.prn('{"respuesta": ' || 1 || '}');
    exception
        when no_data_found then
            owa_util.mime_header('application/json', TRUE);
            owa_util.http_header_close;
            htp.prn('{"respuesta": ' || -1 || '}');
        when others then
            owa_util.mime_header('application/json', TRUE);
            owa_util.http_header_close;
            htp.prn('{"respuesta": ' || -2 || '}');
    end;

-- Api para obtener las observaciones de un usuario
select OBSERVACION.id as id, taxon.nombre as taxon, imagen.ruta as ruta, usuario.nombre as usuario, to_char(observacion.fecha, 'DD/MM/YYYY') as fecha
from OBSERVACION
join taxon on taxon.id=OBSERVACION.TAXON_ID
join imagen on imagen.id=observacion.IMAGEN_ID
join usuario on usuario.id=OBSERVACION.USUARIO_ID
where observacion.USUARIO_ID=3;

--Api para obtener la informacion de una observacion
select observacion.id as observacionId, to_char(observacion.fecha, 'DD/MM/YYYY') as fecha, observacion.latitud as latitud, observacion.longitud as longitud,
observacion.usuario_id as usuarioId, usuario.nombre as usuarioNombre, imagen.ruta as rutaImagen,
nombre_comun.nombre as nombreComun, UPPATH(observacion.taxon_id) as taxonomia
from observacion
join usuario on USUARIO.ID=observacion.USUARIO_ID
join imagen on IMAGEN.ID=observacion.IMAGEN_ID
left join NOMBRE_COMUN on NOMBRE_COMUN.id=OBSERVACION.IMAGEN_ID
where OBSERVACION.ID=34;

