import { HashRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { HomePage } from '@/pages/HomePage';
import { WorldPage } from '@/pages/WorldPage';
import { JourneyPage } from '@/pages/JourneyPage';
import { FactsPage } from '@/pages/FactsPage';
import { ContactPage } from '@/pages/ContactPage';

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-white text-ink-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/world" element={<WorldPage />} />
            <Route path="/journey" element={<JourneyPage />} />
            <Route path="/facts" element={<FactsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
