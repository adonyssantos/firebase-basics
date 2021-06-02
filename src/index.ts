import db from "./config/firebase";

const user = {
  name: "Adonys",
  age: 17,
  title: "Frontend Developer",
  student: true,
};

// Referencia a la colección users
const usersRef = db.collection("users");

// Borrar datos de una colección
usersRef
  .doc("SdFvvlTZsiHs9KrNnEre")
  .delete()
  .then(() => console.log("Borrado"))
  .catch((error) => console.log(error));
