import { renderNotes } from "./app.js";

let showArchivedNotes = document.querySelector(".archive-notes-container");
let arrOfNotes = JSON.parse(localStorage.getItem("notes")) || [];

showArchivedNotes.addEventListener("click", (event) => {
  let noteId = event.target.dataset.id;
  let type = event.target.dataset.type;

  switch (type) {
    case "del":
      arrOfNotes = arrOfNotes.filter(({ id }) => id.toString() !== noteId);
      showArchivedNotes.innerHTML = renderNotes(
        arrOfNotes.filter(({ isArchived }) => isArchived)
      );
      localStorage.setItem("notes", JSON.stringify(arrOfNotes));
      break;

    case "pinned":
      arrOfNotes = arrOfNotes.map((note) =>
        note.id.toString() === noteId
          ? { ...note, isPinned: !note.isPinned }
          : note
      );
      showArchivedNotes.innerHTML = renderNotes(
        arrOfNotes.filter(({ isArchived }) => isArchived)
      );
      localStorage.setItem("notes", JSON.stringify(arrOfNotes));
      break;

    case "archive":
      arrOfNotes = arrOfNotes.map((note) =>
        note.id.toString() === noteId
          ? { ...note, isArchived: !note.isArchived }
          : note
      );
      showArchivedNotes.innerHTML = renderNotes(
        arrOfNotes.filter(({ isArchived }) => isArchived)
      );
      localStorage.setItem("notes", JSON.stringify(arrOfNotes));
      break;
  }
});

showArchivedNotes.innerHTML = renderNotes(
  arrOfNotes.filter(({ isArchived }) => isArchived)
);
