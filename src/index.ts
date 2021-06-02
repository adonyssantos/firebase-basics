import db from "./config/firebase";

const user = {
  name: "Adonys",
  age: 17,
  title: "Frontend Developer",
  student: true,
};

// Referencia a la colección users
const usersRef = db.collection("users");

// Actualizar datos de una colección
usersRef.doc("SdFvvlTZsiHs9KrNnEre").update({ student: true });
