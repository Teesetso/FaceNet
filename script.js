/**
 * SECTION 1: UI & NAVIGATION
 */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });
}

// Preloader logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => { preloader.classList.add('loader-hidden'); }, 1000);
    }
});

/**
 * SECTION 2: AUTHENTICATION (Signup, Login, Logout)
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // SIGN UP LOGIC
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userObj = {
                name: document.getElementById('userName').value,
                email: document.getElementById('userEmail').value,
                phone: document.getElementById('userPhone').value,
                pass: document.getElementById('userPass').value
            };
            localStorage.setItem('registeredUser', JSON.stringify(userObj));
            alert("Account created successfully! Redirecting to login...");
            window.location.href = "login.html";
        });
    }

    // LOGIN LOGIC
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailIn = document.getElementById('loginEmail').value;
            const passIn = document.getElementById('loginPass').value;
            const stored = localStorage.getItem('registeredUser');

            if (stored) {
                const user = JSON.parse(stored);
                if (emailIn === user.email && passIn === user.pass) {
                    localStorage.setItem('isLoggedIn', 'true');
                    alert("Welcome back, " + user.name);
                    window.location.href = "post-ad.html";
                } else {
                    alert("Invalid credentials.");
                }
            } else {
                alert("No account found. Please sign up.");
                window.location.href = "signup.html";
            }
        });
    }

    // LOGOUT LOGIC
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            window.location.href = "login.html";
        });
    }

    // PROTECT THE POST-AD PAGE
    if (window.location.pathname.includes('post-ad.html')) {
        if (localStorage.getItem('isLoggedIn') !== 'true') {
            window.location.href = "login.html";
        }
    }
});

/**
 * SECTION 3: WHATSAPP SUBMISSION
 */
const adForm = document.getElementById('adForm');

if (adForm) {
    adForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // 1. Get Logged-in User Data
        const storedUser = JSON.parse(localStorage.getItem('registeredUser'));
        const sellerName = storedUser ? storedUser.name : "New Seller";

        // 2. Get Form Data including Category
        const itemCategory = document.getElementById('itemCategory').value;
        const itemName = document.getElementById('itemName').value;
        const itemPrice = document.getElementById('itemPrice').value;
        const itemDesc = document.getElementById('itemDesc').value;

        // 3. Your WhatsApp Number
        const myNumber = "27634879062"; 

        // 4. Create the formatted message with Category
        const message = `*NEW AD SUBMISSION*%0A` +
                        `--------------------------%0A` +
                        `*Seller:* ${sellerName}%0A` +
                        `*Category:* ${itemCategory}%0A` +
                        `*Item:* ${itemName}%0A` +
                        `*Price:* ${itemPrice}%0A` +
                        `*Description:* ${itemDesc}%0A` +
                        `--------------------------%0A` +
                        `_Please attach the product photo below this message!_`;

        // 5. Open WhatsApp in a new tab
        const whatsappURL = `https://wa.me/${myNumber}?text=${message}`;
        window.open(whatsappURL, '_blank');
        
        // 6. Show success message and go back home
        alert("Details sent! Now just attach your photo in the WhatsApp chat.");
        window.location.href = "index.html";
    });
}
/**
 * SECTION 4: SEARCH SYSTEM
 */
document.addEventListener('DOMContentLoaded', () => {
    const searchToggle = document.getElementById('searchToggle');
    const searchInput = document.getElementById('searchInput');

    // 1. Toggle search bar visibility
    if (searchToggle) {
        searchToggle.addEventListener('click', () => {
            searchInput.classList.toggle('active');
            if (searchInput.classList.contains('active')) {
                searchInput.focus();
            }
        });
    }

    // 2. Real-time filtering logic
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.product-card');

            cards.forEach(card => {
                // We search inside the product name and the category text
                const name = card.querySelector('.product-name').textContent.toLowerCase();
                const category = card.querySelector('.product-cat').textContent.toLowerCase();

                if (name.includes(term) || category.includes(term)) {
                    card.style.display = "block"; // Show match
                } else {
                    card.style.display = "none"; // Hide non-match
                }
            });
        });
    }
});

/**
 * SECTION 5: ADVANCED CATEGORY FILTERING
 */
document.addEventListener('DOMContentLoaded', () => {
    const categoryCards = document.querySelectorAll('.category-card');
    const productCards = document.querySelectorAll('.product-card');
    const filterTitle = document.getElementById('filterTitle');
    const filterSubtitle = document.getElementById('filterSubtitle');

    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            // Get the name from the <h3> inside the card
            const selectedName = card.querySelector('h3').innerText;
            const selectedCategory = card.getAttribute('data-category').toLowerCase();

            // 1. Update the titles
            filterTitle.innerText = selectedName;
            filterSubtitle.innerText = (selectedCategory === 'all') ? "Explore our marketplace" : "Browsing Category";

            // 2. Filter the products
            let matchCount = 0;
            productCards.forEach(product => {
                const productCategory = product.querySelector('.product-cat').textContent.toLowerCase();

                if (selectedCategory === 'all' || productCategory.includes(selectedCategory)) {
                    product.style.display = "block";
                    product.style.animation = "fadeIn 0.5s ease forwards";
                    matchCount++;
                } else {
                    product.style.display = "none";
                }
            });

            // 3. Highlight the active card
            categoryCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            // 4. Smooth scroll to products
            document.querySelector('.bestsellers-section').scrollIntoView({ behavior: 'smooth' });
        });
    });
});