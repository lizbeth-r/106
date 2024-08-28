
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

        type: "post",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(taskSave),
        contentType: "application/json",
        success: function (response) {
          console.log(response)
        },
        error: function (error) {
          console.log(error)
        }
      });
      displayTask(taskSave);
}

function displayTask(task){
  let syntax = `
  <div class="task" style="border-color:${task.color}">
    <div class="info">
      <h5>${task.title}</h5>
      <p>${task.description}</p>
    </div>

    <label class="status">${task.status}</label>
    <div class="date-budget">
      <label> ${task.date}</label>
      <label> ${task.budget}</label>
    </div>
  </div>
  `;

  $("#list").append(syntax);

}

function btnForm() {
  $("#form").toggle();
}

function init(){
    $("#btnSave").click(saveTask);
    $("#btnForm").click(btnForm);
    displayTask();
}

window.onload = init