const newTodoForm = document.getElementById("new-todo-form")
const todoListForm = document.getElementById("todo-list-form")
const itemTodoListFragment = document.getElementById("item-todo-list").content
const inputNewItem = document.getElementById("new-todo-item")
const todoList = document.querySelector(".todo-list")
const fragment = document.createDocumentFragment()
const filterList = document.querySelector(".filter__list")




let itemList = {
    00001:{
        id: 1,
        text: "Complete online Javascript course",
        checked: true
    },
    00002:{
        id: 2,
        text: "Jog around the park 3x",
        checked: false
    },
    00003:{
        id: 3,
        text: "10 minutes meditation",
        checked: false
    },
    00004:{
        id: 4,
        text: "Read for 1 hour",
        checked: false
    },
    00005:{
        id: 5,
        text: "Pick up groseries",
        checked: false
    },
    00006:{
        id: 6,
        text: "Complete Todo App on Frontend Mentor",
        checked: false
    }
}

document.addEventListener("DOMContentLoaded", () => {
    drawHomework()
})

//Add new item
newTodoForm.addEventListener("submit", e =>{
    e.preventDefault()
    console.log(inputNewItem.value)
    setTarea(e)
})

//check checkbox item
todoList.addEventListener("click", e =>{
    checkCheckbox(e)
    deleteItemList(e)
    
})

//filter color change
filterList.addEventListener("click", e =>{
    colorChangeFilter(e)
})

// //delete item
// todoListForm.addEventListener("click", e =>{
//     e.preventDefault()
//     console.log(e.target)
//     // deleteItemList(e)
// })

const setTarea = e =>{
    if(inputNewItem.value.trim() === ""){
        console.log("campo vacio")
        return
    }

    const addJob = {
        id: Date.now(),
        text: inputNewItem.value,
        checked: false
    }

    itemList[addJob.id] = addJob
    
    newTodoForm.reset()
    inputNewItem.focus()

    drawHomework()
}

const drawHomework = () =>{
    const filterCounter = document.querySelector(".filter__remaining")
    todoList.innerHTML= ""
    Object.values(itemList).forEach(item => {
        const cloneTemplate = itemTodoListFragment.cloneNode(true)
        cloneTemplate.getElementById("inputJob").value = item.text
        cloneTemplate.getElementById("inputJob").previousElementSibling.setAttribute("for", item.id)
        cloneTemplate.getElementById("inputJob").previousElementSibling.previousElementSibling.setAttribute("id", item.id)
        cloneTemplate.getElementById("inputJob").previousElementSibling.previousElementSibling.checked = item.checked
        cloneTemplate.getElementById("inputJob").nextElementSibling.setAttribute("id", item.id)
        fragment.appendChild(cloneTemplate)
    })
    todoList.appendChild(fragment)
    const countCheked = Object.values(itemList).filter(chekados => chekados.checked === false)
    filterCounter.textContent = `${countCheked.length} items left`
}

const checkCheckbox = e =>{
    
    if(e.target.classList.contains("form__input--checkbox")){
        if(itemList[e.target.id].checked){
            itemList[e.target.id].checked = false
            drawHomework()
            // console.log(itemList)
        } else {
            itemList[e.target.id].checked = true
            drawHomework()
            // console.log(itemList)
        }     

    }

    e.stopPropagation()
}

const deleteItemList = e =>{

    if(e.target.classList.contains("form__button")){
        delete  itemList[e.target.id]
        drawHomework()
        console.log(itemList)
      
    }
    
}

const colorChangeFilter = e =>{
    if(e.target.classList.contains("filter__button")){
        e.target.classList.add("filter__button--active")
        console.log(e.target)
    }
}