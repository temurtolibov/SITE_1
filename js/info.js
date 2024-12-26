let elUser = document.querySelector(".user");
const user = JSON.parse(localStorage.getItem("user"));
elUser.textContent = user.username;
let elUsername = document.querySelector(".username");
const userName = JSON.parse(localStorage.getItem("user"));
elUsername.textContent = user.username;

function handleStudentPanelBtnClick() {
  location.pathname = "./students.html";
}
const selectedStudent = JSON.parse(localStorage.getItem("selectedStudent"));
const studentInfoContainer = document.querySelector(".student-info");
studentInfoContainer.innerHTML = `
<div
class="w-[592px] pb-[120px] flex bg-white mt-[41px] rounded-[8px] pt-[28px] pl-[22px] ml-[22px]"
>


<label class="inline-block flex justify-center">
            <input id="add-choose-img" class="hidden" type="file" />
            <img id="previewImage"
             class="rounded-[8px]"
             src="./images/madesh-img.png"
             alt="image"
             width="209"
             />
          </label>


<div class="ml-[50px] mt-[15px]">
  <div class="">
    <span
      class="font-semibold flex flex-col text-[#ACACAC] text-[12px] leading-[15px]"
      >Name</span
    >
    <strong class="font-normal text-[16px] leading-[20px]"
      >${selectedStudent.name}</strong
    >
  </div>
  <div class="pt-[10px]">
    <span
      class="font-semibold flex flex-col text-[#ACACAC] text-[12px] leading-[15px]"
      >Email</span
    >
    <strong class="font-normal text-[16px] leading-[20px]"
      >${selectedStudent.email}</strong
    >
  </div>
  <div class="pt-[10px]">
    <span
      class="font-semibold flex flex-col text-[#ACACAC] text-[12px] leading-[15px]"
      >Phone</span
    >
    <strong class="font-normal text-[16px] leading-[20px]"
      >${selectedStudent.phone}</strong
    >
  </div>
  <div class="pt-[10px]">
    <span
      class="font-semibold flex flex-col text-[#ACACAC] text-[12px] leading-[15px]"
      >Date admission</span
    >
    <strong class="font-normal text-[16px] leading-[20px]"
      >${selectedStudent.date}</strong
    >
  </div>
</div>
</div>
`;
const imageInput = document.getElementById("add-choose-img");
const previewImage = document.getElementById("previewImage");
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  previewImage.src = URL.createObjectURL(file);
  const imageData = previewImage.src;
  localStorage.setItem("savedImage", imageData);
});
