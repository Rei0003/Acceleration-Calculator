document.querySelectorAll(".sectionTitle").forEach(sectionTitle => {
  sectionTitle.addEventListener("click", () => {
    // rotate the icon
    const icon = sectionTitle.querySelector("i");
    icon.classList.toggle("rotated");

    // find all inputFields in this section
    const inputFields = sectionTitle
      .closest(".inputSection")
      .querySelectorAll(".inputField");

    // toggle hidden attribute on each one
    inputFields.forEach(field => {
      field.toggleAttribute("hidden");
    });
  });
});


