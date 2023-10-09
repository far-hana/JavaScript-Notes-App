import { renderNotes } from "./app.js";

let note = document.querySelector(".note");
let title = document.querySelector(".title");
let addNoteButton = document.querySelector(".add-btn");
let notesDisplay = document.querySelector(".notes-display");
let showPinnedNotes = document.querySelector(".pinned-notes-container");
let showOtherNotes = document.querySelector(".notes-container");
let pinTitle = document.querySelector(".pin-title");
let otherTitle = document.querySelector(".other-title");
let arrOfNotes = JSON.parse(localStorage.getItem("notes")) || [];

if (arrOfNotes.length > 0) {
  pinTitle.classList.toggle("d-none");
  otherTitle.classList.toggle("d-none");
}

notesDisplay.addEventListener("click", (event) => {
  const type = event.target.dataset.type;
  const noteId = event.target.dataset.id;

  switch (type) {
    case "del":
      arrOfNotes = arrOfNotes.filter(({ id }) => id.toString() !== noteId);
      showOtherNotes.innerHTML = renderNotes(
        arrOfNotes.filter(
          ({ isPinned, isArchived }) => !isPinned && !isArchived
        )
      );
      showPinnedNotes.innerHTML = renderNotes(
        arrOfNotes.filter(({ isPinned }) => isPinned)
      );
      localStorage.setItem("notes", JSON.stringify(arrOfNotes));
      break;

    case "pinned":
      arrOfNotes = arrOfNotes.map((note) =>
        note.id.toString() === noteId
          ? { ...note, isPinned: !note.isPinned }
          : note
      );
      showOtherNotes.innerHTML = renderNotes(
        arrOfNotes.filter(
          ({ isPinned, isArchived }) => !isPinned && !isArchived
        )
      );
      showPinnedNotes.innerHTML = renderNotes(
        arrOfNotes.filter(({ isPinned, isArchived }) => isPinned && !isArchived)
      );
      localStorage.setItem("notes", JSON.stringify(arrOfNotes));
      break;

    case "archive":
      arrOfNotes = arrOfNotes.map((note) =>
        note.id.toString() === noteId
          ? { ...note, isArchived: !note.isArchived }
          : note
      );
      showPinnedNotes.innerHTML = renderNotes(
        arrOfNotes.filter(({ isPinned, isArchived }) => isPinned && !isArchived)
      );
      showOtherNotes.innerHTML = renderNotes(
        arrOfNotes.filter(
          ({ isPinned, isArchived }) => !isPinned && !isArchived
        )
      );
      localStorage.setItem("notes", JSON.stringify(arrOfNotes));
      break;
  }
});

addNoteButton.addEventListener("click", () => {
  if (note.value.trim().length > 0 || title.value.trim().length > 0) {
    arrOfNotes = [
      ...arrOfNotes,
      {
        id: Date.now(),
        title: title.value.trim(),
        note: note.value.trim(),
        isPinned: false,
        isArchived: false,
      },
    ];
    title.value = note.value = "";
    showOtherNotes.innerHTML = renderNotes(
      arrOfNotes.filter(({ isPinned, isArchived }) => !isPinned && !isArchived)
    );
    localStorage.setItem("notes", JSON.stringify(arrOfNotes));
  }
});

showOtherNotes.innerHTML = renderNotes(
  arrOfNotes.filter(({ isPinned, isArchived }) => !isPinned && !isArchived)
);
showPinnedNotes.innerHTML = renderNotes(
  arrOfNotes.filter(({ isPinned, isArchived }) => isPinned && !isArchived)
);
