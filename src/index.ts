import db from "./config/firebase";
import showDocs from "./helpers/show-docs";

const user = {
  name: "Adonys",
  age: 17,
  title: "Frontend Developer",
  student: true,
};

// Referencia a la colección users
const usersRef = db.collection("users");

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

// Obtiene la data if salary >= 500 && student == true
usersRef
  .where("salary", ">=", 500)
  .where("student", "==", true)
  .get()
  .then(showDocs); // Esto es un query compuesto por lo que hay que crear un índice
