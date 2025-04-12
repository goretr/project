document.addEventListener("DOMContentLoaded", function () {
    // Покупка товара и отображение секции
    let buyButtons = document.querySelectorAll("button");
    let productsContainer = document.querySelector(".products");

    buyButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            let sectionId = ["BF", "BT", "PD", "DM", "ST", "ME"][index];
            let section = document.getElementById(sectionId);

            if (section) {
                productsContainer.style.display = "none";
                section.style.display = "block";

                let backButton = section.querySelector('.back-button');
                if (backButton) {
                    backButton.addEventListener('click', function () {
                        section.style.display = "none";
                        productsContainer.style.display = 'grid';
                    });
                }
            }
        });
    });

    // Покупка (popup с ключом)
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

    document.querySelectorAll(".buy-button").forEach(button => {
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

    // Информация (Info popup)
    let infoBtn = document.getElementById("infoBtn");
    let closeInfo = document.getElementById("closeInfo");
    let showInfo = document.getElementById("show_info");

    infoBtn.addEventListener("click", function (e) {
        e.preventDefault();
        showInfo.style.display = "flex";
    });

    closeInfo.addEventListener("click", function () {
        showInfo.style.display = "none";
    });

    window.addEventListener("click", function (e) {
        if (e.target === showInfo) {
            showInfo.style.display = "none";
        }
    });
});


// Політика конфіденційності
document.getElementById("privacyBtn").addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById("privacy_info").style.display = "flex";
});
document.getElementById("closePrivacy").addEventListener("click", function() {
    document.getElementById("privacy_info").style.display = "none";
});

// Умови використання
document.getElementById("termsBtn").addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById("terms_info").style.display = "flex";
});
document.getElementById("closeTerms").addEventListener("click", function() {
    document.getElementById("terms_info").style.display = "none";
});

// Контакти
document.getElementById("contactsBtn").addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById("contacts_info").style.display = "flex";
});
document.getElementById("closeContacts").addEventListener("click", function() {
    document.getElementById("contacts_info").style.display = "none";
});



let blocks = document.querySelectorAll('.block')

document.addEventListener('mousemove', function(e) {
    let dx = e.pageX - window.innerWidth / 2
    let dy = e.pageY - window.innerHeight / 2
    let angleX = 20 * dx / window.innerWidth / 2
    let angleY = 20 * dy / window.innerHeight / 2

    blocks.forEach(block => {
        block.style.transform = `rotateX(${-angleY}deg) rotateY(${angleX}deg)`
    })
})
