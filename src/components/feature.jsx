import React from 'react';
import './Features.css';

const features = [
  {
    icon: '◎',
    title: 'Visual Knowledge Graph',
    body: 'See your interests rendered as an interactive node map. Zoom, pan, and explore the shape of your own curiosity in real time.',
  },
  {
    icon: '⟡',
    title: 'AI-Powered Connections',
    body: 'Weave\'s engine finds non-obvious links between your topics — surfacing ideas you would never have searched for yourself.',
  },
  {
    icon: '◈',
    title: 'Personal Feed, Not Algorithm',
    body: 'Your feed is generated from your map, not from engagement bait. Every suggestion traces back to something you actually care about.',
  },
  {
    icon: '◷',
    title: 'Time Capsule Entries',
    body: 'Log what you\'re curious about today. Come back in a year and see how your thinking has evolved — the map remembers everything.',
  },
  {
    icon: '⬡',
    title: 'Collaborative Maps',
    body: 'Merge your knowledge graph with a friend or colleague. Find where your curiosities overlap and explore the intersection together.',
  },
  {
    icon: '◌',
    title: 'Distraction-Free Reading',
    body: 'Every article and resource opens in a clean, minimal reader. No ads, no related clickbait. Just the content and your notes.',
  },
];

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="features__header">
        <p className="features__label">— Features</p>
        <h2 className="features__title">
          Everything your<br />curiosity needs.
        </h2>
      </div>

      <div className="features__grid">
        {features.map((f) => (
          <div className="features__card" key={f.title}>
            <span className="features__icon">{f.icon}</span>
            <h3 className="features__card-title">{f.title}</h3>
            <p className="features__card-text">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}