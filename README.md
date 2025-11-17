# E-Commerce Product Page

A fully interactive, responsive product page built with React.
This project demonstrates dynamic image galleries, a lightbox system, a functional shopping cart, and a clean component architecture designed for scalability.

## Table of contents

* [Overview](#overview)

  * [Features](#features)
  * [Screenshots](#screenshots)
* [My process](#my-process)

  * [Built with](#built-with)
  * [Key learnings](#key-learnings)
  * [Continued development](#continued-development)
  * [Useful resources](#useful-resources)
* [Author](#author)

---

## Overview

### Features

Users can:

* Browse product images in a responsive layout
* Open a lightbox gallery for detailed viewing
* Switch the main image by clicking thumbnails
* Navigate images using previous/next controls
* Add items to the cart
* View the cart and remove items
* Experience full hover/active UI states across devices

---

### Screenshots
![Preview](./public/assets/Screenshot%20-mobile.png)
![Preview](./public/assets/Screenshot%20-desktop-lightbox.png)
![Preview](./public/assets/Screenshot%20-mobile-menu.png)
![Preview](./public/assets/Screenshot%20-mobile-empty-cart.png)
![Preview](./public/assets/Screenshot%20-desktop-filled-cart.png)

---

## My process

### Built with

* React (Hooks, useReducer, useEffect)
* Vanilla CSS with modular organization
* DOM portals for overlays/lightboxes
* NanoID for unique identifiers
* Responsive layout using Flexbox + Grid
* Mobile-first workflow

---

## Key learnings

This project forced me to refine several core behaviors that show up frequently in real UI engineering:

### 1. **State management with `useReducer`**
(!!I ended up not using this code snippet; instead, I simplified it according to the project flow)

I implemented a custom reducer to manage image navigation and thumbnail syncing.
Why? Because image gallery logic tends to grow in complexity; reducers keep logic predictable and testable.

Example:

```js
case 'MATCH_INDEX': {
  const { thumbnail, productObj } = action.payload;
  const base = thumbnail.replace('-thumbnail', '').split('/').pop().split('.')[0];

  const index = productObj.images.full.findIndex(full => {
    const name = full.split('/').pop().split('.')[0];
    return name === base;
  });

  return index !== -1 ? index : currentIndex;
}
```

### 2. **Click-outside detection**

I refined how overlays close when clicking outside of them.
The important part was preventing premature closure and ensuring the event only triggers when the overlay is open.

### 3. **Understanding state updates (`prev` vs direct usage)**

React batches state updates and doesn't synchronously update values.
Using the functional `prev => ...` form prevents stale values and incorrect behavior, especially when operations depend on previous state.

### 4. **Lightbox portal structure**

I used `createPortal` to render the modal outside the React tree.
This avoids layout issues and gives full control over z-index and isolation.

### 5. **Reusable, extensible cart item structure**

Each cart entry is represented as an object containing product metadata, quantity, and computed pricing.
This mirrors real-world e-commerce architecture.

Example:

```js
const addedProduct = {
  id: nanoid(),
  name: product.name,
  purchaseQuantity: quantity,
  pricing: {
    sale: product.pricing.sale,
    total: product.pricing.total(quantity),
    currency: 'USD'
  },
  thumbnail: product.images.thumbnails[0].src
};
```

---

## Continued development

Areas I plan to expand or refine:

* Add global state management (e.g., Zustand or Redux Toolkit)
* Implement an actual product catalog instead of a single-item demo
* Integrate animations (Framer Motion) for transitions
* Add unit tests for reducers, cart management, and gallery logic
* Expand to support multiple products + cart persistence with localStorage

These additions would bring the project closer to a production-ready e-commerce structure.

---

## Useful resources

These helped shape architectural decisions and problem-solving:

* React Docs — [https://react.dev/](https://react.dev/)
* MDN on event propagation — [https://developer.mozilla.org/](https://developer.mozilla.org/)
* “UI Patterns for Modals and Overlays” — understanding lightbox behavior
* NanoID for unique identifiers — [https://github.com/ai/nanoid](https://github.com/ai/nanoid)

---

## Author

Created by **Silas**
[GitHub](https://github.com/silaskad)
[LinkedIn](https://www.linkedin.com/in/silas-kiwoy/)
