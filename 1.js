document.addEventListener("DOMContentLoaded", function () {
    const buyButtons = document.querySelectorAll(".prod_buy1, .prod_buy2, .prod_buy3, .prod_buy4, .prod_buy5, .prod_buy6, .prod_buy7, .prod_buy8, .prod_buy9");
    const productsContainer = document.querySelector(".products");
    const pok = document.getElementById("buyPok");
    const orderForm = document.getElementById("orderForm");
    const closePok = document.querySelector(".cl-pok");
    const generatedKeyElement = document.getElementById("generatedKey");
    const loadingScreen = document.getElementById("loadingScreen");
    const keyDisplay = document.getElementById("keyDisplay");
    const cardPayment = document.getElementById("cardPayment");
    const cryptoPayment = document.getElementById("cryptoPayment");

    const modalWindows = {
        info: {
            open: document.getElementById("infoBtn"),
            close: document.getElementById("closeInfo"),
            modal: document.getElementById("show_info")
        },
        privacy: {
            open: document.getElementById("privacyBtn"),
            close: document.getElementById("closePrivacy"),
            modal: document.getElementById("privacy_info")
        },
        terms: {
            open: document.getElementById("termsBtn"),
            close: document.getElementById("closeTerms"),
            modal: document.getElementById("terms_info")
        },
        contacts: {
            open: document.getElementById("contactsBtn"),
            close: document.getElementById("closeContacts"),
            modal: document.getElementById("contacts_info")
        }
    };

    buyButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            const sectionId = ["BF", "BT", "PD", "DM", "ST", "ME", "SC", "DB", "FS"][index];
            const section = document.getElementById(sectionId);

            if (section) {
                productsContainer.style.display = "none";
                section.style.display = "block";

                const backButton = section.querySelector('.back-button');
                if (backButton) {
                    backButton.addEventListener('click', function () {
                        section.style.display = "none";
                        productsContainer.style.display = 'grid';
                    });
                }
            }
        });
    });

    function generateKey() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let key = '';
        for (let i = 0; i < 16; i++) {
            key += chars.charAt(Math.floor(Math.random() * chars.length));
            if ((i + 1) % 4 === 0 && i !== 15) key += '-';
        }
        return key;
    }

    document.querySelectorAll(".buy-button").forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            orderForm.style.display = "flex";
            pok.style.display = "none";
            keyDisplay.style.display = "none";
        });
    });

    document.getElementById("orderData").addEventListener("submit", function(e) {
        e.preventDefault();
        
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        
        if (paymentMethod === "Visa" || paymentMethod === "Mastercard") {
            orderForm.style.display = "none";
            cardPayment.style.display = "flex";
        } 
        else if (paymentMethod === "Crypto") {
            orderForm.style.display = "none";
            cryptoPayment.style.display = "flex";
        }
    });

    document.getElementById("cardForm").addEventListener("submit", function(e) {
        e.preventDefault();
        
        if (!validateCard()) return;
        
        processPayment();
    });

    document.getElementById("confirmCrypto").addEventListener("click", function() {
        processPayment();
    });

    function validateCard() {
        const cardNumber = document.getElementById("cardNumber").value.replace(/\s/g, '');
        const expiry = document.getElementById("cardExpiry").value;
        
        if (!/^\d{16}$/.test(cardNumber)) {
            alert("Будь ласка, введіть коректний номер картки");
            return false;
        }
        
        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
            alert("Будь ласка, введіть коректний термін дії (MM/YY)");
            return false;
        }
        
        if (!/^\d{3}$/.test(document.getElementById("cardCvv").value)) {
            alert("Будь ласка, введіть коректний CVV код");
            return false;
        }
        
        return true;
    }

    function processPayment() {
        document.getElementById("cardPayment").style.display = "none";
        document.getElementById("cryptoPayment").style.display = "none";
        
        const loadingScreen = document.getElementById("loadingScreen");
        loadingScreen.style.display = "flex";
        
        setTimeout(() => {
            loadingScreen.style.display = "none";
            
            generatedKeyElement.textContent = generateKey();
            pok.style.display = "flex";
            
            document.getElementById("orderData").reset();
            document.getElementById("cardForm").reset();
        }, 3500);
    }

    closePok.addEventListener("click", () => {
        pok.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === pok) {
            pok.style.display = "none";
        }
        if (e.target === orderForm) {
            orderForm.style.display = "none";
        }
    });

    function initModal(modalConfig) {
        modalConfig.open.addEventListener("click", (e) => {
            e.preventDefault();
            modalConfig.modal.style.display = "flex";
        });
        
        modalConfig.close.addEventListener("click", () => {
            modalConfig.modal.style.display = "none";
        });
        
        window.addEventListener("click", (e) => {
            if (e.target === modalConfig.modal) {
                modalConfig.modal.style.display = "none";
            }
        });
    }

    Object.values(modalWindows).forEach(initModal);

    const blocks = document.querySelectorAll('.block');
    document.addEventListener('mousemove', function(e) {
        const dx = e.pageX - window.innerWidth / 2;
        const dy = e.pageY - window.innerHeight / 2;
        const angleX = 20 * dx / window.innerWidth / 2;
        const angleY = 20 * dy / window.innerHeight / 2;

        blocks.forEach(block => {
            block.style.transform = `rotateX(${-angleY}deg) rotateY(${angleX}deg)`;
        });
    });

    window.goBack = function() {
        document.querySelectorAll('.product-page').forEach(page => {
            page.style.display = 'none';
        });
        document.querySelector('.products').style.display = 'grid';
    };

    document.getElementById("cardNumber").addEventListener("input", function(e) {
        let value = e.target.value.replace(/\s/g, '');
        if (value.length > 16) value = value.substr(0, 16);
        value = value.replace(/(\d{4})/g, '$1 ').trim();
        e.target.value = value;
    });

    document.getElementById("cardExpiry").addEventListener("input", function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.substr(0, 4);
        if (value.length > 2) {
            value = value.replace(/(\d{2})(\d{0,2})/, '$1/$2');
        }
        e.target.value = value;
    });
});

