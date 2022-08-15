// Change color mode.
const switchColorBtn = document.querySelector(".c-buttomBtn");
let isDark = true
switchColorBtn.addEventListener('click', () => {
    switchColorBtn.innerText = isDark ? 'Light' : 'Dark';
    document.body.style.backgroundColor = isDark ? 'black' : 'rgb(186, 219, 226)';
    document.getElementById("c-main").style.borderColor = isDark ? 'rgb(186, 219, 226)' : 'black';
    isDark = !isDark;
});


// Add todo.
const todos = [];
let doneTodos = [];
const input = document.querySelector(".input");
const tasks = document.querySelector('.todoUl');
input.addEventListener('keypress', (event) => {
    if (event.keyCode === 13 && input.value !== '') {
        event.preventDefault();

        // create a new object and push it into todos Array.
        // let idDate = new Date();
        const taskObj = {
            id: Date.now(),
            title: input.value
        }
        todos.push(taskObj);

        // create and design of : holder for the elements & the elements - all inside li tag.
        // tasks.style.transition = 'none';
        // tasks.style.opacity = 'initial';
        const li = document.createElement('li');
        const todoElement = document.createElement('p');
        const removeBtn = document.createElement('button');
        const doneBtn = document.createElement('button');

        li.id = taskObj.id;
        // console.log(`li.id = ${li.id} taskobj.id = ${taskObj.id}`);

        li.className = 'c-ol';
        todoElement.className = 'c-todo';
        removeBtn.className = 'c-removeBtn';
        removeBtn.innerText = 'REMOVE';
        doneBtn.className = 'c-doneBtn';
        doneBtn.innerText = 'DONE';
        todoElement.innerText = input.value;
        tasks.appendChild(li);
        li.append(todoElement, removeBtn, doneBtn);
        input.value = '';

        // Remove the object from todos list & remove elements from DOM.
        const removeTask = (e) => {
            const parentElem = e.target.parentElement;

            const todosRemoveIndex = todos.findIndex((todo) => taskObj.id == todo.id);
            //     console.log(`from tRemoveIndex: li.id = ${todo.id} taskobj.id = ${taskObj.id}`);

            todos.splice(todosRemoveIndex, 1);
            console.log('todosRemoveIndex: ' + todosRemoveIndex);
            console.log('Todos array: ' + todos);
            // li.parentElement.removeChild(li);
            parentElem.remove();

        };
        // Event Listener on Remove button.
        removeBtn.addEventListener('click', (e) => {
            removeTask(e);
        });

        // Move to done assignments.
        const doneTask = (e) => {
            console.log(typeof taskObj.id)
            console.log(typeof li.id)
            console.log(`from Move to done: li.id = ${li.id} taskobj.id = ${taskObj.id}`);

            const parentElem = e.target.parentElement;
            // console.log(parentElem)
            const todosRemoveIndex = todos.findIndex((todo) => taskObj.id == todo.id);
            console.log('todosRemoveIndex ' + todosRemoveIndex);
            const doneObj = todos.splice(todosRemoveIndex, 1);
            // console.log(doneObj)
            

            doneTodos.push(doneObj[0]);
            parentElem.remove();
        }
        // Event Listener on Done button.
        doneBtn.addEventListener('click', (e) => {
            doneTask(e);

        });

        // Show done assignments.
        const assignmentInputHolder = document.querySelector('.input');
        const newClearHolder = document.createElement('button');
        const done = document.getElementById('c-btn-done');

        done.addEventListener('click', () => {
            tasks.innerHTML = "";
            for (i in doneTodos) {
                const liDoneTasks = document.createElement('li');
                const todoElement = document.createElement('p');
                const idElement = document.createElement('p');
                liDoneTasks.className = 'c-ol';
                todoElement.className = 'c-todos-done';
                idElement.className = 'dateId';
                todoElement.innerText = doneTodos[i].title;
                idElement.innerText = 'Added Time: ' + doneTodos[i].id;
                liDoneTasks.append(todoElement, idElement);
                tasks.appendChild(liDoneTasks);
            }

            const containerHolder = document.getElementById('c-main');
            containerHolder.removeChild(assignmentInputHolder);
            // assignmentInputHolder.parentElement.removeChild(assignmentInputHolder);
            newClearHolder.className = 'c-clearHolder';
            newClearHolder.innerText = 'Clear All';
            containerHolder.insertBefore(newClearHolder, containerHolder.firstChild);


            // Still in progress.
            // function removeFadeOut(tasks, speed) {
            //     var seconds = speed / 1000;
            //     tasks.style.transition = "opacity " + seconds + "s ease";
            //     tasks.style.opacity = 0;
            //     doneTodos = [];
            //     setTimeout(function () {
            //         tasks.innerHTML = "";
            //     }, speed);
            // }

            // Event Listener on Clear All button.
            newClearHolder.addEventListener('click', (e) => {
                // removeFadeOut(document.querySelector('.todoUl'), 3000);
                // tasks.style.opacity = '0';
                // setTimeout(() => tasks.innerHTML = "", 1000);
                doneTodos = [];
                tasks.innerHTML = "";
            });

            // console.log('todos', todos);
        });

        // show todo assignment.
        const todo = document.getElementById('c-btn-todo');
        todo.addEventListener('click', () => {
            const containerHolder = document.getElementById('c-main');


            // for (let i = 0; i < containerHolder.children.length; i++) {
            //     console.log("Before " + containerHolder.children[i].tagName);
            // }

            containerHolder.removeChild(newClearHolder);
            containerHolder.insertBefore(assignmentInputHolder, containerHolder.firstChild);

            // for (let i = 0; i < containerHolder.children.length; i++) {
            //     console.log("After " + containerHolder.children[i].tagName);
            // }

            tasks.innerHTML = "";
            for (const i in todos) {
                const li = document.createElement('li');
                const removeBtn = document.createElement('button');
                const doneBtn = document.createElement('button');
                const todoElement = document.createElement('p');
                li.className = 'c-ol';
                removeBtn.className = 'c-removeBtn';
                removeBtn.innerText = 'REMOVE';
                doneBtn.className = 'c-doneBtn';
                doneBtn.innerText = 'DONE';
                todoElement.className = 'c-todo';
                todoElement.innerText = todos[i].title;
                li.append(todoElement, removeBtn, doneBtn);
                tasks.appendChild(li);

                removeBtn.addEventListener('click', (e) => {
                    removeTask(e);
                });

                doneBtn.addEventListener('click', (e) => {
                    doneTask(e);
                });
            }
        });
    }
});





