
window.addEventListener('load', () =>{
    todo_list = JSON.parse(localStorage.getItem('todos')) || [];
    const form = document.querySelector('#new-task-form');

    form.addEventListener('submit', (e) =>{
        e.preventDefault();

        const todo ={
            content: e.target.elements.content.value,
        }

        todo_list.push(todo);

        localStorage.setItem('todos', JSON.stringify(todo_list));
        e.target.reset();
        
        displayList();
    });
    displayList();
});

function displayList () {
    //The main "head" of all the tasks being displayed. it will have to have all the elements under here.
    const doList = document.querySelector('#tasks');

    doList.innerHTML = '';

    //ToDo: Sort through each element within the localStorage to display them.
    todo_list.sort().forEach(todo => {
        //creates the list that will contain all tasks
        const item = document.createElement('div');
        item.classList.add('task')

        //creating all the constants that is needed to add in the todo item.
        const item_content = document.createElement('div');
        const item_input = document.createElement('input');
        const item_action = document.createElement('div');
        const item_edit = document.createElement('button');
        const item_delete = document.createElement('button');


        //adds everything into the correct list to add into the main container.
        item_content.classList.add('content');
        item_input.classList.add('text');
        item_action.classList.add('actions');
        item_edit.classList.add('edit');
        item_delete.classList.add('delete');

        //sets all the types and values for all the const.
        item_input.type = 'checkbox';
        item_input.checked = todo.done;
        item_content.innerHTML = `<input type="text" class="text" value="${todo.content}" readonly>`
        item_edit.innerHTML = "Edit";
        item_delete.innerHTML = "Delete";

        //appends everything to the container.
        item.appendChild(item_content);
        item_content.appendChild(item_input);
        item_action.appendChild(item_edit);
        item_action.appendChild(item_delete);
        item.appendChild(item_action);
        doList.appendChild(item);

        //ToDo: Create an event listener to edit the task details.
        item_edit.addEventListener('click', e =>{
            item_edit.innerHTML = "Save";
            const input = item_content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e =>{
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todo_list));
                //reload the page to keep to keep it updated.
                displayList();
                item_edit.innerHTML = "Edit";
            });
        });

        //ToDo: Create an event listener to remove the task once compeleted.
        item_delete.addEventListener('click', e =>{
            todo_list = todo_list.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todo_list));
            displayList();
        });  
    });
}
