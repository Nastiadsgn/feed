import { useState } from 'react'
import { ArrowLeft, ArrowUp, TrendingUp, TrendingDown, X, Plus, Sparkles, Heart, MessageCircle, Send } from 'lucide-react'
import './ReportPage.css'

interface ReportPageProps {
  onBack: () => void
}

const revenueTabs = ['Total Revenue', 'Subscription', 'Services', 'Licensing']

const revenueBreakdown = [
  { label: 'Enterprise', value: '45.2%', color: '#F5B732' },
  { label: 'Mid-Market', value: '28.1%', color: '#14B8A6' },
  { label: 'SMB', value: '17.9%', color: '#8B5CF6' },
  { label: 'Other', value: '8.8%', color: '#F75F50' },
]

const financialHighlights = [
  { metric: 'Revenue', q4_2024: '$287M', q4_2023: '$214M', change: '+34%', positive: true },
  { metric: 'Gross Profit', q4_2024: '$224M', q4_2023: '$163M', change: '+37%', positive: true },
  { metric: 'Gross Margin', q4_2024: '78%', q4_2023: '76%', change: '+200bps', positive: true },
  { metric: 'Operating Expenses', q4_2024: '$198M', q4_2023: '$172M', change: '+15%', positive: false },
  { metric: 'Free Cash Flow', q4_2024: '$42M', q4_2023: '$18M', change: '+133%', positive: true },
]

const customerMetrics = [
  { metric: 'Total Customers', q4_2024: '2,847', q4_2023: '2,156', change: '+32%', positive: true },
  { metric: 'Enterprise Customers ($100K+)', q4_2024: '312', q4_2023: '265', change: '+18%', positive: true },
  { metric: 'Net Revenue Retention', q4_2024: '128%', q4_2023: '118%', change: '+10pts', positive: true },
  { metric: 'Gross Revenue Retention', q4_2024: '95%', q4_2023: '93%', change: '+2pts', positive: true },
]

const relatedReports = [
  { type: 'Quarterly Report', title: 'Q3 2024 Results', pages: '38 pages' },
  { type: 'Annual Report', title: 'FY2024 Annual Report', pages: '87 pages' },
  { type: 'Benchmark', title: 'Q4 Performance Benchmarks', pages: '24 pages' },
]

// Chart data for area charts
const quarterlyRevenueData = [180, 195, 210, 220, 235, 255, 270, 287]
const totalCustomersData = [1800, 1950, 2100, 2200, 2400, 2550, 2700, 2847]
const grossMarginData = [72, 73, 74, 74, 75, 76, 77, 78]
const netRevenueRetentionData = [112, 114, 116, 118, 120, 122, 125, 128]

const quarters = ["Q1 '23", "Q2 '23", "Q3 '23", "Q4 '23", "Q1 '24", "Q2 '24", "Q3 '24", "Q4 '24"]

interface AreaChartProps {
  data: number[]
  color: string
  height?: number
}

function AreaChart({ data, color, height = 100 }: AreaChartProps) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const padding = 10

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = height - padding - ((value - min) / range) * (height - padding * 2)
    return `${x},${y}`
  }).join(' ')

  const areaPoints = `0,${height} ${points} 100,${height}`

  return (
    <svg viewBox={`0 0 100 ${height}`} className="area-chart" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <polygon
        points={areaPoints}
        fill={`url(#gradient-${color.replace('#', '')})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

// Chat message interface
interface ChatMessage {
  id: string
  type: 'user' | 'ai'
  content: string
}

// Chat tab interface
interface ChatTab {
  id: string
  title: string
}

// Clickable value component props
interface ClickableValueProps {
  value: string
  context?: string
  onClick: (value: string, context?: string) => void
}

function ClickableValue({ value, context, onClick }: ClickableValueProps) {
  return (
    <span 
      className="clickable-value"
      onClick={(e) => {
        e.stopPropagation()
        onClick(value, context)
      }}
      title="Click to get explanation"
    >
      {value}
    </span>
  )
}

export default function ReportPage({ onBack }: ReportPageProps) {
  const [activeTab, setActiveTab] = useState('Total Revenue')
  const [chatInput, setChatInput] = useState('')
  const [chatTabs, setChatTabs] = useState<ChatTab[]>([{ id: '1', title: 'New chat' }])
  const [activeChatTab, setActiveChatTab] = useState('1')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(24)
  const [commentInput, setCommentInput] = useState('')
  const [comments, setComments] = useState([
    { id: '1', author: 'Sarah Chen', avatar: 'S', color: '#F5B732', text: 'Great breakdown of the Q4 numbers. The NRR improvement is particularly impressive.', time: '2 hours ago' },
    { id: '2', author: 'Mike Johnson', avatar: 'M', color: '#14B8A6', text: 'Would love to see more detail on the enterprise segment growth drivers.', time: '1 hour ago' },
  ])

  const handleSendMessage = () => {
    if (!chatInput.trim()) return
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: chatInput
    }
    
    setChatMessages(prev => [...prev, userMessage])
    setChatInput('')
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(chatInput)
      }
      setChatMessages(prev => [...prev, aiMessage])
    }, 500)
  }

  const generateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes('$287m') || lowerQuery.includes('287')) {
      return `**$287M** is the total quarterly revenue for Q4 2024.\n\nThis represents a 34% increase from Q4 2023 ($214M)\n\nRevenue breakdown:\n• Enterprise: 45.2%\n• Mid-Market: 28.1%\n• SMB: 17.9%\n• Other: 8.8%`
    }
    if (lowerQuery.includes('34%') || lowerQuery.includes('34 percent')) {
      return `**34%** represents the year-over-year revenue growth.\n\nQ4 2024: $287M vs Q4 2023: $214M\n\nThis growth rate exceeds analyst expectations by 12%\n\nKey drivers:\n• Enterprise adoption surge\n• Platform 3.0 launch\n• Geographic expansion`
    }
    if (lowerQuery.includes('128%')) {
      return `**128%** is the Net Revenue Retention (NRR) rate.\n\nThis means existing customers are spending 28% more than the previous year\n\nCalculation: (Starting MRR + Expansion - Contraction - Churn) / Starting MRR\n\nBenchmark: Elite SaaS companies target >120%`
    }
    if (lowerQuery.includes('78%') || lowerQuery.includes('gross margin')) {
      return `**78%** represents the gross margin percentage.\n\nGross margin = (Revenue - COGS) / Revenue\n\nHigh margin indicates strong pricing power\n\nSaaS companies typically target 70-80%\n\nImprovement driven by operational efficiency`
    }
    if (lowerQuery.includes('2,847') || lowerQuery.includes('2847')) {
      return `**2,847** is the total number of active customer accounts.\n\nThis represents 32% growth from Q4 2023 (2,156 customers)\n\nCustomer segments:\n• Enterprise ($100K+): 312 customers\n• Mid-Market: ~800 customers\n• SMB: ~1,735 customers`
    }
    if (lowerQuery.includes('$42m') || lowerQuery.includes('42m')) {
      return `**$42M** is the Free Cash Flow for Q4 2024.\n\nThis represents 133% growth from Q4 2023 ($18M)\n\nFCF = Operating Cash Flow - Capital Expenditures\n\nStrong FCF indicates financial health and ability to invest in growth`
    }
    if (lowerQuery.includes('$224m') || lowerQuery.includes('224m')) {
      return `**$224M** is the Gross Profit for Q4 2024.\n\nGross Profit = Revenue - Cost of Goods Sold\n\n$287M revenue × 78% gross margin = $224M\n\nThis represents 37% growth from Q4 2023 ($163M)`
    }
    if (lowerQuery.includes('312')) {
      return `**312** is the number of Enterprise customers with contracts over $100K annually.\n\nThis represents 18% growth from Q4 2023 (265 customers)\n\nEnterprise segment now represents 72% of total revenue, up from 64% YoY`
    }
    if (lowerQuery.includes('$500m') || lowerQuery.includes('500m')) {
      return `**$500M** is the authorized stock buyback program.\n\nApproved by the Board of Directors\n\nSignals:\n• Confidence in long-term trajectory\n• Commitment to shareholder returns\n• Belief that stock is undervalued`
    }
    return `I can help you understand the Q4 2024 report data. What specific metrics would you like me to explain?`
  }

  const handleValueClick = (value: string, context?: string) => {
    const query = context 
      ? `Explain ${value} in the context of ${context}`
      : `Explain what ${value} means in this report`
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: query
    }
    
    setChatMessages(prev => [...prev, userMessage])
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(value)
      }
      setChatMessages(prev => [...prev, aiMessage])
    }, 500)
  }

  const closeTab = (tabId: string) => {
    if (chatTabs.length === 1) return
    setChatTabs(prev => prev.filter(tab => tab.id !== tabId))
    if (activeChatTab === tabId) {
      setActiveChatTab(chatTabs[0].id)
    }
  }

  const handleLikeToggle = () => {
    setIsLiked(!isLiked)
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleCommentSubmit = () => {
    if (!commentInput.trim()) return
    const newComment = {
      id: Date.now().toString(),
      author: 'You',
      avatar: 'Y',
      color: '#4E76D0',
      text: commentInput,
      time: 'Just now'
    }
    setComments(prev => [...prev, newComment])
    setCommentInput('')
  }

  return (
    <div className="report-page-layout">
      <div className="report-page">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>Back to Feed</span>
        </button>

        <div className="report-container">
        {/* Report Header */}
        <header className="report-header">
          <h1 className="report-title">Q4 2024 Quarterly Report</h1>
          <div className="report-meta-row">
            <div className="report-authors">
              <span className="authors-label">Authors:</span>
              <div className="author-avatars">
                <div className="author-avatar" style={{ background: '#4E76D0' }}>J</div>
                <div className="author-avatar" style={{ background: '#F5B732' }}>S</div>
                <div className="author-avatar" style={{ background: '#14B8A6' }}>M</div>
              </div>
            </div>
            <div className="meta-items-group">
              <div className="meta-item">
                <span className="meta-label">Published:</span>
                <span className="meta-value">December 26, 2024</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Period:</span>
                <span className="meta-value">Q4 FY2024</span>
              </div>
            </div>
          </div>
        </header>

        {/* Revenue Mix Section */}
        <section className="report-section revenue-mix-section">
          <div className="section-header-row">
            <div>
              <h2 className="section-title">Revenue Mix</h2>
              <p className="section-subtitle">Total revenue by segment, Q4 2024</p>
            </div>
          </div>

          <div className="revenue-tabs">
            {revenueTabs.map((tab) => (
              <button
                key={tab}
                className={`revenue-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="revenue-value-row">
            <ClickableValue value="$287M" context="Total Revenue" onClick={handleValueClick} />
            <span 
              className="revenue-change positive"
              onClick={() => handleValueClick('34%', 'Revenue Growth YoY')}
              title="Click to get explanation"
            >
              <ArrowUp size={20} />
              <span className="clickable-value">34%</span>
            </span>
          </div>

          <div className="revenue-breakdown-group">
            <div className="revenue-bar">
              {revenueBreakdown.map((segment, index) => (
                <div
                  key={segment.label}
                  className="revenue-segment"
                  style={{
                    width: segment.value,
                    backgroundColor: segment.color,
                    borderRadius: index === 0 ? '4px 0 0 4px' : index === revenueBreakdown.length - 1 ? '0 4px 4px 0' : '0'
                  }}
                />
              ))}
            </div>

            <div className="revenue-legend">
              {revenueBreakdown.map((segment) => (
                <div key={segment.label} className="legend-item">
                  <span className="legend-label">{segment.label}</span>
                  <span className="legend-value">{segment.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="key-metrics-grid">
            <div className="key-metric">
              <div className="metric-divider"></div>
              <span className="metric-label">Revenue Growth</span>
              <div className="metric-value-row">
                <TrendingUp size={20} className="trend-icon positive" />
                <span className="metric-value">
                  <ClickableValue value="34%" context="Revenue Growth" onClick={handleValueClick} />
                </span>
              </div>
              <span className="metric-sublabel">YoY growth, Q4 2024</span>
            </div>
            <div className="key-metric">
              <div className="metric-divider"></div>
              <span className="metric-label">Net Revenue Retention</span>
              <div className="metric-value-row">
                <TrendingUp size={20} className="trend-icon positive" />
                <span className="metric-value">
                  <ClickableValue value="128%" context="Net Revenue Retention" onClick={handleValueClick} />
                </span>
              </div>
              <span className="metric-sublabel">enterprise segment, Q4 2024</span>
            </div>
            <div className="key-metric">
              <div className="metric-divider"></div>
              <span className="metric-label">Gross Margin</span>
              <span className="metric-value">
                <ClickableValue value="78%" context="Gross Margin" onClick={handleValueClick} />
              </span>
              <span className="metric-sublabel">operating efficiency, Q4 2024</span>
            </div>
          </div>

          <div className="key-metrics-grid">
            <div className="key-metric">
              <span className="metric-label">Total Customers</span>
              <span className="metric-value large">
                <ClickableValue value="2,847" context="Total Customers" onClick={handleValueClick} />
              </span>
              <span className="metric-sublabel">active accounts, Q4 2024</span>
            </div>
            <div className="key-metric">
              <span className="metric-label">Enterprise Customers</span>
              <div className="metric-value-row">
                <TrendingUp size={20} className="trend-icon positive" />
                <span className="metric-value">
                  <ClickableValue value="18%" context="Enterprise Customer Growth" onClick={handleValueClick} />
                </span>
              </div>
              <span className="metric-sublabel">YoY growth, $100K+ contracts</span>
            </div>
            <div className="key-metric">
              <span className="metric-label">Free Cash Flow</span>
              <div className="metric-value-row">
                <TrendingUp size={20} className="trend-icon positive" />
                <span className="metric-value">
                  <ClickableValue value="133%" context="Free Cash Flow Growth" onClick={handleValueClick} />
                </span>
              </div>
              <span className="metric-sublabel">YoY growth, Q4 2024</span>
            </div>
          </div>
        </section>

        {/* Executive Summary */}
        <section className="report-section">
          <h2 className="section-title">Executive Summary</h2>
          <div className="summary-content">
            <p>
              DataBao delivered exceptional results in Q4 2024, with record quarterly revenue of $287 million
              representing 34% year-over-year growth. This performance exceeded analyst expectations by 12%
              and caps off a transformative year for the company.
            </p>
            <div className="key-takeaway">
              <p>
                <strong>Key Takeaway:</strong> The combination of strong enterprise adoption, successful geographic expansion,
                and the launch of Platform 3.0 positions DataBao for continued growth in 2025.
              </p>
            </div>
            <p>
              The quarter was marked by several significant milestones, including crossing the $1 billion ARR
              threshold, opening our Singapore regional headquarters, and launching the most significant
              platform update in company history.
            </p>
          </div>
        </section>

        {/* Performance Trends */}
        <section className="report-section">
          <h2 className="section-title">Performance Trends</h2>
          <div className="charts-grid">
            <div className="chart-card">
              <div className="chart-header">
                <div>
                  <h3 className="chart-title">Quarterly Revenue</h3>
                  <p className="chart-subtitle">Last 8 quarters (in millions)</p>
                </div>
                <div className="chart-value-container">
                  <span className="chart-value">
                    <ClickableValue value="$287M" context="Quarterly Revenue" onClick={handleValueClick} />
                  </span>
                  <span className="chart-change positive">+ <ClickableValue value="34%" context="Revenue Growth YoY" onClick={handleValueClick} /> YoY</span>
                </div>
              </div>
              <div className="chart-container">
                <AreaChart data={quarterlyRevenueData} color="#F5B732" />
              </div>
              <div className="chart-labels">
                {quarters.map((q) => (
                  <span key={q} className="chart-label">{q}</span>
                ))}
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <div>
                  <h3 className="chart-title">Total Customers</h3>
                  <p className="chart-subtitle">Last 8 quarters</p>
                </div>
                <div className="chart-value-container">
                  <span className="chart-value">
                    <ClickableValue value="2,847" context="Total Customers" onClick={handleValueClick} />
                  </span>
                  <span className="chart-change positive">+ 32% YoY</span>
                </div>
              </div>
              <div className="chart-container">
                <AreaChart data={totalCustomersData} color="#8B5CF6" />
              </div>
              <div className="chart-labels">
                {quarters.map((q) => (
                  <span key={q} className="chart-label">{q}</span>
                ))}
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <div>
                  <h3 className="chart-title">Gross Margin</h3>
                  <p className="chart-subtitle">Last 8 quarters (%)</p>
                </div>
                <div className="chart-value-container">
                  <span className="chart-value">
                    <ClickableValue value="78%" context="Gross Margin" onClick={handleValueClick} />
                  </span>
                  <span className="chart-change positive">+ +2pts YoY</span>
                </div>
              </div>
              <div className="chart-container">
                <AreaChart data={grossMarginData} color="#4E76D0" />
              </div>
              <div className="chart-labels">
                {quarters.map((q) => (
                  <span key={q} className="chart-label">{q}</span>
                ))}
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <div>
                  <h3 className="chart-title">Net Revenue Retention</h3>
                  <p className="chart-subtitle">Last 8 quarters (%)</p>
                </div>
                <div className="chart-value-container">
                  <span className="chart-value">
                    <ClickableValue value="128%" context="Net Revenue Retention" onClick={handleValueClick} />
                  </span>
                  <span className="chart-change positive">+ +10pts YoY</span>
                </div>
              </div>
              <div className="chart-container">
                <AreaChart data={netRevenueRetentionData} color="#14B8A6" />
              </div>
              <div className="chart-labels">
                {quarters.map((q) => (
                  <span key={q} className="chart-label">{q}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Financial Highlights */}
        <section className="report-section">
          <h2 className="section-title">Financial Highlights</h2>
          <div className="data-table">
            <div className="table-header">
              <span className="table-cell metric-cell">Metric</span>
              <span className="table-cell">Q4 2024</span>
              <span className="table-cell">Q4 2023</span>
              <span className="table-cell">Change</span>
            </div>
            {financialHighlights.map((row) => (
              <div key={row.metric} className="table-row">
                <span className="table-cell metric-cell">{row.metric}</span>
                <span className="table-cell value-cell">
                  <ClickableValue value={row.q4_2024} context={row.metric} onClick={handleValueClick} />
                </span>
                <span className="table-cell">{row.q4_2023}</span>
                <span className={`table-cell change-cell ${row.positive ? 'positive' : 'negative'}`}>
                  <ClickableValue value={row.change} context={`${row.metric} change`} onClick={handleValueClick} />
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Metrics */}
        <section className="report-section">
          <h2 className="section-title">Customer Metrics</h2>
          <p className="section-description">
            The enterprise segment continued to drive growth, with customers on contracts exceeding $100K
            annually now representing 72% of total revenue, up from 64% in the prior year.
          </p>
          <div className="data-table">
            <div className="table-header">
              <span className="table-cell metric-cell">Metric</span>
              <span className="table-cell">Q4 2024</span>
              <span className="table-cell">Q4 2023</span>
              <span className="table-cell">Change</span>
            </div>
            {customerMetrics.map((row) => (
              <div key={row.metric} className="table-row">
                <span className="table-cell metric-cell">{row.metric}</span>
                <span className="table-cell value-cell">
                  <ClickableValue value={row.q4_2024} context={row.metric} onClick={handleValueClick} />
                </span>
                <span className="table-cell">{row.q4_2023}</span>
                <span className={`table-cell change-cell ${row.positive ? 'positive' : 'negative'}`}>
                  <ClickableValue value={row.change} context={`${row.metric} change`} onClick={handleValueClick} />
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Outlook & Guidance */}
        <section className="report-section">
          <h2 className="section-title">Outlook & Guidance</h2>
          <p className="section-description">
            Based on our strong performance and market position, we are providing the following guidance:
          </p>

          <div className="guidance-block">
            <h3 className="guidance-title">Q1 2025 Guidance</h3>
            <ul className="guidance-list">
              <li>
                <span className="guidance-arrow">→</span>
                Revenue: $295M - $302M (28-31% YoY growth)
              </li>
              <li>
                <span className="guidance-arrow">→</span>
                Non-GAAP Operating Margin: 8-10%
              </li>
            </ul>
          </div>

          <div className="guidance-block">
            <h3 className="guidance-title">Full Year 2025 Guidance</h3>
            <ul className="guidance-list">
              <li>
                <span className="guidance-arrow">→</span>
                Revenue: $1.25B - $1.30B (25-30% YoY growth)
              </li>
              <li>
                <span className="guidance-arrow">→</span>
                Non-GAAP Operating Margin: 10-12%
              </li>
              <li>
                <span className="guidance-arrow">→</span>
                Free Cash Flow: $150M+
              </li>
            </ul>
          </div>

          <div className="capital-allocation">
            <p>
              <strong>Capital Allocation:</strong> The Board has approved a $500M stock buyback program, reflecting
              confidence in our long-term trajectory and commitment to shareholder returns.
            </p>
          </div>
        </section>

        {/* Comments and Likes Section */}
        <section className="report-section engagement-section">
          <div className="engagement-actions">
            <button 
              className={`like-button ${isLiked ? 'liked' : ''}`}
              onClick={handleLikeToggle}
            >
              <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
              <span>{likeCount} likes</span>
            </button>
            <div className="comments-count">
              <MessageCircle size={20} />
              <span>{comments.length} comments</span>
            </div>
          </div>

          <div className="comments-section">
            <h3 className="comments-title">Comments</h3>
            
            <div className="comment-input-wrapper">
              <input
                type="text"
                className="comment-input"
                placeholder="Add a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit()}
              />
              <button 
                className="comment-submit-btn"
                onClick={handleCommentSubmit}
                disabled={!commentInput.trim()}
              >
                <Send size={16} />
              </button>
            </div>

            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-avatar" style={{ background: comment.color }}>
                    {comment.avatar}
                  </div>
                  <div className="comment-content">
                    <div className="comment-header">
                      <span className="comment-author">{comment.author}</span>
                      <span className="comment-time">{comment.time}</span>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Reports */}
        <section className="report-section">
          <h2 className="section-title">Related Reports</h2>
          <div className="related-reports-grid">
            {relatedReports.map((report) => (
              <div key={report.title} className="related-report-card">
                <span className="report-type">{report.type}</span>
                <h3 className="report-card-title">{report.title}</h3>
                <span className="report-pages">{report.pages}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>

      {/* Chat Panel - Right Side */}
      <aside className="report-chat-panel">
        <div className="chat-panel-header">
          <h2 className="chat-panel-title">AI Agent</h2>
          <div className="chat-panel-actions">
            <button className="chat-panel-btn">
              <Plus size={18} />
            </button>
          </div>
        </div>

        <div className="chat-tabs-container">
          {chatTabs.map((tab) => (
            <div 
              key={tab.id} 
              className={`chat-tab ${activeChatTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveChatTab(tab.id)}
            >
              <span>{tab.title}</span>
              <button 
                className="chat-tab-close"
                onClick={(e) => {
                  e.stopPropagation()
                  closeTab(tab.id)
                }}
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>

        <div className="chat-messages-container">
          {chatMessages.map((message) => (
            <div key={message.id} className={`chat-message ${message.type}`}>
              {message.type === 'ai' && (
                <div className="ai-avatar">
                  <Sparkles size={14} />
                </div>
              )}
              <div className="chat-message-content">
                {message.type === 'ai' ? (
                  <div className="ai-response-card">
                    {message.content.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                ) : (
                  <div className="user-message-bubble">{message.content}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input-container">
          <div className="chat-input-wrapper">
            <input
              type="text"
              placeholder="What do you want the agent to do?"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="chat-input-field"
            />
            <button 
              className="chat-send-btn"
              onClick={handleSendMessage}
              disabled={!chatInput.trim()}
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}
