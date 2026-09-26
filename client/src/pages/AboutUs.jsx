import '../styles/AboutUs.css'
export function AboutUs() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <svg className="hero-lines" viewBox="0 0 1000 300" preserveAspectRatio="none">
          <path d="M -50 60 Q 200 -20 450 60 T 950 40" />
          <path d="M 550 260 Q 750 340 1050 250" />
        </svg>

        <p className="eyebrow eyebrow-light">Our Story, Thoughtfully Told</p>
        <h1 className="about-title">About&nbsp;<span className="about-brand">Velora</span></h1>
        <p className="hero-sub">
          Curating beautiful things for considered living, one lasting piece at a time.
        </p>
      </section>

      <section className="about-story">
        <p className="eyebrow">A Quieter Kind of Luxury</p>
        <h2>Our Story</h2>
        <div className="divider" />
        <p>
          Velora began with a simple belief: the things we welcome into our homes
          should feel both beautiful and meaningful. We bring together enduring
          pieces from thoughtful makers, helping you create a life that feels
          warm, personal, and entirely your own.
        </p>
      </section>

      <section className="about-values">
        <p className="eyebrow">What Guides Us</p>
        <h2>The Values We Hold</h2>
        <div className="divider" />

        <div className="values-grid">
          <div className="value-card">
            <span className="value-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M20 4c-4 0-8 2-10 6-1.5 3-1.5 6-1.5 6s3 0 6-1.5c4-2 6-6 6-10Z" />
                <path d="M4 20c2-4 5-6 8-8" />
              </svg>
            </span>
            <h3>Made with intention</h3>
            <p>Every piece is thoughtfully chosen for its beauty, purpose, and place in your everyday life.</p>
          </div>

          <div className="value-card">
            <span className="value-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9-6.3 3.9 1.7-7-5.4-4.7 7.1-.6z" />
              </svg>
            </span>
            <h3>Enduring quality</h3>
            <p>We favor honest materials and timeless details designed to be loved well beyond the season.</p>
          </div>

          <div className="value-card">
            <span className="value-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 21s-7-4.4-9.5-9C.8 8.4 2.6 5 6 5c2 0 3.5 1.2 4 2.4C10.5 6.2 12 5 14 5c3.4 0 5.2 3.4 3.5 7-2.5 4.6-9.5 9-9.5 9Z" />
              </svg>
            </span>
            <h3>Warmly personal</h3>
            <p>From discovery to delivery, we make every interaction feel considered, easy, and genuinely human.</p>
          </div>

          <div className="value-card">
            <span className="value-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 20c8-1 12-6 14-14-8 1-13 5-14 14Z" />
                <path d="M9 15c2-3 5-6 9-9" />
              </svg>
            </span>
            <h3>Conscious choices</h3>
            <p>We partner with makers who share our care for people, craft, and a gentler way forward.</p>
          </div>
        </div>

        <div className="about-cta">
          <div>
            <p className="eyebrow">Something Special Awaits</p>
            <h2>Find a piece to make your own.</h2>
          </div>
          <a href="/" className="about-btn">
            Explore the collection <span className="arrow">→</span>
          </a>
        </div>
      </section>

      
    </div>
  );
}

export default AboutUs;