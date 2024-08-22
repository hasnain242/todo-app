const ul = document.getElementById("ul");
const inp = document.getElementById("inp");
const addtodo = document.getElementById("add");
const usernameDisplay = document.getElementById("username-display");

function createli(text) {
  const li = document.createElement("li");
  li.textContent = text;
  li.textContent.className='text';
  const cancelBtn = document.createElement("button");
  cancelBtn.innerHTML = '<i class="fas fa-trash"></i>';
  cancelBtn.className = "cancel-btn";
  cancelBtn.addEventListener("click", () => {
    li.remove();
    updateLocalStorage();
  });
  li.appendChild(cancelBtn);

  const editBtn = document.createElement("button");
  editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  editBtn.className = "edit-btn";
  editBtn.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = li.firstChild.textContent;
    li.innerHTML = "";
    li.appendChild(input);
    input.focus();

    const saveBtn = document.createElement("button");
    saveBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    saveBtn.className = "save-btn";
    saveBtn.addEventListener("click", () => {
      if (input.value.trim()) {
        li.textContent = input.value;
        li.appendChild(cancelBtn);
        li.appendChild(editBtn);
        updateLocalStorage();
      } else {
        alert("Input cannot be empty");
      }
    });

    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        saveBtn.click();
      }
    });

    li.appendChild(saveBtn);
  });

  li.appendChild(editBtn);
  ul.appendChild(li);
  updateLocalStorage();
  inp.value = "";
}

function updateLocalStorage() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    const lis = document.querySelectorAll("#ul li");
    const listItems = [];
    lis.forEach((li) => {
      listItems.push(li.firstChild.textContent);
    });
    localStorage.setItem(`todolist_${loggedInUser}`, JSON.stringify(listItems));
  }
}

function loadFromLocalStorage() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    usernameDisplay.textContent = loggedInUser;
    const storedList = JSON.parse(
      localStorage.getItem(`todolist_${loggedInUser}`)
    );
    if (storedList) {
      storedList.forEach((item) => {
        createli(item);
      });
    }
  } else {
    window.location.href = "form.html";
  }
}

addtodo.addEventListener("click", () => {
  if (inp.value.trim()) {
    createli(inp.value);
  } else {
    alert("Write something");
  }
});

inp.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addtodo.click();
  }
});

document.getElementById("log").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "form.html";
});

window.onload = loadFromLocalStorage;
