const newTodoForm = document.getElementById("new-todo-form")
const todoListForm = document.getElementById("todo-list-form")
const itemTodoListFragment = document.getElementById("item-todo-list").content
const inputNewItem = document.getElementById("new-todo-item")
const todoList = document.querySelector(".todo-list")
const fragment = document.createDocumentFragment()
const filterList = document.querySelector(".filter__list")
const clearComplete = document.querySelector(".filter__remove")
const changeTheme = document.getElementById("toogle-icon-theme")




let itemList = {
    1628966502607:{
        id: 1,
        text: "Complete online Javascript course",
        checked: true
    },
    1628966506818:{
        id: 2,
        text: "Jog around the park 3x",
        checked: false
    },
    1628966538107:{
        id: 3,
        text: "10 minutes meditation",
        checked: false
    },
    1628966553516:{
        id: 4,
        text: "Read for 1 hour",
        checked: false
    },
    1628966569491:{
        id: 5,
        text: "Pick up groseries",
        checked: false
    },
    1628966582733:{
        id: 6,
        text: "Complete Todo App on Frontend Mentor",
        checked: false
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("itemList")){
        itemList = JSON.parse(localStorage.getItem("itemList"))
    }
    drawHomework()
})

//Add new item
newTodoForm.addEventListener("submit", e =>{
    e.preventDefault()
    console.log(inputNewItem.value)
    setTarea(e)
    resetColorFilter()
})

//check checkbox item
todoList.addEventListener("click", e =>{
    checkCheckbox(e)
    deleteItemList(e)
    
})

//filter 
filterList.addEventListener("click", e =>{
    // funtion color change
    colorChangeFilter(e)
    // funtion filter active item
    activeItemList(e)
})

//remove clear complete
clearComplete.addEventListener("click", e =>{

    removeClearComplete()
    resetColorFilter()

})

//change theme

changeTheme.addEventListener("click", e =>{
    changeThemePages(e)
})
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
    localStorage.setItem("itemList", JSON.stringify(itemList))


    console.log(itemList)
    const filterCounter = document.querySelector(".filter__remaining")
    todoList.innerHTML= ""
    // console.table(Object.entries(itemList))
    Object.entries(itemList).forEach(item => {
        const cloneTemplate = itemTodoListFragment.cloneNode(true)
        cloneTemplate.getElementById("inputJob").value = item[1].text
        cloneTemplate.getElementById("inputJob").previousElementSibling.setAttribute("for", item[0])
        cloneTemplate.getElementById("inputJob").previousElementSibling.previousElementSibling.checked = item[1].checked
        if(item[1].checked){
            cloneTemplate.getElementById("inputJob").classList.add("form__input--line-through")
        }
        cloneTemplate.getElementById("inputJob").previousElementSibling.previousElementSibling.setAttribute("id", item[0])
        cloneTemplate.getElementById("inputJob").nextElementSibling.setAttribute("id", item[0])
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
            resetColorFilter()
            // console.log(itemList)
        } else {
            itemList[e.target.id].checked = true
            drawHomework()
            resetColorFilter()
            // console.log(itemList)
        }     

    }

    e.stopPropagation()
}

const deleteItemList = e =>{

    if(e.target.classList.contains("form__button")){
        delete  itemList[e.target.id]
        drawHomework()
        resetColorFilter()
        console.log(itemList)
      
    }
    
}

const resetColorFilter = e =>{
    const all = filterList.childNodes[1].childNodes[1]
    const active = filterList.childNodes[3].childNodes[1]
    const complete = filterList.childNodes[5].childNodes[1]

    all.classList.remove("filter__button--active")
    active.classList.remove("filter__button--active")
    complete.classList.remove("filter__button--active")
    all.classList.add("filter__button--active")


    
}

const colorChangeFilter = e =>{
    const all = filterList.childNodes[1].childNodes[1]
    const active = filterList.childNodes[3].childNodes[1]
    const complete = filterList.childNodes[5].childNodes[1]

    if(e.target.classList.contains("filter__button")){
        all.classList.remove("filter__button--active")
        active.classList.remove("filter__button--active")
        complete.classList.remove("filter__button--active")
        e.target.classList.add("filter__button--active")

    }
}

const activeItemList = e =>{
    console.log(e.target)

    if(e.target.textContent.includes("All")){
        console.log(itemList)
        drawHomework()
    }

    if(e.target.textContent.includes("Active")){
        let renewListItem = itemList
        const countCheked = Object.values(itemList).filter(chekados => chekados.checked === false)
        itemList = {...countCheked}
        console.log(countCheked)
        drawHomework()
        itemList = renewListItem
    }

    if(e.target.textContent.includes("Completed")){
        let renewListItem = itemList
        const countCheked = Object.values(itemList).filter(chekados => chekados.checked === true)
        itemList = {...countCheked}
        console.log(countCheked)
        drawHomework()
        itemList = renewListItem
    }
}

const removeClearComplete = (e) =>{
    const listDelete = Object.values(itemList).filter(chekados => chekados.checked === false)
    console.log(listDelete)
    itemList = {...listDelete}
    drawHomework()
}

const changeThemePages = (e) =>{
    // img.src = 
    if(e.target.parentNode.parentNode.classList.contains("dark-theme")){
        e.target.setAttribute("src", "./assets/images/icon-moon.svg")
        e.target.parentNode.parentNode.classList.remove("dark-theme")
        e.target.parentNode.parentNode.classList.add("light-theme")
    } else {
        e.target.setAttribute("src", "./assets/images/icon-sun.svg")
        e.target.parentNode.parentNode.classList.remove("light-theme")
        e.target.parentNode.parentNode.classList.add("dark-theme")
    }
    // console.log(e.target.setAttribute("src", "./assets/images/icon-moon.svg"))
}

 
