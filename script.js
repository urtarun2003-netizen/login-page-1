// Theme Toggle Logic
function initTheme() {
    const root = document.documentElement;
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        root.classList.add('light-mode');
    }

    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'theme-toggle';
    toggleBtn.innerHTML = currentTheme === 'light' ? '🌙' : '☀️';
    toggleBtn.title = "Toggle Light/Dark Mode";
    document.body.appendChild(toggleBtn);

    toggleBtn.addEventListener('click', () => {
        root.classList.toggle('light-mode');
        const isLight = root.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        toggleBtn.innerHTML = isLight ? '🌙' : '☀️';
    });
}
initTheme();

// Welcome Screen Logic
const enterBtn = document.getElementById("enter-btn");
const welcomeScreen = document.getElementById("welcome-screen");
const loginWrapper = document.getElementById("login-wrapper");

if (enterBtn && welcomeScreen && loginWrapper) {
    enterBtn.addEventListener("click", () => {
        const welcomeTransition = document.getElementById("welcome-transition");

        // Smooth little welcome moment before opening the login card.
        enterBtn.disabled = true;
        enterBtn.style.transform = "scale(.96)";

        if (welcomeTransition) {
            welcomeTransition.classList.add("show");
        }

        setTimeout(() => {
            welcomeScreen.classList.remove("animate-in");
            welcomeScreen.classList.add("animate-out");

            setTimeout(() => {
                welcomeScreen.classList.add("hidden");
                loginWrapper.classList.remove("hidden");
                loginWrapper.classList.add("animate-in");
            }, 500);
        }, 1100);
    });
}


// ------------------------------------------------------------
// VIBEMIX USER ID + PASSWORD AUTHENTICATION
// ------------------------------------------------------------
// This version does not use email authentication or Supabase.
// Accounts are stored in this browser's localStorage.
// For a public multi-device website, replace this with a real
// server/database authentication service before production use.

const USERS_KEY = "vibemix_users_v1";
const SESSION_KEY = "vibemix_session_v1";

function getUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || "{}"); }
    catch { return {}; }
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function normaliseUserId(value) {
    return value.trim().toLowerCase();
}

// Registration
const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const userId = document.getElementById("registerUserId").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirm = document.getElementById("confirmPassword").value;
        const message = document.getElementById("registerMessage");
        const users = getUsers();

        if (!/^[A-Za-z0-9._-]{3,30}$/.test(userId)) {
            message.textContent = "Please choose a User ID with 3–30 letters, numbers, . _ or -.";
            message.className = "error-message";
            return;
        }

        const key = normaliseUserId(userId);

        if (users[key]) {
            message.textContent = "😅 Oops! That User ID is already taken.";
            message.className = "error-message";
            return;
        }

        if (password.length < 6) {
            message.textContent = "🔐 Password needs at least 6 characters.";
            message.className = "error-message";
            return;
        }

        if (password !== confirm) {
            message.textContent = "🙈 Those passwords are playing hide-and-seek! They don't match.";
            message.className = "error-message";
            return;
        }

        // Store a salted Web Crypto SHA-256 hash instead of the plain password.
        const salt = crypto.randomUUID();
        const encoded = new TextEncoder().encode(salt + password);
        const digest = await crypto.subtle.digest("SHA-256", encoded);
        const hash = Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, "0")).join("");

        users[key] = { userId, salt, hash };
        saveUsers(users);

        message.textContent = "🎉 Account created! Your little world is ready.";
        message.className = "success-message";
        registerForm.reset();

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1200);
    });
}

// Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const userId = document.getElementById("userId").value.trim();
        const password = document.getElementById("password").value;
        const message = document.getElementById("message");
        const users = getUsers();
        const account = users[normaliseUserId(userId)];

        if (!account) {
            message.textContent = "🤔 Hmm... who are you? That User ID doesn't exist!";
            message.className = "error-message funny-login-error";
            shakeLoginCard();
            return;
        }

        const encoded = new TextEncoder().encode(account.salt + password);
        const digest = await crypto.subtle.digest("SHA-256", encoded);
        const hash = Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, "0")).join("");

        if (hash !== account.hash) {
            const funnyMessages = [
                "😂 Nice try! The password says NOPE!",
                "🙈 Oops! Even the password doesn't recognize you!",
                "🤣 Wrong password! Your keyboard is being suspicious!",
                "😜 Almost! But that password isn't the secret handshake.",
                "😂 Access denied! The password ran away!",
                "🤭 Nope! Try again, detective!"
            ];
            message.textContent = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
            message.className = "error-message funny-login-error";
            shakeLoginCard();
            return;
        }

        localStorage.setItem(SESSION_KEY, account.userId);
        message.textContent = "🎉 Welcome back! Login successful ❤️";
        message.className = "success-message";
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 650);
    });
}

function shakeLoginCard() {
    const panel = document.querySelector(".glass-panel");
    if (!panel) return;
    panel.classList.remove("login-error");
    void panel.offsetWidth;
    panel.classList.add("login-error");
}

// Password visibility
const password = document.getElementById("password");
const showPassword = document.getElementById("showPassword");
if (showPassword && password) {
    showPassword.addEventListener("click", () => {
        password.type = password.type === "password" ? "text" : "password";
        showPassword.textContent = password.type === "password" ? "Show" : "Hide";
    });
}

// Logout
const logout = document.getElementById("logout");
if (logout) {
    logout.addEventListener("click", () => {
        localStorage.removeItem(SESSION_KEY);
        location.href = "index.html";
    });
}
