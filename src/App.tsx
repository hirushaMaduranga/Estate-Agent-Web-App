import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FavouritesProvider } from './context/FavouritesContext';
import { SearchPage } from './pages/SearchPage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';

function App() {
  return (
    <FavouritesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/property/:propertyId" element={<PropertyDetailsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </FavouritesProvider>
  );
}

export default App;
