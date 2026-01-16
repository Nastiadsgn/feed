import { useState } from 'react'
import Header from './components/Header'
import Feed from './components/Feed'
import Sidebar from './components/Sidebar'
import ReportPage from './components/ReportPage'
import './App.css'

function App() {
  const [activeFilters, setActiveFilters] = useState<string[]>(['all'])
  const [showReport, setShowReport] = useState(false)
  const [, setSelectedReportId] = useState<string | null>(null)

  const handleCardClick = (itemId: string) => {
    setSelectedReportId(itemId)
    setShowReport(true)
  }

  const handleBackToFeed = () => {
    setShowReport(false)
    setSelectedReportId(null)
  }

  return (
    <div className="app">
      <Header onLogoClick={handleBackToFeed} />
      <main className="main-content">
        {showReport ? (
          <ReportPage onBack={handleBackToFeed} />
        ) : (
          <div className="content-wrapper">
            <Feed 
              activeFilters={activeFilters} 
              onFilterChange={setActiveFilters}
              onCardClick={handleCardClick}
            />
            <Sidebar />
          </div>
        )}
      </main>
    </div>
  )
}

export default App
