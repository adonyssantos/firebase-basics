import db from "./config/firebase";
import showDocs from "./helpers/show-docs";

// const user = {
//   name: "Adonys",
//   age: 17,
//   title: "Frontend Developer",
//   student: true,
//   salary: 900,
// };

// Referencia a la colección users
const usersRef = db.collection("users");

// Pagination  //

//Btn Next
const btnNext = document.createElement("button");
btnNext.innerText = "Next Page";
document.body.append(btnNext);

let firstDocument: any = null;
let lastDocument: any = null;
btnNext.addEventListener("click", () => {
  const query = usersRef.orderBy("name").startAfter(lastDocument);

  query
    .limit(2)
    .get()
    .then((snap) => {
      firstDocument = snap.docs[0] || null;
      lastDocument = snap.docs[snap.docs.length - 1] || null;
      showDocs(snap);
    });
});

btnNext.click();

//Btn Previous
const btnPrevious = document.createElement("button");
btnPrevious.innerText = "Previous Page";
document.body.append(btnPrevious);

btnPrevious.addEventListener("click", () => {
  const query = usersRef.orderBy("name").endBefore(firstDocument);

  query
    .limit(2)
    .get()
    .then((snap) => {
      firstDocument = snap.docs[0] || null;
      lastDocument = snap.docs[snap.docs.length - 1] || null;
      showDocs(snap);
    });
});
