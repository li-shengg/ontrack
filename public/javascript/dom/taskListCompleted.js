 ///////////////////////////////////////////////////////////////////////////////////
  // Show/ Hide completed tasks
  /////////////////////////////////////////////////////////////////////////////////////
  const taskList__toggleCompleted = document.querySelector (
    ".task-list__toggle-completed"
  );
  taskList__toggleCompleted.addEventListener("click", () => {
    const taskList__completed  = document.querySelector(
      ".task-list__completed "
    );
    const taskList__toggleCompletedIcon = document.querySelector(
      ".task-list__toggle-completed-icon"
    );
    if (taskList__completed.classList.contains("collapsed")) {
      taskList__completed.classList.remove("collapsed");
      taskList__toggleCompletedIcon.style.transform = "rotate(90deg)";
    } else {
      taskList__completed.classList.add("collapsed");
      taskList__toggleCompletedIcon.style.transform = "rotate(0deg)";
    }
  });