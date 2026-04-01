import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { ReactFlow, Controls, Background, useReactFlow, ReactFlowProvider, Handle, Position } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// ─── PALETTE ─────────────────────────────────────────────────────────────────
const C = {
  bg: "#f0ece3",
  ink: "#1c1917",
  inkFaint: "rgba(28,25,23,0.18)",
  inkMid: "rgba(28,25,23,0.45)",
  inkStrong: "rgba(28,25,23,0.85)",
  white: "#faf8f4",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const NODES_DATA = [
  {
    id: "gaming", label: "gaming",
    popup: {
      fact: "Gaming generates more revenue than film and music combined.",
      links: [
        { label: "History of gaming", url: "https://youtube.com/results?search_query=history+of+gaming", type: "video" },
        { label: "Gaming & the brain", url: "https://scientificamerican.com", type: "article" },
      ],
      action: "Play one game you've never tried — 20 minutes, right now.",
    },
    children: [
      {
        id: "game-design", label: "game design", type: "rabbit",
        popup: {
          fact: "The first video game was built on an oscilloscope in 1958.",
          links: [{ label: "Game design basics", url: "https://youtube.com/results?search_query=game+design+basics", type: "video" }],
          action: "Sketch the core loop of your dream game on paper.",
        },
      },
      {
        id: "speedrunning", label: "speedrunning", type: "rabbit",
        popup: {
          fact: "Super Mario Bros world record is under 5 minutes via frame-perfect inputs.",
          links: [{ label: "How speedrunning works", url: "https://youtube.com/results?search_query=speedrunning", type: "video" }],
          action: "Try to beat a level in your favourite game as fast as possible.",
        },
        children: [
          {
            id: "glitch-hunting", label: "glitch hunting", type: "rabbit",
            popup: {
              fact: "Some glitches take years of collaborative community effort and code analysis to find.",
              links: [{ label: "History of the barrier skip", url: "https://youtube.com/results?search_query=famous+speedrun+glitches", type: "video" }],
              action: "Watch a breakdown of a famous speedrun glitch to see how they break the math of the game.",
            }
          },
          {
            id: "routing", label: "routing", type: "rabbit",
            popup: {
              fact: "Speedrun routes are basically complex 'traveling salesman' math optimization problems.",
              links: [{ label: "How speedrunners map games", url: "https://youtube.com/results?search_query=speedrun+routing", type: "video" }],
              action: "Try to map the absolute fastest, most efficient physical path through your morning routine.",
            }
          }
        ]
      },
      {
        id: "tabletop", label: "tabletop RPGs", type: "rabbit",
        popup: {
          fact: "D&D has over 50 million players worldwide — it's the fastest growing hobby in the US.",
          links: [{ label: "D&D for beginners", url: "https://youtube.com/results?search_query=dnd+for+beginners", type: "video" }],
          action: "Read the free D&D basic rules for 15 minutes. Pick a character class.",
        },
      },
    ],
  },
  {
    id: "writing", label: "writing",
    popup: {
      fact: "Writing by hand activates more brain regions than typing — including memory and creativity.",
      links: [
        { label: "How great writers write", url: "https://youtube.com/results?search_query=how+great+writers+write", type: "video" },
        { label: "Science of expressive writing", url: "https://psychologytoday.com", type: "article" },
      ],
      action: "Write 10 min without stopping. Start: 'The thing I never say out loud is...'",
    },
    children: [
      {
        id: "worldbuilding", label: "worldbuilding", type: "rabbit",
        popup: {
          fact: "Tolkien built full Elvish grammar rules before writing a single story.",
          links: [{ label: "How to worldbuild", url: "https://youtube.com/results?search_query=worldbuilding+tips", type: "video" }],
          action: "Draw a map of a fictional place. Name 3 locations. Give one a secret.",
        },
        children: [
          {
            id: "conlangs", label: "constructed languages", type: "rabbit",
            popup: {
              fact: "Klingon is a fully functional language with its own institute and translated works of Shakespeare.",
              links: [{ label: "Intro to Conlangs", url: "https://youtube.com/results?search_query=artifexian+conlang", type: "video" }],
              action: "Invent 5 words for your own language and decide on their phonetic rules.",
            }
          }
        ]
      },
      {
        id: "flash-fiction", label: "flash fiction", type: "rabbit",
        popup: {
          fact: "Hemingway once wrote a complete story in just 6 words: 'For sale: baby shoes, never worn.'",
          links: [{ label: "How to write flash fiction", url: "https://youtube.com/results?search_query=flash+fiction+writing", type: "video" }],
          action: "Write a complete story in exactly 50 words. No more, no less.",
        },
      },
    ],
  },
  {
    id: "fitness", label: "fitness",
    popup: {
      fact: "11 minutes of exercise daily significantly reduces risk of heart disease.",
      links: [
        { label: "Minimum effective dose", url: "https://youtube.com/results?search_query=minimum+effective+dose+exercise", type: "video" },
        { label: "Exercise and your brain", url: "https://hubermanlab.com", type: "article" },
      ],
      action: "15-min walk right now — no phone, no podcast. Just notice things.",
    },
    children: [
      {
        id: "calisthenics", label: "calisthenics", type: "rabbit",
        popup: {
          fact: "Olympic gymnasts are pound-for-pound among the strongest athletes on earth.",
          links: [{ label: "Calisthenics from zero", url: "https://youtube.com/results?search_query=calisthenics+beginners", type: "video" }],
          action: "10 pushups, 10 squats, 30s plank — three rounds. Right now.",
        },
      },
      {
        id: "breath-work", label: "breathwork", type: "rabbit",
        popup: {
          fact: "Controlled breathing can lower heart rate by 20 BPM in under 2 minutes.",
          links: [{ label: "Box breathing technique", url: "https://youtube.com/results?search_query=box+breathing", type: "video" }],
          action: "Try box breathing: 4s in, 4s hold, 4s out, 4s hold. Do 8 rounds.",
        },
      },
    ],
  },
];

// Intersection nodes
const INTERSECTIONS = [
  {
    id: "flow-states", label: "flow states", type: "intersection",
    parents: ["gaming", "fitness"],
    popup: {
      fact: "The 'zone' in gaming and 'flow' in athletics are the exact same brain state — same chemistry.",
      links: [{ label: "Flow state science", url: "https://youtube.com/results?search_query=flow+state+science", type: "video" }],
      action: "Next workout: put on a gaming soundtrack. Notice if your focus changes.",
    },
  },
  {
    id: "perf-journaling", label: "performance journaling", type: "intersection",
    parents: ["writing", "fitness"],
    popup: {
      fact: "Athletes who journal training improve 20% faster than those who don't.",
      links: [{ label: "How pro athletes journal", url: "https://youtube.com/results?search_query=athlete+journaling", type: "video" }],
      action: "Write 5 minutes: what did your body feel like in your last workout?",
    },
  },
];

// ─── LAYOUT ───────────────────────────────────────────────────────────────────
function polar(cx, cy, r, deg) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function buildGraph() {
  const nodes = [], edges = [];
  const cx = 0, cy = 0;
  const mainCount = NODES_DATA.length;

  // Helper for aesthetic randomness
  const jitter = (amount) => (Math.random() - 0.5) * amount;

  // Central node
  const centralSize = 72;
  nodes.push({ id: "you", type: "centralNode", position: { x: cx - centralSize/2, y: cy - centralSize/2 }, data: { size: centralSize, textOffset: { x: jitter(6), y: jitter(6) } } });

  // Main interest positions
  const mainPositions = {};

  NODES_DATA.forEach((n, i) => {
    // Increased jitter for more scattered placement
    const angle = (360 / mainCount) * i - 90 + jitter(45);
    const distance = 280 + jitter(90);
    const pos = polar(cx, cy, distance, angle);
    mainPositions[n.id] = pos;

    const size = 80 + Math.random() * 35;

    nodes.push({ id: n.id, type: "interestNode", position: { x: pos.x - size/2, y: pos.y - size/2 }, data: { ...n, size, textOffset: { x: jitter(10), y: jitter(10) } } });
    
    // type: "straight" makes the connecting lines direct
    edges.push({ id: `e-you-${n.id}`, source: "you", target: n.id, type: "straight", style: { stroke: C.ink, strokeWidth: 0.8, opacity: 0.3 } });

    // Children (Level 2)
    (n.children || []).forEach((c, j) => {
      const spread = angle + (j - (n.children.length - 1) / 2) * 65 + jitter(35);
      const childDist = 180 + jitter(70);
      const cp = polar(pos.x, pos.y, childDist, spread);
      
      const childSize = 55 + Math.random() * 30;

      nodes.push({ id: c.id, type: "childNode", position: { x: cp.x - childSize/2, y: cp.y - childSize/2 }, data: { ...c, size: childSize, textOffset: { x: jitter(8), y: jitter(8) } } });
      edges.push({ id: `e-${n.id}-${c.id}`, source: n.id, target: c.id, type: "straight", style: { stroke: C.ink, strokeWidth: 0.7, opacity: 0.22 } });

      // Grandchildren (Level 3 - New Depth)
      (c.children || []).forEach((gc, k) => {
        const gcSpread = spread + (k - (c.children.length - 1) / 2) * 45 + jitter(40);
        const gcDist = 140 + jitter(40);
        const gcp = polar(cp.x, cp.y, gcDist, gcSpread);
        
        const gcSize = 45 + Math.random() * 20;

        nodes.push({ id: gc.id, type: "childNode", position: { x: gcp.x - gcSize/2, y: gcp.y - gcSize/2 }, data: { ...gc, size: gcSize, textOffset: { x: jitter(6), y: jitter(6) } } });
        edges.push({ id: `e-${c.id}-${gc.id}`, source: c.id, target: gc.id, type: "straight", style: { stroke: C.ink, strokeWidth: 0.5, opacity: 0.18, strokeDasharray: "2,2" } });
      });
    });
  });

  // Intersection nodes
  INTERSECTIONS.forEach((ix) => {
    const parentPositions = ix.parents.map(pid => mainPositions[pid]);
    const avgX = parentPositions.reduce((s, p) => s + p.x, 0) / parentPositions.length;
    const avgY = parentPositions.reduce((s, p) => s + p.y, 0) / parentPositions.length;
    
    // Push outward with heavy jitter
    const dx = avgX - cx, dy = avgY - cy;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const pushX = avgX + (dx / len) * (50 + jitter(40)) + jitter(50);
    const pushY = avgY + (dy / len) * (50 + jitter(40)) + jitter(50);

    const ixSize = 65 + Math.random() * 25;

    nodes.push({ id: ix.id, type: "intersectionNode", position: { x: pushX - ixSize/2, y: pushY - ixSize/2 }, data: { ...ix, size: ixSize, textOffset: { x: jitter(8), y: jitter(8) } } });
    ix.parents.forEach(pid => {
      edges.push({
        id: `e-${pid}-${ix.id}`,
        source: pid, target: ix.id,
        type: "straight", // straight lines here too
        style: { stroke: C.ink, strokeWidth: 0.8, opacity: 0.35, strokeDasharray: "3,4" },
      });
    });
  });

  return { nodes, edges };
}

const { nodes: INIT_NODES, edges: INIT_EDGES } = buildGraph();

// ─── NODE POPUP ─────────────────────────────────────────
function NodePopup({ node, screenPos, onClose }) {
  if (!node?.popup) return null;
  const { popup } = node;
  const isX = node.type === "intersection";
  const ref = useRef(null);

  const [pos, setPos] = useState({ x: screenPos.x + 18, y: screenPos.y - 20 });
  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    let x = screenPos.x + 18;
    let y = screenPos.y - 20;
    if (x + rect.width > window.innerWidth - 16) x = screenPos.x - rect.width - 18;
    if (y + rect.height > window.innerHeight - 16) y = window.innerHeight - rect.height - 16;
    if (y < 16) y = 16;
    setPos({ x, y });
  }, [screenPos]);

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 998 }} />
      <div ref={ref} style={{
        position: "fixed", left: pos.x, top: pos.y, zIndex: 999,
        width: 300, background: C.white, border: `1px solid ${C.inkFaint}`,
        borderRadius: 2, padding: "22px 22px 20px",
        fontFamily: "'Instrument Serif', Georgia, serif",
        boxShadow: "0 4px 32px rgba(28,25,23,0.1), 0 1px 4px rgba(28,25,23,0.06)",
        animation: "nodePopIn 0.18s cubic-bezier(0.22,1,0.36,1)",
      }}>
        <div style={{
          position: "absolute", left: -5, top: 22,
          width: 8, height: 8, borderRadius: "50%",
          background: C.white, border: `1.5px solid ${C.inkMid}`,
        }} />

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            {isX && <div style={{ fontSize: 8, letterSpacing: 2, color: C.inkMid, textTransform: "uppercase", marginBottom: 4, fontFamily: "'DM Mono', monospace" }}>intersection</div>}
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 400, color: C.ink, letterSpacing: -0.3, lineHeight: 1.2 }}>{node.label}</h3>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.inkMid, fontSize: 16, padding: 0, lineHeight: 1, marginTop: 2 }}>✕</button>
        </div>

        <p style={{ margin: "0 0 16px", fontSize: 12, color: C.inkMid, lineHeight: 1.7, fontFamily: "'DM Mono', monospace", fontStyle: "normal" }}>
          {popup.fact}
        </p>

        <div style={{ marginBottom: 16 }}>
          {popup.links.map(link => (
            <a key={link.url} href={link.url} target="_blank" rel="noreferrer" style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "8px 0", borderBottom: `1px solid ${C.inkFaint}`,
              textDecoration: "none", color: C.ink, fontFamily: "'DM Mono', monospace",
              fontSize: 11, transition: "opacity 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.45"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              <span>{link.label}</span>
              <span style={{ color: C.inkMid, fontSize: 9, letterSpacing: 1 }}>{link.type === "video" ? "▶" : "↗"}</span>
            </a>
          ))}
        </div>

        <div style={{ paddingTop: 4 }}>
          <div style={{ fontSize: 8, letterSpacing: 2, color: C.inkMid, textTransform: "uppercase", marginBottom: 8, fontFamily: "'DM Mono', monospace" }}>do this now</div>
          <p style={{ margin: 0, fontSize: 13, color: C.ink, lineHeight: 1.6, fontStyle: "italic" }}>{popup.action}</p>
        </div>
      </div>
    </>
  );
}

// ─── HAMBURGER MENU ───────────────────────────────────────────────────────────
function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const items = [
    { label: "Profile", icon: "○" },
    { label: "Share Map", icon: "↗" },
    { label: "Curiosity Cabinet", icon: "◫" },
  ];

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          background: "none", border: `1px solid ${C.inkFaint}`, cursor: "pointer",
          width: 36, height: 36, borderRadius: 2,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
          padding: 0, transition: "border-color 0.2s, background 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = C.ink; e.currentTarget.querySelectorAll("span").forEach(s => s.style.background = C.white); }}
        onMouseLeave={e => { if (!open) { e.currentTarget.style.background = "none"; e.currentTarget.querySelectorAll("span").forEach(s => s.style.background = C.ink); } }}
      >
        {[0, 1, 2].map(i => <span key={i} style={{ display: "block", width: 14, height: 1, background: C.ink, transition: "background 0.2s" }} />)}
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", right: 0,
          background: C.white, border: `1px solid ${C.inkFaint}`,
          borderRadius: 2, width: 180, overflow: "hidden",
          boxShadow: "0 8px 32px rgba(28,25,23,0.1)",
          animation: "menuDrop 0.15s cubic-bezier(0.22,1,0.36,1)",
          fontFamily: "'DM Mono', monospace",
          zIndex: 1100,
        }}>
          {items.map((item, i) => (
            <button key={item.label} onClick={() => setOpen(false)} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              width: "100%", padding: "13px 16px", background: "none", border: "none",
              borderBottom: i < items.length - 1 ? `1px solid ${C.inkFaint}` : "none",
              cursor: "pointer", color: C.ink, fontSize: 12, letterSpacing: 0.3,
              textAlign: "left", transition: "background 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(28,25,23,0.05)"}
              onMouseLeave={e => e.currentTarget.style.background = "none"}
            >
              <span>{item.label}</span>
              <span style={{ color: C.inkMid, fontSize: 13 }}>{item.icon}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── CUSTOM NODE RENDERERS ────────────────────────────────────────────────────
const handleStyle = {
  position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
  opacity: 0, pointerEvents: 'none'
};

const nodeStyle = {
  borderRadius: "50%",
  display: "flex", alignItems: "center", justifyContent: "center",
  cursor: "pointer", userSelect: "none",
  fontFamily: "'DM Mono', monospace",
  transition: "all 0.22s ease",
  position: "relative"
};

function CentralNode({ data }) {
  return (
    <div style={{ ...nodeStyle, width: data.size, height: data.size, background: C.ink, cursor: "default" }}>
      <Handle type="target" position={Position.Top} style={handleStyle} />
      <Handle type="source" position={Position.Bottom} style={handleStyle} />
      <span style={{ 
        fontSize: 10, color: C.bg, letterSpacing: 2, textTransform: "lowercase", zIndex: 1,
        transform: `translate(${data.textOffset?.x || 0}px, ${data.textOffset?.y || 0}px)` 
      }}>you</span>
    </div>
  );
}

function InterestNode({ data }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ ...nodeStyle, width: data.size, height: data.size, background: hov ? C.ink : C.bg, border: `1.5px solid ${C.ink}` }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <Handle type="target" position={Position.Top} style={handleStyle} />
      <Handle type="source" position={Position.Bottom} style={handleStyle} />
      <span style={{ 
        fontSize: 9.5, color: hov ? C.bg : C.ink, fontWeight: 500, textAlign: "center", padding: "0 10px", lineHeight: 1.4, letterSpacing: 0.3, transition: "color 0.22s", zIndex: 1,
        transform: `translate(${data.textOffset?.x || 0}px, ${data.textOffset?.y || 0}px)` 
      }}>
        {data.label}
      </span>
    </div>
  );
}

function ChildNode({ data }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ ...nodeStyle, width: data.size, height: data.size, background: hov ? C.ink : C.bg, border: `1px solid rgba(28,25,23,0.55)`, opacity: hov ? 1 : 0.8 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <Handle type="target" position={Position.Top} style={handleStyle} />
      <Handle type="source" position={Position.Bottom} style={handleStyle} />
      <span style={{ 
        fontSize: 8, color: hov ? C.bg : C.ink, textAlign: "center", padding: "0 6px", lineHeight: 1.4, letterSpacing: 0.2, transition: "color 0.22s", zIndex: 1,
        transform: `translate(${data.textOffset?.x || 0}px, ${data.textOffset?.y || 0}px)` 
      }}>
        {data.label}
      </span>
    </div>
  );
}

function IntersectionNode({ data }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ ...nodeStyle, width: data.size, height: data.size, background: hov ? C.ink : C.bg, border: `1.5px dashed ${C.ink}` }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <Handle type="target" position={Position.Top} style={handleStyle} />
      <Handle type="source" position={Position.Bottom} style={handleStyle} />
      <span style={{ 
        fontSize: 8, color: hov ? C.bg : C.ink, textAlign: "center", padding: "0 7px", lineHeight: 1.4, letterSpacing: 0.2, transition: "color 0.22s", zIndex: 1,
        transform: `translate(${data.textOffset?.x || 0}px, ${data.textOffset?.y || 0}px)` 
      }}>
        {data.label}
      </span>
    </div>
  );
}

// ─── INNER APP ─────────────────────────────────────
function MapInner() {
  const [selected, setSelected] = useState(null);
  const [screenPos, setScreenPos] = useState({ x: 0, y: 0 });
  const { getViewport } = useReactFlow();

  const nodeTypes = useMemo(() => ({
    centralNode: CentralNode,
    interestNode: ({ data }) => <InterestNode data={data} />,
    childNode: ({ data }) => <ChildNode data={data} />,
    intersectionNode: ({ data }) => <IntersectionNode data={data} />,
  }), []);

  const onNodeClick = useCallback((evt, node) => {
    if (!node.data?.popup) return;
    setScreenPos({ x: evt.clientX, y: evt.clientY });
    setSelected(selected?.id === node.id ? null : node.data);
  }, [selected]);

  return (
    <div style={{ width: "100vw", height: "100vh", background: C.bg, position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 100, padding: "18px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between", pointerEvents: "none",
      }}>
        <div style={{ pointerEvents: "none" }}>
          <div style={{ fontSize: 25, fontWeight: 400, color: C.ink, fontFamily: "'Instrument Serif', Georgia, serif", letterSpacing: -0.2 }}>Weave</div>
          <div style={{ fontSize: 8, color: C.inkMid, letterSpacing: 2, textTransform: "uppercase", marginTop: 1, fontFamily: "'DM Mono', monospace" }}>curiosity map</div>
        </div>
        <div style={{ pointerEvents: "all" }}><HamburgerMenu /></div>
      </div>

      <div style={{
        position: "absolute", left: 18, top: "50%", transform: "translateY(-50%) rotate(-90deg)",
        fontSize: 7, letterSpacing: 3, color: C.inkFaint, textTransform: "uppercase",
        fontFamily: "'DM Mono', monospace", pointerEvents: "none", zIndex: 5, whiteSpace: "nowrap",
      }}>curiosity map — 2025</div>
      <div style={{
        position: "absolute", right: 18, top: "50%", transform: "translateY(-50%) rotate(90deg)",
        fontSize: 7, letterSpacing: 3, color: C.inkFaint, textTransform: "uppercase",
        fontFamily: "'DM Mono', monospace", pointerEvents: "none", zIndex: 5, whiteSpace: "nowrap",
      }}>knowledge network</div>

      <ReactFlow
        nodes={INIT_NODES}
        edges={INIT_EDGES}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{ padding: 0.18 }}
        minZoom={0.25}
        maxZoom={2.5}
        proOptions={{ hideAttribution: true }}
        style={{ background: C.bg }}
      >
        <Background color={C.inkFaint} gap={38} size={1} />
        <Controls position="bottom-right" showInteractive={false} style={{ boxShadow: "none" }} />
      </ReactFlow>

      <div style={{
        position: "absolute", bottom: 24, left: 24, zIndex: 10,
        fontFamily: "'DM Mono', monospace", display: "flex", flexDirection: "column", gap: 7,
      }}>
        {[
          { label: "interest", dashed: false, size: 11 },
          { label: "rabbit hole", dashed: false, size: 9, faint: true },
          { label: "intersection", dashed: true, size: 10 },
        ].map(({ label, dashed, size, faint }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: size, height: size, borderRadius: "50%", background: "transparent", border: dashed ? `1px dashed ${C.inkMid}` : `1px solid ${C.inkMid}`, opacity: faint ? 0.45 : 0.7, flexShrink: 0 }} />
            <span style={{ fontSize: 9, color: C.inkMid, letterSpacing: 0.5 }}>{label}</span>
          </div>
        ))}
      </div>

      {selected && <NodePopup node={selected} screenPos={screenPos} onClose={() => setSelected(null)} />}
    </div>
  );
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────
export default function CuriosityMap() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');
        @keyframes nodePopIn { from { opacity: 0; transform: scale(0.94) translateY(6px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes menuDrop { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; height: 100%; overflow: hidden; }
        .react-flow__handle, .xyflow__handle { opacity: 0 !important; pointer-events: none !important; }
        .react-flow__attribution, .xyflow__attribution { display: none !important; }
        .react-flow__controls, .xyflow__controls { background: ${C.white} !important; border: 1px solid ${C.inkFaint} !important; border-radius: 2px !important; box-shadow: none !important; overflow: hidden; }
        .react-flow__controls-button, .xyflow__controls-button { background: transparent !important; border-bottom: 1px solid ${C.inkFaint} !important; fill: ${C.ink} !important; }
        .react-flow__controls-button:hover, .xyflow__controls-button:hover { background: rgba(28,25,23,0.05) !important; }
      `}</style>
      <ReactFlowProvider>
        <MapInner />
      </ReactFlowProvider>
    </>
  );
}