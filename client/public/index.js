//--- global variables ---
let readButtonEl = document.getElementById("read")
let createButtonEl = document.getElementById('create')
let updateButtonEl = document.getElementById('update')
updateButtonEl.addEventListener('click', updateTask)
let isShow = false


//--- function appending the cards of task to the page ---
function appendCards(data) {
    data.forEach(element => {
        console.log(element)
        let exsistingCards = document.getElementById(`${element.id}`)
        if (exsistingCards) {
            exsistingCards.remove();
        }
        let cardEl = document.createElement('div')
        cardEl.setAttribute('id', `${element.id}`)
        cardEl.classList.add('card')
        cardEl.innerHTML += (makeCard(element))
        document.body.append(cardEl)
    });
}


//--- function deleting a task---
function deleteTask(id) {
    let deletedCard = document.getElementById(id)
    deletedCard.remove();
    fetch(`/api/task/${id}`, { method: 'DELETE' })
}


//--- function getting all of the task ---
function getTask() {
    fetch('/api/task')
        .then(res => res.json())
        .then(data => appendCards(data))
}

//---function that updates the completed status of task---
function completeTask(id) {
    fetch(`api/task/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'completed': true, }),
    })
        .then(response => response.text())
        .then(() => {
            getTask();
        })
}

//--- function that updates task info ---
function updateTask() {
    let id = document.getElementById('task id').value
    let name = document.getElementById('key').value || null
    let priority = document.getElementById('value').value || null
    console.log(id, key, value)
    fetch(`api/task/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, priority: priority }),
    })
        .then(response => response.text())
        .then(() => {
            getTask();
        })
}



//--- adding the event listener to the read button ---
readButtonEl.addEventListener('click', getTask)


//--- adding the event listener and function to create button ---
createButtonEl.addEventListener('click', function () {
    let taskname = document.getElementById("name text").value
    let taskpriority = document.getElementById('priority text').value
    fetch(`api/task`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'name': taskname, 'priority': taskpriority }),
    })
        .then(response => response.text())
        .then(() => {
            getTask();
        })
})


//--- function creating the cards that have the task info ---
function makeCard(element) {
    return ` 
    <h1> ${element.id}</h1>
    <h1>${element.name}</h1>
    <h2>Priority: ${element.priority}</h2>
    <h2>Completed? ${element.completed}</h2>
    <button onclick = "(deleteTask(${element.id}))" class = 'button' id = "button">Delete task</button>
    <button onclick = "(completeTask(${element.id}))" class = 'button' id = "button">Mark as complete</button>`
}




