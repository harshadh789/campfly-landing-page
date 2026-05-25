const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const searchInput = document.getElementById("site-search");
const chips = Array.from(document.querySelectorAll(".chip"));

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

const newsletterForm = document.getElementById("newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Thanks for subscribing. We'll send fresh holiday deals soon.");
    newsletterForm.reset();
  });
}

const plannerForm = document.getElementById("planner");
if (plannerForm) {
  plannerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(plannerForm);
    const destination = formData.get("destination") || "a destination";
    const month = formData.get("month") || "my travel month";
    const style = formData.get("style") || "holiday";
    const message = `Hi Campfly, I want a ${style} itinerary for ${destination} around ${month}.`;

    window.location.href = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
  });
}
