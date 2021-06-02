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
