const SUPABASE_URL="https://fqvgmhtlrfpeljsltpny.supabase.co";
const SUPABASE_PUBLISHABLE_KEY="PASTE_YOUR_SUPABASE_PUBLISHABLE_KEY_HERE";
const supabaseClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY);
const form=document.getElementById("loginForm"),msg=document.getElementById("message"),pw=document.getElementById("password"),show=document.getElementById("showPassword"),logout=document.getElementById("logout");
if(show)show.onclick=()=>{const v=pw.type==="text";pw.type=v?"password":"text";show.textContent=v?"Show":"Hide"};
if(form)form.onsubmit=async e=>{e.preventDefault();msg.textContent="Checking...";const {error}=await supabaseClient.auth.signInWithPassword({email:document.getElementById("email").value.trim(),password:pw.value});if(error){msg.textContent="Invalid email or password.";msg.style.color="red"}else location.href="dashboard.html"};
if(logout)logout.onclick=async()=>{await supabaseClient.auth.signOut();location.href="index.html"};