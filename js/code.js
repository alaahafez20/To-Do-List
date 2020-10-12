const clear = document.querySelector('.clear')
const date = document.getElementById('date')
const content = document.querySelector('.content')
const list = document.getElementById('list')
const input = document.getElementById('input')
const addIcon = document.getElementById('addIcon')
let itemsStore = []
let Id;

if(localStorage.length > 0){
    itemsStore = JSON.parse(localStorage.getItem('toDo'))
    Id = itemsStore[itemsStore.length-1].Id + 1
    itemsStore.forEach(s => addToDo(s.Name, s.Id, s.Done));
}
else{
    Id = 0
}

date.innerHTML = new Date().toLocaleDateString('en-GB', {weekday:'long',month:'short',day:'numeric'})

function addToDo(todo, id, done){
    let DONE = done? 'fa-check-circle' : 'fa-circle'
    let LINE = done? 'lineThrough' : ''
    let item = `
    <li class='item' id='${id}'>
       <i class="far ${DONE} co" onClick='completeToDo(${id})'></i>
       <p class="text ${LINE}">${todo}</p>
       <i class="far fa-trash-alt de" onClick='removeToDo(${id})'></i>
    </li>
    `
    list.insertAdjacentHTML("beforeend", item)    
}

document.addEventListener('keyup', function(e){
    if(input.value && e.keyCode == 13){
        addToDo(input.value, Id, false)
        itemsStore.push({Name:input.value, Id:Id, Done:false})
        localStorage.setItem('toDo',JSON.stringify(itemsStore))
        Id++
        input.value = ''
    }
})

addIcon.addEventListener('click', function(){
    if(input.value){
        addToDo(input.value, Id, false, false)
        itemsStore.push({Name:input.value, Id:Id, Done:false})
        localStorage.setItem('toDo',JSON.stringify(itemsStore))
        Id++
        input.value = ''
    }
})

clear.addEventListener('click', function(){
    localStorage.clear()
    location.reload()
})

function completeToDo(id){
    let itemI = document.getElementById(id)
    const itemText = itemI.children[1]
    itemI.firstElementChild.classList.toggle('fa-check-circle')
    itemI.firstElementChild.classList.toggle('fa-circle')
    itemText.classList.toggle('lineThrough')
    completedItemIndex = itemsStore.indexOf(itemsStore.find(t => t.Id == id))
    itemsStore[completedItemIndex].Done = itemsStore[completedItemIndex].Done? false : true; 
    localStorage.setItem('toDo',JSON.stringify(itemsStore))
}

function removeToDo(id){
    let itemI = document.getElementById(id)
    itemI.remove()
    let deletedItemIndex = itemsStore.indexOf(itemsStore.find(t => t.Id == id))
    itemsStore.splice(deletedItemIndex,1)
    localStorage.setItem('toDo',JSON.stringify(itemsStore))
}


