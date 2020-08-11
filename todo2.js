const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  pendingList = document.querySelector(".js-pendingList"),
  finishedList = document.querySelector(".js-finishedList");

const PENDING = "PENDING",
  FINISHED = "FINISHED",
  RANDOM_NUMBER = 2;

let pendingToDos = new Array(),
  finishedToDos = new Array(),
  mixToDos = new Array();

function deletePendingTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  pendingList.removeChild(li);
  const cleanToDos = pendingToDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  pendingToDos = cleanToDos;
  savePendingToDos(pendingToDos);
}

function movePendingTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  pendingList.removeChild(li);
  const moveFinishedToDos = pendingToDos.filter(function (toDo) {
    return toDo.id === parseInt(li.id);
  });

  moveFinishedToDos.forEach(function (toDo) {
    finishedToDo(toDo.text, toDo.id);
    saveFinishedToDos();
  });
  const cleanPendingToDos = pendingToDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  pendingToDos = cleanPendingToDos;
  savePendingToDos(pendingToDos);
}

function deleteFinishedTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanToDos = finishedToDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  finishedToDos = cleanToDos;
  saveFinishedToDos(finishedToDos);
}

function moveFinishedTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const movePendingToDos = finishedToDos.filter(function (toDo) {
    return toDo.id === parseInt(li.id);
  });

  movePendingToDos.forEach(function (toDo) {
    pendingToDo(toDo.text, toDo.id);
    savePendingToDos();
  });
  const cleanPendingToDos = finishedToDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  finishedToDos = cleanPendingToDos;
  saveFinishedToDos(pendingToDos);
}

function savePendingToDos() {
  localStorage.setItem(PENDING, JSON.stringify(pendingToDos));
}

function saveFinishedToDos() {
  localStorage.setItem(FINISHED, JSON.stringify(finishedToDos));
}

function pendingToDo(text, newId) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const moveBtn = document.createElement("button");
  span.innerText = text;
  delBtn.innerText = "X";
  delBtn.addEventListener("click", deletePendingTodo);
  moveBtn.innerText = "■";
  moveBtn.addEventListener("click", movePendingTodo);
  li.id = newId;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(moveBtn);
  pendingList.appendChild(li);
  const pendingToDoObj = {
    id: newId,
    text: text
  };
  pendingToDos.push(pendingToDoObj);
  savePendingToDos();
}

function finishedToDo(text, newId) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const moveBtn = document.createElement("button");
  span.innerText = text;
  delBtn.innerText = "X";
  delBtn.addEventListener("click", deleteFinishedTodo);
  moveBtn.innerText = "▲";
  moveBtn.addEventListener("click", moveFinishedTodo);
  li.id = newId;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(moveBtn);
  finishedList.appendChild(li);
  const finishedToDoObj = {
    id: newId,
    text: text
  };
  finishedToDos.push(finishedToDoObj);
  saveFinishedToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  const newId = Math.floor(Math.random() * (999999999999 - 99999999999) + 1);
  pendingToDo(currentValue, newId);
  toDoInput.value = "";
}

function loadedPendingToDos() {
  const loadedToDos = localStorage.getItem(PENDING);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      pendingToDo(toDo.text, toDo.id);
    });
  }
}

function loadedFinishedToDos() {
  const loadedToDos = localStorage.getItem(FINISHED);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      finishedToDo(toDo.text, toDo.id);
    });
  }
}

function init() {
  loadedPendingToDos();
  loadedFinishedToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
