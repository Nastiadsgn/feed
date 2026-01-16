import { useState } from 'react'
import { 
  ArrowLeft, 
  Share, 
  MoreVertical, 
  Plus, 
  Bot, 
  ArrowUp,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw
} from 'lucide-react'
import './ChatDialog.css'

interface ChatDialogProps {
  chatId: string
  title: string
  onBack: () => void
}

interface Message {
  id: string
  type: 'user' | 'ai' | 'user-mention'
  content: string
  avatar?: string
  mention?: string
}

interface ChartData {
  type: 'radial' | 'bar' | 'line' | 'donut' | 'progress'
  value: string
  label: string
  percentage: number
  trend: string
  trendUp: boolean
  description: string
  data?: number[]
  labels?: string[]
  colors?: string[]
}

interface ChatContent {
  messages: Message[]
  chart: ChartData
}

const chatContents: Record<string, ChatContent> = {
  '1': {
    messages: [
      {
        id: '1',
        type: 'user',
        content: 'Can you analyze the current market trends for our industry?',
      },
      {
        id: '2',
        type: 'ai',
        content: "I've analyzed the market data and identified several key trends. The industry is seeing a 15% growth in digital adoption, with mobile-first strategies becoming dominant. Customer preferences are shifting towards personalized experiences and sustainable products.",
      },
      {
        id: '3',
        type: 'user',
        content: 'What about our target demographic?',
      },
      {
        id: '4',
        type: 'ai',
        content: "Your target demographic (25-45 age group) shows increased engagement with video content and social commerce. I recommend focusing on Instagram and TikTok for maximum reach. Would you like me to break down the engagement metrics?",
      },
    ],
    chart: {
      type: 'line',
      value: '12,450',
      label: 'market signals',
      percentage: 78,
      trend: 'Up 2.1% from last month',
      trendUp: true,
      description: 'Tracking market sentiment across all channels',
      data: [30, 45, 35, 55, 48, 62, 58, 75, 68, 82, 78, 85],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
  },
  '2': {
    messages: [
      {
        id: '1',
        type: 'user',
        content: 'Got it! Can you pull insights on the customer acquisition strategies of our main competitors?',
      },
      {
        id: '2',
        type: 'ai',
        content: "I've generated a comprehensive analysis of the marketing approaches employed by HyperDynamic, Apex Solutions, and Zenith Technologies. This encompasses their latest promotional activities, consumer base segmentation, and total promotional expenditure. Do you want to explore a particular aspect in more detail?",
      },
      {
        id: '3',
        type: 'user-mention',
        content: 'See the attached report',
        mention: '@Nikki',
      },
      {
        id: '4',
        type: 'user',
        content: 'Understood! Data is checked, everything is accurate',
      },
    ],
    chart: {
      type: 'radial',
      value: '8,921',
      label: 'mentions',
      percentage: 75,
      trend: 'Up 0.3% from last month',
      trendUp: true,
      description: 'Aggregating total mentions over the past semester',
    },
  },
  '3': {
    messages: [
      {
        id: '1',
        type: 'user',
        content: 'Help me understand our customer segments better.',
      },
      {
        id: '2',
        type: 'ai',
        content: "Based on the analysis, I've identified 4 primary customer segments: Premium Buyers (28%), Value Seekers (35%), Brand Loyalists (22%), and Occasional Shoppers (15%). Each segment has distinct purchasing patterns and engagement preferences.",
      },
      {
        id: '3',
        type: 'user',
        content: 'Which segment should we prioritize for the Q4 campaign?',
      },
      {
        id: '4',
        type: 'ai',
        content: "I recommend focusing on Value Seekers for Q4. They show 40% higher conversion rates during promotional periods and have the highest growth potential. I can prepare a targeted campaign strategy if you'd like.",
      },
      {
        id: '5',
        type: 'user-mention',
        content: 'Let\'s review this with the team',
        mention: '@Marketing',
      },
    ],
    chart: {
      type: 'donut',
      value: '4,892',
      label: 'customers analyzed',
      percentage: 65,
      trend: 'Up 5.2% from last quarter',
      trendUp: true,
      description: 'Customer segmentation analysis complete',
      data: [28, 35, 22, 15],
      labels: ['Premium', 'Value Seekers', 'Loyalists', 'Occasional'],
      colors: ['#4E76D0', '#F75F50', '#F5B732', '#3BC77D'],
    },
  },
  '4': {
    messages: [
      {
        id: '1',
        type: 'user',
        content: 'What are the sales projections for next quarter?',
      },
      {
        id: '2',
        type: 'ai',
        content: "Based on historical data and current market indicators, I project a 18% increase in sales for Q1. Key drivers include seasonal demand patterns, successful product launches, and expanded distribution channels.",
      },
      {
        id: '3',
        type: 'user',
        content: 'Any risks we should be aware of?',
      },
      {
        id: '4',
        type: 'ai',
        content: "There are two main risk factors: supply chain disruptions (moderate probability) and increased competitor activity in the premium segment. I recommend building a 15% buffer inventory and accelerating our loyalty program rollout.",
      },
    ],
    chart: {
      type: 'bar',
      value: '$2.4M',
      label: 'projected revenue',
      percentage: 82,
      trend: 'Up 18% projected growth',
      trendUp: true,
      description: 'Q1 sales forecast based on predictive modeling',
      data: [1.8, 2.0, 1.9, 2.4],
      labels: ['Q2', 'Q3', 'Q4', 'Q1 (proj)'],
      colors: ['#A0A3A8', '#A0A3A8', '#A0A3A8', '#3BC77D'],
    },
  },
  '5': {
    messages: [
      {
        id: '1',
        type: 'user',
        content: 'Show me our current KPI dashboard status.',
      },
      {
        id: '2',
        type: 'ai',
        content: "Here's the KPI summary: Customer Satisfaction is at 87% (target: 85%), Net Promoter Score is 42 (target: 40), and Customer Retention is at 78% (target: 80%). Two out of three metrics are exceeding targets.",
      },
      {
        id: '3',
        type: 'user',
        content: 'What can we do to improve retention?',
      },
      {
        id: '4',
        type: 'ai',
        content: "I've identified three actionable improvements: 1) Implement a win-back campaign for churned customers, 2) Enhance the onboarding experience with personalized touchpoints, 3) Launch a tiered rewards program. Expected retention improvement: 5-8%.",
      },
    ],
    chart: {
      type: 'progress',
      value: '87%',
      label: 'overall performance',
      percentage: 87,
      trend: 'Up 3% from last period',
      trendUp: true,
      description: 'Composite KPI score across all metrics',
      data: [87, 84, 78],
      labels: ['Satisfaction', 'NPS', 'Retention'],
      colors: ['#3BC77D', '#4E76D0', '#F75F50'],
    },
  },
  '6': {
    messages: [
      {
        id: '1',
        type: 'user',
        content: 'I need help creating a dashboard for the executive team.',
      },
      {
        id: '2',
        type: 'ai',
        content: "I can help with that. For executive dashboards, I recommend focusing on: Revenue metrics, Customer acquisition cost, Lifetime value, and Market share. Would you like me to generate a template with real-time data connections?",
      },
      {
        id: '3',
        type: 'user-mention',
        content: 'Adding you to review the mockups',
        mention: '@Design',
      },
      {
        id: '4',
        type: 'user',
        content: 'Perfect, let\'s schedule a review session.',
      },
    ],
    chart: {
      type: 'bar',
      value: '24',
      label: 'widgets configured',
      percentage: 60,
      trend: 'Dashboard 60% complete',
      trendUp: true,
      description: 'Interactive dashboard with drill-down capabilities',
      data: [8, 6, 5, 3, 2],
      labels: ['Revenue', 'CAC', 'LTV', 'Share', 'Other'],
      colors: ['#3BC77D', '#8B5CF6', '#F75F50', '#F5B732', '#4E76D0'],
    },
  },
}

const defaultContent: ChatContent = {
  messages: [
    {
      id: '1',
      type: 'user',
      content: 'Can you help me analyze this data?',
    },
    {
      id: '2',
      type: 'ai',
      content: "Of course! I'm ready to help you with your analysis. What specific aspects would you like me to focus on?",
    },
  ],
  chart: {
    type: 'radial',
    value: '1,234',
    label: 'data points',
    percentage: 50,
    trend: 'Analysis in progress',
    trendUp: true,
    description: 'Processing your data request',
  },
}

function RadialChart({ percentage }: { percentage: number }) {
  return (
    <svg viewBox="0 0 120 120" className="chart-svg">
      <circle cx="60" cy="60" r="50" fill="none" stroke="#f4f4f5" strokeWidth="12" />
      <circle
        cx="60" cy="60" r="50" fill="none" stroke="#4E76D0" strokeWidth="12"
        strokeDasharray={`${percentage * 3.14} 314`}
        strokeLinecap="round" transform="rotate(-90 60 60)"
      />
    </svg>
  )
}

function LineChart({ data }: { data: number[] }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 200
    const y = 80 - ((val - min) / range) * 60
    return `${x},${y}`
  }).join(' ')
  
  return (
    <svg viewBox="0 0 200 100" className="line-chart-svg">
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3BC77D" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3BC77D" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,80 ${points} 200,80`}
        fill="url(#lineGradient)"
      />
      <polyline
        points={points}
        fill="none" stroke="#3BC77D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
      {data.map((val, i) => {
        const x = (i / (data.length - 1)) * 200
        const y = 80 - ((val - min) / range) * 60
        return <circle key={i} cx={x} cy={y} r="3" fill="#3BC77D" />
      })}
    </svg>
  )
}

function BarChart({ data, colors }: { data: number[], colors?: string[] }) {
  const max = Math.max(...data)
  const barWidth = 180 / data.length - 8
  const defaultColors = ['#4E76D0', '#3BC77D', '#F75F50', '#F5B732', '#8B5CF6', '#14B8A6']
  
  return (
    <svg viewBox="0 0 200 100" className="bar-chart-svg">
      {data.map((val, i) => {
        const height = (val / max) * 70
        const x = 10 + i * (barWidth + 8)
        const color = colors?.[i] || defaultColors[i % defaultColors.length]
        return (
          <rect
            key={i} x={x} y={90 - height} width={barWidth} height={height}
            fill={color} rx="4"
          />
        )
      })}
    </svg>
  )
}

function DonutChart({ data, colors }: { data: number[], colors?: string[] }) {
  const total = data.reduce((a, b) => a + b, 0)
  let currentAngle = -90
  const defaultColors = ['#4E76D0', '#3BC77D', '#F75F50', '#F5B732', '#8B5CF6', '#14B8A6']
  
  return (
    <svg viewBox="0 0 120 120" className="chart-svg">
      {data.map((val, i) => {
        const angle = (val / total) * 360
        const startAngle = currentAngle
        const endAngle = currentAngle + angle
        currentAngle = endAngle
        
        const startRad = (startAngle * Math.PI) / 180
        const endRad = (endAngle * Math.PI) / 180
        const largeArc = angle > 180 ? 1 : 0
        
        const x1 = 60 + 45 * Math.cos(startRad)
        const y1 = 60 + 45 * Math.sin(startRad)
        const x2 = 60 + 45 * Math.cos(endRad)
        const y2 = 60 + 45 * Math.sin(endRad)
        
        const color = colors?.[i] || defaultColors[i % defaultColors.length]
        
        return (
          <path
            key={i}
            d={`M 60 60 L ${x1} ${y1} A 45 45 0 ${largeArc} 1 ${x2} ${y2} Z`}
            fill={color}
          />
        )
      })}
      <circle cx="60" cy="60" r="28" fill="white" />
    </svg>
  )
}

function ProgressChart({ data, labels, colors }: { data: number[], labels?: string[], colors?: string[] }) {
  const defaultColors = ['#3BC77D', '#4E76D0', '#F75F50', '#F5B732', '#8B5CF6', '#14B8A6']
  return (
    <div className="progress-chart">
      {data.map((val, i) => (
        <div key={i} className="progress-item">
          <div className="progress-label-row">
            <span className="progress-label">{labels?.[i] || `Item ${i + 1}`}</span>
            <span className="progress-value">{val}%</span>
          </div>
          <div className="progress-track">
            <div 
              className="progress-bar-fill" 
              style={{ 
                width: `${val}%`, 
                backgroundColor: colors?.[i] || defaultColors[i % defaultColors.length] 
              }} 
            />
          </div>
        </div>
      ))}
    </div>
  )
}

const teamAvatars = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop',
]

export default function ChatDialog({ chatId, title, onBack }: ChatDialogProps) {
  const [inputValue, setInputValue] = useState('')
  
  const content = chatContents[chatId] || defaultContent
  const { messages, chart } = content

  return (
    <div className="chat-dialog-page">
      <button className="back-button" onClick={onBack}>
        <ArrowLeft size={20} />
      </button>

      <div className="chat-dialog-content">
        <div className="chat-section">
          <div className="chat-nav">
            <h1 className="chat-title">{title}</h1>
          </div>

          <div className="chat-container">
            <div className="chat-header">
              <div className="avatar-group">
                {teamAvatars.map((avatar, index) => (
                  <div 
                    key={index} 
                    className="team-avatar"
                    style={{ zIndex: teamAvatars.length - index }}
                  >
                    <img src={avatar} alt={`Team member ${index + 1}`} />
                  </div>
                ))}
              </div>
              <div className="chat-actions">
                <button className="icon-btn">
                  <Share size={16} />
                </button>
                <button className="icon-btn">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            <div className="chat-messages">
              {(() => {
                let userMessageIndex = 0
                return messages.map((message) => {
                  const currentUserIndex = message.type !== 'ai' ? userMessageIndex++ : -1
                  return (
                    <div key={message.id} className={`message-wrapper ${message.type}`}>
                      {message.type === 'ai' ? (
                        <div className="ai-message">
                          <Bot size={20} className="bot-icon" />
                          <p className="message-text">{message.content}</p>
                        </div>
                      ) : (
                        <div className="user-message-row">
                          <div className="user-message">
                            <p className="message-text">
                              {message.content}
                              {message.mention && (
                                <span className="mention-tag">
                                  <span className="mention-avatar">
                                    <img src={teamAvatars[currentUserIndex + 1 === 1 ? 2 : 1]} alt="Mentioned user" />
                                  </span>
                                  {message.mention}
                                </span>
                              )}
                            </p>
                          </div>
                          <div className="user-avatar">
                            <img src={teamAvatars[currentUserIndex === 1 ? 2 : 1]} alt="User avatar" />
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })
              })()}

              {/* Chart Card */}
              <div className="chart-card">
                {chart.type === 'radial' && (
                  <div className="radial-chart">
                    <RadialChart percentage={chart.percentage} />
                    <div className="chart-center">
                      <span className="chart-value">{chart.value}</span>
                      <span className="chart-label">{chart.label}</span>
                    </div>
                  </div>
                )}
                
                {chart.type === 'line' && chart.data && (
                  <div className="line-chart-container">
                    <LineChart data={chart.data} />
                    <div className="chart-value-row">
                      <span className="chart-value">{chart.value}</span>
                      <span className="chart-label">{chart.label}</span>
                    </div>
                  </div>
                )}
                
                {chart.type === 'bar' && chart.data && (
                  <div className="bar-chart-container">
                    <BarChart data={chart.data} colors={chart.colors} />
                    {chart.labels && (
                      <div className="chart-labels">
                        {chart.labels.map((label, i) => (
                          <span key={i} className="bar-label">{label}</span>
                        ))}
                      </div>
                    )}
                    <div className="chart-value-row">
                      <span className="chart-value">{chart.value}</span>
                      <span className="chart-label">{chart.label}</span>
                    </div>
                  </div>
                )}
                
                {chart.type === 'donut' && chart.data && (
                  <div className="donut-chart-container">
                    <div className="donut-chart">
                      <DonutChart data={chart.data} colors={chart.colors} />
                      <div className="chart-center">
                        <span className="chart-value">{chart.value}</span>
                        <span className="chart-label">{chart.label}</span>
                      </div>
                    </div>
                    {chart.labels && (
                      <div className="donut-legend">
                        {chart.labels.map((label, i) => (
                          <div key={i} className="legend-item">
                            <span 
                              className="legend-color" 
                              style={{ backgroundColor: chart.colors?.[i] || '#2a9d90' }} 
                            />
                            <span className="legend-text">{label}</span>
                            <span className="legend-value">{chart.data?.[i]}%</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {chart.type === 'progress' && chart.data && (
                  <div className="progress-chart-container">
                    <ProgressChart data={chart.data} labels={chart.labels} colors={chart.colors} />
                    <div className="chart-value-row">
                      <span className="chart-value">{chart.value}</span>
                      <span className="chart-label">{chart.label}</span>
                    </div>
                  </div>
                )}
                
                <div className="chart-info">
                  <div className="trending-row">
                    <span className="trending-text">{chart.trend}</span>
                    <span className="trending-icon">{chart.trendUp ? '↗' : '↘'}</span>
                  </div>
                  <p className="chart-description">
                    {chart.description}
                  </p>
                </div>
              </div>

              {/* AI Actions */}
              <div className="ai-actions">
                <button className="icon-btn">
                  <Copy size={16} />
                </button>
                <button className="icon-btn">
                  <ThumbsUp size={16} />
                </button>
                <button className="icon-btn">
                  <ThumbsDown size={16} />
                </button>
                <button className="icon-btn">
                  <RefreshCw size={16} />
                </button>
                <button className="icon-btn">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            <div className="chat-input-area">
              <button className="add-btn">
                <Plus size={16} />
              </button>
              <div className="chat-input-wrapper">
                <Bot size={20} className="input-bot-icon" />
                <input
                  type="text"
                  placeholder="Ask about a competitor..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="chat-input"
                />
                <button className="send-btn">
                  <ArrowUp size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="chat-sidebar">
          <section className="sidebar-panel">
            <h2 className="panel-title">Summary</h2>
            <div className="panel-content" />
          </section>

          <section className="sidebar-panel">
            <h2 className="panel-title">Artifacts</h2>
            <div className="panel-content" />
          </section>

          <section className="sidebar-panel">
            <h2 className="panel-title">Data</h2>
            <div className="panel-content" />
          </section>
        </div>
      </div>
    </div>
  )
}

