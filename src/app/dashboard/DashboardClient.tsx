"use client";

import { useEffect, useState } from "react";

type Task = {
  id: string;
  title: string;
  status: string;
};

export default function DashboardClient() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    if (res.ok) {
      const data = await res.json();
      setTasks(data);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    if (!title.trim()) return;

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (res.ok) {
      setTitle("");
      fetchTasks();
    }
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    fetchTasks();
  };

  return (
    <div className="min-h-screen px-6 py-10 max-w-xl mx-auto">
      <h1 className="text-xl font-medium mb-6">Your Tasks</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="New task..."
          className="flex-1 border border-gray-300 p-2 rounded-md text-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createTask}
          className="bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700 transition text-sm"
        >
          Add
        </button>
      </div>

      {tasks.length === 0 && (
        <p className="text-sm text-gray-500">No tasks yet.</p>
      )}

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="border border-gray-200 p-3 rounded-md flex justify-between items-center"
          >
            <span className="text-sm">{task.title}</span>

            <select
              value={task.status}
              onChange={(e) => updateStatus(task.id, e.target.value)}
              className="border border-gray-300 p-1 rounded-md text-sm"
            >
              <option value="TODO">Todo</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
