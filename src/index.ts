import db from "./config/firebase";

const user = {
  name: "Adonys",
  age: 17,
  title: "Frontend Developer",
  student: true,
};

// Referencia a la colección users
const usersRef = db.collection("users");

// Obtener datos de una colección
usersRef
  // onSnapshot es un callback que se va a ejecutar cada vez que la informacion cambie en la BD
  .onSnapshot((snap) => {
    const users: any[] = [];

    snap.forEach((childSnap) => {
      users.push({
        id: childSnap.id,
        ...childSnap.data(),
      });
    });
    console.log(users);
  });
