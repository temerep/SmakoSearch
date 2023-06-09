var FOODLIST;
var PLACES;

const delay = (delayInms) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

const addServiceToggle = () => {
  document.getElementById('modal').classList.toggle('hidden')
}

document.addEventListener("DOMContentLoaded", function () {
  let FoodReq = new XMLHttpRequest();
  FoodReq.open("GET", "http://127.0.0.1:8000/api/foodlist", true);
  FoodReq.onreadystatechange = function () {
    if (FoodReq.readyState === 4 && FoodReq.status === 200) {
      FOODLIST = JSON.parse(FoodReq.responseText);
    }
  };
  FoodReq.send();

  var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
  var themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");
  // Change the icons inside the button based on previous settings
  if (localStorage.getItem("color-theme") === "dark" || (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    themeToggleLightIcon.classList.remove("hidden");
  } else {
    themeToggleDarkIcon.classList.remove("hidden");
  }

  var themeToggleBtn = document.getElementById("theme-toggle");

  themeToggleBtn.addEventListener("click", function () {
    // toggle icons inside button
    themeToggleLightIcon.classList.toggle("hidden");
    themeToggleDarkIcon.classList.toggle("hidden");

    // if set via local storage previously
    if (localStorage.getItem("color-theme")) {
      if (localStorage.getItem("color-theme") === "light") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      }

      // if NOT set via local storage previously
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      }
    }
  });
});

let search_checkall_status = false;

const showSort = () => {
  let sort = document.getElementById("sortlist");
  if (sort.classList.contains("hidden")) {
    sort.classList.remove("hidden");
  } else {
    sort.classList.add("hidden");
  }
};

if (window.location.pathname === "/search") {
  document.getElementById("price-input").addEventListener("keydown", function (e) {
    if (e.key.length == 1 && e.key.match(/[^0-9'".]/)) return false;
  });
  document.getElementById("price-range").addEventListener("input", function () {
    document.getElementById("price-input").value = this.value + "₴";
  });
  document.getElementById("price-input").addEventListener("input", function () {
    document.getElementById("price-range").value = this.value;
  });

  const SearchBtn = document.getElementById("search_btn");
  const SearchInput = document.getElementById("search");
  const PriceRange = document.getElementById("price-range");

  SearchBtn.addEventListener("click", FilteredSearch);
  SearchInput.addEventListener("input", FilteredSearch);
  PriceRange.addEventListener("input", FilteredSearch);

  function FilteredSearch() {
    const opencards = document.getElementsByClassName("card");

    const checkboxes = document.querySelectorAll(".catergory-check:checked");
    const selectedValues = Array.from(checkboxes).map((checkbox) => checkbox.value);
    const filtered = [];
    for (let i = 0; i < FOODLIST.length; i++) {
      if (!document.getElementById("search").value.length) {
        if (FOODLIST[i].price <= PriceRange.value && selectedValues.some((el) => el == FOODLIST[i].category)) {
          //перевірка чи щось є з заданого у полі пошуку
          filtered.push(FOODLIST[i]);
        }
      }
      if (document.getElementById("search").value.length) {
        if (
          [FOODLIST[i].name, FOODLIST[i].description, FOODLIST[i].category].some((el) => el.includes(document.getElementById("search").value)) &&
          FOODLIST[i].price <= PriceRange.value &&
          selectedValues.some((el) => el == FOODLIST[i].category)
        ) {
          //перевірка чи щось є з заданого у полі пошуку
          filtered.push(FOODLIST[i]);
        }
      }
    }
    if (filtered.length) {
      document.getElementById("search-empty").classList.add("hidden");
    } else {
      document.getElementById("search-empty").classList.remove("hidden");
    }
    
    while (opencards.length > 0) {
      opencards[0].parentNode.removeChild(opencards[0]);
    }

    for (let i = 0; i < filtered.length; i++) {
      console.log(filtered.length)
      const card = document.createElement("div");
      card.classList.add("card");
      card.classList.add("dark:bg-zinc-900");
      card.classList.add("p-4");
      card.innerHTML = `<div class="mx-auto mt-11 transform overflow-hidden ring-1 ring-orange-500 rounded-lg bg-white dark:bg-zinc-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg"><img class="h-56 w-full object-cover object-center" src="../assets/img/food-placeholder.png" alt="Product Image"><div class="p-4"><div class="flex items-center"><h2 class="mb-2 text-lg font-bold dark:text-white text-zinc-900">${filtered[i].name}</h2><h2 class="ml-auto mb-2 text-lg font-light dark:text-white text-zinc-400">${filtered[i].weight}г.</h2></div><p class="mb-2 text-base dark:text-zinc-300 text-zinc-500">${filtered[i].description}</p><div class="flex items-center"><p class="mr-2 text-2xl font-black text-zinc-900 dark:text-white">${filtered[i].price}₴</p><p class="ml-auto text-base font-medium text-orange-500">${filtered[i].place}</p></div></div></div>`
      // card.classList.add("card");
      // card.classList.add("m-2");
      // card.classList.add("cursor-pointer");
      // card.classList.add("border");
      // card.classList.add("border-zinc-400");
      // card.classList.add("dark:border-zinc-600");
      // card.classList.add("bg-white");
      // card.classList.add("rounded-lg");
      // card.classList.add("hover:shadow-md");
      // card.classList.add("hover:border-opacity-0");
      // card.classList.add("transform");
      // card.classList.add("hover:-translate-y-1");
      // card.classList.add("transition-all");
      // card.classList.add("duration-200");
      // card.innerHTML = `<div class="m-3"><img class="transition-all rounded-lg mb-8" src="./assets/img/food-placeholder.png" alt="image description"><h2 class="font-medium text-lg mb-2">${filtered[i].name}<span class="text-sm text-teal-800 font-bold font-mono bg-teal-100 inline rounded-full px-2 align-top float-right animate-pulse">₴ ${filtered[i].price} </span></h2><p class="font-light font-mono text-sm text-zinc-700 hover:text-zinc-900 transition-all duration-200">${filtered[i].description}</p><br><p class="font-light font-mono text-sm text-zinc-400 hover:text-zinc-900 transition-all duration-200">Вага: 400г.<br><span class="text-sm text-red-800 font-mono md:block sm:inline animate">${filtered[i].place}</span></p></div>`;
      document.getElementById("dashboard").appendChild(card);
    }
  }

  // const modalEl = document.getElementById("info-popup");
  // const privacyModal = new Modal(modalEl, { placement: "center" });
  // privacyModal.show();
  // const closeModalEl = document.getElementById("close-modal");
  // closeModalEl.addEventListener("click", () => privacyModal.hide());
  // const acceptPrivacyEl = document.getElementById("add-service");
  // acceptPrivacyEl.addEventListener("click", () => privacyModal.hide());
}

const Services = async () => {
  if (window.location.pathname === "/services") {
    let PlaceReq = new XMLHttpRequest();
    PlaceReq.open("GET", "http://127.0.0.1:8000/api/places", true);
    PlaceReq.onreadystatechange = function () {
      if (PlaceReq.readyState === 4 && PlaceReq.status === 200) {
        PLACES = JSON.parse(PlaceReq.responseText);
      }
    };
    PlaceReq.send();
    await delay(500);
    console.log(PLACES);
    const opencards = document.getElementsByClassName("card");
    if (PLACES.length) {
      document.getElementById("search-empty").classList.add("hidden");
    }
    while (opencards.length > 0) {
      opencards[0].parentNode.removeChild(opencards[0]);
    }
    for (let i = 0; i < PLACES.length; i++) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.classList.add("dark:bg-zinc-900");
      card.classList.add("p-4");
      card.innerHTML = `<div class="card dark:bg-zinc-900 p-4"><div class="mx-auto mt-11 transform overflow-hidden ring-1 ring-orange-500 rounded-lg bg-white dark:bg-zinc-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg"><img class="h-56 w-full object-cover object-center" src="../assets/img/food-placeholder.png" alt="Product Image"><div class="p-4"><h2 class="mb-2 text-lg font-bold dark:text-white text-zinc-900">${PLACES[i].place}</h2><p class="mb-2 text-base dark:text-zinc-300 text-zinc-500">${PLACES[i].location}</p><p class="ml-auto text-base font-medium text-orange-500">${PLACES[i].schedule.open} - ${PLACES[i].schedule.close}</p></div></div></div>`;
      document.getElementById("dashboard").appendChild(card);
    }
  }
};

Services();

function checkAll() {
  let checks = document.querySelectorAll(".catergory-check");
  if (search_checkall_status) {
    checks.forEach((el) => (el.checked = true));
  } else {
    checks.forEach((el) => (el.checked = false));
  }
  search_checkall_status = !search_checkall_status;
}

const toggleMenu = () => {
  let menu = document.getElementById("navbar-cta");
  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
  } else {
    menu.classList.add("hidden");
  }
};

const toggleFilter = () => {
  let filter = document.getElementById("mob-filter");
  if (filter.classList.contains("hidden")) {
    filter.classList.remove("hidden");
  } else {
    filter.classList.add("hidden");
  }
};

// // to save
// var d = new Date();
// d.setHours("01", "00", 0, 0)

// //to compare with the current time
// var d2 = new Date();
// console.log((d2 - d)/1000/60);
