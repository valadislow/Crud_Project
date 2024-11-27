
let tasksLength = Tasks.length
console.log(tasksLength)

$(document).ready(function() {
    wrapper = $("<div class='wrapper'></div>");
    $("body").append(wrapper);

    let createButton = $('<button class="createButton">Create Task</button>');
    $(".wrapper").append(createButton)

    Tasks.forEach(task => {
        let taskBox = $(`<div class="taskBox"><h2>task${task.taskNum}</h2></div>`);
        $(".wrapper").append(taskBox)
    });

    let descriptionLine = $(`
        <div class="DescriptionLine"></div>
        <div class="crud_buttons">
        <button class ="view">Read</button>
        <button class ="update">Update</button>
        <button class ="delete">Delete</button></div>`);
        $(".view").css({
            "color": "black"
        })
    $(".taskBox").append(descriptionLine);

});     

const handler = (element) => {
    console.log(element);
    let elementClass = element.className;
    console.log(elementClass);
    let indexOfTask = $(`button.${elementClass}`).index(element);
    console.log(indexOfTask);
    if (elementClass == "view") {
      viewHandler(indexOfTask);
    } else if ((elementClass == "update")) {
      updateHandler(indexOfTask);
    } else if (elementClass == "delete") {
      removeHandler(indexOfTask);
    }
  };

  const viewHandler = (index) => {
    console.log("reading")
    let info = $(".DescriptionLine:eq(" + index + ")");
    info.html(`${Tasks[index].task} date: ${Tasks[index].date}<p></p>deadline: ${Tasks[index].deadline}             
        <button class="close">x</button>`)
    console.log("viewhandler", index);
    info.find(".close").on("click", () => {
        setTimeout(function () {
          // !!! Use .html to reset the content
          info.html("");
        }, 1000);
      });
};

const updateHandler = (index) => {
    // Disable the Create Task button to avoid conflicts
    $("button.createButton").prop("disabled", true);

    // Dynamically create input fields pre-filled with the task's current values
    let updateForm = $(`
        <div class="updateInputs">
            <input type="text" id="update_task" value="${Tasks[index].task}" size="12"/> 
            <input type="text" id="update_date" value="${Tasks[index].date}" size="10"/> 
            <input type="text" id="update_deadline" value="${Tasks[index].deadline}" size="10"/> 
            <button class="save_update">Save</button>
        </div>
    `);

    // Append the update form after the corresponding task
    $(".taskBox").eq(index).append(updateForm);

    // Handle the Save button click
    $(".save_update").on("click", function () {
        // Get updated values
        let updatedTask = $("#update_task").val();
        let updatedDate = $("#update_date").val();
        let updatedDeadline = $("#update_deadline").val();

        // Validate inputs
        if (!updatedTask || !updatedDate || !updatedDeadline) {
            alert("Please fill out all fields!");
            return;
        }

        // Update the task in the `Tasks` array
        Tasks[index] = {
            taskNum: Tasks[index].taskNum, // Retain the task number
            task: updatedTask,
            date: updatedDate,
            deadline: updatedDeadline
        };

        // Update the displayed task in the DOM
        let taskBox = $(".taskBox").eq(index);
        taskBox.find("h2").text(`Task ${Tasks[index].taskNum}`);
        taskBox.find(".DescriptionLine").html(`
            Task: ${updatedTask} <br> 
            Date: ${updatedDate} <br> 
            Deadline: ${updatedDeadline}
        `);

        // Remove the update form and re-enable the Create Task button
        updateForm.remove();
        $("button.createButton").prop("disabled", false);

        console.log("Task Updated:", Tasks[index]);
    });
};

  
const removeHandler = (index) => {
        let item = $(".wrapper .taskBox").eq(index);
        item.remove();
        Tasks.splice(index, 1);
        console.log("Task removed successfully!", Tasks);
        alert("The Task was succesfully deleted!")
}

const createTask = (event) => {
    // Disable the Create Task button to prevent multiple clicks
    $("button.createButton").prop("disabled", true);

    let createPara = $(`
        <div class="createInputs">
            <input type="text" id="new_task" placeholder="Task Name" size="12"/> 
            <input type="text" id="new_date" placeholder="Start Date" size="10"/> 
            <input type="text" id="new_deadline" placeholder="Deadline" size="10"/> 
            <button class="save_new">Save</button>
        </div>
    `);

    $("button.createButton").append(createPara);

    // Save button functionality
    $(".save_new").on("click", function () {
        let newTask = {
            taskNum: Tasks.length + 1, 
            task: $("input#new_task").val(),
            date: $("input#new_date").val(),
            deadline: $("input#new_deadline").val()
        };

        if (!newTask.task || !newTask.date || !newTask.deadline) {
            alert("Please fill out all fields!");
            return;
        }

        // Push the new task to Tasks array
        Tasks.push(newTask);

        // Create a new task box dynamically
        let taskBox = $(`
            <div class="taskBox">
                <h2>Task ${newTask.taskNum}</h2>
                <div class="DescriptionLine"></div>
                <div class="crud_buttons">
                    <button class="view">Read</button>
                    <button class="update">Update</button>
                    <button class="delete">Delete</button>
                </div>
            </div>
        `);

        // Append the new task box to the wrapper
        $(".wrapper").append(taskBox);

        // Re-enable the Create Task button and remove input fields
        $("button.createButton").prop("disabled", false);
        createPara.remove();

        console.log("New Task Added:", newTask);
        console.log("Updated Tasks List:", Tasks);
        alert("The new Task was succesfully created!")

    });
};

// Attach the createTask function to the Create Task button
$(document).on("click", ".createButton", createTask);

// Attach event listeners for CRUD operations
$(document).on("click", ".crud_buttons button", (e) => {
    const target = $(e.target);
    handler(target[0]);
});

// Hover effect for task boxes
$(document).on("mouseover", ".taskBox", function () {
    $(this).css({
        width: "200px",
        height: "200px",
        transition: "all 0.3s ease"
    });
}).on("mouseout", ".taskBox", function () {
    $(this).css({
        width: "150px",
        height: "180px"
    });
});





