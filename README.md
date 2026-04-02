# Weave — Curiosity Map

> *Stop scrolling. Start exploring.*

Weave is a personal curiosity mapping tool that helps you rediscover who you are and what you love. Instead of endlessly consuming other people's content, Weave builds a living visual graph of your own interests — connecting the dots between them in ways you've never seen before.

---

## The Problem

There is a specific kind of emptiness that comes after closing Instagram. You opened it with no real intention, watched a few videos, saw someone's holiday, saw someone's body, saw someone's opinion — and now twenty minutes have passed and you feel vaguely worse than before. You didn't want any of that. But you didn't know what else to want.
 
That's the real problem. Not screen time. Not willpower. Not the algorithm, exactly.
 
The problem is that most people have quietly lost the thread back to their own curiosity.
 
Think about who you were at fourteen. You probably had things you were *into* — genuinely, embarrassingly into. You drew things, or built things, or read entire series of books, or spent hours figuring out how something worked. That version of you didn't need a platform to tell them what was interesting. They already knew.
 
Somewhere between then and now, that instinct got buried. Life got busier, the internet got louder, and the path of least resistance became letting something else decide what you look at. Scrolling isn't laziness — it's what happens when a person has lost access to their own sense of direction.
 
The consequences are more serious than they look. Psychologists have a name for it: *interest attrition* — the gradual narrowing of a person's active curiosity as passive consumption replaces active exploration. Studies on wellbeing consistently show that people who regularly engage in self-chosen, skill-building activities report significantly higher life satisfaction than those who don't — regardless of income, age, or circumstance. Curiosity, it turns out, isn't a luxury. It's load-bearing.
 
And yet every tool we have is pointed in the wrong direction. Search engines answer questions you already know to ask. Recommendation algorithms optimise for engagement, not growth. Note-taking apps are graveyards for thoughts you captured but never returned to. None of them ask the more interesting question: *given everything you are and everything you've ever cared about, what should you explore next?*
 
There's also something subtler going on. People don't just lose their interests — they lose the *connections between* their interests. A person who loves both jazz and mathematics has probably never been shown that there's an entire field of algorithmic composition sitting exactly at that intersection. Someone who games obsessively and also loves to write might never discover narrative design, which would let them do both at once. The cross-domain insight — the one that makes someone feel genuinely *seen* by a recommendation — almost never happens by accident. It requires someone, or something, that knows you well enough to hold two parts of you in mind at the same time.
 
That's the gap Weave is built to fill.

---

## What is Weave?

Weave generates a personal **knowledge graph** seeded from your interests and hobbies. Each node on the map is something you care about. Click any node and you get:

- A quick fact that reframes the topic
- A curated video and article to dive in
- One thing you can **do right now, in 15 minutes**

The map also finds **intersection nodes** — surprising connections *between* your interests that you'd never have discovered yourself. Into gaming *and* writing? There's a whole world of narrative design waiting for you.

---

## Features

- **Curiosity Graph** — an interactive, zoomable node graph built from your interests
- **Rabbit Hole Nodes** — deeper sub-topics branching from each interest
- **Intersection Nodes** — AI-discovered connections between two or more of your interests, connected to all parent nodes
- **15-Minute Action Cards** — every node has one thing you can do today, right now, for free
- **Node-attached Popups** — click any node for a minimal, open-typography popup with curated content
- **Curiosity Cabinet** — save your favourite nodes and actions for later
- **Share Your Map** — one link, read-only, shareable like a Spotify Wrapped for your curiosity
- **Socially adjacent** — see how many others share your intersection, no followers or likes

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) |
| Graph Rendering | [@xyflow/react](https://xyflow.com) |
| LLM (roadmap) | Groq + LLaMA 3 |
| Backend (roadmap) | FastAPI |
| Database (roadmap) | Supabase (Postgres) |
| Hosting (roadmap) | Vercel |

---

## How It Works

### Graph Layout

The graph is built programmatically using a polar coordinate layout:

- **Central node** — you, at the origin
- **Interest nodes** — placed in a ring around the center using equal angular spacing
- **Rabbit hole nodes** — branch outward from each interest at spread angles
- **Intersection nodes** — placed at the geometric centroid of their parent interests, with edges connecting to all parents

### Popup System

Clicking any node opens a minimal popup anchored near the click position. The popup auto-clamps to the viewport so it never goes offscreen. It contains:

1. A quick fact
2. Curated links (video + article)
3. A single 15-minute action

### Intersection Logic

Intersections are pre-computed connections between two or more interests. In the prototype these are hardcoded. In production, these will be generated by an LLM prompt that reasons across the user's full interest profile to find non-obvious cross-domain connections.

---

## Roadmap

### Near Term
- [ ] Onboarding flow with rich interest questions
- [ ] LLM-powered graph generation from user input (Groq + LLaMA 3)
- [ ] Dynamic node expansion on click
- [ ] Curiosity Cabinet (saved nodes)
- [ ] Mobile responsive layout

### Medium Term
- [ ] User accounts + persistent maps (Supabase)
- [ ] Share map as public read-only link
- [ ] Weekly curiosity nudge (cron + LLM)
- [ ] Mood-based graph filtering

### Long Term
- [ ] Collaborative maps — merge two people's curiosity graphs
- [ ] Anonymous global intersection graph across all users
- [ ] School and university integrations
- [ ] Mobile app

---

## Design Philosophy

Weave is intentionally **not a social media platform**. There are no feeds, no follower counts, no likes. The only social feature is an anonymous count of how many others share your intersection — just enough to make you feel seen, not enough to make you perform.

The visual language — cream background, thin lines, minimal circles, open typography — is designed to feel like a sketchbook or a journal, not a dashboard.

> *"It's not a recommendation engine. It's a map of who you are and who you could become."*


*Built with curiosity; from ours to yours*
