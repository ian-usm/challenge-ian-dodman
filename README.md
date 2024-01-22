# Gestor de Empleados

Aplicación web para la gestión de empleados.

# Instalación
* clonar el repositorio `https://github.com/ian-usm/proyecto-practica-ian-dodman`
* Ejecutar el comando `npm install` en la carpeta raíz

### Ejecutar el API de empleados
* instrucciones en: `https://github.com/GuillermoGodoy/EmployeeAPI`

### Iniciar aplicación
* en la carpeta raiz se debe ejecutar el comando `npm start`
* luego ir a `http://localhost:3000/login`

# Uso de la aplicación
* Pantalla de Login, si el usuario no es correcto o falta rellenar un campo, se avisará mediante un mensaje
* Al ingresar bien el usuario, se redirigirá a la pantalla de gestión de empleados
* Dentro se encuentra un formulario con los diferentes campos con los que cuenta un empleado
* Si se intenta ingresar un empleado faltando rellenar uno o más campos, se avisará mediante un mensaje
* Bajo del formulario se encuentra una tabla de los empleados que se encuentran en la base de datos
* La tabla cuenta con los diferentes campos de un empleado, y con opciones para editar y elimar cada uno
* Al presionar el botón para editar, se permitirá modificar cada uno de los campos del empleado
* Aparecerá un botón para guardar y cancelar los cambios en el mismo lugar donde está el botón de editar
* A la izquierda del botón de editar, se encuentra el botón de eliminar
* Al presionar el botón de eliminar, se mostrará un mensaje para confirmar dicha acción
* Finalmente arriba del todo se encuentra un botón pare cerrar sesión

# Explicación del diseño y decisiones tomadas:
* Decidí ir por un diseño simple, intentando crear un ambiente moderno e interesante .
* Quería que fuera lo más intuitivo posible, agregando diferentes íconos y colores que ayuden a entender rápidamente cómo se debería usar la aplicación. 