let user_input;
let item_input;
let price_input;
let userArray = [];
let itemArray = [];
let userList;
let itemList;
let total = 0;
let totalText;
window.onload = () => {
    user_input = document.getElementById('person');
    item_input = document.getElementById('item');
    price_input = document.getElementById('price');
    userList = document.getElementById('list-user');
    itemList = document.getElementById('list-item');
    totalText = document.getElementById('total');

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
    let temp = {name: user_input.value, items: [], price: 0};
    if (itemArray.lenght != 0) {
        itemArray.forEach(item => {
            temp.items.push(item);
            addItemToUsers(item, temp);
        });
    }
    userArray.push(temp);
    user_input.value = "";

    updatePrice();
    render();
}

addItem = () => {
    let temp = {name: item_input.value, price: price_input.value};
    itemArray.push(temp);
    item_input.value = "";
    price_input.value = "";
    addItemToUsers(temp);
    render();
}

removePerson = (index) => {
    userArray.splice(index, 1);
    updatePrice();
    render();
}

removeItem = (index) => {
    itemArray.splice(index, 1);
    updatePrice();
    render();
}

updatePrice = () => {
    total = 0;
    userArray.forEach(user => {
        user.price = 0;
    });

    itemArray.forEach((item, itemIndex) => {
        total += parseFloat(item.price);

        userArray.forEach((user, userIndex) => {
            console.log(user.items[itemIndex].name, item.name);
            if (user.items[itemIndex].name === item.name) {
                user.price += parseFloat(item.price);
            }
        });
    });

    
}

addItemToUsers = (item, argsUser) => {
    if (argsUser) {
        argsUser.items.push(item);
    }else{
        userArray.forEach(user => {
            user.items.push(item);
        });
    }
    updatePrice();
}

render = () => {
    let tempHTML = "";
    for (let i = 0; i < userArray.length; i++) {
        let listCheckBox = "";
        let checked = "";
        itemArray.forEach((item, itemIndex)=> {

            userArray[i].items.forEach((userItem, userItemIndex) => {
                if (userItemIndex === itemIndex) {
                    checked = "checked";
                }
            });

            listCheckBox += `
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="item-${itemIndex}-checkbox" ${checked}>
                    <label class="custom-control-label" for="item-${itemIndex}-checkbox">${item.name}</label>
                </div>
            `;
        });
        tempHTML += `
            <div class="input-group mb-3">
                <input type="text" class="form-control" value="${userArray[i].name}" id="user-${i}" disabled>
                <div class="input-group-append">
                    <input type="text" class="form-control" value="${userArray[i].price}" id="user-price-${i}" disabled>
                    <span class="input-group-text">€</span>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-user-${i}">M</button>
                    <button class="btn btn-outline-secondary" type="button" id="user_btn" onclick="removePerson(${i})">X</button>
                    <!-- Modal -->
                    <div class="modal fade" id="modal-user-${i}" tabindex="-1" role="dialog" aria-labelledby="modal-user-${i}" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">${userArray[i].name}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    ${listCheckBox}
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
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
                    <button class="btn btn-outline-secondary" type="button" id="item_btn" onclick="removeItem(${i})">X</button>
                </div>
            </div>
        `;
        //tempHTML += `<li class="list-group-item" id="user-${i}"><p class="list-text">${userArray[i]}</p> <button class="btn btn-danger float-right" onclick="removePerson(${i})">Remove</button></li>`;
    }
    itemList.innerHTML = tempHTML;

    tempHTML = `<h1>Total: $${total}<h1>`;
    totalText.innerHTML = tempHTML;
    console.log(userArray, itemArray)
}

