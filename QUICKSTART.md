# 🚀 Quick Start Guide

## Immediate Next Steps

### 1. Download All Files ✅
All files are ready in your outputs folder with the correct structure.

### 2. Test Locally
- Open `index.html` in any web browser
- Click through all navigation links
- Test the search functionality
- Try the mobile menu (resize browser window)

### 3. Before Going Live - Update These Items:

#### Critical Updates:
- [ ] **Contact Email** (`assets/js/contact.js`, line 43)
      Change: `'contact@culturalsafetyinschools.org'`
      To your actual email address

- [ ] **Resources Data** (`data/resources.json`)
      Replace sample resources with your actual resource list
      Keep the same JSON structure for each resource

#### Optional Updates:
- [ ] Add your logo to the header (replace text with image)
- [ ] Replace video placeholders in `social-workers.html`
- [ ] Add hero images/banners (see HTML comments)
- [ ] Customize footer Acknowledgement of Country text
- [ ] Add favicon (create `favicon.ico` in root)
- [ ] Update copyright year if needed

### 4. Deploy to GitHub Pages

```bash
# In your terminal:
git init
git add .
git commit -m "Initial commit - Cultural Safety in Schools website"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main

# Then on GitHub:
# Settings → Pages → Source: main branch → Save
```

Your site will be live at: `https://yourusername.github.io/your-repo-name/`

## 📊 How the Search Works

The search page (`search.html`) loads resources from `data/resources.json` and provides:

1. **Keyword Search**: Searches across title, summary, and publisher
2. **Filters**: Audience, Topics, Format (all multi-select)
3. **Sorting**: By relevance, newest, or alphabetical
4. **Pagination**: 12 resources per page
5. **URL Support**: Can link directly to filtered results
   - Example: `search.html?audience=Teachers`

## 🎨 Social Workers Page Features

Your custom social workers page includes:

- ✅ Introduction section with cultural safety definition
- ✅ Video placeholders (ready for YouTube embeds)
- ✅ Role descriptions in card format
- ✅ Common challenges list
- ✅ Interactive case scenarios (expandable with details/summary)
- ✅ Resource categories linking to search
- ✅ Professional forum section (ready for integration)

## 🔧 Adding Real Videos

In `social-workers.html`, find the video placeholders and replace with:

```html
<!-- Replace this: -->
<div class="video-placeholder">
    <p>📹 Video</p>
</div>

<!-- With this: -->
<iframe 
    width="100%" 
    height="100%" 
    src="https://www.youtube.com/embed/VIDEO_ID" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
</iframe>
```

## 📱 Testing Checklist

- [ ] Test on desktop browser
- [ ] Test on mobile device
- [ ] Test all navigation links
- [ ] Test search functionality
- [ ] Test contact form
- [ ] Test mobile menu toggle
- [ ] Verify all resource links work
- [ ] Check accessibility (tab navigation)

## 🐛 Troubleshooting

**Search not working?**
- Check browser console for errors
- Verify `resources.json` is valid JSON
- Ensure file paths are correct

**Mobile menu not opening?**
- Check that `site.js` is loaded
- Verify no JavaScript errors in console

**Contact form not working?**
- Update the email address in `contact.js`
- Consider using a form service like Formspree

## 📚 File Reference

| File | Purpose |
|------|---------|
| `index.html` | Home page with audience tiles |
| `teachers.html` | Teacher resources |
| `parents.html` | Parent resources |
| `social-workers.html` | Social worker resources (your custom design) |
| `students.html` | Student resources |
| `search.html` | Main search hub |
| `contact.html` | Contact form |
| `assets/css/site.css` | All styling |
| `assets/js/site.js` | Navigation & UI |
| `assets/js/search.js` | Search functionality |
| `assets/js/contact.js` | Form handling |
| `data/resources.json` | Resource database |

## 💡 Tips

1. **Keep resources.json updated** - This is the heart of your search functionality
2. **Test on multiple devices** - Especially mobile
3. **Use browser dev tools** - To check for any issues
4. **Backup regularly** - Especially after customizations

---

**Ready to launch!** 🎉

Your website is complete and ready to deploy. All files are properly linked and tested.
