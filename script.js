// ================= SIGN UP =================
function signUp() {
    const name = document.getElementById("Name").value;
    const email = document.getElementById("Address").value;
    const password = document.getElementById("Password").value;
    const confirmPassword = document.getElementById("ConfirmPassword").value;

    if (!name || !email || !password || !confirmPassword) {
        alert("Please fill in all fields");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.some(u => u.email === email);
    if (exists) {
        alert("Email already registered");
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created successfully! Please login.");
    window.location.href = "login.html";
}


// ================= LOGIN =================
function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        alert(`Welcome back, ${user.name}!`);
        // Store logged-in user
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        // Redirect to submit ad page
        window.location.href = "submit_ad.html";
    } else {
        alert("Incorrect email or password");
    }
}


// ================= OPEN POST ADS FORM / REDIRECT =================
function openForm() {
    // Check if user is logged in
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
        // Redirect to submit ad page if logged in
        window.location.href = "submit_ad.html";
    } else {
        // Show signup modal if not logged in
        document.getElementById("create").style.display = "block";
    }
}


// ================= CLOSE MODAL WHEN CLICKING OUTSIDE =================
window.onclick = function(event) {
    const modal = document.getElementById("create");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// ================= SUBMIT AD =================
function submitAd() {
    const title = document.getElementById('adTitle').value;
    const description = document.getElementById('adDesc').value;
    const phone = document.getElementById('adPhone').value;
    const images = document.getElementById('adImages').files;

    if (!title || !description || !phone || images.length === 0) {
        alert('Please fill all fields and upload at least 1 image');
        return;
    }

    if (images.length > 6) {
        alert('You can upload up to 6 images only');
        return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('phone', phone);

    for (let i = 0; i < images.length; i++) {
        formData.append('images[]', images[i]);
    }

    fetch('submit_ad.php', {
        method: 'POST',
        body: formData
    })
    .then(data => {
    alert(data.message);

    if (data.whatsapp) {
        window.open(data.whatsapp, "_blank");
    }
})
}
