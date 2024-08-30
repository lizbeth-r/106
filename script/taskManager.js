
function saveTask(){
    console.log("Task Manager...")
    const title = $("#txtTitle").val();
    const description = $("#txtDescription").val();
    const color = $("#txtColor").val();
    const date = $("#txtDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();

    console.log(title, description, color, date, status, budget)

    let taskSave = new Task(title, description, color, date, status, budget)
    console.log(taskSave)

    //save to server
    $.ajax({

        type: "POST",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(taskSave),
        contentType: "application/json",
        success: function (response) {
          console.log(response);
          let savedTask = JSON.parse(response);
          displayTask(savedTask);
        },
        error: function (error) {
          console.log(error)
        }
      });
      // displayTask(taskSave);
}

function displayTask(task){
  let syntax = `
  <div id="task-${task._id}" class="task-container" style="border-color:${task.color}">
    <div class="info">
      <h5>${task.title}</h5>
      <p>${task.description}</p>
    </div>

    <label class="status">${task.status}</label>
    <div class="date-budget">
      <label> ${task.date}</label>
      <label> ${task.budget}</label>
    </div>
    <button onclick="deleteTask('${task._id}')" class="btn btn-danger btn-sm">Delete</button>
  </div>
  `;

  $("#list").append(syntax);
}

function deleteTask(taskId) {
  console.log("Removing task from display with ID:", taskId);
  $(`#task-${taskId}`).remove();
}

function deleteAllTasks() {
  console.log("Removing all tasks from display");
  $("#list .task-container").remove();
}

function btnForm() {
  $("#form").toggle();
}

function loadTask(){
  console.log("Hello from loadTask");
  $.ajax({
    type: "GET",
    url: "http://fsdiapi.azurewebsites.net/api/tasks/",
    success: function(response){
      console.log("response", response);

      let data = JSON.parse(response);
      console.log("response json: ", data);

      for(let i=0; i<data.length; i++){
        let task = data[i];

        console.log("this task is:", task);
        if(task.name == "Lizbeth"){
          displayTask(task);
        }
      }
    },
    error: function(error) {
      console.log("Error loading tasks", error);
    }
  })
}

function init(){
    $("#btnSave").click(saveTask);
    $("#btnForm").click(btnForm);
    $("#btnDeleteAll").click(deleteAllTasks);
    loadTask();    
}

window.onload = init