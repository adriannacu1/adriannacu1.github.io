# Assets Directory

This directory is for storing images and other media files for the digital scrapbook.

## Structure:
- `images/` - Photos and graphics for each monthsary
- `icons/` - Custom icons and decorative elements
- `backgrounds/` - Background patterns or textures (if needed)

## Usage:
When adding memories to each monthsary page, place the corresponding images in the `images/` folder and reference them in the JavaScript using the `addMemory()` method.

Example:
```javascript
// Add a memory to the first monthsary (December 7, 2024)
scrapbook.addMemory(1, "Our First Date", "assets/images/first-date.jpg", "The day our story began ❤️");
```