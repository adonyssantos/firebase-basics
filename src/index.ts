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

// Obtener datos de una colección con get
usersRef
  // .onSnapshot(showDocs);
  .get().then(showDocs);

