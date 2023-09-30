// GET All Tasks (/tasks)
function getAllTasks() {

  $.ajax({
    type: 'GET',
    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=324',
    dataType: 'json',
    success: function (response, textStatus) {
      // response is a parsed JavaScript object instead of raw JSON

      // Clear Tasks list first
      $(".tasks-list").html("");

      // On, Success, begin adding Tasks to DOM
      response.tasks.forEach(task => {

        let newTask = $("<div class='row'></div>");

        let removeTaskButton = $("<button class='remove-task-button col-xs-1'>Remove</button>");

        $(".tasks-list").append(newTask);

        newTask.append("<div class='task col-xs-4'>" + task.content + "</div>");

        newTask.append(removeTaskButton);

        removeTaskButton.on("click", () => {

          deleteTask(task.id);

        });

      });

    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });

}

// POST New Task (/tasks)
function initTaskListener() {

  $(".submit-task").on("click", () => {

    let newTask = $(".new-task-input").val();

    $.ajax({
      type: 'POST',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=324',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: newTask
        }
      }),
      success: function (response, textStatus) {
        // clear input form
        $(".new-task-input").val("");
        // reload Tasks on Success
        getAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });

  });

}

// PUT Task Complete


// PUT Task Active


// DELETE Task (/tasks/:id)
function deleteTask(id) {

  $.ajax({
    type: 'DELETE',
    url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=324',
    success: function (response, textStatus) {
      // Get new Tasks list
      getAllTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });

}

$(document).ready( () => {

  // Get All Tasks for User ID 324 on page load
  getAllTasks();

  // Start Listener for user submitting a new task
  initTaskListener();

});