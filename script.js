const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const searchInput = document.getElementById("site-search");
const chips = Array.from(document.querySelectorAll(".chip"));
const plannerForm = document.getElementById("planner");

function openWhatsApp(message) {
  window.location.href = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
}

if (searchInput && chips.length) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();

    chips.forEach((chip) => {
      const isMatch = query && chip.textContent.toLowerCase().includes(query);
      chip.classList.toggle("active", Boolean(isMatch));
    });

    if (!query) {
      chips.forEach((chip, index) => chip.classList.toggle("active", index === 0));
    }
  });

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const destination = chip.textContent.trim();

      if (searchInput) {
        searchInput.value = destination === "Explore" ? "" : destination;
        searchInput.dispatchEvent(new Event("input"));
      }

      if (plannerForm && destination !== "Explore") {
        const destinationField = plannerForm.elements.destination;
        destinationField.value = destination;
        plannerForm.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });
}

const tabButtons = Array.from(document.querySelectorAll(".tab-button"));
const panels = Array.from(document.querySelectorAll(".panel"));

function setActiveTab(targetId) {
  tabButtons.forEach((button) => {
    const isMatch = button.dataset.tab === targetId;
    button.classList.toggle("is-active", isMatch);
    button.setAttribute("aria-selected", isMatch ? "true" : "false");
  });

  panels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === targetId);
  });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.tab;
    if (targetId) {
      setActiveTab(targetId);
    }
  });
});

const currencyButton = document.querySelector("[data-currency-button]");
if (currencyButton) {
  currencyButton.addEventListener("click", () => {
    alert("All package prices are currently shown in Indian rupees.");
  });
}

const packageButtons = Array.from(document.querySelectorAll(".package-button"));
packageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const packageName = button.dataset.package || "this package";
    const destination = button.dataset.destination || "";
    const style = button.dataset.style || "holiday";

    if (plannerForm) {
      plannerForm.elements.destination.value = destination;
      plannerForm.elements.style.value = style;
    }

    openWhatsApp(`Hi Campfly, I want details for ${packageName}.`);
  });
});

const newsletterForm = document.getElementById("newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Thanks for subscribing. We'll send fresh holiday deals soon.");
    newsletterForm.reset();
  });
}

if (plannerForm) {
  plannerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(plannerForm);
    const destination = formData.get("destination") || "a destination";
    const month = formData.get("month") || "my travel month";
    const style = formData.get("style") || "holiday";
    const message = `Hi Campfly, I want a ${style} itinerary for ${destination} around ${month}.`;

    openWhatsApp(message);
  });
}
