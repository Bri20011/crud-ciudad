<template>
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login y Registro</title>
    <link rel="stylesheet" href="./style.css">
</head>
<body>
<main>

<div class="contenedor__todo">
    <div class="caja__trasera">
        <div class="caja__trasera-login">
        <h3>¿Ya tienes una cuenta?</h3>
        <p>Inicia sesión para entrar en la página</p>  
        <button id="btn__iniciar-sesion">Iniciar Sesion</button>

</div>

    <div class="caja__trasera-register">
        <h3>¿Aún no tienes cuenta?</h3>
        <p>Registrate para que puedas iniciar sesión </p>  
        <button id="btn__registrarse">Registrarse</button>
</div>
</div>

<!-- formulario de login y registro -->

     <div class="contenedor__login-register">
        <!-- login -->
      <form action="" class="formulario__login">
      <h2>Iniciar Sesión</h2>
     <input type="text" placeholder="Correo electronico">
     <input type="password" placeholder="Contraseña">
     <button>Entrar</button>
    </form>

      <!-- Registro -->
    <form action="" class="formulario__register">
    <h2>Registrarse</h2>
    <input type="text" placeholder="Nombre completo">
    <input type="text" placeholder="Correo Electronico">
    <input type="text" placeholder="Usuario">
    <input type="text" placeholder="Contraseña">
    <button>Registrarse</button>



</form>
</div>
</div>

</main>

</body>
</html>
</template>
<style>
*{ 
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration:none;
    font-family: sans-serif;

}
body{ 
background-image: url(./Imagenes/inmobiliaria.jpg);
background-size: cover;
background-repeat: no-repeat;
background-position: center;
background-attachment: fixed;

}  
main{
    width: 100%;
    padding: 20px;
    margin: auto;
    margin-top: 100px;
}

.contenedor__todo{
 width: 100%;
 max-width: 800px;
 margin: auto;
 position: relative;

}
.caja__trasera{
    width: 100%;
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    backdrop-filter:blur(10px);
    background-color: rgba(0, 128, 255, 0.5);

}
.caja__trasera div{
  margin: 100px 40px;
  color: white;
  transition: all 500ms;
}

.caja__trasera div p,
.caja__trasera div button{
    margin-top: 30px;
}

.caja__trasera div h3{
    font-weight: 400;
    font-size: 26px;
}

.caja__trasera button{
    padding: 10px 40px;
    border: 2px solid #fff;
    background: transparent;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    color: white;
    outline: none;
    transition: all 300ms;

}
.caja__trasera button:hover{
    background: #fff;
    color: #46a2fd;

}
/*Formularios*/
.contenedor__login-register{
 display: flex;
 align-items: center;   
 width: 100%;
 max-width: 380px;
 position: relative;
 top: -185px ;
 left: 10px;
 transition: left 500ms cubic-bezier(0.175, 0.885 , 0.320, 2.275);
}

.contenedor__login-register form{
    width: 100%;
    padding: 80px 20px;
    background: #fff;
    position: absolute;
    border-radius: 20px;
}
.contenedor__login-register form h2{
    font-size:30px;
    text-align:center;
    margin-bottom: 20px;
    color:#46a2fd;
}
.contenedor__login-register form input{
    width: 90%;
    margin: 20px;
    padding: 10px;
    border: none;
    background: #f2f2f2;
    font-size: 16px;
    outline: none;
}

.contenedor__login-register form button{
    padding: 10px 40px;
    margin-top: 40px;
    border: none;
    font-size: 14px;
    background:#46a2fd;
    color: white;
    cursor: pointer;
    outline: none;
}
.formulario__login{
    opacity: 1;
    display: block;
}
.formulario__register{
    display: none;


}
/* TRABAJANDO EN EL REPONSIVE DEISNG - QUE LA IMAGEN AL ACHICAR NO DESAPAREZCA*/
@media creen and (max-width:850px){
   
    main{
        margin-top:50px;
    }
    .caja__trasera{
        max-width: 350px;
        height: 300px;
        flex-direction: column;
        margin: auto;
}
.caja__trasera div{
margin: 0px;
position: absolute;

}
.contenedor__login-register{
top: 10px;
left: -5px;
margin: auto;

}

.contenedor__login-register form {
    position: relative;

}

}
</style>


<script>
 document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
 document.getElementById("btn__registrarse").addEventListener("click", register);
 window.addEventListener("recize", anchoPagina);


 /*Declaracion de variables*/
 var contenedor_login_register = document.querySelector(".contenedor__login-register"); 
 var formulario_login = document.querySelector(".formulario__login");
 var formulario_register = document.querySelector(".formulario__register");
 var caja_trasera_login = document.querySelector(".caja__trasera-login");
 var caja_trasera_register = document.querySelector(".caja__trasera-register"); 
 
function anchoPagina(){
if(window.innerWidth > 850){
    caja_trasera_login.style.display = "block";
    caja_trasera_register.style.display = "block";
}else{
    caja_trasera_register.style.display = "block";
    caja_trasera_register.style.opacity = "1";
    caja_trasera_login.style.display = "none";
    formulario_login.style.display = "block";
    formulario_register.style.display = "none";
    contenedor_login_register.style.left = "0";
  }  

}
/* Todo lo contrario a register, aqui*/
 function iniciarSesion(){ 

   if(window.innerWidth > 850) {

    formulario_register.style.display = "none";
    contenedor_login_register.style.left = "10px";
    formulario_login.style.display = "block";
    caja_trasera_register.style.opacity = "1";
    caja_trasera_login.style.opacity = "0";

    }else{
    formulario_register.style.display = "none";
    contenedor_login_register.style.left = "0px";
    formulario_login.style.display = "block";
    caja_trasera_register.style.display = "block";
    caja_trasera_login.style.display = "none";

    }

}

 function register(){
    if(window.innerWidth > 850) {
    formulario_register.style.display = "block";
    contenedor_login_register.style.left = "410px";
    formulario_login.style.display = "none";
    caja_trasera_register.style.opacity = "0";
    caja_trasera_login.style.opacity = "1";
}else{
    formulario_register.style.display = "none";
    contenedor_login_register.style.left = "0px";
    formulario_login.style.display = "none";
    caja_trasera_register.style.display = "none";
    caja_trasera_login.style.display = "block";
    caja_trasera_login.style.opacity= "1";
   }

}
</script>




