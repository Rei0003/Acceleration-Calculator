document.querySelectorAll(".inputTitle .fa-circle-question").forEach(icon => {
  icon.addEventListener("click", (e) => {
    e.stopPropagation();

    const inputField = icon.closest(".inputField");
    const tip = inputField.querySelector(".tip");

    tip.toggleAttribute("hidden");
  });
});
