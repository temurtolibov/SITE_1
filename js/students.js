let elUsername = document.querySelector(".username");
const user = JSON.parse(localStorage.getItem("user"));
elUsername.textContent = user.username;
let studentList = JSON.parse(localStorage.getItem("students")) || [];
let elStudentTable = document.querySelector(".student-table");
let elModalWrapper = document.querySelector(".modal-wrapper");
let elModalInner = document.querySelector(".modal-inner");
let elStudentTableWrapper = document.querySelector(".table-wrapper");
let elSearchInput = document.querySelector(".search-input");
let elSortPart = document.querySelector(".sort-part");
elModalWrapper.addEventListener("click", (e) => {
  if (e.target.id == "wrapper") {
    elModalWrapper.classList.add("scale-0");
  }
});
//add =>
const handleAddBtnClick = () => {
  elModalWrapper.classList.remove("scale-0");
  elModalInner.innerHTML = `
        <form class="add-form w-[915px] mx-auto">
            <label class="inline-block flex justify-center w-full mb-[33px]">
                <input class="add-choose-img hidden" type="file"/>
                <img src="./images/input-file.png" alt="input file" width="400"/>
            </label>
            <div class="flex justify-between">
                <div class="w-[49%] flex flex-col space-y-[20px]">
                    <label>
                        <span class="text-[23px] text-[#898989] pl-2 mb-1">Name</span>
                        <input ruqui name="name" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Name"/>
                    </label>
                    <label>
                        <span class="text-[23px] text-[#898989] pl-2 mb-1">Email</span>
                        <input name="email" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Email"/>
                    </label>
                    <label>
                        <span class="text-[23px] text-[#898989] pl-2 mb-1">Phone</span>
                        <input name="phone" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Phone"/>
                    </label>
                </div>
                <div class="w-[49%] flex flex-col space-y-[20px]">
                
                    <label>
                        <span class="text-[23px] text-[#898989] pl-2 mb-1">Enroil Number</span>
                        <input name="enroilNumber" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Enroil Number"/>
                    </label>
                    <label>
                        <span class="text-[23px] text-[#898989] pl-2 mb-1">Date admission</span>
                        <input name="date" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="DD.MM.YYYY"/>
                    </label>
                </div>
            </div>
            <button class="add-btn-submit py-[10px] w-[237px] block mx-auto mt-[33px] bg-[#FEAF00] text-white font-bold text-[20px] text-center rounded-[35px]" type="submit">Add Student</button>
        </form>
    `;
  let elAddChooseInput = document.querySelector(".add-choose-img");
  let elAddImg = document.querySelector(".add-img");
  elAddChooseInput.addEventListener("change", function (e) {
    elAddImg.src = URL.createObjectURL(e.target.files[0]);
  });

  let elAddForm = document.querySelector(".add-form");
  let elBtnSubmit = document.querySelector(".add-btn-submit");
  elAddForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = {
      id: studentList.length ? studentList[studentList.length - 1].id + 1 : 1,
      //   imgUrl: elAddImg.src,
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      enroilNumber: e.target.enroilNumber.value,
      date: e.target.date.value,
    };
    elBtnSubmit.innerHTML = `<img class="scale-[1.5] mx-auto" src="./images/loading.png" alt="Loading..." width="31" height="32"/>`;
    setTimeout(() => {
      elBtnSubmit.innerHTML = "Done";
      studentList.push(data);
      renderStudents(studentList, elStudentTable);

      localStorage.setItem("students", JSON.stringify(studentList));
      elModalWrapper.classList.add("scale-0");
    }, 1000);
  });
};
//render =>
function renderStudents(arr, list) {
  list.innerHTML = null;
  arr.forEach((item) => {
    let elTR = document.createElement("tr");
    elTR.innerHTML = `<td class="px-6 py-4 flex items-center">
    <img
      src="./images/avatarka.png"
      alt="avatar image"
      class="w-65 h-55 rounded-[10px] mr-6"
    />
    <span>${item.name}</span>
  </td>
  <td class="px-6 py-4">${item.email}</td>
  <td class="px-6 py-4">${item.phone}</td>
  <td class="px-6 py-4">${item.enroilNumber}</td>
  <td class="px-6 py-4">${item.date}</td>
  <td class="px-6 py-4 flex items-end space-x-2">
    <button class="py-4"
    onclick="handleMoreBtnClick(${item.id})"
    >
      <img
        src="./images/more-icon.svg"
        alt="more icon"
        width="19"
        height="4"
      />
    </button>
    <button class="py-4"
    onclick="handleEditBtnClick(${item.id})"
     >
      <img
        src="./images/edit-icon.svg"
        alt="edit icon"
        width="19"
        height="19"
      />
    </button>
    <button class="py-4" onclick="handleDeleteStudent(${item.id})"
     >
      <img
        src="./images/delete-icon.svg"
        alt="delete icon"
        width="16"
        height="18"
      />
    </button>
  </td>`;
    list.append(elTR);
  });
}
renderStudents(studentList, elStudentTable);
//delete =>
function handleDeleteStudent(id) {
  studentList = studentList.filter((item) => item.id !== id);
  localStorage.setItem("students", JSON.stringify(studentList));
  renderStudents(studentList, elStudentTable);
}
if (elStudentTableWrapper) {
  elStudentTableWrapper.style.overflowY = "auto";
}
//edit=>
function handleEditBtnClick(id) {
  elModalWrapper.classList.remove("scale-0");
  let editStudent = studentList.find((item) => item.id == id);
  elModalInner.innerHTML = `
    <form class="edit-form w-[915px] mx-auto">
    <label class="inline-block flex justify-center w-full mb-[33px]">
        <input class="add-choose-img hidden" type="file"/>
        <img src="./images/input-file.png" alt="input file" width="400"/>
    </label>
    <div class="flex justify-between">
        <div class="w-[49%] flex flex-col space-y-[20px]">
            <label>
                <span class="text-[23px] text-[#898989] pl-2 mb-1">Name</span>
                <input value="${editStudent.name}" required name="name" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Name"/>
            </label>
            <label>
                <span class="text-[23px] text-[#898989] pl-2 mb-1">Email</span>
                <input value="${editStudent.email}" required name="email" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Email"/>
            </label>
            <label>
                <span class="text-[23px] text-[#898989] pl-2 mb-1">Phone</span>
                <input value="${editStudent.phone}" required name="phone" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Phone"/>
            </label>
        </div>
        <div class="w-[49%] flex flex-col space-y-[20px]">
        
            <label>
                <span class="text-[23px] text-[#898989] pl-2 mb-1">Enriol Number</span>
                <input value="${editStudent.enroilNumber}" required name="enroilNumber" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Enroil Number"/>
            </label>
            <label>
                <span class="text-[23px] text-[#898989] pl-2 mb-1">Data</span>
                <input value="${editStudent.date}" required name="date" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="DD.MM.YYYY"/>
            </label>
        </div>
    </div>
    <button class="edit-btn-submit py-[10px] w-[237px] block mx-auto mt-[33px] bg-[#FEAF00] text-white font-bold text-[20px] text-center rounded-[35px]" type="submit">Edit Student</button>
</form>
    `;

  let elEditForm = document.querySelector(".edit-form");
  elEditForm.addEventListener("submit", function (e) {
    e.preventDefault();

    editStudent.name = e.target.name.value;
    editStudent.email = e.target.email.value;
    editStudent.phone = e.target.phone.value;
    editStudent.enroilNumber = e.target.enroilNumber.value;
    editStudent.date = e.target.date.value;
    let elEditBtn = document.querySelector(".edit-btn-submit");
    elEditBtn.innerHTML = `<img class="scale-[1.5] mx-auto" src="./images/loading.png" alt="Loading..." width="31" height="32"/>`;

    setTimeout(() => {
      elEditBtn.innerHTML = "Edited";
      elModalWrapper.classList.add("scale-0");
      renderStudents(studentList, elStudentTable);
      localStorage.setItem("students", JSON.stringify(studentList));
    }, 1000);
  });
}

function handleMoreBtnClick(id) {
  location.pathname = "./info.html";
  console.log(id);
}
//search=>
elSearchInput.addEventListener("input", function (e) {
  const value = e.target.value.toLowerCase().trim();
  const searchedStudents = studentList.filter((item) =>
    item.name.toLowerCase().includes(value)
  );
  renderStudents(searchedStudents, elStudentTable);
});
//sort=>
elSortPart.addEventListener("click", (e) => {
  studentList.sort((a, b) => a.name.localeCompare(b.name));
  renderStudents(studentList, elStudentTable);
  localStorage.setItem("students", JSON.stringify(studentList));
});
//more=>
function handleMoreBtnClick(id) {
  const singleData = studentList.find((item) => item.id === id);
  if (singleData) {
    localStorage.setItem("selectedStudent", JSON.stringify(singleData));
    location.href = "./info.html";
  }
}
//image=>
