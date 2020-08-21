let user_input;
let item_input;
let price_input;
let userArray = [];
let itemArray = [];
let userList;
let itemList;
window.onload = () => {
    user_input = document.getElementById('person');
    item_input = document.getElementById('item');
    price_input = document.getElementById('price');
    userList = document.getElementById('list-user');
    itemList = document.getElementById('list-item');


    user_input.addEventListener("keyup", (e) => {
        e.preventDefault();
        if (e.keyCode === 13) {
            document.getElementById("user_btn").click();
        }
    });

    price_input.addEventListener("keyup", (e) => {
        e.preventDefault();
        if (e.keyCode === 13) {
            document.getElementById("item_btn").click();
        }
    });
}

addPerson = () => {
    userArray.push(user_input.value);
    user_input.value = "";
    renderList();
}

addItem = () => {
    let temp = {name: item_input.value, price: price_input.value};
    itemArray.push(temp);
    item_input.value = "";
    price_input.value = "";
    renderList();
}

removePerson = (index) => {
    userArray.splice(index, 1);
    renderList();
}

removeItem = (index) => {
    itemArray.splice(index, 1);
    renderList();
}

renderList = () => {
    let tempHTML = "";
    for (let i = 0; i < userArray.length; i++) {
        tempHTML += `
            <div class="input-group mb-3">
                <input type="text" class="form-control" value="${userArray[i]}" id="user-${i}" disabled>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" id="user_btn" onclick="removePerson(${i})">Remove</button>
                </div>
            </div>
        `;
        //tempHTML += `<li class="list-group-item" id="user-${i}"><p class="list-text">${userArray[i]}</p> <button class="btn btn-danger float-right" onclick="removePerson(${i})">Remove</button></li>`;
    }
    userList.innerHTML = tempHTML;
    
    tempHTML = "";
    for (let i = 0; i < itemArray.length; i++) {
        tempHTML += `
            <div class="input-group">
                <input type="text" class="form-control" value="${itemArray[i].name}" id="item-${i}" disabled>
                <div class="input-group-append">
                    <input type="text" class="form-control" value="${itemArray[i].price}" id="price-${i}" disabled>
                    <span class="input-group-text">€</span>
                    <button class="btn btn-outline-secondary" type="button" id="item_btn" onclick="removeItem(${i})">Remove</button>
                </div>
            </div>
        `;
        //tempHTML += `<li class="list-group-item" id="user-${i}"><p class="list-text">${userArray[i]}</p> <button class="btn btn-danger float-right" onclick="removePerson(${i})">Remove</button></li>`;
    }
    itemList.innerHTML = tempHTML;

    console.log(userArray, itemArray)
}

