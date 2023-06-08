import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import { Component as QuoteViewer } from './components/QuoteViewer';
import { Component as Nav } from './components/Nav';
import { Component as Tags } from './components/Tags';
import { Component as Authors } from './components/Authors';
import { useGetQuote } from './hooks/useGetQuote';

const getPageIndex = (pathname: string) => {
  const parts = pathname.split('/');
  if (parts[1] === 'quote') {
    return parseInt(parts[2]);
  }
}

const App = () => {
  const location = useLocation();
  const pageIndex = getPageIndex(location.pathname);
  const { yaml, markdown, index } = useGetQuote(pageIndex ? parseInt(pageIndex) : undefined)

  if (!yaml || !markdown) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Nav className="header-nav" index={index} />
      <Routes>
        <Route path="/" element={<QuoteViewer yaml={yaml} markdown={markdown} />} />
        <Route path="/quote/:pageIndex" element={<QuoteViewer yaml={yaml} markdown={markdown} />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/authors" element={<Authors />} />
      </Routes>
      <Nav className="footer-nav" index={index} />
    </>
  )
}

export default App
