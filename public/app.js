document.addEventListener("click", (event) => {
  const { target } = event;
  if (target.dataset.type === "remove") {
    const id = target.dataset.id;
    remove(id).then(() => {
      target.closest("li").remove();
    });
  } else if (target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    const title = event.target.dataset.title;
    const edited = prompt("Enter new name", title);
    if (edited) {
      edit({ id, title: edited });
      event.target.closest("li").querySelector("p").innerText = edited;
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}
async function edit(editedNote) {
  await fetch(`/${editedNote.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(editedNote),
  });
}
