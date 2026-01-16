import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import './Sidebar.css'

const timeFilters = ['D', 'W', 'M', 'Q']

const tags = ['Revenue', 'Churn', 'Q3', 'MAU', 'Yearly reports', 'Retention']

interface Highlight {
  id: string
  value: string
  badge: string
  description: string
}

const highlightsByTimeframe: Record<string, Highlight[]> = {
  D: [
    { id: '1', value: '+ 24,828', badge: '+25%', description: 'Daily active users growth' },
    { id: '2', value: '+ 1,432', badge: '+8%', description: 'New signups today' },
    { id: '3', value: '+ 892', badge: '+12%', description: 'Daily transactions' },
  ],
  W: [
    { id: '1', value: '+ 156,240', badge: '+18%', description: 'Weekly active users' },
    { id: '2', value: '+ 12,850', badge: '+22%', description: 'New signups this week' },
    { id: '3', value: '+ 8,432', badge: '+15%', description: 'Weekly revenue increase' },
  ],
  M: [
    { id: '1', value: '+ 642,180', badge: '+32%', description: 'Monthly active users' },
    { id: '2', value: '+ 48,920', badge: '+28%', description: 'New customers this month' },
    { id: '3', value: '+ 125,000', badge: '+45%', description: 'Monthly recurring revenue' },
  ],
  Q: [
    { id: '1', value: '+ 1,825,400', badge: '+42%', description: 'Quarterly growth rate' },
    { id: '2', value: '+ 285,000', badge: '+35%', description: 'Q3 new acquisitions' },
    { id: '3', value: '+ 2,450,000', badge: '+52%', description: 'Quarterly revenue' },
  ],
}

interface Request {
  id: string
  title: string
  description: string
  status: 'Completed' | 'In Progress' | 'Pending'
}

const requests: Request[] = [
  {
    id: '1',
    title: 'Revenue report',
    description: 'Q3 financial performance analysis',
    status: 'Completed',
  },
  {
    id: '2',
    title: 'Customer churn analysis',
    description: 'Identifying at-risk customer segments',
    status: 'In Progress',
  },
  {
    id: '3',
    title: 'Market expansion study',
    description: 'Evaluating new market opportunities',
    status: 'Pending',
  },
  {
    id: '4',
    title: 'Competitor pricing review',
    description: 'Benchmark against top 5 competitors',
    status: 'Completed',
  },
]

export default function Sidebar() {
  const [activeTimeFilter, setActiveTimeFilter] = useState('D')
  const [currentHighlight, setCurrentHighlight] = useState(0)
  const [currentRequest, setCurrentRequest] = useState(0)

  const highlights = highlightsByTimeframe[activeTimeFilter]

  const handleTimeFilterChange = (filter: string) => {
    setActiveTimeFilter(filter)
    setCurrentHighlight(0)
  }

  const handleNextHighlight = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setCurrentHighlight((prev) => (prev + 1) % highlights.length)
  }

  const handleNextRequest = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setCurrentRequest((prev) => (prev + 1) % requests.length)
  }

  const completedRequests = requests.filter(r => r.status === 'Completed').length

  return (
    <aside className="sidebar">
      {/* Highlights Section */}
      <section className="sidebar-section highlights-section">
        <div className="section-header">
          <h2 className="section-title">Highlights</h2>
          <div className="time-filters">
            {timeFilters.map((filter) => (
              <button
                key={filter}
                className={`time-filter ${activeTimeFilter === filter ? 'active' : ''}`}
                onClick={() => handleTimeFilterChange(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="highlight-cards">
          <div className="highlight-card-stack">
            <div className="highlight-card-bg-2" />
            <div className="highlight-card-bg-1" />
            <div className="highlight-card" onClick={handleNextHighlight}>
              <div className="highlight-content">
                <div className="highlight-top">
                  <span className="highlight-value">{highlights[currentHighlight].value}</span>
                  <span className="highlight-badge">{highlights[currentHighlight].badge}</span>
                </div>
                <p className="highlight-description">{highlights[currentHighlight].description}</p>
              </div>
              <button className="highlight-arrow" onClick={handleNextHighlight}>
                <ChevronDown size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tags Section */}
      <section className="sidebar-section tags-section">
        <div className="section-header">
          <h2 className="section-title">Tags</h2>
        </div>
        <div className="tags-container">
          {tags.map((tag, index) => (
            <button key={`${tag}-${index}`} className="tag">
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Requests Section */}
      <section className="sidebar-section requests-section">
        <div className="section-header-with-progress">
          <div className="requests-header">
            <h2 className="section-title">Requests</h2>
            <div className="progress-count">
              <span className="progress-current">{completedRequests}</span>
              <span className="progress-total">/{requests.length}</span>
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-bg" />
            <div className="progress-fill" style={{ width: `${(completedRequests / requests.length) * 100}%` }} />
          </div>
        </div>
        <div className="request-cards">
          <div className="request-card-stack">
            <div className="request-card-bg-2" />
            <div className="request-card-bg-1" />
            <div className="request-card" onClick={handleNextRequest}>
              <div className="request-content">
                <div className="request-top">
                  <span className="request-title">{requests[currentRequest].title}</span>
                  <span className={`request-badge ${requests[currentRequest].status.toLowerCase().replace(' ', '-')}`}>
                    {requests[currentRequest].status}
                  </span>
                </div>
                <p className="request-description">{requests[currentRequest].description}</p>
              </div>
              <button className="request-arrow" onClick={handleNextRequest}>
                <ChevronDown size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </aside>
  )
}

