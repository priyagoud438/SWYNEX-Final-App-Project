// Campus Admin Pro - Final Project
let students = JSON.parse(localStorage.getItem("students")) || [
  { name: "RAM", email: "ram@gmail.com", course: "B.Tech CSE", fees: 150000, status: "Fee: Pending" }
];
let editIndex = -1;

function saveData() {
  localStorage.setItem("students", JSON.stringify(students));
}

function login() {
  let email = document.getElementById("loginEmail").value;
  let pass = document.getElementById("loginPassword").value;
  if (email === "admin@campus.com" && pass === "123456") {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("mainApp").style.display = "block";
    showStudents();
    updateDashboard();
  } else {
    alert("Wrong Login! Use admin@campus.com / 123456");
  }
}

function updateDashboard() {
  let totalFees = students.reduce((sum, s) => sum + Number(s.fees), 0);
  document.getElementById("totalStudents").innerText = students.length;
  document.getElementById("totalFees").innerText = "₹" + totalFees;
  document.getElementById("totalCourses").innerText = "3";
}

function showStudents(filter = "") {
  let list = document.getElementById("studentList");
  if (!list) return;
  list.innerHTML = "";
  students.filter(s => s.name.toLowerCase().includes(filter.toLowerCase()) || s.course.toLowerCase().includes(filter.toLowerCase()))
  .forEach((s, i) => {
    list.innerHTML += `<div class="student-card">
      <b>${s.name}</b><br>${s.email}<br>${s.course}<br>₹${s.fees} - ${s.status}<br>
      <button onclick="editStudent(${i})">Edit</button>
      <button onclick="deleteStudent(${i})">Delete</button>
    </div>`;
  });
}

function addStudent() {
  let name = document.getElementById("stuName").value.trim();
  let email = document.getElementById("stuEmail").value.trim();
  let course = document.getElementById("stuCourse").value.trim();
  let fees = document.getElementById("stuFees").value.trim();
  let status = document.getElementById("stuStatus").value;

  if (!name) { alert("Name is required"); return; }
  if (!email || !email.includes("@")) { alert("Valid Email is required"); return; }
  if (!course) { alert("Course is required"); return; }
  if (!fees) { alert("Fees is required"); return; }

  let newStu = { name, email, course, fees, status };
  if (editIndex === -1) {
    students.push(newStu);
    alert("Student added successfully!");
  } else {
    students[editIndex] = newStu;
    editIndex = -1;
    alert("Student updated!");
  }
  saveData(); showStudents(); updateDashboard();
  document.getElementById("stuName").value = "";
  document.getElementById("stuEmail").value = "";
  document.getElementById("stuCourse").value = "";
  document.getElementById("stuFees").value = "";
}

function editStudent(i) {
  let s = students[i];
  document.getElementById("stuName").value = s.name;
  document.getElementById("stuEmail").value = s.email;
  document.getElementById("stuCourse").value = s.course;
  document.getElementById("stuFees").value = s.fees;
  document.getElementById("stuStatus").value = s.status;
  editIndex = i;
  window.scrollTo(0,0);
}

function deleteStudent(i) {
  if (confirm("Are you sure to delete " + students[i].name + "?")) {
    students.splice(i, 1);
    saveData(); showStudents(); updateDashboard();
  }
}

function searchStudent() {
  let val = document.getElementById("searchBox").value;
  showStudents(val);
}

// Auto-load if already logged in view
window.onload = function() {
  showStudents();
  updateDashboard();
}
