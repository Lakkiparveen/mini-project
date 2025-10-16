let users = JSON.parse(localStorage.getItem("users")) || [];
let editIndex = null;

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");
const tableBody = document.querySelector("#dataTable tbody");

function renderTable() {
  tableBody.innerHTML = "";
  users.forEach((user, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>
          <button class="action-btn edit" onclick="editUser(${index})">Edit</button>
          <button class="action-btn delete" onclick="deleteUser(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (name === "" || email === "") {
    alert("Please fill all fields!");
    return;
  }

  users.push({ name, email });
  localStorage.setItem("users", JSON.stringify(users));
  nameInput.value = "";
  emailInput.value = "";
  renderTable();
});

function deleteUser(index) {
  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
  renderTable();
}

function editUser(index) {
  editIndex = index;
  nameInput.value = users[index].name;
  emailInput.value = users[index].email;
  addBtn.style.display = "none";
  updateBtn.style.display = "inline-block";
}

updateBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (name === "" || email === "") {
    alert("Please fill all fields!");
    return;
  }

  users[editIndex] = { name, email };
  localStorage.setItem("users", JSON.stringify(users));
  nameInput.value = "";
  emailInput.value = "";
  addBtn.style.display = "inline-block";
  updateBtn.style.display = "none";
  renderTable();
});

renderTable();
