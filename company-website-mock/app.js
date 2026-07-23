const modal = document.querySelector(".modal");
const modalTitle = modal?.querySelector("h2");
const modalBody = modal?.querySelector(".modal-card > p:last-child");

document.querySelectorAll(".detail-trigger").forEach((button) => {
  button.addEventListener("click", () => {
    if (!modal || !modalTitle || !modalBody) return;
    modalTitle.textContent = button.dataset.title || "Detail";
    modalBody.textContent = button.dataset.detail || "More detail is coming soon.";
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  });
});

document.querySelectorAll(".modal-close, .modal").forEach((item) => {
  item.addEventListener("click", (event) => {
    if (event.target !== item && !item.classList.contains("modal-close")) return;
    modal?.classList.remove("show");
    modal?.setAttribute("aria-hidden", "true");
  });
});

document.querySelectorAll(".lana-toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    toggle.closest(".lana-chat")?.classList.toggle("open");
  });
});

document.querySelectorAll(".chat-action").forEach((button) => {
  button.addEventListener("click", () => {
    const stream = button.closest(".lana-panel")?.querySelector(".chat-stream");
    if (!stream) return;
    const message = document.createElement("p");
    message.className = "bot typing";
    message.textContent = "I am ready. Tell me what you want to build and I will guide the next step.";
    stream.appendChild(message);
    stream.scrollTop = stream.scrollHeight;
  });
});

document.querySelectorAll("nav a").forEach((link) => {
  const current = location.pathname.split("/").pop() || "index.html";
  const target = link.getAttribute("href")?.replace("./", "");
  if (target === current || (current === "" && target === "index.html")) {
    link.classList.add("active");
  }
});

const revealItems = document.querySelectorAll(
  ".product-card, .solution-row article, .news-grid article, .map-node, .path-grid a, .detail-grid button, .timeline article, .proof-cards article"
);

revealItems.forEach((item) => item.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => observer.observe(item));
