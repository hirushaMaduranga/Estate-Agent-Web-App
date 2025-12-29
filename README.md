# Estate Agent Web App

A modern, fully-featured estate agent web application built with React, TypeScript, Vite, and Tailwind CSS. This is a client-side only Single Page Application (SPA) with no backend requirements.

## Features

### 🔍 Advanced Search & Filtering
- Filter by property type (House/Flat)
- Price range filtering (min/max)
- Bedroom range filtering (min/max)
- Date added filtering (after date or between dates)
- Postcode area search (case-insensitive)
- Combine multiple filters simultaneously
- Real-time results with automatic sorting by newest first

### 💙 Favourites System
- Add properties to favourites via heart icon
- Drag-and-drop properties to favourites sidebar
- Persistent storage using localStorage
- Prevent duplicate favourites
- Remove individual favourites or clear all
- Favourites counter

### 🖼️ Property Details
- Full-screen image gallery with lightbox
- Thumbnail navigation
- Tabbed interface:
  - Detailed description
  - Floor plan viewer
  - Interactive Google Maps location

### 📱 Responsive Design
- Two-layout responsive system
- Tailwind CSS for modern styling
- Custom media queries for tablet/mobile optimization
- Works on all screen sizes (desktop, tablet, mobile)

### 🔒 Security
- Content Security Policy (CSP) headers
- Safe HTML rendering (no dangerous injections)
- Sanitized user inputs

## Tech Stack

- **Framework:** React 18.2 with TypeScript
- **Build Tool:** Vite 5.0
- **Routing:** React Router 6.15
- **Styling:** Tailwind CSS 3.3
- **Testing:** Jest 29 + React Testing Library
- **State Management:** React Context API

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
The app will open at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm preview
```

### Run Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

## Project Structure

```
src/
├── components/          # React components
│   ├── SearchForm.tsx   # Search filters form
│   ├── PropertyCard.tsx # Property display card
│   ├── ImageGallery.tsx # Image viewer with lightbox
│   ├── TabPanel.tsx     # Tabbed interface
│   └── FavouritesSidebar.tsx # Favourites management
├── pages/
│   ├── SearchPage.tsx   # Main search page
│   └── PropertyDetailsPage.tsx # Property details view
├── context/
│   └── FavouritesContext.tsx # Favourites state management
├── data/
│   └── properties.json  # Property data (7 properties)
├── utils/
│   └── filterProperties.ts # Pure filter function
├── styles/
│   ├── index.css        # Global styles + Tailwind
│   └── responsive.css   # Custom media queries
├── App.tsx              # Root component
└── main.tsx             # App entry point
```

## Deployment to GitHub Pages

### Step 1: Update vite.config.ts
Add the base URL for your repository:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // Replace with your repo name
})
```

### Step 2: Build the Project
```bash
npm run build
```

### Step 3: Deploy to GitHub Pages

**Option A: Using gh-pages package**
```bash
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "gh-pages -d dist"

# Deploy:
npm run deploy
```

**Option B: Manual deployment**
1. Push the `dist` folder to a `gh-pages` branch
2. Enable GitHub Pages in repository settings
3. Select `gh-pages` branch as source

### Step 4: Access Your App
Visit: `https://your-username.github.io/your-repo-name/`

## Key Implementation Details

### Filter Function
The core filtering logic is a pure function that accepts any combination of criteria:
```typescript
filterProperties(properties: Property[], filters: FilterCriteria): Property[]
```

### Date Handling
Dates are stored as `{ month: string, day: number, year: number }` and converted to Date objects for comparison using the `parseAddedDate` utility.

### Favourites Persistence
Favourites are stored in localStorage and automatically synced across sessions.

### Security - CSP
Content Security Policy is implemented in `index.html`:
- Scripts: Self + Google Maps
- Styles: Self + inline
- Images: Self + HTTPS + data URIs
- Frames: Google Maps only

### HTML Sanitization
Property descriptions are rendered safely using React's default escaping. If HTML content is needed, it should be sanitized using a library like DOMPurify.

## Testing

The project includes comprehensive test coverage:

1. **Unit Tests:** Filter logic (15+ test cases)
2. **Component Tests:** PropertyCard, SearchForm, TabPanel
3. **Integration Tests:** App rendering and routing

Run all tests:
```bash
npm test
```

Test coverage includes:
- Filter by type, price, bedrooms, date, postcode
- Combined filter scenarios
- Edge cases and null handling
- Component rendering and user interactions
- Tab switching and form submissions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Author

Built with ❤️ for the Modern Web
