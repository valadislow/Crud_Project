# Crud_Project

I think that was one of the newest parts of the code to understand how to dynamically handle crud_operations

$(document).on("click", ".crud_buttons button", (e) => {
    const target = $(e.target);
    handler(target[0]);
});

#1. Create
Process:

Ceating new task, to pop up on the list of tasks 
Dynamically generate input fields for entering a new task.
Push the new task into the Tasks array and render it in the UI.
Re-enable the Create Task button after adding the task.
Code:

const createTask = (event) => {
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

        Tasks.push(newTask);

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

        $(".wrapper").append(taskBox);

        $("button.createButton").prop("disabled", false);
        createPara.remove();

        alert("The new Task was successfully created!");
    });
};

#2. Read
Process:

Display the details about the each task on the webpage
Show the task description within the UI dynamically.
Code:

const viewHandler = (index) => {
    let info = $(".DescriptionLine:eq(" + index + ")");
    info.html(`${Tasks[index].task} date: ${Tasks[index].date}<p></p>deadline: ${Tasks[index].deadline}             
        <button class="close">x</button>`);

    info.find(".close").on("click", () => {
        setTimeout(function () {
          info.html("");
        }, 1000);
    });
};

#3. Update

Ability to update each task with new infformation or to correct it
Display pre-filled input fields for editing a task.
Update both the Tasks array and the UI based on new input values.
Code:

const updateHandler = (index) => {
    $("button.createButton").prop("disabled", true);

    let updateForm = $(`
        <div class="updateInputs">
            <input type="text" id="update_task" value="${Tasks[index].task}" size="12"/> 
            <input type="text" id="update_date" value="${Tasks[index].date}" size="10"/> 
            <input type="text" id="update_deadline" value="${Tasks[index].deadline}" size="10"/> 
            <button class="save_update">Save</button>
        </div>
    `);

    $(".taskBox").eq(index).append(updateForm);

    $(".save_update").on("click", function () {
        let updatedTask = $("#update_task").val();
        let updatedDate = $("#update_date").val();
        let updatedDeadline = $("#update_deadline").val();

        if (!updatedTask || !updatedDate || !updatedDeadline) {
            alert("Please fill out all fields!");
            return;
        }

        Tasks[index] = {
            taskNum: Tasks[index].taskNum,
            task: updatedTask,
            date: updatedDate,
            deadline: updatedDeadline
        };

        let taskBox = $(".taskBox").eq(index);
        taskBox.find("h2").text(`Task ${Tasks[index].taskNum}`);
        taskBox.find(".DescriptionLine").html(`
            Task: ${updatedTask} <br> 
            Date: ${updatedDate} <br> 
            Deadline: ${updatedDeadline}
        `);

        updateForm.remove();
        $("button.createButton").prop("disabled", false);

        alert("Task updated successfully!");
    });
};

#4. Delete
Process:

removing the whole task from the webpage and from the array
Notify the user that the task has been deleted.
Code:

const removeHandler = (index) => {
    let item = $(".wrapper .taskBox").eq(index);
    item.remove();
    Tasks.splice(index, 1);
    alert("The Task was successfully deleted!");
};
Event Handling and Rendering
Attach the Create Task functionality to the button:
$(document).on("click", ".createButton", createTask);
Dynamically handle CRUD operations:

