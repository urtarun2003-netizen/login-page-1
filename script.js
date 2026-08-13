const SUPABASE_URL="https://fqvgmhtlrfpeljsltpny.supabase.co";
const SUPABASE_PUBLISHABLE_KEY="sb_publishable_wt28cfgACFMJdCZzmNQ6sA_adoF5NoP";
const supabaseClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY);

const loginForm=document.getElementById("loginForm");
if(loginForm)loginForm.addEventListener("submit",async e=>{
 e.preventDefault();
 const email=document.getElementById("email").value.trim();
 const password=document.getElementById("password").value;
 const message=document.getElementById("message");
 message.textContent="Checking login...";
 message.style.color="#333";
 const {error}=await supabaseClient.auth.signInWithPassword({email,password});
 if(error){message.textContent="Invalid email or password.";message.style.color="red";return;}
 message.textContent="Login successful!";
 message.style.color="green";
 window.location.href="dashboard.html";
});

const password=document.getElementById("password");
const showPassword=document.getElementById("showPassword");
if(showPassword&&password)showPassword.addEventListener("click",()=>{
 if(password.type==="password"){password.type="text";showPassword.textContent="Hide";}
 else{password.type="password";showPassword.textContent="Show";}
});

const logout=document.getElementById("logout");
if(logout)logout.addEventListener("click",async()=>{await supabaseClient.auth.signOut();window.location.href="index.html";});
