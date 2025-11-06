"use strict";
import { initDesignView } from "./view/designView.js";
import * as module from "../js/module.js";
import registerView from "./view/registerView.js";
import dashboardView from "./view/dashboardView.js";
import profileView from "./view/profileView.js";
import addCategoryView from "./view/addCategoryView.js";
import categoryView from "./view/categoryView.js";
import addTaskView from "./view/addTaskView.js";
import { currentDate } from "./helper.js";
import taskView from "./view/taskView.js";
import SearchTaskView from "./view/SearchTaskView.js";

function initLoadingPage() {
  if (!module.personData.logged) {
    setTimeout(() => {
      registerView.showPage();
    }, 3000);
  } else {
    dashboardView.Spinner();
    setTimeout(() => {
      dashboardView.showPage();
    }, 2000);
  }
}

// The timers waiting the input file image while reading and  loading image;
function register(data) {
  //Check form
  const msg = module.checkRegistForm(data, "data");
  registerView.msgBox(msg);
  //message box hide
  setTimeout(() => {
    registerView.msgBox("close");
  }, 1000);

  //completed form
  if (msg === "Register completed") {
    module.registData(data);
    registerView.Spinner();

    setTimeout(() => {
      dashboardView.showPage();
      updateRender();
      window.location.reload();
    }, 1500);
  }
  ///////////////////////////////
}

function loaded() {
  const files = registerView.imgFiles || addCategoryView.imgFiles;
  const img = registerView.imgFiles
    ? registerView.userImg
    : addCategoryView.userImg;
  module.readInput(files, img);
}

function updateRender() {
  profileView.render(module.personData);
  categoryView.render(module.personData.data.categories);
  const name = module.personData.data.categories.map(
    (category) => category.name
  );
  taskView.render(name);
  taskView.renderTasks(module.personData.data.tasks);
  currentDate();
  module.statusLoad();
  dashboardRender(module.personData);
  dashboardView.showNotifications(module.personData.data.notifications);
  initDesignView();
}

function dashboardRender(data) {
  dashboardView.renderNavigation(data, currentDate);
  dashboardView.renderHeader(data, module.shortDate());

  dashboardView.renderReport(data);
  dashboardView.renderTopCategories(module.sortCategory());
  dashboardView.renderNewestTasks(module.newestTasks());
  dashboardView.renderTodayTasks(module.todayTasks());
  dashboardView.renderStatus(
    module.personData.data.Status,
    module.personData.data.tasks
  );
  dashboardView.showCategoryTasks(categoryData);
  dashboardView.showMonthTasks(monthData);
  taskView.showTaskData(taskData, deleteTask);
  categoryView.showCategoryData(categoryInfo);
}

function categoryAdder(data) {
  //Check form
  const msg = module.checkRegistForm(data, "category");
  addCategoryView.msgBox(msg);
  //message box hide
  setTimeout(() => {
    addCategoryView.msgBox("close");
  }, 1000);

  //completed form
  if (msg === "Added ✔") {
    module.addCategory(data);
    setTimeout(() => {
      updateRender();
    }, 1500);
  }
}

function taskAdder(data) {
  module.addTask(data);
  updateRender();
}

function categoryData() {
  module.categTasks(dashboardView.categ);
  dashboardView.catTasks = module.categTasks(dashboardView.categ);
}

function monthData() {
  dashboardView.monthData = module.monthTasks(dashboardView.currentMonth);
}

function taskData() {
  const className = taskView.currentTask.split("_").join(" ");
  taskView.currentTask = className;
  taskView.taskData = module.task(className);
}

function categoryInfo() {
  const className = categoryView.currentCategory.split("_").join(" ");
  categoryView.currentCategory = className;
  categoryView.categoryData = module.category(className);
  categoryView.deleteCategory(deleteCateg);
}

function deleteCateg(name) {
  module.deleteCategory(name);
  updateRender();
  setTimeout(() => {
    window.location.reload();
  }, 0);
}

function deleteTask(name) {
  module.deleteTask(name);
  updateRender();
}

function logout() {
  setTimeout(() => {
    const lst = document.querySelector(".logout-msg");
    lst.style.opacity = 1;
    lst.style.visibility = "visible";
    document.querySelector(".no").addEventListener("click", () => {
      lst.style.opacity = 0;
      lst.style.visibility = "hidden";
    });

    document.querySelector(".yes").addEventListener("click", () => {
      module.logoutApp();
      window.location.reload();
    });
  }, 500);
}

function searchTask(task) {
  const data = module.searchInTasks(task);
  SearchTaskView.data = data;

  if (!data) {
    registerView.msgBox("This task is not available!");
    setTimeout(() => {
      registerView.msgBox("close");
    }, 1500);
  }
  SearchTaskView.history = module.personData.data.searchHistory;
}
SearchTaskView.history = module.personData.data.searchHistory;

function clicked(task) {
  const data = module.searchInTasks(task);
  SearchTaskView.data = data;

  if (!data) {
    registerView.msgBox("This task is not available!");
    setTimeout(() => {
      registerView.msgBox("close");
    }, 1500);
  }
}

function init() {
  initDesignView();
  initLoadingPage();
  updateRender();
  registerView.formSubmit(register);
  registerView.imgUpload(loaded);
  addCategoryView.imgUpload(loaded);
  addCategoryView.formSubmit(categoryAdder);
  addTaskView.formSubmit(taskAdder);
  dashboardView.logoutApp(logout);
  SearchTaskView.search(searchTask);
  SearchTaskView.clickItem(clicked);
}

init();
