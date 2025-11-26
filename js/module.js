import { capitalize } from "./helper.js";
import { currentDate } from "./helper.js";
import { formatDate } from "./helper.js";

export let personData = {
  image: "",
  username: "",
  birthdate: "",
  about: "",
  gender: "",
  dateLogged: "",
  level: 0,
  targetCategory: 5,
  userSummarise: "",
  logged: false,
  data: {
    month: {
      Jan: [],
      Feb: [],
      Mar: [],
      Apr: [],
      May: [],
      Jun: [],
      July: [],
      Aug: [],
      Sep: [],
      Oct: [],
      Nov: [],
      Dec: [],
    },
    notifications: [],
    categories: [],
    searchHistory: [],
    Status: {
      inprocess: [],
      notStarted: [],
      completed: [],
    },
    tasks: [],
  },
};

export function registData(data) {
  readImg(data, "data");
  personData.username = capitalize(data?.name);
  personData.birthdate = data?.birthdate;
  personData.age = userAge(data);
  personData.about = capitalize(data?.about);
  personData.gender = capitalize(data?.gender);
  personData.dateLogged = currentDate();
  personData.logged = data ? true : false;
  personData.userSummarise = userSumary(data);
  setTimeout(() => {
    saveToStorage();
  }, 1000);
}

export function checkRegistForm(data, where) {
  if (where === "data") {
    if (!data?.image.name) return "enter your image";
    if (!data?.name) return "please fill the name";
    if (!data?.gender) return "select your gender";
    if (!data?.birthdate) return "enter your born date";
    if (!data?.about) return "write sentece that defines you";

    if (
      data.name &&
      data.image.name &&
      data.gender &&
      data.birthdate &&
      data.about
    )
      return "Register completed";
  }
  if (where === "category") {
    if (!data?.name) return "Enter Catgeory";
    if (data.name) return "Added ✔";
  }
}

// document.addEventListener('click', () => {
//   console.log(personData)
// })

function userAge(data) {
  const date = new Date().getFullYear() - +data.birthdate.slice(0, 4);
  return date;
}

function userSumary(data) {
  return `${capitalize(data.name)} is ${capitalize(data.about)}, a ${
    data.gender === "male" ? "man" : "girl"
  }  who is ${personData.age} years old`;
}

function readImg(data, where, that) {
  const file = data?.image;
  const reader = new FileReader();
  reader.addEventListener("load", (e) => {
    if (where === "data") {
      personData.image = e.target.result;
    }

    if (where === "category") {
      that.image = e.target.result;
    }
  });
  reader.readAsDataURL(file);
}

export function readInput(files, img) {
  let currSrc;
  for (const file of files) {
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      currSrc = e.target.result;
    });
    reader.readAsDataURL(file);
  }
  setTimeout(() => {
    img.src = currSrc;
  }, 1000);
}

//////////////////
function saveToStorage() {
  return localStorage.setItem("data", JSON.stringify(personData));
}

function getData() {
  const storage = localStorage.getItem("data");
  if (storage) personData = JSON.parse(storage);
}
getData();
///////////////

//Adding category data;
export function addCategory(data) {
  const category = {
    name: capitalize(data.name),
    color: data?.color,
    tasks: [],
  };
  readImg(data, "category", category);

  const prevTask = personData.data.categories.find(
    (el) => el.name === category.name
  );
  if (prevTask) return;
  personData.data.categories.push(category);
  levelUp(personData.data.categories);

  setTimeout(() => {
    category.index = personData.data.categories.findIndex(
      (categ) => categ.name === category.name
    );
    saveToStorage();
  }, 1000);
}

//Adding Tasks;
export function addTask(data) {
  const task = {
    name: capitalize(data.name),
    dueDate: data?.dueDate,
    category: data.category,
  };

  const prevTask = personData.data.tasks.find((el) => el.name === task.name);
  if (prevTask) return;
  categANDtask(data);
  status(task);

  addMonth(personData.data.tasks);

  function categANDtask(data) {
    const category = personData.data.categories.find(
      (categ) => categ.name === data.category
    );
    if (!category) return;

    category.tasks.push(task);
    task.color = category.color;
    task.createdDate = currentDate();
    task.createdTime = new Date();
    task.category = category.name;
    personData.data.tasks.push(task);
  }

  setTimeout(() => {
    saveToStorage();
  });
}


function cleanStatusLists(task) {
  const categories = ["notStarted", "inprocess", "completed"];

  categories.forEach(cat => {
    personData.data.Status[cat] = personData.data.Status[cat].filter(
      t => t.name !== task.name
    );
  });
}



function status(task) {
  const dueDate = new Date(task.dueDate);
  const current = new Date(formatDate(currentDate()));
  const remaininingDays = Math.trunc(
    (dueDate - current) / (1000 * 60 * 60 * 24)
  );

  task.remaininingDays = remaininingDays;

  cleanStatusLists(task);

  if (remaininingDays === 0) {
    personData.data.Status[`inprocess`].push(task);
    task.status = "inprocess";
  } else if (remaininingDays >= 1) {
    personData.data.Status[`notStarted`].push(task);
    task.status = "notStarted";
  } else {
    personData.data.Status[`completed`].push(task);
    task.status = "completed";
  }

}


function addMonth(tasks) {
  tasks.forEach((task) => {
    const currDate = new Date();
    const accountCreated = new Date(formatDate(personData.dateLogged));

    const month = Math.trunc(
      Math.abs((currDate - accountCreated) / (1000 * 60 * 60 * 24 * 30))
    );
    personData.month = month;
    const i = +task.createdDate.split("-")[1];

    const yearMonth = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currMonth = yearMonth[i - 1];

    const prev = personData.data.month[currMonth]?.filter(
      (el) => el.name === task.name
    );
    if (prev.length > 0) {
      return;
    } else {
      /*personData.data.month[currMonth].push(task);*/
      task.month = currMonth;
      personData.data.month[currMonth] = [...personData.data.month[currMonth], task]
    }

   
  });
}

export function statusLoad() {
  personData.data.tasks.forEach((task) => {
    status(task);
  });
  personData.data.notifications = personData.data.Status.inprocess;
  levelUp(personData.data.categories);
  addMonth(personData.data.tasks);
  sortCategory();
}

function levelUp(categories) {
  if (categories.length === personData.targetCategory) {
    personData.level++;
    personData.targetCategory += 5;
  }
}

export function shortDate() {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format();
}


export function sortCategory() {
  const categories = personData.data.categories;

  categories.forEach((el) => {
    el.sortLink = el.tasks.length;
  });

  const sorted = categories.sort((b, a) => {
    return a.sortLink - b.sortLink;
  });

  const needsToSort = sorted.filter((el) => el.sortLink >= 5);
  const topCategories = needsToSort.slice(0, 9);
  return topCategories;
}

export function newestTasks() {
  return personData.data.tasks.slice(-5);
}

export function todayTasks() {
  return personData.data.tasks.filter(task=> Math.round(Math.abs(new Date() - +new Date(task.createdTime)) / (1000 * 60 * 60 * 24)) === 0 );
}

export function categTasks(name) {
  return personData.data.categories.find((category) => category.name === name)
    .tasks;
}

export function monthTasks(name) {
  return personData.data.month[name];
}

export function task(name) {
  // const tasks = personData.data.tasks.find(task => task.name !== name);
  // if (!tasks || tasks.length <= 0) return;
  return personData.data.tasks.find((task) => task.name === name);
}

export function category(name) {
  return personData.data.categories.find((category) => category.name === name);
}

export function deleteCategory(name) {
  const categoryTasks = personData.data.categories.find(
    (category) => category.name === name
  )?.tasks;

  ///////REMOVING FROM THE TASKS
  categoryTasks.forEach((categ) => {
    const tasks = personData.data.tasks.filter((task) => {
      return task.name === categ.name;
    })[0];
    const index = personData.data.tasks.findIndex(
      (el) => el.name === tasks.name
    );
    personData.data.tasks.splice(index, 1);
  });
  //////////////

  /////////REMOVING FROM THE NOTIFICATIONS
  categoryTasks.forEach((categ) => {
    const notifTasks = personData.data.notifications.filter((task) => {
      return task.name === categ.name;
    });
    if (notifTasks.length <= 0) return;
    const noteTasks = notifTasks[0];
    const index = personData.data.notifications.findIndex(
      (el) => el.name === noteTasks.name
    );
    personData.data.notifications.splice(index, 1);
  });
  /////////////////////////

  /////////REMOVING FROM THE STATUS
  categoryTasks.forEach((categ) => {
    const taskStatus = categ.status;
    const currStatus = personData.data.Status[taskStatus];
    if (currStatus.length <= 0) return;
    const status = personData.data.Status[taskStatus].filter((task) => {
      return task.name === categ.name;
    });
    if (status.length <= 0) return;
    const statusTasks = status[0];

    const index = personData.data.Status[taskStatus].findIndex(
      (el) => el.name === statusTasks.name
    );
    personData.data.Status[taskStatus].splice(index, 1);
  });
  /////////////////////////

  /////////REMOVING FROM THE MONTH
  categoryTasks.forEach((categ) => {
    const monthTasks = personData.data.month[categ.month].filter(
      (task) => task.name === categ.name
    );
    if (monthTasks.length <= 0) return;

    const monthIndex = personData.data.month[categ.month].findIndex(
      (task) => task.name === monthTasks[0].name
    );
    personData.data.month[categ.month].splice(monthIndex, 1);
  });
  /////////////////////////

  /////REMOVING THE CATEGORY
  const index = personData.data.categories.findIndex(
    (category) => category.name === name
  );
  personData.data.categories.splice(index, 1);
  saveToStorage();
}

export function deleteTask(name) {
  /////////REMOVING FROM THE TASKS
  const task = personData.data.tasks.find((task) => task.name === name);
  if (!task) return;
  const taskIndex = personData.data.tasks.findIndex(
    (todo) => todo.name === task.name
  );
  personData.data.tasks.splice(taskIndex, 1);
  // //////////////

  //////////REMOVING FROM THE CATEGORY
  personData.data.categories.forEach((category) => {
    const currTask = category.tasks.filter((task) => task.name === name);
    if (currTask.length <= 0) return;

    const currIndex = category.tasks.findIndex(
      (task) => task.name === currTask[0].name
    );
    category.tasks.splice(currIndex, 1);
  });

  /////////REMOVING FROM THE MONTH
  const monthTasks = personData.data.month[task.month].filter(
    (todo) => todo.name === task.name
  );
  if (monthTasks.length <= 0) return;

  const monthIndex = personData.data.month[task.month].findIndex(
    (task) => task.name === monthTasks[0].name
  );
  personData.data.month[task.month].splice(monthIndex, 1);
  /////////////////////////

  //////////REMOVING FROM THE NOTIFICATIONS
  const noteTask = personData.data.notifications.find(
    (task) => task.name === name
  );
  if (noteTask) {
    const noteIndex = personData.data.notifications.findIndex(
      (task) => task.name === noteTask.name
    );
    personData.data.notifications.splice(noteIndex, 1);
  }
  /////////////////////////

  /////////REMOVING FROM THE STATUS

  const currStatus = personData.data.Status[task.status];

  if (currStatus.length <= 0) return;
  const status = currStatus.filter((item) => {
    return item.name === task.name;
  });

  if (status.length <= 0) return;
  const statusTasks = status[0];
  console.log(statusTasks);

  const index = personData.data.Status[task.status].findIndex(
    (el) => el.name === statusTasks.name
  );
  personData.data.Status[task.status].splice(index, 1);

  /////////////////////////

  saveToStorage();
}

export function logoutApp() {
  localStorage.removeItem("data");
}

export function searchInTasks(task) {
  const foundTask = personData.data.tasks.filter((item) => {
    if (item.name.toLowerCase() !== task) return;
    const currTask = item.name;
    return currTask;
  });

  if (!foundTask || foundTask.length <= 0) return;

  const prevTasks = personData.data.searchHistory;
  const prevTask = prevTasks.filter((task) => task.name === foundTask[0].name);

  if (prevTask.length <= 0) {
    personData.data.searchHistory.push(foundTask[0]);
  }

  saveToStorage();
  return foundTask;
}