import { BookOpen } from 'lucide-react';
import './SiteHeader.css';

function SiteHeader() {
  return (
    <header className="site-header">
      <a className="site-header__brand" href="#top" aria-label="StudyFlow home">
        <span className="site-header__mark"><BookOpen size={20} strokeWidth={2.2} /></span>
        <span>Study<span className="site-header__brand-light">Flow</span></span>
      </a>
      <span className="site-header__note">Study Task &amp; Assignment Planner</span>
    </header>
  );
}

export default SiteHeader;