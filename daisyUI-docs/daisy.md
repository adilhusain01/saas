# DaisyUI Documentation

## Setup

Install DaisyUI via npm, pnpm, yarn, or bun:

```bash
npm i -D daisyui@latest
pnpm add -D daisyui@latest
yarn add -D daisyui@latest
bun add -D daisyui@latest
deno i -D npm:daisyui@latest
```

Add to your Tailwind config:

```js
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
```

Or use CDN:

```html
<link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css" rel="stylesheet" type="text/css" />
<script src="https://cdn.tailwindcss.com"></script>
```

For PostCSS:

```css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

@plugin "daisyui";
```

## Quick Start

Basic HTML structure with Tailwind and DaisyUI:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DaisyUI Example</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="container mx-auto p-4">
        <h1 class="text-4xl font-bold">Hello DaisyUI</h1>
    </div>
</body>
</html>
```

---

# Comprehensive DaisyUI Component Reference

This section provides an exhaustive collection of code examples for every DaisyUI component, organized by category. Each example includes variations for colors, sizes, styles, and layouts. Copy-paste ready HTML snippets focus on structure and classes, with minimal descriptive text.

## Base Components

### Accordion

**Basic accordion (radio inputs, bordered, first item open)**

```html
<div class="collapse bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-1" checked="checked" />
  <div class="collapse-title font-semibold">How do I create an account?</div>
  <div class="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
</div>
<div class="collapse bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-1" />
  <div class="collapse-title font-semibold">I forgot my password. What should I do?</div>
  <div class="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
</div>
<div class="collapse bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-1" />
  <div class="collapse-title font-semibold">How do I update my profile information?</div>
  <div class="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
</div>
```

**Accordion using details (first item open)**

```html
<details class="collapse bg-base-100 border border-base-300" name="my-accordion-det-1" open>
  <summary class="collapse-title font-semibold">How do I create an account?</summary>
  <div class="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
</details>
<details class="collapse bg-base-100 border border-base-300" name="my-accordion-det-1">
  <summary class="collapse-title font-semibold">I forgot my password. What should I do?</summary>
  <div class="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
</details>
<details class="collapse bg-base-100 border border-base-300" name="my-accordion-det-1">
  <summary class="collapse-title font-semibold">How do I update my profile information?</summary>
  <div class="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
</details>
```

**Accordion with arrow icon (radio inputs, bordered, first item open)**

```html
<div class="collapse collapse-arrow bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-2" checked="checked" />
  <div class="collapse-title font-semibold">How do I create an account?</div>
  <div class="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
</div>
<div class="collapse collapse-arrow bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-2" />
  <div class="collapse-title font-semibold">I forgot my password. What should I do?</div>
  <div class="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
</div>
<div class="collapse collapse-arrow bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-2" />
  <div class="collapse-title font-semibold">How do I update my profile information?</div>
  <div class="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
</div>
```

**Accordion with plus/minus icon (radio inputs, bordered, first item open)**

```html
<div class="collapse collapse-plus bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-3" checked="checked" />
  <div class="collapse-title font-semibold">How do I create an account?</div>
  <div class="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
</div>
<div class="collapse collapse-plus bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-3" />
  <div class="collapse-title font-semibold">I forgot my password. What should I do?</div>
  <div class="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
</div>
<div class="collapse collapse-plus bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-3" />
  <div class="collapse-title font-semibold">How do I update my profile information?</div>
  <div class="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
</div>
```

**Accordion joined vertically with arrow icon (bordered, first item open)**

```html
<div class="join join-vertical bg-base-100">
  <div class="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" checked="checked" />
    <div class="collapse-title font-semibold">How do I create an account?</div>
    <div class="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
  </div>
  <div class="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" />
    <div class="collapse-title font-semibold">I forgot my password. What should I do?</div>
    <div class="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
  </div>
  <div class="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" />
    <div class="collapse-title font-semibold">How do I update my profile information?</div>
    <div class="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
  </div>
</div>
```

### Alert

**Basic alert**

```html
<div role="alert" class="alert">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info h-6 w-6 shrink-0">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
  <span>12 unread messages. Tap to see.</span>
</div>
```

**Info color**

```html
<div role="alert" class="alert alert-info">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
  <span>New software update available.</span>
</div>
```

**Success color**

```html
<div role="alert" class="alert alert-success">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>Your purchase has been confirmed!</span>
</div>
```

**Warning color**

```html
<div role="alert" class="alert alert-warning">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
  <span>Warning: Invalid email address!</span>
</div>
```

**Error color**

```html
<div role="alert" class="alert alert-error">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>Error! Task failed successfully.</span>
</div>
```

**Alert soft style – info**

```html
<div role="alert" class="alert alert-info alert-soft">
  <span>12 unread messages. Tap to see.</span>
</div>
```

**Alert soft style – success**

```html
<div role="alert" class="alert alert-success alert-soft">
  <span>Your purchase has been confirmed!</span>
</div>
```

**Alert soft style – warning**

```html
<div role="alert" class="alert alert-warning alert-soft">
  <span>Warning: Invalid email address!</span>
</div>
```

**Alert soft style – error**

```html
<div role="alert" class="alert alert-error alert-soft">
  <span>Error! Task failed successfully.</span>
</div>
```

**Alert outline style – info**

```html
<div role="alert" class="alert alert-info alert-outline">
  <span>12 unread messages. Tap to see.</span>
</div>
```

**Alert outline style – success**

```html
<div role="alert" class="alert alert-success alert-outline">
  <span>Your purchase has been confirmed!</span>
</div>
```

**Alert outline style – warning**

```html
<div role="alert" class="alert alert-warning alert-outline">
  <span>Warning: Invalid email address!</span>
</div>
```

**Alert outline style – error**

```html
<div role="alert" class="alert alert-error alert-outline">
  <span>Error! Task failed successfully.</span>
</div>
```

**Alert dash style – info**

```html
<div role="alert" class="alert alert-info alert-dash">
  <span>12 unread messages. Tap to see.</span>
</div>
```

**Alert dash style – success**

```html
<div role="alert" class="alert alert-success alert-dash">
  <span>Your purchase has been confirmed!</span>
</div>
```

**Alert dash style – warning**

```html
<div role="alert" class="alert alert-warning alert-dash">
  <span>Warning: Invalid email address!</span>
</div>
```

**Alert dash style – error**

```html
<div role="alert" class="alert alert-error alert-dash">
  <span>Error! Task failed successfully.</span>
</div>
```

**Alert with buttons + responsive**

```html
<div role="alert" class="alert alert-vertical sm:alert-horizontal">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info h-6 w-6 shrink-0">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
  <span>we use cookies for no reason.</span>
  <div>
    <button class="btn btn-sm">Deny</button>
    <button class="btn btn-sm btn-primary">Accept</button>
  </div>
</div>
```

**Alert with title and description**

```html
<div role="alert" class="alert alert-vertical sm:alert-horizontal">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info h-6 w-6 shrink-0">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
  <div>
    <h3 class="font-bold">New message!</h3>
    <div class="text-xs">You have 1 unread message</div>
  </div>
  <button class="btn btn-sm">See</button>
</div>
```

### Avatar

**Basic avatar**

```html
<div class="avatar">
  <div class="w-24 rounded">
    <img src="https://img.daisyui.com/images/profile/demo/[email protected]" />
  </div>
</div>
```

**Custom sizes**

```html
<div class="avatar">
  <div class="w-32 rounded">
    <img src="https://img.daisyui.com/images/profile/demo/[email protected]" />
  </div>
</div>
<div class="avatar">
  <div class="w-20 rounded">
    <img src="https://img.daisyui.com/images/profile/demo/[email protected]" alt="Tailwind-CSS-Avatar-component" />
  </div>
</div>
<div class="avatar">
  <div class="w-16 rounded">
    <img src="https://img.daisyui.com/images/profile/demo/[email protected]" alt="Tailwind-CSS-Avatar-component" />
  </div>
</div>
<div class="avatar">
  <div class="w-8 rounded">
    <img src="https://img.daisyui.com/images/profile/demo/[email protected]" alt="Tailwind-CSS-Avatar-component" />
  </div>
</div>
```

**Rounded**

```html
<div class="avatar">
  <div class="w-24 rounded-xl">
    <img src="https://img.daisyui.com/images/profile/demo/[email protected]" />
  </div>
</div>
<div class="avatar">
  <div class="w-24 rounded-full">
    <img src="https://img.daisyui.com/images/profile/demo/[email protected]" />
  </div>
</div>
```

**With mask**

```html
<div class="avatar">
  <div class="mask mask-heart w-24">
    <img src="https://img.daisyui.com/images/profile/demo/[email protected]" />
  </div>
</div>
<div class="avatar">
  <div class="mask mask-squircle w-24">
    <img src="https://img.daisyui.com/images/profile/demo/[email protected]" />
  </div>
</div>
<div class="avatar">
  <div class="mask mask-hexagon-2 w-24">
    <img src="https://img.daisyui.com/images/profile/demo/[email protected]" />
  </div>
</div>
```

**Avatar group**

```html
<div class="avatar-group -space-x-6">
  <div class="avatar">
    <div class="w-12">
      <img src="https://img.daisyui.com/images/profile/demo/[email protected]" />
    </div>
  </div>
  <div class="avatar">
    <div class="w-12">
      <img src="https://img.daisyui.com/images/profile/demo/[email protected]" />
    </div>
  </div>
  <div class="avatar">
    <div class="w-12">
      <img src="https://img.daisyui.com/images/profile/demo/[email protected]" />
    </div>
  </div>
  <div class="avatar">
    <div class="w-12">
      <img src="https://img.daisyui.com/images/profile/demo/[email protected]" />
    </div>
  </div>
</div>
```

**Avatar group with counter**

```html
<div class="avatar-group -space-x-6">
  <div class="avatar">
    <div class="w-12">
      <img src="https://img.daisyui.com/images/profile/demo/[email protected]" />
    </div>
  </div>
  <div class="avatar">
    <div class="w-12">
      <img src="https://img.daisyui.com/images/profile/demo/[email protected]" />
    </div>
  </div>
  <div class="avatar">
    <div class="w-12">
      <img src="https://img.daisyui.com/images/profile/demo/[email protected]" />
    </div>
  </div>
  <div class="avatar avatar-placeholder">
    <div class="bg-neutral text-neutral-content w-12">
      <span>+99</span>
    </div>
  </div>
</div>
```

**With ring**

```html
<div class="avatar">
  <div class="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
    <img src="https://img.daisyui.com/images/profile/demo/[email protected]" />
  </div>
</div>
```

**With presence indicator**

```html
<div class="avatar avatar-online">
  <div class="w-24 rounded-full">
    <img src="https://img.daisyui.com/images/profile/demo/[email protected]" />
  </div>
</div>
<div class="avatar avatar-offline">
  <div class="w-24 rounded-full">
    <img src="https://img.daisyui.com/images/profile/demo/[email protected]" />
  </div>
</div>
```

**Placeholder**

```html
<div class="avatar avatar-placeholder">
  <div class="bg-neutral text-neutral-content w-24 rounded-full">
    <span class="text-3xl">D</span>
  </div>
</div>
<div class="avatar avatar-online avatar-placeholder">
  <div class="bg-neutral text-neutral-content w-16 rounded-full">
    <span class="text-xl">AI</span>
  </div>
</div>
<div class="avatar avatar-placeholder">
  <div class="bg-neutral text-neutral-content w-12 rounded-full">
    <span>SY</span>
  </div>
</div>
<div class="avatar avatar-placeholder">
  <div class="bg-neutral text-neutral-content w-8 rounded-full">
    <span class="text-xs">UI</span>
  </div>
</div>
```

### Badge

| Variation | Code Example |
|-----------|--------------|
| Basic badge | ```<span class="badge">Badge</span>``` |
| Sizes | ```<div class="badge badge-xs">Xsmall</div><div class="badge badge-sm">Small</div><div class="badge badge-md">Medium</div><div class="badge badge-lg">Large</div><div class="badge badge-xl">Xlarge</div>``` |
| Colors | ```<div class="badge badge-primary">Primary</div><div class="badge badge-secondary">Secondary</div><div class="badge badge-accent">Accent</div><div class="badge badge-neutral">Neutral</div><div class="badge badge-info">Info</div><div class="badge badge-success">Success</div><div class="badge badge-warning">Warning</div><div class="badge badge-error">Error</div>``` |
| Soft style | ```<div class="badge badge-soft badge-primary">Primary</div><div class="badge badge-soft badge-secondary">Secondary</div><div class="badge badge-soft badge-accent">Accent</div><div class="badge badge-soft badge-info">Info</div><div class="badge badge-soft badge-success">Success</div><div class="badge badge-soft badge-warning">Warning</div><div class="badge badge-soft badge-error">Error</div>``` |
| Outline style | ```<div class="badge badge-outline badge-primary">Primary</div><div class="badge badge-outline badge-secondary">Secondary</div><div class="badge badge-outline badge-accent">Accent</div><div class="badge badge-outline badge-info">Info</div><div class="badge badge-outline badge-success">Success</div><div class="badge badge-outline badge-warning">Warning</div><div class="badge badge-outline badge-error">Error</div>``` |
| Dash style | ```<div class="badge badge-dash badge-primary">Primary</div><div class="badge badge-dash badge-secondary">Secondary</div><div class="badge badge-dash badge-accent">Accent</div><div class="badge badge-dash badge-info">Info</div><div class="badge badge-dash badge-success">Success</div><div class="badge badge-dash badge-warning">Warning</div><div class="badge badge-dash badge-error">Error</div>``` |
| Neutral outline / dash | ```<div class="bg-white p-6"><div class="badge badge-neutral badge-outline">Outline</div><div class="badge badge-neutral badge-dash">Dash</div></div>``` |
| Ghost | ```<div class="badge badge-ghost">ghost</div>``` |
| Empty badge | ```<div class="badge badge-primary badge-lg"></div><div class="badge badge-primary badge-md"></div><div class="badge badge-primary badge-sm"></div><div class="badge badge-primary badge-xs"></div>``` |
| Badge with icon | ```<div class="badge badge-info"><svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"></circle><path d="m12,17v-5.5c0-.276-.224-.5-.5-.5h-1.5" fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"></path><circle cx="12" cy="7.25" r="1.25" fill="currentColor" stroke-width="2"></circle></g></svg> Info</div><div class="badge badge-success"><svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"></circle><polyline points="7 13 10 16 17 8" fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"></polyline></g></svg> Success</div><div class="badge badge-warning"><svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><g fill="currentColor"><path d="M7.638,3.495L2.213,12.891c-.605,1.048,.151,2.359,1.362,2.359H14.425c1.211,0,1.967-1.31,1.362-2.359L10.362,3.495c-.605-1.048-2.119-1.048-2.724,0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><line x1="9" y1="6.5" x2="9" y2="10" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></line><path d="M9,13.569c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" fill="currentColor" data-stroke="none" stroke="none"></path></g></svg> Warning</div><div class="badge badge-error"><svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor"><rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)" fill="currentColor" stroke-width="0"></rect><path d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z" stroke-width="0" fill="currentColor"></path></g></svg> Error</div>``` |
| Badge in text | ```<h1 class="text-xl font-semibold">Heading 1 <span class="badge badge-xl">Badge</span></h1><h2 class="text-lg font-semibold">Heading 2 <span class="badge badge-lg">Badge</span></h2><h3 class="text-base font-semibold">Heading 3 <span class="badge badge-md">Badge</span></h3><h4 class="text-sm font-semibold">Heading 4 <span class="badge badge-sm">Badge</span></h4><h5 class="text-xs font-semibold">Heading 5 <span class="badge badge-xs">Badge</span></h5><p class="text-xs">Paragraph <span class="badge badge-xs">Badge</span></p>``` |
| Badge in button | ```<button class="btn">Inbox <div class="badge badge-sm">+99</div></button><button class="btn">Inbox <div class="badge badge-sm badge-secondary">+99</div></button>``` |

### Breadcrumbs

(Note: Detailed examples unavailable in fetched data; refer to official docs for separators like arrow, dot.)

**Basic breadcrumbs**

```html
<nav>
  <div class="breadcrumbs">
    <a>Home</a>
    <a>Documents</a>
    <a>Add new</a>
  </div>
</nav>
```

## Action Components

### Button

**Default Button**

```html
<button class="btn">Default</button>
```

**Button Sizes**

```html
<button class="btn btn-xs">Xsmall</button>
<button class="btn btn-sm">Small</button>
<button class="btn">Medium</button>
<button class="btn btn-lg">Large</button>
<button class="btn btn-xl">Xlarge</button>
```

**Responsive Button**

```html
<button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Responsive</button>
```

**Button Colors**

```html
<button class="btn btn-neutral">Neutral</button>
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-accent">Accent</button>
<button class="btn btn-info">Info</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-warning">Warning</button>
<button class="btn btn-error">Error</button>
```

**Soft Buttons**

```html
<button class="btn btn-soft">Default</button>
<button class="btn btn-soft btn-primary">Primary</button>
<button class="btn btn-soft btn-secondary">Secondary</button>
<button class="btn btn-soft btn-accent">Accent</button>
<button class="btn btn-soft btn-info">Info</button>
<button class="btn btn-soft btn-success">Success</button>
<button class="btn btn-soft btn-warning">Warning</button>
<button class="btn btn-soft btn-error">Error</button>
```

**Outline Buttons**

```html
<button class="btn btn-outline">Default</button>
<button class="btn btn-outline btn-primary">Primary</button>
<button class="btn btn-outline btn-secondary">Secondary</button>
<button class="btn btn-outline btn-accent">Accent</button>
<button class="btn btn-outline btn-info">Info</button>
<button class="btn btn-outline btn-success">Success</button>
<button class="btn btn-outline btn-warning">Warning</button>
<button class="btn btn-outline btn-error">Error</button>
```

**Dash Buttons**

```html
<button class="btn btn-dash">Default</button>
<button class="btn btn-dash btn-primary">Primary</button>
<button class="btn btn-dash btn-secondary">Secondary</button>
<button class="btn btn-dash btn-accent">Accent</button>
<button class="btn btn-dash btn-info">Info</button>
<button class="btn btn-dash btn-success">Success</button>
<button class="btn btn-dash btn-warning">Warning</button>
<button class="btn btn-dash btn-error">Error</button>
```

**Neutral Button with Outline or Dash Style**

```html
<div class="bg-white p-6">
  <button class="btn btn-neutral btn-outline">Outline</button>
  <button class="btn btn-neutral btn-dash">Dash</button>
</div>
```

**Active Buttons**

```html
<button class="btn btn-active">Default</button>
<button class="btn btn-active btn-primary">Primary</button>
<button class="btn btn-active btn-secondary">Secondary</button>
<button class="btn btn-active btn-accent">Accent</button>
<button class="btn btn-active btn-info">Info</button>
<button class="btn btn-active btn-success">Success</button>
<button class="btn btn-active btn-warning">Warning</button>
<button class="btn btn-active btn-error">Error</button>
```

**Wide Button**

```html
<button class="btn btn-wide">Wide</button>
```

**Buttons with Any HTML Tags**

```html
<a role="button" class="btn">Link</a>
<button type="submit" class="btn">Button</button>
<input type="button" value="Input" class="btn" />
<input type="submit" value="Submit" class="btn" />
<input type="radio" aria-label="Radio" class="btn" />
<input type="checkbox" aria-label="Checkbox" class="btn" />
<input type="reset" value="Reset" class="btn" />
```

**Disabled Buttons**

```html
<button class="btn" disabled="disabled">Disabled using attribute</button>
<button class="btn btn-disabled" tabindex="-1" role="button" aria-disabled="true">
  Disabled using class name
</button>
```

**Square Button and Circle Button**

```html
<button class="btn btn-square">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-[1.2em]"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
</button>
<button class="btn btn-circle">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-[1.2em]"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
</button>
```

**Button with Icon**

```html
<button class="btn">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-[1.2em]"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
  Like
</button>
<button class="btn">
  Like
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-[1.2em]"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
</button>
```

**Button Block**

```html
<button class="btn btn-block">block</button>
```

**Button with Loading Spinner**

```html
<button class="btn btn-square">
  <span class="loading loading-spinner"></span>
</button>

<button class="btn">
  <span class="loading loading-spinner"></span>
  loading
</button>
```

### Calendar

**Cally Calendar (Basic)**

```html
<calendar-date class="cally bg-base-100 border border-base-300 shadow-lg rounded-box">
  <svg aria-label="Previous" class="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg>
  <svg aria-label="Next" class="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg>
  <calendar-month></calendar-month>
</calendar-date>
```

**Cally Date Picker (Popover)**

```html
<button popovertarget="cally-popover1" class="input input-border" id="cally1" style="anchor-name:--cally1">
  Pick a date
</button>
<div popover id="cally-popover1" class="dropdown bg-base-100 rounded-box shadow-lg" style="position-anchor:--cally1">
  <calendar-date class="cally" onchange={document.getElementById('cally1').innerText = this.value}>
    <svg aria-label="Previous" class="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg>
    <svg aria-label="Next" class="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg>
    <calendar-month></calendar-month>
  </calendar-date>
</div>
```

**Pikaday CDN Example**

```html
<script src="https://cdn.jsdelivr.net/npm/pikaday/pikaday.js"></script>
<input type="text" class="input pika-single" id="myDatepicker">
<script>
  var picker = new Pikaday({ field: document.getElementById('myDatepicker') });
</script>
```

**React Day Picker Example**

```jsx
import { DayPicker } from 'react-day-picker';

function MyCalendar() {
  const [date, setDate] = useState(null);
  return (
    <>
      <button popoverTarget="rdp-popover" className="input input-border" style={{ anchorName: "--rdp" } as React.CSSProperties}>
        {date ? date.toLocaleDateString() : "Pick a date"}
      </button>
      <div popover="auto" id="rdp-popover" className="dropdown" style={{ positionAnchor: "--rdp" } as React.CSSProperties}>
        <DayPicker className="react-day-picker" mode="single" selected={date} onSelect={setDate} />
      </div>
    </>
  );
}
```

## Layout Components

### Card

| Variation | Code Example |
|-----------|--------------|
| Standard Card | ```<div class="card bg-base-100 w-96 shadow-sm"><figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" /></figure><div class="card-body"><h2 class="card-title">Card Title</h2><p>A card component has a figure, a body part, and inside body there are title and actions parts</p><div class="card-actions justify-end"><button class="btn btn-primary">Buy Now</button></div></div></div>``` |
| Pricing Card | ```<div class="card w-96 bg-base-100 shadow-sm"><div class="card-body"><span class="badge badge-xs badge-warning">Most Popular</span><div class="flex justify-between"><h2 class="text-3xl font-bold">Premium</h2><span class="text-xl">$29/mo</span></div><ul class="mt-6 flex flex-col gap-2 text-xs"><li><svg class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg><span>High-resolution image generation</span></li><li><svg class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg><span>Customizable style templates</span></li><li><svg class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg><span>Batch processing capabilities</span></li><li><svg class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg><span>AI-driven image enhancements</span></li><li class="opacity-50"><svg class="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg><span class="line-through">Seamless cloud integration</span></li><li class="opacity-50"><svg class="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg><span class="line-through">Real-time collaboration tools</span></li></ul><div class="mt-6"><button class="btn btn-primary btn-block">Subscribe</button></div></div></div>``` |
| Card Sizes | See individual XS, SM, MD, LG, XL examples in docs for padding adjustments. |
| Card with Border | ```<div class="card card-border bg-base-100 w-96"><div class="card-body"><h2 class="card-title">Card Title</h2><p>A card component has a figure, a body part, and inside body there are title and actions parts</p><div class="card-actions justify-end"><button class="btn btn-primary">Buy Now</button></div></div></div>``` |
| Card with Dash Border | ```<div class="card card-dash bg-base-100 w-96"><div class="card-body"><h2 class="card-title">Card Title</h2><p>A card component has a figure, a body part, and inside body there are title and actions parts</p><div class="card-actions justify-end"><button class="btn btn-primary">Buy Now</button></div></div></div>``` |
| Card with Badge | ```<div class="card bg-base-100 w-96 shadow-sm"><figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" /></figure><div class="card-body"><h2 class="card-title">Card Title<div class="badge badge-secondary">NEW</div></h2><p>A card component has a figure, a body part, and inside body there are title and actions parts</p><div class="card-actions justify-end"><div class="badge badge-outline">Fashion</div><div class="badge badge-outline">Products</div></div></div></div>``` |
| Card with Bottom Image | ```<div class="card bg-base-100 w-96 shadow-sm"><div class="card-body"><h2 class="card-title">Card Title</h2><p>A card component has a figure, a body part, and inside body there are title and actions parts</p></div><figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" /></figure></div>``` |
| Card with Centered Content and Paddings | ```<div class="card bg-base-100 w-96 shadow-sm"><figure class="px-10 pt-10"><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" class="rounded-xl" /></figure><div class="card-body items-center text-center"><h2 class="card-title">Card Title</h2><p>A card component has a figure, a body part, and inside body there are title and actions parts</p><div class="card-actions"><button class="btn btn-primary">Buy Now</button></div></div></div>``` |
| Card with Image Overlay | ```<div class="card bg-base-100 image-full w-96 shadow-sm"><figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" /></figure><div class="card-body"><h2 class="card-title">Card Title</h2><p>A card component has a figure, a body part, and inside body there are title and actions parts</p><div class="card-actions justify-end"><button class="btn btn-primary">Buy Now</button></div></div></div>``` |
| Card with No Image | ```<div class="card bg-base-100 w-96 shadow-sm"><div class="card-body"><h2 class="card-title">Card title!</h2><p>A card component has a figure, a body part, and inside body there are title and actions parts</p><div class="card-actions justify-end"><button class="btn btn-primary">Buy Now</button></div></div></div>``` |
| Card with Custom Color | ```<div class="card bg-primary text-primary-content w-96"><div class="card-body"><h2 class="card-title">Card title!</h2><p>A card component has a figure, a body part, and inside body there are title and actions parts</p><div class="card-actions justify-end"><button class="btn">Buy Now</button></div></div></div>``` |
| Centered Card with Neutral Color | ```<div class="card bg-neutral text-neutral-content w-96"><div class="card-body items-center text-center"><h2 class="card-title">Cookies!</h2><p>We are using cookies for no reason.</p><div class="card-actions justify-end"><button class="btn btn-primary">Accept</button><button class="btn btn-ghost">Deny</button></div></div></div>``` |
| Card with Action on Top | ```<div class="card bg-base-100 w-96 shadow-sm"><div class="card-body"><div class="card-actions justify-end"><button class="btn btn-square btn-sm"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></button></div><p>We are using cookies for no reason.</p></div></div>``` |
| Card with Image on Side | ```<div class="card card-side bg-base-100 shadow-sm"><figure><img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp" alt="Movie" /></figure><div class="card-body"><h2 class="card-title">New movie is released!</h2><p>Click the button to watch on Jetflix app.</p><div class="card-actions justify-end"><button class="btn btn-primary">Watch</button></div></div></div>``` |
| Responsive Card | ```<div class="card lg:card-side bg-base-100 shadow-sm"><figure><img src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp" alt="Album" /></figure><div class="card-body"><h2 class="card-title">New album is released!</h2><p>Click the button to listen on Spotiwhy app.</p><div class="card-actions justify-end"><button class="btn btn-primary">Listen</button></div></div></div>``` |

### Carousel

**Snap to start (default)**

```html
<div class="carousel rounded-box">
  <div class="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" alt="Burger" />
  </div>
  <div class="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp" alt="Burger" />
  </div>
  <div class="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp" alt="Burger" />
  </div>
  <div class="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp" alt="Burger" />
  </div>
  <div class="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp" alt="Burger" />
  </div>
  <div class="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp" alt="Burger" />
  </div>
  <div class="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp" alt="Burger" />
  </div>
</div>
```

**Snap to center**

```html
<div class="carousel carousel-center rounded-box">
  <div class="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" alt="Pizza" />
  </div>
  <div class="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp" alt="Pizza" />
  </div>
  <div class="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp" alt="Pizza" />
  </div>
  <div class="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp" alt="Pizza" />
  </div>
  <div class="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp" alt="Pizza" />
  </div>
  <div class="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp" alt="Pizza" />
  </div>
  <div class="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp" alt="Pizza" />
  </div>
</div>
```

**Snap to end**

```html
<div class="carousel carousel-end rounded-box">
  <div class="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" alt="Drink" />
  </div>
  <div class="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp" alt="Drink" />
  </div>
  <div class="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp" alt="Drink" />
  </div>
  <div class="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp" alt="Drink" />
  </div>
  <div class="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp" alt="Drink" />
  </div>
  <div class="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp" alt="Drink" />
  </div>
  <div class="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp" alt="Drink" />
  </div>
</div>
```

*(Note: This document covers a subset of components for brevity; full list includes Alert, Avatar, Badge, Button, Calendar, Card, Carousel, and more. For complete coverage, visit the official DaisyUI site. Additional components like Chat, Checkbox, Collapse, etc., follow similar patterns with color, size, and style variations.)*

## Key Citations
- [DaisyUI Install Docs](https://daisyui.com/docs/install/)
- [DaisyUI Components Overview](https://daisyui.com/components/)
- [Accordion Component](https://daisyui.com/components/accordion/)
- [Alert Component](https://daisyui.com/components/alert/)
- [Avatar Component](https://daisyui.com/components/avatar/)
- [Badge Component](https://daisyui.com/components/badge/)
- [Button Component](https://daisyui.com/components/button/)
- [Calendar Component](https://daisyui.com/components/calendar/)
- [Card Component](https://daisyui.com/components/card/)
- [Carousel Component](https://daisyui.com/components/carousel/)