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

        let checkbox;

        task.completed ? 
          checkbox = $("<input class='checkbox col-xs-1' type='checkbox' checked>") : 
          checkbox = $("<input class='checkbox col-xs-1' type='checkbox'>");

        let newTask = $("<div class='task row'></div>");

        let removeTaskButton = $("<button class='remove-task-button col-xs-1'>Remove</button>");

        $(".tasks-list").append(newTask);

        newTask.append(checkbox);

        newTask.append("<div class='col-xs-4'>" + task.content + "</div>");

        newTask.append(removeTaskButton);

        checkbox.on("change", () => {

          // if task is complete, mark as complete
          if (checkbox[0].checked) {

            markComplete(task.id);

          }

          // if task is not complete, mark as active
          else {

            markActive(task.id);

          }

        });

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

// PUT Task Complete (/tasks/:id/mark_complete)
function markComplete(id) {

  $.ajax({
    type: 'PUT',
    url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=324',
    dataType: 'json',
    success: function (response, textStatus) {
      console.log(response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });

}

// PUT Task Active (/tasks/:id?mark_active)
function markActive(id) {

  $.ajax({
    type: 'PUT',
    url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=324',
    dataType: 'json',
    success: function (response, textStatus) {
      console.log(response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });

}


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