const SUPABASE_URL="https://fqvgmhtlrfpeljsltpny.supabase.co";
const SUPABASE_PUBLISHABLE_KEY="sb_publishable_wt28cfgACFMJdCZzmNQ6sA_adoF5NoP";
const supabaseClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY);

const loginForm=document.getElementById("loginForm");
if(loginForm)loginForm.addEventListener("submit",async e=>{
e.preventDefault();
const email=document.getElementById("email").value.trim(),password=document.getElementById("password").value,message=document.getElementById("message");
message.textContent="Checking login...";
const {error}=await supabaseClient.auth.signInWithPassword({email,password});
if(error){message.textContent=error.message.includes("Email not confirmed")?"Please verify your email before logging in.":"Invalid email or password.";message.style.color="red";return;}
location.href="dashboard.html";
});

const registerForm=document.getElementById("registerForm");
if(registerForm)registerForm.addEventListener("submit",async e=>{
e.preventDefault();
const email=document.getElementById("registerEmail").value.trim(),password=document.getElementById("registerPassword").value,confirm=document.getElementById("confirmPassword").value,message=document.getElementById("registerMessage");
if(password!==confirm){message.textContent="Passwords do not match.";message.style.color="red";return;}
message.textContent="Creating account...";
const {error}=await supabaseClient.auth.signUp({email,password,options:{emailRedirectTo:window.location.origin + window.location.pathname.replace("register.html","")}});
if(error){message.textContent=error.message;message.style.color="red";return;}
message.textContent="Account created! Check your email to verify your account, then log in.";message.style.color="green";registerForm.reset();
});

const password=document.getElementById("password"),showPassword=document.getElementById("showPassword");
if(showPassword&&password)showPassword.addEventListener("click",()=>{password.type=password.type==="password"?"text":"password";showPassword.textContent=password.type==="password"?"Show":"Hide";});
const logout=document.getElementById("logout");
if(logout)logout.addEventListener("click",async()=>{await supabaseClient.auth.signOut();location.href="index.html";});
