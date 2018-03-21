//store data in an object
data = (localStorage.getItem("uncompletedList")) ? JSON.parse(localStorage.getItem("uncompletedList")) : {
  uncompleted: [],
  completed: []
};

//Dom elements
const add = document.querySelector(".add");
const appInput = document.querySelector(".app-input");

//inner HTML assigned to variables
const removeIcon = '<i class="fa fa-trash icon"></i>';
const completeIcon = '<i class="fa fa-check icon"></i>';

//add li to the DOM from local storage
renderToDoList();


//listen for click at add button
add.addEventListener("click", function() {
  let value = appInput.value;
  if(value) {
    addLi(value)

    //local storage -  push value to array in data object
    data.uncompleted.push(value);
    dataObjectUpdated();
  } 
})


//listen for push Enter (in input)
appInput.addEventListener("keydown", function(e) {
  let value = this.value;
  if(e.code === "Enter" && value) {
    addLi(value);

    //local storage -  push value to array in data object
    data.uncompleted.push(value);
    dataObjectUpdated();
  }
})


//add li to the DOM from local storage
function renderToDoList() {
  //if arrays from data object are empty function returns nothing
  if(!data.uncompleted.length && !data.completed.length) return;

  //if neither of them are empty - loop through them and add it to the DOM
  for(let i = 0; i < data.uncompleted.length; i++) {
    let value = data.uncompleted[i];
    addLi(value)
  }

  for(let j = 0; j < data.completed.length; j++) {
    let value = data.completed[j];
    addLi(value,true);
  }
}

//save all values in local storage  
function dataObjectUpdated() {
localStorage.setItem("uncompletedList", JSON.stringify(data));
}


//remove li from list
  function removeLi() {
    let li = this.parentNode.parentNode;  
    let parent = li.parentNode;  


    //local storage - remove li from array in data object
    let id = parent.id;
    let value = li.textContent; //get value of li
    if(id === "uncompleted") {
      data.uncompleted.splice(data.uncompleted.indexOf(value),1);
    } else {
      data.completed.splice(data.completed.indexOf(value),1);
    }

    dataObjectUpdated();

    //DOM - remove li from list
    parent.removeChild(this.parentNode.parentNode);
  }



//mark li as done and push it to completed list or mark li as undone and push it back to uncompleted list
  function completeLi() {
    let li = this.parentNode.parentNode;
    let parent = li.parentNode;
    let id = parent.id;

    //local storage - push value to uncompleted or completed array in data object
    let value = li.textContent; // get the value of li
    if(id === "uncompleted") {
      data.uncompleted.splice(data.uncompleted.indexOf(value),1);
      data.completed.push(value);
    } else {
      data.completed.splice(data.completed.indexOf(value),1);
      data.uncompleted.push(value);
    }

    dataObjectUpdated();

    //DOM - toggle li from one list to another depend on id of its current list 
    let target = (id==="uncompleted") ? document.getElementById("completed") : document.getElementById("uncompleted");

    parent.removeChild(li);
    target.appendChild(li);
  }



  
//add class to complete and remove button and assign them icons (innerHTML) 
  function createIcon(a,b) {
    a.classList.add("btn");
    a.innerHTML = b;
  }


//create li and add it(with value) to the DOM
  function addLi(value, completed) {
    let list = (completed) ? document.getElementById("completed") : document.getElementById("uncompleted");

    //create li
    let li = document.createElement("li");
    li.textContent = value;
    //create div with class "buttons"
    let buttons = document.createElement("div");
    buttons.classList.add("buttons");

    //create button with remove icon
    let remove = document.createElement("button");
    remove.classList.add("remove");
    createIcon(remove,removeIcon);

    //add click event for remove button
    remove.addEventListener("click",removeLi);

    //create button with complete icon
    let complete = document.createElement("button");
    complete.classList.add("complete");
    createIcon(complete,completeIcon);

    //add click event for complete button
    complete.addEventListener("click",completeLi);
    
    //append remove and complete buttons to li element and append li to the list
    list.insertBefore(li, list.childNodes[0]);
    li.appendChild(buttons);
    buttons.appendChild(remove);
    buttons.appendChild(complete);
    appInput.value = "";
  } 


