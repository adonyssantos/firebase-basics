# Firestore para SQL Developers

Este proyecto es del curso en [YouTube](https://www.youtube.com/playlist?list=PLCKuOXG0bPi29EkcAuVCln9ISbExcQk66) de Fernado Herrera.

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

*En este caso las variables estan publica porque eliminare este proyecto una vez termiine el curso, pero la forma correcta de hacer esto es utilizando Variables de entorno, ya que estos datos son muy sensibles y cualquier persona con esto datos podria modificar nuestra BD.*

Ahora debemops importar nuestra configuracion a nuestro archivo principal:

```ts
import "./config/firebase"
```
