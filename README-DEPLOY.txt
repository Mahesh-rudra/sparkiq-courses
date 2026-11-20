HOW TO PUBLISH (GitHub Pages + Namecheap)

1. Create a new GitHub repository (e.g. arduino-course) and upload everything in this folder
   (index.html, CNAME, the arduino folder).
2. Repo Settings > Pages > deploy from the main branch, root folder.
3. In Namecheap > Domain List > vedaxglobal.com > Advanced DNS, add a CNAME record:
   Host: learn    Value: <your-github-username>.github.io
4. Back in GitHub Pages, set the custom domain to learn.vedaxglobal.com and tick "Enforce HTTPS".
5. Open https://learn.vedaxglobal.com . The Arduino student player is at https://learn.vedaxglobal.com/arduino/

BEFORE YOU GO LIVE
- In index.html replace ENROLL_URL_L1 with your Level 1 payment link and ENROLL_URL_L2 with your Level 2 payment link ENROLL_URL_L3 with your Level 3 payment link and ENROLL_URL_BUNDLE with the all-levels payment link (price shown: Rs 1,099).
- Fill the [SQUARE BRACKET] placeholders (refund policy, email, support contact, access period).
- Test lesson 3.1 with the Level 1 code, lesson 11.3 with the Level 2 code, lesson 17.3 with the Level 3 code, and all three with the bundle code, on a phone.
- Never upload the original unencrypted lessons. Only upload this folder.

ACCESS CODES (also see the codes list in your chat; these are for you, not for students)
- Level 1 code:  ARDU-Y5MY-6RPU   (unlocks sections 3 to 9)
- Level 2 code:  ARDU-L2QK-7M3D   (unlocks the locked lessons of sections 10 to 15)
- Level 3 code:  ARDU-L3ZP-4H8V   (unlocks the locked lessons of sections 16 to 21)
- Bundle code:   ARDU-BNDL-9X4T   (unlocks all three levels; give it to students who pay for the bundle)
Each course is sold on its own. Codes are not case sensitive. A student can enter both codes.
To change a code or add more codes, ask Claude to rebuild: the codes live in courses.json.
A shared code can be passed on. Per-student codes would need a small backend.

FOLDER LAYOUT (one repository, many courses)
- index.html        sales page for all courses
- arduino/          the Arduino course player (Levels 1 to 3)
- later: esp32/, web/ ... each new course gets its own folder next to arduino/
To update the Arduino course, replace only the arduino folder.
