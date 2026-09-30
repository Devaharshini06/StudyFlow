import './WelcomeBanner.css';

function WelcomeBanner() {
  const today = new Date();

  return (
    <section className="welcome-banner" id="top">
      <div>
        <p className="eyebrow">YOUR STUDY DESK</p>
        <h1>Make room for <span>good work.</span></h1>
        <p className="welcome-banner__copy">Keep your next study session clear, focused, and doable.</p>
      </div>
      <div className="welcome-banner__date">
        <span className="welcome-banner__day">{new Intl.DateTimeFormat(undefined, { weekday: 'long' }).format(today)}</span>
        <span>{new Intl.DateTimeFormat(undefined, { month: 'long', day: 'numeric', year: 'numeric' }).format(today)}</span>
      </div>
    </section>
  );
}

export default WelcomeBanner;