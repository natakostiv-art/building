document.addEventListener("DOMContentLoaded", () => {

  // ==============================
  //  UNIVERSAL SLIDER FUNCTION
  // ==============================

  function initSlider(options) {
    const {
      sliderSelector,
      cardsSelector,
      cardSelector,
      btnPrevSelector,
      btnNextSelector,
      paginationTextSelector,
      paginationLineSelector,
      itemsPerSlide
    } = options;

    const slider = document.querySelector(sliderSelector);
    const cardsContainer = slider.querySelector(cardsSelector);
    const cards = Array.from(cardsContainer.querySelectorAll(cardSelector));

    const btnPrev = slider.querySelector(btnPrevSelector);
    const btnNext = slider.querySelector(btnNextSelector);

    const paginationText = slider.parentElement.querySelector(paginationTextSelector);
    const paginationLine = slider.parentElement.querySelector(paginationLineSelector);

    if (!slider || !cards.length) return;

    const totalCards = cards.length;
    const totalPages = Math.ceil(totalCards / itemsPerSlide);
    let currentPage = 1;

    // Вычисляем ширину одного элемента
    const gap = parseFloat(getComputedStyle(cardsContainer).gap) || 24;
    const cardWidth = cards[0].getBoundingClientRect().width;
    const step = cardWidth * itemsPerSlide + gap * (itemsPerSlide - 1);

    function updateSlider() {
      const offset = -(currentPage - 1) * step;
      cardsContainer.style.transform = `translateX(${offset}px)`;
      cardsContainer.style.transition = "0.5s ease";

      // Pagination
      paginationText.innerHTML =
        `${String(currentPage).padStart(2, "0")}/<span class="pagination__span">${String(totalPages).padStart(2, "0")}</span>`;

      paginationLine.style.width = `${(currentPage / totalPages) * 100}%`;

      // Buttons
      btnPrev.style.opacity = currentPage === 1 ? "0.3" : "1";
      btnPrev.style.pointerEvents = currentPage === 1 ? "none" : "auto";

      btnNext.style.opacity = currentPage === totalPages ? "0.3" : "1";
      btnNext.style.pointerEvents = currentPage === totalPages ? "none" : "auto";
    }

    btnNext.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        updateSlider();
      }
    });

    btnPrev.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        updateSlider();
      }
    });

    updateSlider();
  }

  // ==============================
  //  PORTFOLIO SLIDER (3 CARDS)
  // ==============================
  initSlider({
    sliderSelector: ".portfolio__slider",
    cardsSelector: ".cards",
    cardSelector: ".card",
    btnPrevSelector: ".arrow-left",
    btnNextSelector: ".arrow-right",
    paginationTextSelector: ".pagination__text",
    paginationLineSelector: ".pagination__line",
    itemsPerSlide: 3
  });

  // ==============================
  //  PARTNERS SLIDER (1 CARD)
  // ==============================
  initSlider({
    sliderSelector: ".slider-big",
    cardsSelector: ".slider__elem",
    cardSelector: ".slider_item",
    btnPrevSelector: ".arrow-left",
    btnNextSelector: ".arrow-right",
    paginationTextSelector: ".pagination__text",
    paginationLineSelector: ".pagination__line",
    itemsPerSlide: 1
  });

  // ==============================
  //  FAQ ACCORDION
  // ==============================

  const faqItems = document.querySelectorAll(".faq__item");

  faqItems.forEach(item => {
    item.addEventListener("click", () => {
      item.classList.toggle("faq__show");
    });
  });

});

