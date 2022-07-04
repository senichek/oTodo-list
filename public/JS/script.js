// This file handles the clicks;
const app  = {
    baseURL: "http://localhost:3000",
    // Removes the error message on click
    handleErrorNotification: () => {
        const errorNotificationElement = document.querySelector(".error-notification");
        if (errorNotificationElement) {
            errorNotificationElement.addEventListener("click", () => {
                errorNotificationElement.remove();
            })
        }
    },

    handleDeleteTaskClick: () => {
        const deleteTaskElements = document.querySelectorAll("#task-icons-delete");
        if (deleteTaskElements.length > 0) {
            for (el of deleteTaskElements) {
                el.addEventListener("click",async (event) => {
                const taskId = event.target.dataset.taskId;
                const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
                taskElement.remove();
                const response = await fetch(`${app.baseURL}/tasks/${taskId}`, {
                    method: 'DELETE'
                  });
                  console.log("Deleteion response", response);
                })
            }
        }
    },

    handleEditTaskClick: () => {
        const editTaskElements = document.querySelectorAll("#task-icons-edit");
        if (editTaskElements.length > 0) {
            for (el of editTaskElements) {
                el.addEventListener("click", (event) => {
                const taskId = event.target.dataset.taskId;
                const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
                const taskName = taskElement.querySelector(".task-name");
                // On the click the name of the task becomes editable
                // To emphisize it the border is applied.
                taskName.contentEditable = true;
                taskName.style.border = "2px solid black";
                taskName.style.borderRadius = "6px";

                // When you finish editing and click elsewhere, focusout is triggerred
                taskName.addEventListener("focusout", async (event) => {
                    const newTaskName = event.target.innerText;
                    taskName.textContent = newTaskName;
                    taskName.style.removeProperty('border');
                    taskName.style.removeProperty('borderRadius');
                    // Make it uneditable again
                    taskName.contentEditable = false;

                    // Fetch request to update db
                    const data = {
                        taskId: taskId,
                        taskName: newTaskName
                    }
                    const response = await fetch(`${app.baseURL}/tasks/${taskId}`, {
                        method: 'PUT', 
                        headers: {
                           'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                      });
                  });
                })
            }
        }
    },

    handleTagClick: () => {
        const tagElements = document.querySelectorAll(".bi-tag");
        if (tagElements.length > 0) {
            for (el of tagElements) {
                el.addEventListener("dblclick", async (event) => {
                const taskId = event.target.dataset.taskId;
                const tagName = event.target.innerText;
                const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
                // Tags inside of task
                const allTagsElems = taskElement.querySelectorAll(".bi-tag");
                // Find the tagElement we'd like to remove
                for (const el of allTagsElems) {
                    if (el.innerText === tagName) {
                        el.remove();
                    }
                }
                const response = await fetch(`${app.baseURL}/tasks/${taskId}/tags/${tagName}`);
                console.log("Removed tag", response);
                })
            }
        }
    },

    handleAddTagClick: () => {
        const modalElement = document.querySelector("#add-tag-modal");
        const addTagElements = document.querySelectorAll(".bi-plus-circle-fill");
        for (const el of addTagElements) {
            el.addEventListener("click", async (event) => {
                const taskId = el.dataset.taskId;
                // Create divs to put the tags in it
                const tagsContanerElement = document.createElement("div");
                tagsContanerElement.classList.add("tags-collection-container");
                // Show modal
                modalElement.classList.add("is-active");
                // Populate modal
                const response = await fetch(`${app.baseURL}/tags`);
                const tags = await response.json();
                console.log("tags", tags);
                const modlBodyElement =  document.querySelector(".modal-card-body");
                modlBodyElement.appendChild(tagsContanerElement);
                for (const tag of tags) {
                   const tagElement = document.createElement("div");
                   tagElement.classList.add("tags-collection__single-tag");
                   tagElement.setAttribute("data-tag-id", tag.id);
                   tagElement.textContent = tag.name;
                   tagsContanerElement.appendChild(tagElement);

                   // When you click a tag, it will be added to the task
                   // and db will be updated too.
                   tagElement.addEventListener("click", async (event) => {
                        // Get the tags attached to a task:
                        // Find the task by its id
                        const tasksElements = document.querySelectorAll(".task");
                        let task;
                        const clickedTagName = event.target.innerText;
                        const currentTagsNames = []; // Names of the tags currently attached to a task
                        for (const el of tasksElements) {
                            if (el.dataset.taskId === taskId) {
                                task = el;
                            }
                        }
                        if (task) {
                            // Get all tags from the task
                            const tagsElements = task.querySelectorAll(".bi-tag");
                            for (const el of tagsElements) {
                                currentTagsNames.push(el.innerText);
                            }
                            // If the tag we clicked is not present in the list
                            // we add it to the task (we do not want to add duplicates)
                            const tagExists = currentTagsNames.find(el => el === clickedTagName);
                                // Create new tag element and attach it to the task
                                if(!tagExists) {
                                    const tagElem = document.createElement("i");
                                    tagElem.classList.add("bi");
                                    tagElem.classList.add("bi-tag");
                                    tagElem.setAttribute("id", "tag-icon");
                                    tagElem.setAttribute("data-task-id", taskId);
                                    tagElem.textContent = clickedTagName;
                                    // Attach to the beginning of the list
                                    task.children[3].insertAdjacentElement("afterbegin", tagElem);
                                    // After new tag is created, we need to assign events to it
                                    app.handleTagClick();
                                    // Update db
                                    console.log("TaskID", taskId);
                                    console.log("TagID", tag.id);
                                    const response = await fetch(`${app.baseURL}/tasks/${taskId}/tags/${tag.id}`, {
                                        method: "POST"
                                    });
                                    console.log("Attached tag", response);
                                }
                        }
                   })
                }
            });
        }

        const closeModalElement = document.querySelector(".delete");
        if (closeModalElement) {
            closeModalElement.addEventListener("click", () => {
                // Clear the modal content
                const tagsCollectionElement = document.querySelector(".tags-collection-container");
                tagsCollectionElement.remove();
                // Hide modal
                //modalElement.classList.remove("is-active");
            })
        }
    },

    closeModal: () => {
        const closeModalElements = document.querySelectorAll(".delete");
        const modalElements = document.querySelectorAll(".modal");
        for (const el of closeModalElements) {
            el.addEventListener("click", (event) => {
                for (const elem of modalElements) {
                    elem.classList.remove("is-active");
                }
            })
        }
    },

    handleLoginInfoClick: () => {
            const loginInfoElement = document.querySelector(".login-info-container");
            if (loginInfoElement) {
                loginInfoElement.addEventListener("click", (event) => {
                    const infoElem = document.querySelector(".login-info");
                    // If the message hidden - show it
                    if (infoElem.hasAttribute("hidden")) {
                        infoElem.removeAttribute("hidden");
                        // Otherwise - hide it
                    } else {
                        infoElem.setAttribute("hidden", "");
                    }
                })
            }   
    },

    handleAddTaskClick: () => {
            const addTaskButtonElement = document.querySelector(".add-task-btn");
            if (addTaskButtonElement) {
                addTaskButtonElement.addEventListener("click", (event) => {
                    const modalElement = document.querySelector("#add-task-modal");
                    modalElement.classList.add("is-active");
                })
            }
    },

    init: () => {
        app.closeModal();
        app.handleErrorNotification();
        app.handleDeleteTaskClick();
        app.handleEditTaskClick();
        app.handleTagClick();
        app.handleAddTagClick();
        app.handleLoginInfoClick();
        app.handleAddTaskClick();
    }
}

document.addEventListener('DOMContentLoaded', app.init);