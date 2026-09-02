# HHS Capital — Deploy Guide

Plain-English, step-by-step instructions to get **hhscapital.org** live **today**. No coding required.

There are two things to set up:

1. **The contact form** (Formspree) — 5 minutes
2. **The website** (Vercel) + connecting your domain — 15 minutes

Do them in that order so the form works the moment the site goes live.

---

## What you have

A folder called `hhscapital` containing the whole website:

```
hhscapital/
├── index.html              ← Home page
├── services.html           ← What We Do
├── about.html              ← Rene Schuster
├── journal.html            ← Journal index
├── contact.html            ← Contact + enquiry form
├── favicon.svg             ← The little logo in the browser tab
├── css/styles.css          ← All the styling
├── js/main.js              ← All the animations
└── journal/
    ├── startup-dos-and-donts.html
    ├── scaling-dos-and-donts.html
    └── marketing-best-practices.html
```

Keep this whole folder together — the pages link to each other and to the css/js folders.

---

## PART 1 — Turn on the contact form (Formspree)

The enquiry form on the Contact page needs a free Formspree account to email submissions to you. Right now it has a placeholder that you must replace.

1. Go to **https://formspree.io** and click **Sign up**. Use **rene@hhscapital.org**.
2. Verify your email when Formspree asks.
3. Click **+ New form**. Name it `HHS Capital website`. Set the send-to address to **rene@hhscapital.org**. Click **Create form**.
4. Formspree shows you a form endpoint that looks like this:
   `https://formspree.io/f/abcdwxyz`
   The part after `/f/` (here `abcdwxyz`) is **your form ID**. Copy it.
5. Open **contact.html** in any text editor (TextEdit, Notepad, or VS Code). Find this line near the middle:

   ```
   <form class="form reveal d1" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
6. Replace **YOUR_FORM_ID** with your real ID, so it reads e.g.:

   ```
   action="https://formspree.io/f/abcdwxyz"
   ```
7. Save the file.

> The first time someone submits the live form, Formspree sends you a one-time confirmation email — click the link in it to activate. After that, every enquiry lands in your inbox.

---

## PART 2 — Put the site online with Vercel

Vercel hosts the site for free and is the fastest way to go live. You'll use the drag-and-drop method (no GitHub needed).

### Step 1 — Create a Vercel account
1. Go to **https://vercel.com/signup**.
2. Sign up with email or a Google/GitHub account. The **Hobby (free)** plan is all you need.

### Step 2 — Deploy the site
Vercel's drag-and-drop deploy works through their CLI or dashboard. The simplest no-code route:

**Option A — Drag and drop (easiest)**
1. In your Vercel dashboard, click **Add New… → Project**.
2. Choose **Deploy a template / or import** — then look for the **"Deploy"** / **"Upload"** option. If you see an import-from-Git screen only, use Option B below (it's just as quick).
3. Drag your entire **hhscapital** folder onto the upload area.
4. Click **Deploy**. After ~30 seconds you'll get a live URL like `hhscapital-xxxx.vercel.app`. Open it to check everything works.

**Option B — Vercel CLI (if drag-and-drop isn't offered)**
1. Install Node.js from **https://nodejs.org** (the "LTS" button) if you don't have it.
2. Open Terminal (Mac) or Command Prompt (Windows).
3. Type: `npm install -g vercel` and press Enter.
4. Type: `cd ` (with a space), then drag the **hhscapital** folder into the window and press Enter. This moves you into the folder.
5. Type: `vercel` and press Enter. Log in when prompted, accept all the defaults (press Enter through the questions). When it asks "In which directory is your code located?" accept `./`.
6. It gives you a live `.vercel.app` URL. Run `vercel --prod` to push the production version.

Either way, you now have a working site on a temporary Vercel address. Next, point your real domain at it.

### Step 3 — Connect hhscapital.org
1. In Vercel, open your project → **Settings → Domains**.
2. Type **hhscapital.org** and click **Add**. Also add **www.hhscapital.org** (Vercel will offer to redirect one to the other — accept).
3. Vercel shows you the DNS records to create. It will be one of these two:
   - An **A record** for the root domain pointing to `76.76.21.21`, **or**
   - A **CNAME** for `www` pointing to `cname.vercel-dns.com`
   (Vercel tells you exactly which — follow what it shows on screen.)

### Step 4 — Add those records where the domain is registered
1. Log in to wherever you bought **hhscapital.org** (GoDaddy, Namecheap, IONOS, 123-Reg, etc.).
2. Find **DNS settings** / **Manage DNS** for the domain.
3. Add the record(s) Vercel gave you:
   - For the **A record**: Type = `A`, Name/Host = `@`, Value = `76.76.21.21`.
   - For the **CNAME**: Type = `CNAME`, Name/Host = `www`, Value = `cname.vercel-dns.com`.
4. Save. If your registrar lets you delete an old "parking page" A record, do so.

### Step 5 — Wait and verify
1. Go back to Vercel → Domains. It will show "Valid Configuration" once DNS updates — usually 10–30 minutes, occasionally a few hours.
2. Vercel issues a free **HTTPS certificate** automatically, so `https://hhscapital.org` will be secure with a padlock.
3. Visit **https://hhscapital.org** and click through every page and the contact form to confirm all is well.

**You're live.** 🎉

---

## How to make changes later

The site is plain HTML/CSS — easy to edit.

- **Change wording:** open the relevant `.html` file in a text editor, edit the text between the tags, save.
- **Add a new journal article:** copy one of the files in the `journal/` folder, rename it, change the content, then add a matching card to `journal.html` and the teaser block on `index.html`.
- **Re-deploy after edits:** if you used drag-and-drop, drag the folder onto a new deployment. If you used the CLI, run `vercel --prod` again from the folder.

---

## Things to double-check before sharing widely

- [ ] Replaced **YOUR_FORM_ID** in `contact.html` and confirmed the Formspree activation email.
- [ ] Tested the contact form end-to-end (submitted a test, received the email).
- [ ] `hhscapital.org` and `www.hhscapital.org` both load over HTTPS.
- [ ] Checked the site on a phone (the layout adapts automatically).
- [ ] Reviewed the FCA disclaimer in the footer with your advisor if you want it tailored further.

---

## A note on the FCA disclaimers

Because HHS Capital is **not** authorised or regulated by the FCA, every page carries a clear "Important information" notice in the footer stating this, clarifying that nothing on the site is financial advice or a financial promotion, and that the "growth investment" wording describes commercial involvement in selected projects rather than a regulated investment offer. This follows good practice for an unregulated advisory firm. If your activities ever move toward arranging investments, promoting financial products, or pooling investor money, get specific legal/compliance advice — those activities can require FCA authorisation.

*This guide is practical information, not legal advice.*
