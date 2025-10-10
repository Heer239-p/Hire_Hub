# Dark Mode Debug Guide

## Step 1: Restart Dev Server

**IMPORTANT:** After changing CSS configuration, you MUST restart the dev server!

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 2: Clear Browser Cache

1. Open DevTools (F12)
2. Right-click the refresh button
3. Click "Empty Cache and Hard Reload"

OR

Press: **Ctrl + Shift + R** (Windows) or **Cmd + Shift + R** (Mac)

## Step 3: Test Dark Mode

1. **Open browser console** (F12)
2. **Click the Moon icon** 🌙 in the header
3. **Check console output** - Should see:
   ```
   🌙 Dark mode ON - HTML classes: dark
   ```

## Step 4: Verify Dark Class

In browser console, run:
```javascript
document.documentElement.classList.contains('dark')
```
**Expected:** `true` (when dark mode is on)

## Step 5: Inspect Element

1. **Right-click** on the header
2. **Click "Inspect"**
3. **Look at the `<html>` tag** at the top
4. **Should see:** `<html class="dark">` when dark mode is on

## Step 6: Check Computed Styles

1. **Inspect the header element**
2. **Look at "Computed" tab**
3. **Check background-color**
   - Light mode: Should be white (rgb(255, 255, 255))
   - Dark mode: Should be dark gray (rgb(17, 24, 39) or similar)

## Troubleshooting

### Issue 1: Console shows dark mode ON but nothing changes

**Solution:**
1. Restart dev server: `npm run dev`
2. Hard refresh browser: Ctrl+Shift+R
3. Check if CSS file is being loaded in Network tab

### Issue 2: Dark class not being added to HTML

**Check Header.jsx:**
```javascript
// Should have this in useEffect:
document.documentElement.classList.add("dark");
```

**Test manually in console:**
```javascript
document.documentElement.classList.add("dark");
```
If this works manually, the issue is in the React component.

### Issue 3: Dark class added but styles don't apply

**Check index.css:**
Should have:
```css
@import "tailwindcss";

@variant dark (&:where(.dark, .dark *));
```

**Restart dev server after changing CSS!**

### Issue 4: Vite not picking up changes

1. Stop dev server (Ctrl+C)
2. Delete `.vite` cache folder (if exists)
3. Restart: `npm run dev`

## Manual Test

Open console and run this:

```javascript
// Add dark class
document.documentElement.classList.add('dark');

// Check if header background changed
const header = document.querySelector('header');
const bgColor = window.getComputedStyle(header).backgroundColor;
console.log('Header background:', bgColor);

// Should be dark gray, not white
```

## Expected Behavior

### When clicking Moon icon:
1. ✅ Console: "🌙 Dark mode ON - HTML classes: dark"
2. ✅ HTML element has class="dark"
3. ✅ Header background turns dark gray
4. ✅ Sidebar turns black
5. ✅ Main content turns dark
6. ✅ Text turns light

### When clicking Sun icon:
1. ✅ Console: "☀️ Light mode ON - HTML classes: " (empty)
2. ✅ HTML element has no dark class
3. ✅ Everything returns to light theme

## Quick Fix Commands

### Force dark mode:
```javascript
document.documentElement.classList.add('dark');
localStorage.setItem('theme', 'dark');
location.reload();
```

### Force light mode:
```javascript
document.documentElement.classList.remove('dark');
localStorage.setItem('theme', 'light');
location.reload();
```

### Check Tailwind is loaded:
```javascript
// Check if any element has Tailwind classes working
const header = document.querySelector('header');
console.log('Header classes:', header.className);
console.log('Computed styles:', window.getComputedStyle(header).backgroundColor);
```

## If Still Not Working

1. **Share console output** when clicking toggle
2. **Share:** `document.documentElement.className`
3. **Share:** Screenshot of DevTools showing HTML element
4. **Share:** Any errors in console (red text)
5. **Confirm:** Did you restart dev server?
6. **Confirm:** Did you hard refresh browser?

## Critical Steps

🔴 **MUST DO:**
1. Restart dev server after CSS changes
2. Hard refresh browser (Ctrl+Shift+R)
3. Check console for errors
4. Verify dark class is added to `<html>` element
