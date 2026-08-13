VIBEMIX FINAL - USER ID + PASSWORD

What changed:
- No email field.
- No Supabase email signup.
- User ID + Password registration.
- User ID + Password login.
- Wrong password is rejected and shows a random funny message.
- Correct password logs in and opens dashboard.html.
- Duplicate User IDs are rejected.
- Passwords are stored as salted SHA-256 hashes in browser localStorage.
- Light/Dark mode and the Welcome to our little world animation are preserved.
- Logout clears the local login session.

IMPORTANT LIMITATION:
This is a browser-local authentication system. Accounts are stored in the
browser's localStorage, so an account created on one device/browser will NOT
automatically exist on another device/browser.

For a real public website where your sister can create an account on her
phone and then log in from another device, you need a server/database
authentication backend. Do not use this localStorage version for sensitive
or production authentication.

TEST:
1. Open register.html.
2. Create a User ID and password.
3. Return to login.
4. Enter the correct password -> dashboard.
5. Enter a wrong password -> funny error message and no login.
