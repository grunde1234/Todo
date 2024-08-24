const todo = JSON.parse(localStorage.getItem('todo')) || [];

let word = document.querySelector('.js-add-todo');
let date = document.querySelector('.js-date');

export function displayList() {
    let listed = '';

    todo.forEach((list) => {
        listed += `<div class="js-list list">
            <input type="checkbox" class="delete-todo js-delete-todo" name="" id="">
            ${list.List} ${list.Dated}
        </div>`;
    });

    document.querySelector('.js-add-to-list').innerHTML = listed;

    // Reassign event listeners for delete buttons
    document.querySelectorAll('.js-delete-todo').forEach((element) => {
        element.addEventListener('click', () => {
            // Find the closest todo item container
            const todoItem = element.closest('.js-list');
            if (todoItem) {
                // Add the 'crossed' class to visually mark the item as completed
                todoItem.classList.add('crossed');

                // Delete the item from the todo list after a delay
                setTimeout(() => {
                    deleteItem(todoItem);
                    displayList();
                }, 2000);
            }
        });
    });
}

function addToList() {
    let listWord = word.value;
    let listDate = date.value;


    if (listWord === '') {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Nothing to add!",
          });
    } else {
        todo.push({
            List: listWord,
            Dated: listDate
        });
    }

    displayList();
    word.value = '';
    saveData();
}

document.querySelector('.js-list-button').addEventListener('click', () => {
    addToList();
    //console.log(todo);
});

document.querySelector('.js-add-todo').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addToList();
    }
});

function deleteItem(todoItem) {
    // Find the index of the item in the array based on some identifier
    const index = Array.from(document.querySelectorAll('.js-list')).indexOf(todoItem);

    if (index > -1) {
        todo.splice(index, 1); // Remove the item from the todo array
        todoItem.remove(); // Remove the item from the DOM
    }
    saveData(); // Save the updated todo array to local storage
}
    //Type animation
        var options = {
            strings: ["Todo website ✏️", "Type in activities!", "Get started."],
            typeSpeed: 60,
            backSpeed: 25,
            loop: true,
            backDelay: 1000,
            startDelay: 500,
        };

        
        var typed = new Typed(".js-head", options);

function saveData() {
    localStorage.setItem('todo', JSON.stringify(todo));

}

// Initial display of the todo list
displayList();

/* If the item is found (i.e., index is not -1), the item is removed from the todo array using splice(), and the corresponding DOM element is removed with remove(). */