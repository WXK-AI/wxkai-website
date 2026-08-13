const channels = [
  { number: '01', title: 'GenGuard', note: 'Local AI / browser privacy', href: '#genguard' },
  { number: '02', title: 'Langfuse Menubar', note: 'Native macOS / observability', href: '#langfuse' },
  { number: '03', title: 'Software Hardening', note: 'Audit / prove / patch', href: '#hardening' },
]

export default function Hero({ content }) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-heading">
      <div className="hero-signal" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="hero-identity">
        <p className="micro-label" data-hero-reveal>Identity / 00</p>
        <h1 id="hero-heading" data-hero-reveal><span>Wong</span><span>Xin Kai</span></h1>
        <p className="hero-intro" data-hero-reveal>{content.introduction}</p>
      </div>

      <dl className="identity-grid" data-hero-reveal>
        <div><dt>Loc</dt><dd>{content.location}</dd></div>
        <div><dt>Field</dt><dd>Cyber Security</dd></div>
        <div><dt>Mode</dt><dd>Build + investigate</dd></div>
        <div><dt>Scope</dt><dd>Browser to macOS</dd></div>
      </dl>

      <div className="patchbay" data-hero-reveal>
        <p className="micro-label">Selected channels / live</p>
        <div className="patchbay-list">
          {channels.map((channel) => (
            <a href={channel.href} key={channel.number}>
              <span>{channel.number}</span>
              <strong>{channel.title}</strong>
              <em>{channel.note}</em>
              <b aria-hidden="true">↘</b>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
