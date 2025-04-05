document.addEventListener("DOMContentLoaded", function () {
    let buyButtons = document.querySelectorAll("button");
    let productsContainer = document.querySelector(".products");

    buyButtons.forEach((button, index) => {
        button.addEventListener("click", function () {

            productsContainer.style.display = "none";

            let sectionId = ["BF", "BT", "PD", "DM", "ST", "ME"][index];

            let section = document.getElementById(sectionId);
            if (section) {
                section.style.display = "block";
            }

            let backButton = section.querySelector('.back-button');
            if (backButton) {
                backButton.addEventListener('click', function () {

                    section.style.display = "none";

                    productsContainer.style.display = 'grid';
                });
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    let buyButtons = document.querySelectorAll(".buy-button");
    let pok = document.getElementById("buyPok");
    let closePok = document.querySelector(".cl-pok");

    buyButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            pok.style.display = "flex";
        });
    });

    closePok.addEventListener("click", function () {
        pok.style.display = "none";
    });

    window.addEventListener("click", function (e) {
        if (e.target === pok) {
            pok.style.display = "none";
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    let buyButtons = document.querySelectorAll(".buy-button");
    let pok = document.getElementById("buyPok");
    let closePok = document.querySelector(".cl-pok");
    let generatedKeyElement = document.getElementById("generatedKey");


    function generateKey() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let key = '';
        for (let i = 0; i < 16; i++) {
            key += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return key;
    }


    buyButtons.forEach((button) => {
        button.addEventListener("click", () => {

            generatedKeyElement.textContent = generateKey();
            pok.style.display = "flex";
        });
    });

    closePok.addEventListener("click", () => {
        pok.style.display = "none";
    });


    window.addEventListener("click", (e) => {
        if (e.target === pok) {
            pok.style.display = "none";
        }
    });
});




