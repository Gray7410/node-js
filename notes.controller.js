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

async function editNote(id, title) {
  const notes = await getNotes();
  await fs.writeFile(
    notesPath,
    JSON.stringify(
      notes.map((note) => {
        if (note.id === id) {
          return { title: title, id: id };
        }
        return note;
      })
    ),
    { encoding: "utf-8" }
  );
  console.log(chalk.yellow(`Note with id ${id} was edited!`));
}

module.exports = {
  addNote,
  getNotes,
  removeNotes,
  editNote,
};
