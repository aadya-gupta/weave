import React from 'react';
import './HowItWorks.css';

const steps = [
  {
    num: '01',
    title: 'Map Your Interests',
    body: 'Tell Weave what you are curious about. Our engine seeds your personal knowledge graph with the right starting nodes — no setup required.',
  },
  {
    num: '02',
    title: 'Discover Connections',
    body: 'Watch as ideas link across disciplines. Weave surfaces unexpected bridges between concepts — the kind that spark genuine insight.',
  },
  {
    num: '03',
    title: 'Grow Your Network',
    body: 'Every article read, every question asked, every path explored strengthens your map. Your curiosity becomes a living, evolving structure.',
  },
  {
    num: '04',
    title: 'Share & Collaborate',
    body: 'Invite others into your map or explore theirs. Collective curiosity compounds. Great ideas rarely live in isolation.',
  },
];

export default function HowItWorks() {
  return (
    <section className="hiw" id="how-it-works">
      <div className="hiw__header">
        <p className="hiw__label">— How It Works</p>
        <h2 className="hiw__title">
          A system built for<br />wandering minds.
        </h2>
        <p className="hiw__desc">
          Weave is a curiosity mapping platform that turns scattered interests
          into a coherent, beautiful network of knowledge. No rigid curricula.
          No algorithmic rabbit holes. Just your mind, mapped.
        </p>
      </div>

      <div className="hiw__grid">
        {steps.map((s) => (
          <div className="hiw__card" key={s.num}>
            <span className="hiw__num">{s.num}</span>
            <div>
              <h3 className="hiw__card-title">{s.title}</h3>
              <p className="hiw__card-text">{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}