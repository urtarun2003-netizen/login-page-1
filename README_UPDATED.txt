VIBEMIX UPDATED
================

Changes:
- Login uses User ID + Password in the visible UI.
- Registration uses User ID + Password + Confirm Password.
- Light/Dark mode toggle is available on all pages through script.js.
- Smooth login/register animations and feedback were added.
- Existing dashboard, happy, and sad pages were preserved.

AUTH NOTE:
Supabase Auth's standard password flow still expects an email internally.
The UI no longer asks the user for an email. Each User ID is mapped to an
internal auth identifier ending in @vibemix.local, while the User ID itself
is stored in Supabase user metadata.

IMPORTANT:
If Supabase email confirmation is enabled for the project, the internal
@vibemix.local address cannot receive a confirmation email. For User-ID-only
login, disable email confirmation in Supabase Authentication settings, or
replace this mapping approach with a custom backend/username authentication
flow.
