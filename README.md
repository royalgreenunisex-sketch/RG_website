# Royal Green — Website

Static site for Royal Green Unisex Saloon & Beauty Parlour (Maraimalai Nagar).

## Files
- `index.html` — page structure/content
- `styles.css` — all styling
- `script.js` — rotating headline, service tabs, booking wizard
- `assets/` — logo and photos. Add your own salon photos here.
- `assets/hero.mp4` — optional: drop a video here (same filename) and it will autoplay in the hero background. If absent, the hero just shows the gradient design — no error, nothing breaks.

## Publish with GitHub Pages
1. Create a new GitHub repo (e.g. `royal-green-site`) and upload all files/folders exactly as-is, keeping `assets/` as a subfolder.
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source: Deploy from a branch**, branch: `main`, folder: `/ (root)`. Save.
4. GitHub gives you a live URL like `https://<username>.github.io/royal-green-site/` within a minute or two.

## Editing later
- Phone numbers / addresses: search `index.html` for `80562` or `84898` or the street names.
- Colors: edit the `:root` variables at the top of `styles.css`.
- Add more photos: put files in `assets/`, then reference them in `index.html` (e.g. `<img src="assets/yourphoto.jpg">`).
