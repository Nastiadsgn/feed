import { Search } from 'lucide-react'
import './Header.css'

interface HeaderProps {
  onLogoClick?: () => void
}

export default function Header({ onLogoClick }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="company">
          <div className="company-icon" onClick={onLogoClick} style={{ cursor: onLogoClick ? 'pointer' : 'default' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.5 2.5H12.5C13 2.5 13.5 3 13.5 3.5V10.5C13.5 11 13 11.5 12.5 11.5H3.5C3 11.5 2.5 11 2.5 10.5V3.5C2.5 3 3 2.5 3.5 2.5Z" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 5H11" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M5 8H9" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="company-text">
            <span className="company-name">Company name</span>
            <span className="company-type">Business</span>
          </div>
        </div>
        <div className="search-bar">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
      </div>
      <div className="header-right">
        <div className="avatar">
          <span>A</span>
        </div>
      </div>
    </header>
  )
}

