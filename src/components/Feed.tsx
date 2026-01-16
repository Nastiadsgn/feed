import { useState } from 'react'
import { ArrowUp, MessageSquare, Heart, MoreHorizontal } from 'lucide-react'
import './Feed.css'

interface FeedProps {
  activeFilters: string[]
  onFilterChange: (filters: string[]) => void
  onCardClick?: (itemId: string) => void
}

interface FeedItem {
  id: string
  title: string
  timestamp: string
  description: string
  comments: number
  likes: number
  type: string
}

const filters = [
  { id: 'all', label: 'All chats' },
  { id: 'metrics', label: 'Metrics' },
  { id: 'kpis', label: 'KPIs' },
  { id: 'reports', label: 'Reports' },
  { id: 'dashboards', label: 'Dashboards' },
  { id: 'insights', label: 'Insights' },
]

const feedData: FeedItem[] = [
  {
    id: '1',
    title: 'Market Analysis',
    timestamp: '20h',
    description: 'Identification of key market trends and customer preferences based on recent data',
    comments: 30,
    likes: 5,
    type: 'metrics',
  },
  {
    id: '2',
    title: 'Competitor Insights',
    timestamp: '12h',
    description: 'Analysis of competitor pricing strategies and market positioning',
    comments: 25,
    likes: 13,
    type: 'insights',
  },
  {
    id: '3',
    title: 'Customer Segmentation',
    timestamp: '18h',
    description: 'Detailed segmentation of customer base to tailor marketing efforts',
    comments: 18,
    likes: 7,
    type: 'reports',
  },
  {
    id: '4',
    title: 'Sales Forecasting',
    timestamp: '24h',
    description: 'Projected sales growth based on historical data and market indicators',
    comments: 20,
    likes: 2,
    type: 'kpis',
  },
  {
    id: '5',
    title: 'Performance Metrics',
    timestamp: '10h',
    description: 'Evaluation of key performance indicators to measure success',
    comments: 22,
    likes: 4,
    type: 'metrics',
  },
  {
    id: '6',
    title: 'Data Visualization',
    timestamp: '14h',
    description: 'Creation of interactive dashboards for real-time data interpretation',
    comments: 28,
    likes: 2,
    type: 'dashboards',
  },
]

export default function Feed({ activeFilters, onFilterChange, onCardClick }: FeedProps) {
  const [newChatText, setNewChatText] = useState('')
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set())

  const handleFilterClick = (filterId: string) => {
    if (filterId === 'all') {
      // Clicking "All" resets to only "all"
      onFilterChange(['all'])
    } else {
      // Remove "all" if it's active, then toggle the clicked filter
      const withoutAll = activeFilters.filter(f => f !== 'all')
      
      if (withoutAll.includes(filterId)) {
        // Remove the filter if already selected
        const newFilters = withoutAll.filter(f => f !== filterId)
        // If no filters left, default to "all"
        onFilterChange(newFilters.length > 0 ? newFilters : ['all'])
      } else {
        // Add the filter
        onFilterChange([...withoutAll, filterId])
      }
    }
  }

  const filteredFeed = activeFilters.includes('all')
    ? feedData 
    : feedData.filter(item => activeFilters.includes(item.type))

  const handleLike = (itemId: string) => {
    setLikedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  return (
    <div className="feed-container">
      <div className="filter-tabs">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`filter-tab ${activeFilters.includes(filter.id) ? 'active' : ''}`}
            data-filter={filter.id}
            onClick={() => handleFilterClick(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="thread">
        <div className="new-chat">
          <div className="new-chat-content">
            <input
              type="text"
              placeholder="Start new chat..."
              value={newChatText}
              onChange={(e) => setNewChatText(e.target.value)}
              className="new-chat-input"
            />
          </div>
          <button className="submit-btn" disabled={!newChatText.trim()}>
            <ArrowUp size={16} />
          </button>
        </div>

        {filteredFeed.map((item) => (
          <div 
            key={item.id} 
            className="feed-item"
            onClick={() => onCardClick?.(item.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="chat-avatar" data-type={item.type}>
              {item.title.charAt(0)}
            </div>
            <div className="feed-item-content">
              <div className="feed-item-header">
                <div className="feed-item-title-row">
                  <h3 className="feed-item-title">{item.title}</h3>
                  <span className="feed-item-time">{item.timestamp}</span>
                </div>
                <button className="more-btn">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              <div className="feed-item-body">
                <p className="feed-item-description">{item.description}</p>
                <div className="feed-item-actions">
                  <button className="action-btn">
                    <MessageSquare size={16} />
                    <span>{item.comments}</span>
                  </button>
                  <button 
                    className={`action-btn ${likedItems.has(item.id) ? 'liked' : ''}`}
                    onClick={() => handleLike(item.id)}
                  >
                    <Heart size={16} fill={likedItems.has(item.id) ? 'currentColor' : 'none'} />
                    <span>{item.likes + (likedItems.has(item.id) ? 1 : 0)}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

