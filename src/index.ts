import db from "./config/firebase";
import showDocs from "./helpers/show-docs";

const user = {
  name: "Adonys",
  age: 17,
  title: "Frontend Developer",
  student: true,
  salary: 900,
};

// Referencia a la colección users
const usersRef = db.collection("users");

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