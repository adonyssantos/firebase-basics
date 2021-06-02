# Firestore para SQL Developers

Este proyecto es del curso en [YouTube](https://www.youtube.com/playlist?list=PLCKuOXG0bPi29EkcAuVCln9ISbExcQk66) de Fernado Herrera.

**API Documentation** [https://googleapis.dev/nodejs/firestore/latest/CollectionReference.html](https://googleapis.dev/nodejs/firestore/latest/CollectionReference.html)

## Scripts:

Recuerden reconstruir los módulos de Node

```
npm install
```

Y para construir el build, recueren:

```
npm run build
```

# Resumen

## Conexión a Firebase

Para conectar Firebase con nuestra Aplicación Web debemos de crear una App en la configuración de proyecto de Firebase.

Hay varias formas de conectar nuestro proyecto con Firebase, la que usamos en este caso fue con un archivo `/config/firebase.ts` para almacenar la configuracion de Firebase.

```ts
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCELZUvvnBQsxYfCb9Bl-p8QB3uQKuUWJc",
  authDomain: "first-firebase-4cd37.firebaseapp.com",
  projectId: "first-firebase-4cd37",
  storageBucket: "first-firebase-4cd37.appspot.com",
  messagingSenderId: "116369059692",
  appId: "1:116369059692:web:adb10ff3f756c51a520d49",
  measurementId: "G-6D5B5Q5L10",
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
```

_En este caso las variables estan publica porque eliminare este proyecto una vez termiine el curso, pero la forma correcta de hacer esto es utilizando Variables de entorno, ya que estos datos son muy sensibles y cualquier persona con esto datos podria modificar nuestra BD._

Ahora debemops importar nuestra configuracion a nuestro archivo principal:

```ts
import "./config/firebase";
```

En este caso agregamos `firebase.firestore()` dentro de una variable para poderla reutilizar.

```ts
const db = firebase.firestore();

export default db;
```

## Insertar datos en una colección

Podemos relacionar **colección** de Firebase con una Tabla de SQL. Esto no es correcto pero para entenderlo mejor.

**Nota:** _Para insertar datos debemos enviarle un objecto literal/sencillo. No podemos pasarle funciones, por ejemplo._

```ts
import db from "./config/firebase";

const user = {
  name: "Adonys",
  age: 17,
  title: "Frontend Developer",
  student: true,
};

// Insertar datos en una colección
db.collection("users")
  .add(user)
  .then((docRef) => {
    console.log(docRef);
  })
  .catch((error) => console.log("error", error));
```

## Actualizar datos de una colección

### Referencia a una colección

Si vamos a reutilizar una colección podemos almacenarla en una variable:

```ts
// Referencia a la colección users
const usersRef = db.collection("users");
```

De esta forma no tenemos que llamar la misma colección varias veces.

```ts
usersRef.add({...})
```

No existen un metodo `update` para la referencia de una colección, por lo que hay que llamarla por el `id`.

```ts
// Referencia a la colección users
const usersRef = db.collection("users");

// Actualizar datos de una colección
usersRef.doc("SdFvvlTZsiHs9KrNnEre").update({ student: true });

// También podemos utilizar .set, pero es una forma destructiva, lo que quiere decir que borrara los otros datos
usersRef.doc("SdFvvlTZsiHs9KrNnEre").set({ student: true });
```

_Se recomienda utilizar `then` y `catch` para evitar errores._

## Borrar datos de una colección

Para borrar datos de una colección se hace de la misma forma que con [update](#actualizar-datos-de-una-colección), se le pasa la referencia a la colección, el id del cocumento que se desea borrar y el metodo `.delete()`.

```ts
// Borrar datos de una colección
usersRef
  .doc("SdFvvlTZsiHs9KrNnEre")
  .delete()
  .then(() => console.log("Borrado"))
  .catch((error) => console.log(error));
```

_Utilizar `then` y `catch` no es necesario pero ayuda a evitar errores._

## Obtener datos de una colección

### Utilizando `onSnapshot`

**onSnapshot** es un callback que se va a ejecutar cada vez que la informacion cambie dentro de la Base de Datos.

```ts
// Obtener datos de una colección
usersRef.onSnapshot((snap) => {
  const users: any[] = [];

  snap.forEach((childSnap) => {
    users.push({
      id: childSnap.id,
      ...childSnap.data(),
    });
  });
  console.log(users);
});
```

### Optimizando el código

Como el bloque de código para obtener los datos de una colección lo vamos a utilizar varias veces, podemos separarlo como una `función/helpers` así solo tenemos que hacer referencia a esa función para obtener los datos.

### Utilizando `get`

**get** obtiene la información una sola vez cuando se ejecuta el código.

```ts
// Obtener datos de una colección con get
usersRef.get().then(showDocs);
```

### Indices y clausula `where`

Podemos utilizar el metodo `where` para crear condicionales en nuestras consultas. Tanto para consultas `simple` como para consultas `compuestas`.

**Consulta simple:** son todas aquellas que utilizan un solo campo para realizar la consulta.

**Consulta compuestas:** son todas aquellas que utilizan dos o más campos para realizar la consulta.

#### Consultas simple

```ts
// Obtener datos de una colección con condicionales

// Obtiene la data if student === true
usersRef.where("student", "==", true).get().then(showDocs);

// Obtiene la data if salary >= 1800
usersRef.where("salary", ">=", 1800).get().then(showDocs);

// Obtiene la data if salary >= 1800 && salary <= 2800
usersRef
  .where("salary", ">=", 1800)
  .where("salary", "<=", 2800)
  .get()
  .then(showDocs);
```

#### Consulta compuestas

```ts
// Obtiene la data if salary >= 500 && student == true
usersRef
  .where("salary", ">=", 500)
  .where("student", "==", true)
  .get()
  .then(showDocs); // Esto es un query compuesto por lo que hay que crear un índice
```

Para crear el índice existen dos formas:

**Manual:** dentro de `Cloud Firestore` vamos a `Index` y podemos agregar el nombre y cada uno de los campos que necesitamos para nuestra consulta.

**Automatica:** al ejecutar nuestro código nos muetra un error por la consola donde hay un link. Solo tenemos que darle click al link y darle a `Create Index`.


## orderBy

```ts
// Obtener datos de una colección con orderBy

// Ordena por nombre por defecto de forma ascendente
usersRef.orderBy("name").get().then(showDocs);

// Ordena por salario por defecto de forma ascendente
usersRef.orderBy("salary").get().then(showDocs); // orderBy aplica un where de forma interna por lo que si algun documento en la BD no tiene el campo salary no saldra en la consulta

// Ordena por salario de forma descendente
usersRef.orderBy("salary", "desc").get().then(showDocs); // orderBy aplica un where de forma interna por lo que si algun documento en la BD no tiene el campo salary no saldra en la consulta

// Ordena por salario de forma descendente y despues por nombre
usersRef
  .orderBy("salary", "desc")
  .orderBy('name')
  .get()
  .then(showDocs); //En este caso tambien hay que crear un índice

```

## Limit y Paginación

### Limit

```ts
// Limit 

// Obtiene los 2 primeros documentos de la colección users
usersRef.limit(2).get().then(showDocs);

// Obtiene los 5 primeros documentos de la colección users
usersRef.limit(5).get().then(showDocs);
```
