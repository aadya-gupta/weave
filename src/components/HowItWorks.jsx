import React, { useEffect, useRef } from 'react';
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

function AsciiBox() {
  const ref = useRef(null);
  const mouse = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chars = ['·', '•', '○', '◎', '∘', '+', '×', '◌', '⟡', '✦', '◈', '*', ':', '.'];
    const cols = 22;
    const rows = 18;

    // Fixed: Removed unused parameters (_, r) and (_, c)
    const grid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        char: chars[Math.floor(Math.random() * chars.length)],
        opacity: Math.random() * 0.3 + 0.05,
      }))
    );

    let frame;
    let tick = 0;

    const render = () => {
      tick++;
      const rect = el.getBoundingClientRect();
      const cellW = rect.width / cols;
      const cellH = rect.height / rows;
      const mx = mouse.current.x - rect.left;
      const my = mouse.current.y - rect.top;

      let html = '';
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = grid[r][c];
          const cx = c * cellW + cellW / 2;
          const cy = r * cellH + cellH / 2;
          const dist = Math.sqrt((cx - mx) ** 2 + (cy - my) ** 2);
          const influence = Math.max(0, 1 - dist / 90);

          if (tick % 70 === (r * cols + c) % 70) {
            cell.char = chars[Math.floor(Math.random() * chars.length)];
            cell.opacity = Math.random() * 0.3 + 0.05;
          }

          const finalOpacity = Math.min(cell.opacity + influence * 0.85, 1);
          const ch = influence > 0.45
            ? chars[Math.floor((tick * 0.5 + r + c) % chars.length)]
            : cell.char;

          html += `<span style="opacity:${finalOpacity.toFixed(2)}">${ch}</span>`;
        }
        html += '\n';
      }

      el.innerHTML = html;
      frame = requestAnimationFrame(render);
    };

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', onMove);
    render();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return <pre className="ascii-box" ref={ref} aria-hidden="true" />;
}

export default function HowItWorks() {
  return (
    <section className="hiw" id="how-it-works">

      <div className="hiw__top">
        <div className="hiw__header">
          <p className="hiw__label"></p>
          <h2 className="hiw__title">
            A system built for<br />wandering minds.
          </h2>
          <p className="hiw__desc">
            Weave is a curiosity mapping platform that turns scattered interests
            into a coherent, beautiful network of knowledge. No rigid curricula.
            No algorithmic rabbit holes. Just your mind, mapped.
          </p>
        </div>

        <div className="hiw__ascii-wrapper">
          <AsciiBox />
        </div>
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