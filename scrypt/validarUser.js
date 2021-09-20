// funcion para validar el login 
function validar()
		{
			var usuario = document.getElementById("idUser").value;
			var Contraseña = document.getElementById("idPas").value;	
// compramos el usuario y contraseña 
			if(usuario == "admin" && Contraseña == 12345 )
			{
				alert("Usuario y Contraseña es validos");
                window.location = "inventario.html";
			}
			else
			{
				alert("el usuario o contraseña ingresado es incorrecto");
			}
		}