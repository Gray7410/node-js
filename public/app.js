document.addEventListener("click", (event) => {
  const { target } = event;
  if (target.dataset.type === "remove") {
    const id = target.dataset.id;
    remove(id).then(() => {
      target.closest("li").remove();
    });
  } else if (target.dataset.type === "edit") {
    const id = target.dataset.id;
    const edited = prompt("Enter new name");
    if (edited) {
      edit(id, edited);
      document.getElementById(`note${id}`).textContent = `${edited}`;
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}
async function edit(noteId, noteName) {
  await fetch(`/${noteId}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ id: noteId, title: noteName }),
  });
}
