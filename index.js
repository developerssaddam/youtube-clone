// Get Element from document.
const btn_container = document.getElementById("btn_container");

// Category BTN.
const getCategoryBtnData = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await res.json();
  const btnCategory = data.data;
  showCategoryBtn(btnCategory);
};

// Now show BTN with data.
const showCategoryBtn = (btnCategory) => {
  btnCategory.forEach((item) => {
    const btnDiv = document.createElement("button");
    btnDiv.className = `btn  btn-ghost bg-slate-700 text-white text-lg`;
    btnDiv.innerText = item.category;
    btn_container.appendChild(btnDiv);
    btnDiv.addEventListener("click", () => getCategoryData(item.category_id));
  });
};

// GetCategoryWiseData.
const getCategoryData = (categoryID) => {
  console.log(categoryID);
};

getCategoryBtnData();
