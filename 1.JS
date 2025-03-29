document.addEventListener("DOMContentLoaded", function () {
    let buyButtons = document.querySelectorAll("button");
    let productsContainer = document.querySelector(".products");

    buyButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            // Скрываем контейнер с продуктами
            productsContainer.style.display = "none";

            // Получаем id нужной секции на основе индекса
            let sectionId = ["BF", "BT", "PD", "DM", "ST", "ME"][index];

            // Показываем нужную секцию
            let section = document.getElementById(sectionId);
            if (section) {
                section.style.display = "block";
            }

            // Добавляем обработчик для кнопки "Назад" на каждой странице
            let backButton = section.querySelector('.back-button');
            if (backButton) {
                backButton.addEventListener('click', function () {
                    // Скрываем текущую секцию
                    section.style.display = "none";

                    // Показываем контейнер с продуктами
                    productsContainer.style.display = 'grid';
                });
            }
        });
    });
});

document.getElementById("logo").addEventListener("click", function() {
    let gif = document.getElementById("gif");
    let audio = document.getElementById("scary-audio");

    gif.style.display = "block";
    audio.play();

    setTimeout(function() {
        gif.style.display = "none";
        audio.pause();
        audio.currentTime = 0;
    }, 3000);
});


