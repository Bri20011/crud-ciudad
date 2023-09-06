<template>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
     <form>
        <img src="./Imagenes/user.png" alt="user-img">
        <label for="username">Usuario</label>
        <input type="text" id="username" placeholder="Ejemplo" required>
        <label for="password">Contraseña</label>
        <input type="password" id="password" placeholder="Contraseña" required>
        <div class="box-visible">
             <input type="checkbox"  id="visible">
             <label for="visible">Mostrar Contraseña </label>
        </div>
        <button type="submit" id="submit">Iniciar Sesion</button>
     </form>
    
</body>
</html>
</template>


<style>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

}

body{
    background-color:cadetblue;
    /* background-image: url(./Imagenes/incio2.jpg); */
    /* background-repeat: no-repeat; */
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
 form{
    width: 300px;
    height: 370px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 10px 4px 10px 10px #ccc;
    border-radius: 20px;

 }

form img{
    width: 100px;
    height: 100px;
    padding: 10px;

}

form input[type="text"], input[type="password"] {
    outline: 0;
    border: 1px solid #ccc;
    width: 80%;
    padding: 10px;

}

form label{
    font-weight: 500;
    padding: 10px;


}
.box-visible{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;

}

form button{
outline: 0;
border: 0;
background-color: steelblue;
border-radius: 20px;
cursor: pointer;
width: 250px;
padding: 5px;
transition: all .3s ease-in-out;
text-align: center;
color:#fff ;
font-weight: 500;
}

form button:hover{
    opacity: .75;

}
</style>

<!-- <script>
const $submite = document.getElementById("submit"),
      $password = document.getElementById("password"),
      $username = document.getElementById("username"),
      $visible = document.getElementById("visible");

      document.addEventListener("change", (e)=>{
        if(e.target === $visible){
            if($visible.checked === false) $password.type = "password";
            else $password.type = "text";
        }
    } );
    document.addEventListener("click", (e)=>  {
        if(e.target === $submite){
            if($password.value !== "") {
                e.preventDefault();
                window.location.href = "home.html";
            }}}
   
</script> -->
