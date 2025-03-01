document.addEventListener("DOMContentLoaded", function () {
  // FAQ accordion functionality
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector("i");

      // Toggle answer visibility
      if (answer.style.display === "block") {
        answer.style.display = "none";
        icon.classList.remove("fa-minus");
        icon.classList.add("fa-plus");
      } else {
        answer.style.display = "block";
        icon.classList.remove("fa-plus");
        icon.classList.add("fa-minus");
      }
    });
  });

  // Reviews carousel functionality
  const reviewCards = document.querySelector(".review-cards");
  const prevButton = document.querySelector(".review-nav.prev");
  const nextButton = document.querySelector(".review-nav.next");
  let currentIndex = 0;

  // This would need to be expanded for a real implementation
  // with proper carousel functionality
  nextButton.addEventListener("click", () => {
    currentIndex++;
    updateCarousel();
  });

  prevButton.addEventListener("click", () => {
    currentIndex--;
    updateCarousel();
  });

  function updateCarousel() {
    // Basic carousel functionality
    // Would need to be enhanced for a production site
    console.log("Updating carousel to index:", currentIndex);
  }

  // Form validation
  const contactForm = document.querySelector(".contact-form");
  const formControls = contactForm.querySelectorAll(".form-control");
  const sendButton = contactForm.querySelector(".btn");

  sendButton.addEventListener("click", (e) => {
    e.preventDefault();
    let isValid = true;

    formControls.forEach((control) => {
      if (!control.value.trim()) {
        isValid = false;
        control.style.borderColor = "red";
      } else {
        control.style.borderColor = "";
      }
    });

    if (isValid) {
      alert("Form submitted successfully!");
      // In a real implementation, you would send the form data to a server
    }
  });
});
