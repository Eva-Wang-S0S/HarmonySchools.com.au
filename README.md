# Cultural Safety in Schools - Website Files

## 📁 Complete Website Package

This package contains all the files needed for the "Cultural Safety in Schools" website.

## 🗂️ File Structure

```
root/
│
├─ index.html                    ← Home page
├─ teachers.html                 ← Resources for Teachers
├─ parents.html                  ← Resources for Parents
├─ social-workers.html           ← Resources for Social Workers (custom design)
├─ students.html                 ← Resources for Students
├─ search.html                   ← Search page (filters all resources)
├─ contact.html                  ← Contact page
│
├─ assets/
│   ├─ css/
│   │   └─ site.css              ← Global styles
│   └─ js/
│       ├─ site.js               ← Navigation & UI interactions
│       ├─ search.js             ← Search functionality
│       └─ contact.js            ← Contact form handler
│
└─ data/
    └─ resources.json            ← Resource database (20 sample entries)
```

## 🎨 Design Features

- **Color Palette**: Warm and inclusive colors
  - Ochre: #C87F2A
  - Eucalyptus Green: #5C7C6B
  - Sky Blue: #7FB3C8
  - Off-white: #F9F7F4

- **Responsive Design**: Mobile-friendly with hamburger menu
- **Accessible**: ARIA labels, focus outlines, readable contrast
- **Professional**: Rounded corners, gentle shadows, clean layout

## 🚀 How to Use

### Option 1: GitHub Pages

1. Create a new GitHub repository
2. Upload all files maintaining the folder structure
3. Go to Settings → Pages
4. Select "main" branch as source
5. Your site will be live at: `https://yourusername.github.io/repository-name/`

### Option 2: Local Testing

1. Extract all files to a folder
2. Open `index.html` in your web browser
3. Navigate through the site using the menu

### Option 3: Web Hosting

1. Upload all files to your web hosting via FTP/cPanel
2. Maintain the folder structure
3. Access via your domain name

## 🔧 Customization

### Update Resources

Edit `/data/resources.json` to add, remove, or modify resources. Each resource follows this structure:

```json
{
  "id": "unique-id",
  "title": "Resource Title",
  "summary": "Brief description",
  "url": "https://example.com",
  "audience": ["Teachers", "Parents"],
  "topics": ["Topic1", "Topic2"],
  "format": "Guide",
  "region": "Australia",
  "cost": "Free",
  "publisher": "Publisher Name",
  "year": 2024,
  "language": "English"
}
```

### Update Contact Email

In `/assets/js/contact.js`, change line 43:
```javascript
const recipient = 'your-email@example.com';
```

### Customize Colors

Edit CSS variables in `/assets/css/site.css` (lines 8-14)

### Add Videos to Social Workers Page

In `social-workers.html`, replace the video placeholder sections with actual embed codes (e.g., YouTube iframe)

## 📱 Social Workers Page

The social workers page includes:
- Introduction with quotes and videos
- Role descriptions with common challenges
- Interactive case scenarios (expandable sections)
- Resource categories with links to search
- Professional forum placeholder (ready for integration)

The case scenarios use HTML `<details>` elements for interactive expansion.

## 🔍 Search Functionality

The search page includes:
- Keyword search (weighted: title 3×, summary 2×, publisher 1×)
- Multi-select filters (audience, topics, format)
- Sort options (relevance, newest, A-Z)
- Pagination (12 results per page)
- URL parameter support (e.g., `search.html?audience=Teachers`)

## 📧 Contact Form

The contact form uses a `mailto:` fallback. For production:
- Integrate with a form service (Formspree, Netlify Forms, etc.)
- Or set up a backend email handler
- Update `/assets/js/contact.js` accordingly

## 🌐 Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11 not supported (uses modern CSS Grid, Flexbox)
- Mobile responsive (tested on iOS and Android)

## ♿ Accessibility Features

- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- Semantic HTML structure
- Alt text ready for images (add as needed)

## 📝 To-Do for Production

1. ✅ Replace placeholder videos with actual embeds
2. ✅ Update contact email address
3. ✅ Add actual resource data to resources.json
4. ✅ Integrate forum/discussion platform (Disqus, GitHub Discussions, etc.)
5. ✅ Add hero images or banners
6. ✅ Set up proper form handling (if not using mailto)
7. ✅ Add favicon
8. ✅ Set up analytics (Google Analytics, etc.)
9. ✅ Test all external resource links

## 📄 License

Customize the footer copyright notice in each HTML file as needed.

## 🙏 Acknowledgement of Country

The Acknowledgement of Country text is included in all page footers and can be customized to reflect your specific location.

---

**Questions or Issues?**
This is a static website that runs entirely in the browser with no backend required. All functionality works offline except for external resource links.
