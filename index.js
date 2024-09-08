const todoInput = document.querySelector('.todo')
const dateInput = document.querySelector('.date')

let html = localStorage.getItem('todo') || '';

function loadPage() {
  if (!localStorage.getItem('todo').trim()) {
    document.querySelector('.todo-list').classList.remove('todo-list-visible');
  } else {
    document.querySelector('.todo-list').classList.add('todo-list-visible');
    document.querySelector('.todo-list').innerHTML = html;
  }
  
  removeEl();
}

function renderTodo() {
  todoValue = todoInput.value;
  dateValue = dateInput.value;
  if (dateValue === "" || todoValue === "") {
    alert("Điền hết đi ngố ơi")
  } else {
    document.querySelector('.todo-list').classList.add('todo-list-visible');
    html += `
    <div class="todo-container ${todoValue}" data-id="${todoValue}">
      <hr>
      <div class="todo-item">
        <p class="todo-output first">${todoValue}</p>
        <p class="date-output second">${dateValue}</p>
        <p class="remove" data-id="${todoValue}">X</p>
      </div>
    </div>
    `
    document.querySelector('.todo-list').innerHTML = html;
    localStorage.setItem('todo', html);
    removeEl();
  }
}

function removeEl() {
  const removeBtn = document.querySelectorAll('.remove')
  const todoContainer = document.querySelectorAll('.todo-container')
  removeBtn.forEach((button) => {
    button.addEventListener('click', () => {
      todoContainer.forEach((todo) => {
        if (button.dataset.id === todo.dataset.id) {
          todo.remove() || '';
          html = document.querySelector('.todo-list').innerHTML
          if (document.querySelector('.todo-list').innerText === "") {
            document.querySelector('.todo-list').classList.remove('todo-list-visible')
          }
          localStorage.setItem('todo', html)
        }
      })
    })
  })
}

document.querySelector('.button').addEventListener('click', () => {
  renderTodo();
})

loadPage()

