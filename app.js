const WORKER_URL = "https://mgt3745-hw5.mgt3745-hw5.workers.dev";

const taskForm = document.querySelector("#taskForm");
const taskNameInput = document.querySelector("#taskName");
const taskTypeInput = document.querySelector("#taskType");
const taskDateInput = document.querySelector("#taskDate");
const taskStatusInput = document.querySelector("#taskStatus");
const taskList = document.querySelector("#taskList");
const taskCount = document.querySelector("#taskCount");
const emptyState = document.querySelector("#emptyState");
const feedback = document.querySelector("#feedback");

let tasks = [];

function showFeedback(message, type) {
  feedback.textContent = message;
  feedback.className = `feedback ${type}`;
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "No due date";
  }

  const date = new Date(`${dateValue}T00:00:00`);
  return date.toLocaleDateString();
}

function renderTasks() {
  taskList.replaceChildren();
  taskCount.textContent = `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}`;
  emptyState.hidden = tasks.length > 0;

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = "task-card";

    const content = document.createElement("div");
    const title = document.createElement("h3");
    const details = document.createElement("p");

    title.textContent = task.name;
    details.textContent = `${task.type} · Due ${formatDate(task.date)} · ${task.status}`;
    details.className = "task-details";

    content.append(title, details);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
      showFeedback(
        "Delete is not connected to the Worker yet and is deferred for HW4.",
        "error"
      );
    });

    item.append(content, deleteButton);
    taskList.append(item);
  });
}

async function loadTasks() {
  try {
    showFeedback("Loading saved tasks...", "success");

    const response = await fetch(`${WORKER_URL}/entries`);

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const entries = await response.json();

    tasks = entries
      .map((entry) => {
        try {
          return JSON.parse(entry.text);
        } catch {
          return null;
        }
      })
      .filter((task) => task !== null);

    renderTasks();

    if (tasks.length === 0) {
      showFeedback("No saved tasks yet.", "success");
    } else {
      showFeedback("Saved tasks loaded.", "success");
    }
  } catch (error) {
    tasks = [];
    renderTasks();
    showFeedback(
      "Saved tasks could not be loaded. Check your connection and try again.",
      "error"
    );
  }
}

async function createTask() {
  const name = taskNameInput.value.trim();

  if (!name) {
    showFeedback("Enter a task name before saving.", "error");
    taskNameInput.focus();
    return;
  }

  const newTask = {
    id: crypto.randomUUID(),
    name,
    type: taskTypeInput.value,
    date: taskDateInput.value,
    status: taskStatusInput.value,
  };

  try {
    const response = await fetch(`${WORKER_URL}/entries`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        text: JSON.stringify(newTask),
      }),
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || `Server returned ${response.status}`);
    }

    tasks = [...tasks, newTask];
    renderTasks();
    taskForm.reset();
    showFeedback("Task saved to the shared database.", "success");
  } catch (error) {
    showFeedback(
      `Task was not saved: ${error.message}`,
      "error"
    );
  }
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createTask();
});

loadTasks();