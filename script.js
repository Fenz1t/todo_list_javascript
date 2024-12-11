    // Получаем элементы из html
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");
    const fullDeleteButton = document.getElementById("full-delete")

    // Функция для отображения задач на странице
    function renderTasks() { // Показ задач, а также как они должны выглядить(стили от tailwind.css)
    taskList.innerHTML = ""; // Очищаем список перед рендером

    // Получаем задачи(от LoccalStorage)
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task) => {
        const taskItem = document.createElement("li");
        taskItem.classList.add(
        "flex",
        "items-center",
        "space-x-3",
        "p-4",
        "bg-gray-50",
        "rounded-lg",
        "shadow-sm"
        );

        // Чекбокс
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add(
        "h-5",
        "w-5",
        "text-blue-500",
        "focus:ring-blue-400"
        );
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTaskCompletion(task.text));

        // Текст задачи
        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        taskText.classList.add("flex-1", "text-lg");
        if (task.completed) {
        taskText.classList.add("line-through", "text-gray-500");
        } else {
        taskText.classList.add("text-gray-800");
        }

        // Время добавления
        const taskTime = document.createElement("span");
        taskTime.textContent = task.time;
        taskTime.classList.add("text-xs", "text-gray-400");

        // Удаление задачи
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Удалить";
        deleteButton.classList.add(
        "bg-red-500",
        "text-white",
        "px-3",
        "py-1",
        "rounded-md",
        "hover:bg-red-600"
        );
        deleteButton.addEventListener("click", () => removeTask(task.text));

        // Добавляем элементы в taskItem
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(taskTime);
        taskItem.appendChild(deleteButton);

        // Добавляем задачу в список
        taskList.appendChild(taskItem);
    });
    }

    // Функция для добавления новой задачи
    function addTask(text) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Текущее время в формате локальной строки
    const currentTime = new Date().toLocaleDateString("ru-RU");

    // Формируем объект задачи с временем добавления
    const task = {
        text,
        completed: false,
        time: currentTime,
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    }

    // Функция для удаления задачи
    function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    }

    // Функция для переключения статуса задачи (выполнена/не выполнена)
    function toggleTaskCompletion(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map((task) => {
        if (task.text === taskText) {
        task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    }

    // Добавляем задачу по кнопке
    addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText === ""){
        alert("Поле ввода пустое")
        return
    }
    else if (taskText.length >= 20){
        alert("Слишком длинный текст для задачи")
        return
    }

    addTask(taskText);
    taskInput.value = "";
    });

    //Очищаем localstorage(очищаем все задачи)
    fullDeleteButton.addEventListener("click",()=>{
        localStorage.clear();
        renderTasks();
    })


    // Инициализация списка задач при загрузке страницы
    renderTasks();
