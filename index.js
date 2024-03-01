// Get Element from document.
const btn_container = document.getElementById("btn_container");
const card_container = document.getElementById("card_container");
const error_element = document.getElementById("error_element");
const sort_btn = document.getElementById("sort_btn");
let categoryId = 1000;
let dataSortedByView = false;

sort_btn.addEventListener("click", () => {
  dataSortedByView = true;
  getCategoryData(categoryId, dataSortedByView);
});

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
    btnDiv.className = `btn category_btn  btn-ghost bg-slate-700 text-white text-lg`;
    btnDiv.innerText = item.category;
    btn_container.appendChild(btnDiv);

    btnDiv.addEventListener("click", (e) => {
      const allCategoryBtn = document.querySelectorAll(".category_btn");
      for (const categoryBtn of allCategoryBtn) {
        categoryBtn.classList.remove("bg-red-600");
      }
      e.target.classList.add("bg-red-600");
      getCategoryData(item.category_id);
    });
  });
};

// GetCategoryWiseData.
const getCategoryData = async (categoryID, dataSortedByView) => {
  categoryId = categoryID;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryID}`
  );
  const data = await res.json();
  const categoryData = data.data;
  card_container.textContent = "";

  // Show ErrorElement.
  if (categoryData.length === 0) {
    error_element.classList.remove("hidden");
  } else {
    error_element.classList.add("hidden");
  }

  // If anyOne clicked sortbyViewBtn.
  if (dataSortedByView) {
    categoryData.sort((a, b) => {
      const firstItemViewsText = a.others?.views;
      const secoundItemViewsText = b.others?.views;

      getFirstItemVewsNumber =
        parseFloat(firstItemViewsText.replace("K", "")) || 0;
      getSecoundItemVewsNumber =
        parseFloat(secoundItemViewsText.replace("K", "")) || 0;
      return getSecoundItemVewsNumber - getFirstItemVewsNumber;
    });
  }

  categoryData.map((item) => {
    const { authors, others, thumbnail, title } = item;

    console.log(others.posted_date);

    // Show TimeStamp.
    const time = getTime(others?.posted_date);

    // Set VerifyBadge conditionaly.
    let verifyBadge = "";
    if (authors[0].verified) {
      verifyBadge = `<img class="w-6 h-6" src="./images/verify.png" alt="">`;
    }
    const categoryCard = document.createElement("div");
    categoryCard.className = `card w-full bg-base-100 shadow-xl`;

    categoryCard.innerHTML = `<figure class="overflow-hidden h-64">
            <img class="w-full h-full" src="${thumbnail}" alt="thumbnail" />
            <h6 class="absolute bottom-[40%] right-12">${time}</h6>
            </figure>
            <div class="card-body">
                <div class="flex space-x-4 justify-start items-start">
                    <div>
                        <img class="w-12 h-12 rounded-full" src="${authors[0]?.profile_picture}" alt="Profile picture" />
                    </div>
                    <div>
                        <h2 class="card-title">${title}</h2>
                        <div class="flex mt-3">
                            <p class="">${authors[0]?.profile_name}</p>
                            ${verifyBadge}
                        </div>
                        <p class="mt-3">${others?.views} Views</p>
                    </div>
                </div>
            </div>`;
    card_container.appendChild(categoryCard);
  });
};

getCategoryBtnData();
getCategoryData(categoryId, dataSortedByView);

// Get time function.
const getTime = (timestamp) => {
  const hour = Math.floor(timestamp / (1000 * 60 * 60));
  const minite = Math.floor((timestamp % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timestamp % (1000 * 60)) / 1000);
  return ` ${hour}:Hour, ${minite}:Mintite, ${seconds}:seconds ago`;
};
