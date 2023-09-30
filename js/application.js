.// GET All Tasks
function getAllTasks() {

  $.ajax({
    type: 'GET',
    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=324',
    dataType: 'json',
    success: function (response, textStatus) {
      console.log(response);
      // response is a parsed JavaScript object instead of raw JSON

      // Clear Tasks list first
      $(".tasks-list").html("");

      // On, Success, begin adding Tasks to DOM
      response.tasks.forEach(task => {

        $(".tasks-list").append($("<div class='row'>" + task.content + "</div>"));

      });
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });

}

// POST New Task
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

$(document).ready( () => {

  // Get All Tasks for User ID 324 on page load
  getAllTasks();

  // Start Listener for user submitting a new task
  initTaskListener();

});