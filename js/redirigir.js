const app ={
    pages: [],
    show: new Event('show'),
    init: function(){
        history.replaceState({}, 'pagina_inicio', '#pagina_inicio');
    },
    pasar: function(currentPage){
        document.querySelector('.activo').classList.remove('activo');
        document.getElementById(currentPage).classList.add('activo');
    }
}

function login(){
    const correo=document.getElementById('emailIS').value;
    const password=document.getElementById('passwordIS').value;
    if(correo.length<5 || !(correo.includes('@'))) return alert('Correo incorrecto');
    if(password.length < 7) return alert('La contrasea debe de ser de al menos 8 caracteres');
    //Base de datos
    app.pasar(pagina_principal);
}

function registrar(){
    const correo=document.getElementById('emailR').value;
    const nombre=document.getElementById('nameR').value;
    const country=document.getElementById('countryR').value;
    const password=document.getElementById('passwordR').value;
    const apellido=document.getElementById('firstNameR').value;
    const direccion=document.getElementById('adressR').value;
    if(correo.length<5 || !(correo.includes('@'))) return alert('Correo incorrecto');
    if(password.length < 7) return alert('La contrasea debe de ser de al menos 8 caracteres');
    if(nombre.length<2) return alert('Nombre invalido');
    if(country.length<6) return alert('País invalido');
    if(apellido.length<2) return alert('Apellido invalido');
    if(direccion.length<10) return alert('Direccion invalida');
    //Validacion bases de datos
    //meter en base de datos
    app.pasar(pagina_principal);
}

function entrar(){
    app.pasar('pagina_login');
}
