let user_input;
let item_input;
let userArray = [];
let list;
window.onload = () => {
    user_input = document.getElementById('person');
    //item_input = document.getElementById('item');
    list = document.getElementById('list');


    user_input.addEventListener("keyup", (e) => {
        e.preventDefault();
        if (e.keyCode === 13) {
            document.getElementById("user_btn").click();
        }
    });
}

addPerson = () => {
    userArray.push(user_input.value);
    user_input.value = "";
    renderList();
}

removePerson = (index) => {
    userArray.splice(index, 1);
    renderList();
}

renderList = () => {
    let tempHTML = "";
    for (let i = 0; i < userArray.length; i++) {
        tempHTML += `<li class="list-group-item" id="user-${i}"><p class="list-text">${userArray[i]}</p> <button class="btn btn-danger float-right" onclick="removePerson(${i})">Remove</button></li>`;
    }
    list.innerHTML = tempHTML;
}

