const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.green("Note was added!"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("Here is the list of notes:"));
  notes.forEach((note) => {
    console.log(`[${note.id}]`, chalk.blue(note.title));
  });
}

async function removeNotes(id) {
  const notes = await getNotes();
  await fs.writeFile(
    notesPath,
    JSON.stringify(notes.filter((note) => note.id !== id))
  );
  console.log(chalk.red(`Note with id ${id} was deleted!`));
}

async function editNote(editedNote) {
  const notes = await getNotes();
  const index = notes.findIndex((note) => note.id === editedNote.id);
  if (index >= 0) {
    notes[index] = { ...notes[index], ...editedNote };
    await fs.writeFile(notesPath, JSON.stringify(notes));
    console.log(
      chalk.yellow(`Note with id "${editedNote.id}" has been updated!`)
    );
  }
}

module.exports = {
  addNote,
  getNotes,
  removeNotes,
  editNote,
};
