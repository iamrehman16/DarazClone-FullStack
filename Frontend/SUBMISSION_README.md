# Daraz Clone — Frontend (Submission Guide) ✅

## Project overview
A React + Vite frontend for a simplified e-commerce app (Daraz clone). Uses mock data when backend API is unavailable and includes product listings, product details, cart flow, and checkout UI.

---

## Prerequisites 🔧
- Node.js (v16+ recommended)
- npm or yarn
- A modern browser (Chrome / Edge / Firefox)

---

## Setup (local) 🛠️
1. Clone or copy the repository and open the `Frontend` folder.

2. Install dependencies:

- Using npm

```bash
npm install
```

- Using yarn

```bash
yarn
```

3. Start the dev server:

```bash
npm run dev
```

or

```bash
yarn dev
```

4. Open the app in the browser (Vite will show the local URL, typically `http://localhost:5173`).

---

## Notes on API / mock data 📦
- The app tries to call API endpoints defined in `src/config/api.js`. If the API is not available it falls back to `src/data/mockData.json` automatically.
- For the purposes of submission/testing, you do not need a backend — mock data will be used.

---

## How to test the issue reported (price NaN / discount not visible) ✅
1. Open the app and navigate to any product card and click it to open the product detail / order process page.
2. Verify the product shows:
   - A discounted price (e.g., `Rs. <number>`)
   - The original price (e.g., `Rs. <number>`)
   - A `-<discount>%` badge if the product has a discount
3. Add the product to cart and go to the cart to confirm total equals `discounted price × quantity`.

If a product shows `NaN` for price or missing discount:
- Confirm that `src/data/mockData.json` contains a numeric `price` and numeric `discount` fields for the product.
- Confirm that product detail uses the `discount` field. (This project now supports `discount` and also accepts legacy `off` prop if present.)

---

## Files changed for the fix 🔧
- `src/components/Product/ProductInfo.jsx` — now reads `discount` (with `off` fallback), normalizes numeric inputs and conditionally shows discount badge.
- `src/pages/ProductProcess/ProductProcess.jsx` — safeguards conversion to numbers and calculates discounted price using normalized values.

---

## Build for production 📦

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Contact / Notes 💡
If you run into any issues running the project, please include your Node/npm versions and any terminal errors and I'll help troubleshoot.

Good luck with testing — the price/discount fix is included in this submission.