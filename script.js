const SUPABASE_URL="https://fqvgmhtlrfpeljsltpny.supabase.co";
const SUPABASE_PUBLISHABLE_KEY="sb_publishable_wt28cfgACFMJdCZzmNQ6sA_adoF5NoP";
const supabaseClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY);

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

// Authentication Logic
// User ID is used in the UI. Supabase's email/password auth is kept internally
// by mapping each User ID to a private internal auth address.
function userIdToAuthEmail(userId) {
    return userId.trim().toLowerCase().replace(/[^a-z0-9._-]/g, "_") + "@vibemix.local";
}

const loginForm=document.getElementById("loginForm");
if(loginForm)loginForm.addEventListener("submit",async e=>{
    e.preventDefault();
    const userId=document.getElementById("userId").value.trim();
    const password=document.getElementById("password").value;
    const message=document.getElementById("message");

    if(userId.length < 3){
        message.textContent="Please enter a valid User ID.";
        message.className="error-message";
        return;
    }

    message.textContent="Checking login...";
    message.className="loading-message";

    const {error}=await supabaseClient.auth.signInWithPassword({
        email:userIdToAuthEmail(userId),
        password
    });

    if(error){
        message.textContent="Invalid User ID or password.";
        message.className="error-message";
        const panel=document.querySelector(".glass-panel");
        if(panel){
            panel.classList.remove("login-error");
            void panel.offsetWidth;
            panel.classList.add("login-error");
        }
        return;
    }

    message.textContent="Login successful! ❤️";
    message.className="success-message";
    setTimeout(()=>location.href="dashboard.html",500);
});

const registerForm=document.getElementById("registerForm");
if(registerForm)registerForm.addEventListener("submit",async e=>{
    e.preventDefault();

    const userId=document.getElementById("registerUserId").value.trim();
    const password=document.getElementById("registerPassword").value;
    const confirm=document.getElementById("confirmPassword").value;
    const message=document.getElementById("registerMessage");

    if(!/^[A-Za-z0-9._-]{3,30}$/.test(userId)){
        message.textContent="User ID must be 3–30 characters: letters, numbers, ., _ or -.";
        message.className="error-message";
        return;
    }

    if(password!==confirm){
        message.textContent="Passwords do not match.";
        message.className="error-message";
        return;
    }

    message.textContent="Creating account...";
    message.className="loading-message";

    const {error}=await supabaseClient.auth.signUp({
        email:userIdToAuthEmail(userId),
        password,
        options:{
            data:{user_id:userId},
            emailRedirectTo:window.location.origin + window.location.pathname.replace("register.html","")
        }
    });

    if(error){
        message.textContent=error.message.includes("already registered")
            ? "That User ID is already taken. Please choose another."
            : error.message;
        message.className="error-message";
        return;
    }

    message.textContent="Account created! You can now log in with your User ID. ❤️";
    message.className="success-message";
    registerForm.reset();
});

document.getElementById("password"),showPassword=document.getElementById("showPassword");
if(showPassword&&password)showPassword.addEventListener("click",()=>{
    password.type=password.type==="password"?"text":"password";
    showPassword.textContent=password.type==="password"?"Hide":"Show";
});

const logout=document.getElementById("logout");
if(logout)logout.addEventListener("click",async()=>{
    await supabaseClient.auth.signOut();
    location.href="index.html";
});
