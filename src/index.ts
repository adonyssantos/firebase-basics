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

// Limit 

// Obtiene los 2 primeros documentos de la colección users
usersRef.limit(2).get().then(showDocs);

// Obtiene los 5 primeros documentos de la colección users
usersRef.limit(5).get().then(showDocs);
