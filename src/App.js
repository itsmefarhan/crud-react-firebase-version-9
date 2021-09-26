import "./App.css";
import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Task from "./components/Task";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "tasks"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let tasksArray = [];
      querySnapshot.forEach((doc) => {
        tasksArray.push({ ...doc.data(), id: doc.id });
      });
      setTasks(tasksArray);
    });
    return () => unsub();
  }, []);

  const toggleComplete = async (task) => {
    await updateDoc(doc(db, "tasks", task.id), { completed: !task.completed });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };
  return (
    <div>
      <AddTask />
      <div className="task_container">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
