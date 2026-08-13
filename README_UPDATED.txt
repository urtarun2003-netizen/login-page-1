VIBEMIX UPDATED - USER ID LOGIN

Visible login:
- User ID
- Password

Visible registration:
- User ID
- Password
- Confirm Password

The website does NOT ask the user to type an email address.

SUPABASE SETUP REQUIRED:
Supabase's standard password authentication still uses an email internally.
This version maps the chosen User ID to a syntactically valid internal
address such as:
    tarun2003@vibemix.com

The user never sees or enters this internal address.

For a User-ID-only registration flow, turn OFF:
Supabase Dashboard -> Authentication -> Providers -> Email -> Confirm email

If "Confirm email" remains enabled, Supabase will try to verify the internal
address and the user cannot receive that verification email.

For production-grade User ID authentication without any email internally,
a custom authentication backend/Edge Function should be used instead.
