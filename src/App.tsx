import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Chat from './pages/Chat'
import ImageGen from './pages/ImageGen'
import VideoGen from './pages/VideoGen'
import History from './pages/History'

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

function AppRoutes() {
  const location = useLocation()
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Landing /></PageWrapper>} />
          <Route path="/chat" element={<PageWrapper><Chat /></PageWrapper>} />
          <Route path="/image" element={<PageWrapper><ImageGen /></PageWrapper>} />
          <Route path="/video" element={<PageWrapper><VideoGen /></PageWrapper>} />
          <Route path="/history" element={<PageWrapper><History /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="animated-bg" />
      <AppRoutes />
    </BrowserRouter>
  )
}
