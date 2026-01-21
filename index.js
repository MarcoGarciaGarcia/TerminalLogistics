const express = require("express");
const app = express();
const path = require("path");

const port = 3000;
app.use(express.json());

let toDo = [
  { id: 0, title: "Hacer prueba", description: "Prueba Técnica", status: 0 },
];

let idElement = 0;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "toDoList.html"));
});

const obtener = app.get("/tasks", (req, res) => {
  res.status(200).json({ items: toDo });
});

const crear = app.post("/tasks", (req, res) => {
  try {
    let newTask = {};
    idElement += 1;
    newTask.id = idElement;
    newTask.title = req.body.title;
    newTask.description = req.body.description;
    newTask.status = req.body.status;
    toDo.push(newTask);
    res.status(201).json({ message: "Created", item: req.body });
  } catch (error) {
    res.status(401).json({ message: "Bad Request", error: error.message });
  }
});

const actualizar = app.put("/tasks/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    toDo = toDo.map((task) =>
      task.id === id
        ? {
            ...task,
            id: id,
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
          }
        : {... task}
    );
    res.status(200).json({ message: "Update", item: req.body });
  } catch (error) {
    res.status(401).json({ message: "Bad Request", error: error.message });
  }
});

const eliminar = app.delete("/tasks/:id", (req,res)=>{
    try {
        const id = parseInt(req.params.id);
        toDo = toDo.filter((task) => task.id !== id);
        res.status(200).json({message: "Deleted"})
    } catch (error){
        res.status(500).json({ message: "Error Internal server", error: error.message });
    }
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
