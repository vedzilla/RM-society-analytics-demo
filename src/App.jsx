import React, { useState } from 'react'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

// ─────────────────────────────────────────────
// THEME — Light mode, dark sidebar
// ─────────────────────────────────────────────
const C = {
  // Page
  bg:          '#F4F4F5',
  surface:     '#FFFFFF',
  card:        '#FFFFFF',
  card2:       '#F9F9FA',
  border:      '#E4E4E7',
  borderStrong:'#D1D1D6',
  // Brand
  red:         '#E8000D',
  redDark:     '#B8000A',
  redLight:    'rgba(232,0,13,0.08)',
  redMid:      'rgba(232,0,13,0.15)',
  // Text
  text:        '#18181B',
  muted:       '#71717A',
  faint:       '#A1A1AA',
  // Sidebar (dark)
  sidebarBg:   '#111111',
  sidebarBorder:'#272727',
  sidebarText: '#FFFFFF',
  sidebarMuted:'#888888',
  // Status
  green:       '#16A34A',
  greenBg:     'rgba(22,163,74,0.10)',
  red2Bg:      'rgba(239,68,68,0.10)',
  red2:        '#EF4444',
  // Charts (warm palette — no blue or purple)
  orange:      '#F97316',
  amber:       '#D97706',
}

// Shadow utility
const shadow = (level = 'sm') => ({
  sm: '0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.05)',
  md: '0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)',
  lg: '0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)',
}[level])

// ─────────────────────────────────────────────
// DUMMY DATA
// ─────────────────────────────────────────────
const SOCIETY = {
  name: 'Manchester Marketing Society',
  handle: '@MancMarketing',
  uni: 'University of Manchester',
  members: 312,
  founded: 'Sep 2021',
  initials: 'MMS',
}

const EVENTS = [
  {
    id: 1,
    title: 'Brand Strategy Masterclass',
    date: '14 Feb 2025',
    location: 'Alan Turing Building, UoM',
    impressions: 4821, saves: 487, joinClicks: 294, attending: 218,
    prevImpressions: 3600, prevSaves: 390, prevJoinClicks: 241,
    dayByDay: [
      { day: 'Mon', impressions: 210 }, { day: 'Tue', impressions: 480 },
      { day: 'Wed', impressions: 920 }, { day: 'Thu', impressions: 1140 },
      { day: 'Fri', impressions: 870 }, { day: 'Sat', impressions: 640 },
      { day: 'Sun', impressions: 561 },
    ],
    courses: [
      { name: 'Business', value: 34 }, { name: 'Engineering', value: 18 },
      { name: 'Arts & Humanities', value: 21 }, { name: 'Science', value: 14 },
      { name: 'Other', value: 13 },
    ],
    unis: [{ name: 'UoM', value: 58 }, { name: 'MMU', value: 27 }, { name: 'Salford', value: 15 }],
    avgImpressions: 3840, avgSaves: 368, avgJoinClicks: 224,
  },
  {
    id: 2,
    title: 'Spring Social 2025',
    date: '28 Feb 2025',
    location: 'Gorilla, Manchester',
    impressions: 6102, saves: 631, joinClicks: 412, attending: 298,
    prevImpressions: 4821, prevSaves: 487, prevJoinClicks: 294,
    dayByDay: [
      { day: 'Mon', impressions: 340 }, { day: 'Tue', impressions: 710 },
      { day: 'Wed', impressions: 1320 }, { day: 'Thu', impressions: 1540 },
      { day: 'Fri', impressions: 1100 }, { day: 'Sat', impressions: 620 },
      { day: 'Sun', impressions: 472 },
    ],
    courses: [
      { name: 'Business', value: 29 }, { name: 'Engineering', value: 22 },
      { name: 'Arts & Humanities', value: 24 }, { name: 'Science', value: 12 },
      { name: 'Other', value: 13 },
    ],
    unis: [{ name: 'UoM', value: 52 }, { name: 'MMU', value: 32 }, { name: 'Salford', value: 16 }],
    avgImpressions: 3840, avgSaves: 368, avgJoinClicks: 224,
  },
  {
    id: 3,
    title: 'Digital Marketing Summit',
    date: '7 Mar 2025',
    location: 'Business School Auditorium',
    impressions: 5448, saves: 512, joinClicks: 331, attending: 244,
    prevImpressions: 6102, prevSaves: 631, prevJoinClicks: 412,
    dayByDay: [
      { day: 'Mon', impressions: 290 }, { day: 'Tue', impressions: 640 },
      { day: 'Wed', impressions: 1010 }, { day: 'Thu', impressions: 1240 },
      { day: 'Fri', impressions: 980 }, { day: 'Sat', impressions: 740 },
      { day: 'Sun', impressions: 548 },
    ],
    courses: [
      { name: 'Business', value: 38 }, { name: 'Engineering', value: 16 },
      { name: 'Arts & Humanities', value: 19 }, { name: 'Science', value: 17 },
      { name: 'Other', value: 10 },
    ],
    unis: [{ name: 'UoM', value: 61 }, { name: 'MMU', value: 24 }, { name: 'Salford', value: 15 }],
    avgImpressions: 3840, avgSaves: 368, avgJoinClicks: 224,
  },
  {
    id: 4,
    title: 'Careers in Marketing Panel',
    date: '21 Mar 2025',
    location: 'Ellen Wilkinson Building',
    impressions: 3920, saves: 344, joinClicks: 198, attending: 167,
    prevImpressions: 5448, prevSaves: 512, prevJoinClicks: 331,
    dayByDay: [
      { day: 'Mon', impressions: 180 }, { day: 'Tue', impressions: 420 },
      { day: 'Wed', impressions: 780 }, { day: 'Thu', impressions: 990 },
      { day: 'Fri', impressions: 760 }, { day: 'Sat', impressions: 490 },
      { day: 'Sun', impressions: 300 },
    ],
    courses: [
      { name: 'Business', value: 41 }, { name: 'Engineering', value: 13 },
      { name: 'Arts & Humanities', value: 20 }, { name: 'Science', value: 15 },
      { name: 'Other', value: 11 },
    ],
    unis: [{ name: 'UoM', value: 64 }, { name: 'MMU', value: 22 }, { name: 'Salford', value: 14 }],
    avgImpressions: 3840, avgSaves: 368, avgJoinClicks: 224,
  },
  {
    id: 5,
    title: 'Social Media Bootcamp',
    date: '4 Apr 2025',
    location: 'Manchester Central Library',
    impressions: 5184, saves: 506, joinClicks: 318, attending: 231,
    prevImpressions: 3920, prevSaves: 344, prevJoinClicks: 198,
    dayByDay: [
      { day: 'Mon', impressions: 270 }, { day: 'Tue', impressions: 590 },
      { day: 'Wed', impressions: 1080 }, { day: 'Thu', impressions: 1310 },
      { day: 'Fri', impressions: 970 }, { day: 'Sat', impressions: 620 },
      { day: 'Sun', impressions: 344 },
    ],
    courses: [
      { name: 'Business', value: 30 }, { name: 'Engineering', value: 20 },
      { name: 'Arts & Humanities', value: 26 }, { name: 'Science', value: 13 },
      { name: 'Other', value: 11 },
    ],
    unis: [{ name: 'UoM', value: 55 }, { name: 'MMU', value: 30 }, { name: 'Salford', value: 15 }],
    avgImpressions: 3840, avgSaves: 368, avgJoinClicks: 224,
  },
  {
    id: 6,
    title: 'Annual Marketing Gala',
    date: '25 Apr 2025',
    location: 'The Midland Hotel',
    impressions: 7340, saves: 782, joinClicks: 521, attending: 389,
    prevImpressions: 5184, prevSaves: 506, prevJoinClicks: 318,
    dayByDay: [
      { day: 'Mon', impressions: 420 }, { day: 'Tue', impressions: 910 },
      { day: 'Wed', impressions: 1620 }, { day: 'Thu', impressions: 1840 },
      { day: 'Fri', impressions: 1240 }, { day: 'Sat', impressions: 820 },
      { day: 'Sun', impressions: 490 },
    ],
    courses: [
      { name: 'Business', value: 36 }, { name: 'Engineering', value: 17 },
      { name: 'Arts & Humanities', value: 23 }, { name: 'Science', value: 12 },
      { name: 'Other', value: 12 },
    ],
    unis: [{ name: 'UoM', value: 54 }, { name: 'MMU', value: 31 }, { name: 'Salford', value: 15 }],
    avgImpressions: 3840, avgSaves: 368, avgJoinClicks: 224,
  },
]

const WEEKLY_TRENDS = [
  { week: 'Wk 1', impressions: 2100, saves: 190, joinClicks: 112 },
  { week: 'Wk 2', impressions: 2480, saves: 224, joinClicks: 138 },
  { week: 'Wk 3', impressions: 2840, saves: 261, joinClicks: 159 },
  { week: 'Wk 4', impressions: 3120, saves: 298, joinClicks: 180 },
  { week: 'Wk 5', impressions: 3680, saves: 334, joinClicks: 207 },
  { week: 'Wk 6', impressions: 3420, saves: 312, joinClicks: 191 },
  { week: 'Wk 7', impressions: 4210, saves: 401, joinClicks: 248 },
  { week: 'Wk 8', impressions: 4980, saves: 462, joinClicks: 289 },
]

const PIE_COLORS = [C.red, '#F87171', '#FCA5A5', '#FCD5D5', '#D1D5DB']
const UNI_COLORS = [C.red, '#F87171', '#FCA5A5']

// ─────────────────────────────────────────────
// LOGO COMPONENT — matches brand identity
// ─────────────────────────────────────────────
function RMLogo({ size = 18, light = false }) {
  return (
    <span style={{
      fontWeight: 800,
      fontSize: size,
      letterSpacing: '-0.03em',
      color: light ? C.sidebarText : C.text,
      lineHeight: 1,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      Redefine Me<span style={{ color: C.red }}>.</span>
    </span>
  )
}

// ─────────────────────────────────────────────
// SHARED UI PRIMITIVES
// ─────────────────────────────────────────────
function StatCard({ label, value, sub, accent = false }) {
  return (
    <div style={{
      background: C.card,
      border: `1px solid ${accent ? C.red : C.border}`,
      borderRadius: 12,
      padding: '20px 22px',
      boxShadow: shadow('sm'),
      position: 'relative',
      overflow: 'hidden',
    }}>
      {accent && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${C.red}, ${C.redDark})`,
        }} />
      )}
      <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 10 }}>
        {label}
      </div>
      <div style={{ fontSize: 30, fontWeight: 800, color: C.text, lineHeight: 1, marginBottom: 6 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: C.muted }}>{sub}</div>}
    </div>
  )
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: 24,
      boxShadow: shadow('sm'),
      ...style,
    }}>
      {children}
    </div>
  )
}

function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <h2 style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{children}</h2>
      {sub && <p style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>{sub}</p>}
    </div>
  )
}

const pct = (a, b) => b === 0 ? 0 : (((a - b) / b) * 100).toFixed(1)

function Delta({ current, prev }) {
  const diff = parseFloat(pct(current, prev))
  const up = diff >= 0
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 3,
      padding: '2px 8px', borderRadius: 20,
      fontSize: 11, fontWeight: 700,
      background: up ? C.greenBg : C.red2Bg,
      color: up ? C.green : C.red2,
    }}>
      {up ? '↑' : '↓'} {Math.abs(diff)}%
    </span>
  )
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      padding: '10px 14px',
      fontSize: 13,
      color: C.text,
      boxShadow: shadow('md'),
    }}>
      <div style={{ fontWeight: 600, marginBottom: 6, color: C.muted, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: <strong style={{ color: C.text }}>{p.value.toLocaleString()}</strong>
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────
const NAV = [
  { id: 'overview',  label: 'Overview',    icon: '◈' },
  { id: 'events',    label: 'Events',      icon: '▦' },
  { id: 'analytics', label: 'Analytics',   icon: '⬡' },
  { id: 'submit',    label: 'Submit Event',icon: '+' },
]

function Sidebar({ page, setPage }) {
  return (
    <aside style={{
      width: 230,
      minHeight: '100vh',
      background: C.sidebarBg,
      borderRight: `1px solid ${C.sidebarBorder}`,
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      position: 'sticky',
      top: 0,
      height: '100vh',
    }}>
      {/* Brand / Logo */}
      <div style={{ padding: '26px 22px 22px', borderBottom: `1px solid ${C.sidebarBorder}` }}>
        <RMLogo size={20} light />
        <div style={{ fontSize: 11, color: C.sidebarMuted, marginTop: 5, fontWeight: 500 }}>
          Society Analytics
        </div>
      </div>

      {/* Society info */}
      <div style={{ padding: '16px 22px', borderBottom: `1px solid ${C.sidebarBorder}` }}>
        <div style={{
          width: 38, height: 38,
          background: C.red,
          borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 900, color: '#fff',
          letterSpacing: '-0.02em',
          marginBottom: 10,
        }}>{SOCIETY.initials}</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.sidebarText, lineHeight: 1.4 }}>{SOCIETY.name}</div>
        <div style={{ fontSize: 11, color: C.sidebarMuted, marginTop: 3 }}>{SOCIETY.members} members</div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '10px 12px', flex: 1 }}>
        {NAV.map(item => {
          const active = page === item.id
          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 12px',
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                background: active ? 'rgba(232,0,13,0.18)' : 'transparent',
                color: active ? '#FF4444' : C.sidebarMuted,
                fontWeight: active ? 700 : 500,
                fontSize: 13,
                textAlign: 'left',
                marginBottom: 2,
                transition: 'all 0.12s',
                borderLeft: active ? `3px solid ${C.red}` : '3px solid transparent',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
            >
              <span style={{ fontSize: 15, width: 20, textAlign: 'center', opacity: active ? 1 : 0.7 }}>{item.icon}</span>
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '16px 22px', borderTop: `1px solid ${C.sidebarBorder}` }}>
        <RMLogo size={12} light />
        <div style={{ fontSize: 10, color: C.sidebarMuted, marginTop: 4 }}>Demo · Prototype only</div>
      </div>
    </aside>
  )
}

// ─────────────────────────────────────────────
// PAGE HEADER
// ─────────────────────────────────────────────
function PageHeader({ eyebrow, title, sub, right }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
      marginBottom: 28, paddingBottom: 22, borderBottom: `1px solid ${C.border}`,
    }}>
      <div>
        {eyebrow && (
          <div style={{ fontSize: 11, color: C.red, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
            {eyebrow}
          </div>
        )}
        <h1 style={{ fontSize: 24, fontWeight: 900, color: C.text, letterSpacing: '-0.02em' }}>{title}</h1>
        {sub && <p style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{sub}</p>}
      </div>
      {right && <div>{right}</div>}
    </div>
  )
}

// ─────────────────────────────────────────────
// PAGE 1 — OVERVIEW
// ─────────────────────────────────────────────
function OverviewPage({ setPage, setSelectedEvent }) {
  const totalImpressions = EVENTS.reduce((s, e) => s + e.impressions, 0)
  const totalSaves       = EVENTS.reduce((s, e) => s + e.saves, 0)
  const totalJoinClicks  = EVENTS.reduce((s, e) => s + e.joinClicks, 0)
  const totalAttending   = EVENTS.reduce((s, e) => s + e.attending, 0)
  const topEvent = [...EVENTS].sort((a, b) => b.impressions - a.impressions)[0]

  return (
    <div>
      <PageHeader
        eyebrow="Dashboard Overview"
        title={SOCIETY.name}
        sub={`${SOCIETY.handle} · ${SOCIETY.uni} · Est. ${SOCIETY.founded}`}
        right={
          <span style={{
            display: 'inline-block', padding: '4px 10px', borderRadius: 6,
            fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
            background: C.redLight, color: C.red, border: `1px solid rgba(232,0,13,0.25)`,
          }}>Live Demo</span>
        }
      />

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        <StatCard label="Total Impressions" value={totalImpressions.toLocaleString()} sub="Across all events" accent />
        <StatCard label="Total Saves"       value={totalSaves.toLocaleString()}       sub="Across all events" />
        <StatCard label="Join Clicks"       value={totalJoinClicks.toLocaleString()}  sub="Across all events" />
        <StatCard label="Attending"         value={totalAttending.toLocaleString()}   sub="Confirmed attendees" />
      </div>

      {/* Chart + Top event */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, marginBottom: 16 }}>
        <Card>
          <SectionTitle sub="Week-on-week performance across all events">Weekly Impressions Trend</SectionTitle>
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={WEEKLY_TRENDS}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="week" tick={{ fill: C.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: C.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Line type="monotone" dataKey="impressions" stroke={C.red}    strokeWidth={2.5} dot={{ fill: C.red,    r: 3.5 }} name="Impressions" />
              <Line type="monotone" dataKey="saves"       stroke={C.orange}   strokeWidth={2}   dot={{ fill: C.orange,   r: 3 }}   name="Saves" />
              <Line type="monotone" dataKey="joinClicks"  stroke={C.amber} strokeWidth={2}   dot={{ fill: C.amber, r: 3 }}   name="Join Clicks" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Top event card */}
        <Card style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 14 }}>★</span>
            <span style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Top Performing Event</span>
          </div>
          <div style={{
            background: C.redLight,
            border: `1px solid rgba(232,0,13,0.2)`,
            borderRadius: 10,
            padding: 16,
          }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.text, marginBottom: 3 }}>{topEvent.title}</div>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 14 }}>{topEvent.date} · {topEvent.location}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                ['Impressions', topEvent.impressions],
                ['Saves',       topEvent.saves],
                ['Join Clicks', topEvent.joinClicks],
                ['Attending',   topEvent.attending],
              ].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: 10, color: C.muted, fontWeight: 600, textTransform: 'uppercase', marginBottom: 2 }}>{k}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: C.red }}>{v.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => { setSelectedEvent(topEvent); setPage('detail') }}
            style={{
              padding: '10px 0', background: C.red, color: '#fff',
              border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 13,
              cursor: 'pointer', marginTop: 'auto', transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = C.redDark}
            onMouseLeave={e => e.currentTarget.style.background = C.red}
          >View Full Stats →</button>
        </Card>
      </div>

      {/* Recent events table */}
      <Card>
        <SectionTitle sub="Performance summary across all events">Recent Events</SectionTitle>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {['Event', 'Date', 'Impressions', 'Saves', 'Join Clicks', 'Attending', 'vs Prev'].map(h => (
                <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: C.muted, fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {EVENTS.slice(0, 4).map((e, i) => (
              <tr
                key={e.id}
                onClick={() => { setSelectedEvent(e); setPage('detail') }}
                style={{ borderBottom: i < 3 ? `1px solid ${C.border}` : 'none', cursor: 'pointer' }}
                onMouseEnter={ev => ev.currentTarget.style.background = C.card2}
                onMouseLeave={ev => ev.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '12px 12px', color: C.text, fontWeight: 600 }}>{e.title}</td>
                <td style={{ padding: '12px 12px', color: C.muted }}>{e.date}</td>
                <td style={{ padding: '12px 12px', color: C.text, fontWeight: 600 }}>{e.impressions.toLocaleString()}</td>
                <td style={{ padding: '12px 12px', color: C.text }}>{e.saves.toLocaleString()}</td>
                <td style={{ padding: '12px 12px', color: C.text }}>{e.joinClicks.toLocaleString()}</td>
                <td style={{ padding: '12px 12px', color: C.text }}>{e.attending.toLocaleString()}</td>
                <td style={{ padding: '12px 12px' }}><Delta current={e.impressions} prev={e.prevImpressions} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

// ─────────────────────────────────────────────
// PAGE 2 — EVENTS LIST
// ─────────────────────────────────────────────
function EventsPage({ setPage, setSelectedEvent }) {
  return (
    <div>
      <PageHeader eyebrow="All Events" title="Event Performance" sub="Click any event for a detailed breakdown." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {EVENTS.map(e => {
          const diff = parseFloat(pct(e.impressions, e.prevImpressions))
          const isUp = diff >= 0
          return (
            <div
              key={e.id}
              onClick={() => { setSelectedEvent(e); setPage('detail') }}
              style={{
                background: C.card, border: `1px solid ${C.border}`,
                borderRadius: 12, padding: '18px 22px',
                cursor: 'pointer', transition: 'all 0.15s',
                boxShadow: shadow('sm'),
                display: 'grid', gridTemplateColumns: '1fr auto',
                gap: 20, alignItems: 'center',
              }}
              onMouseEnter={ev => { ev.currentTarget.style.borderColor = C.red; ev.currentTarget.style.boxShadow = shadow('md') }}
              onMouseLeave={ev => { ev.currentTarget.style.borderColor = C.border; ev.currentTarget.style.boxShadow = shadow('sm') }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: C.text }}>{e.title}</span>
                  <Delta current={e.impressions} prev={e.prevImpressions} />
                </div>
                <div style={{ fontSize: 12, color: C.muted }}>{e.date} · {e.location}</div>
              </div>
              <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
                {[
                  ['Impressions', e.impressions, C.red],
                  ['Saves',       e.saves,       C.orange],
                  ['Join Clicks', e.joinClicks,  C.amber],
                  ['Attending',   e.attending,   C.text],
                ].map(([label, val, color]) => (
                  <div key={label} style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 10, color: C.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 17, fontWeight: 800, color }}>{val.toLocaleString()}</div>
                  </div>
                ))}
                <div style={{ color: C.faint, fontSize: 18 }}>›</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// PAGE 3 — EVENT DETAIL
// ─────────────────────────────────────────────
function EventDetailPage({ event, setPage }) {
  if (!event) return (
    <div style={{ color: C.muted, padding: 40 }}>
      No event selected.{' '}
      <button onClick={() => setPage('events')} style={{ color: C.red, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>
        Go to Events →
      </button>
    </div>
  )

  const compData = [
    { metric: 'Impressions', thisEvent: event.impressions, average: event.avgImpressions },
    { metric: 'Saves',       thisEvent: event.saves,       average: event.avgSaves },
    { metric: 'Join Clicks', thisEvent: event.joinClicks,  average: event.avgJoinClicks },
  ]

  return (
    <div>
      <button
        onClick={() => setPage('events')}
        style={{ background: 'none', border: 'none', color: C.muted, cursor: 'pointer', fontSize: 13, marginBottom: 20, padding: 0, display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500 }}
      >← Back to Events</button>

      <PageHeader eyebrow="Event Detail" title={event.title} sub={`${event.date} · ${event.location}`} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        <StatCard label="Impressions" value={event.impressions.toLocaleString()} sub={<Delta current={event.impressions} prev={event.prevImpressions} />} accent />
        <StatCard label="Saves"       value={event.saves.toLocaleString()}       sub={<Delta current={event.saves}       prev={event.prevSaves} />} />
        <StatCard label="Join Clicks" value={event.joinClicks.toLocaleString()}  sub={<Delta current={event.joinClicks}  prev={event.prevJoinClicks} />} />
        <StatCard label="Attending"   value={event.attending.toLocaleString()}   sub={`${((event.attending / event.joinClicks) * 100).toFixed(0)}% conversion`} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Day-by-day */}
        <Card>
          <SectionTitle sub="Daily impressions during promotion window">Impression Timeline</SectionTitle>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={event.dayByDay} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
              <XAxis dataKey="day" tick={{ fill: C.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: C.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="impressions" fill={C.red} radius={[4, 4, 0, 0]} name="Impressions" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Demographics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card style={{ flex: 1 }}>
            <SectionTitle sub="Audience by course">Course Split</SectionTitle>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <ResponsiveContainer width={130} height={130}>
                <PieChart>
                  <Pie data={event.courses} cx="50%" cy="50%" innerRadius={34} outerRadius={58} dataKey="value" paddingAngle={2}>
                    {event.courses.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ flex: 1 }}>
                {event.courses.map((c, i) => (
                  <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                    <div style={{ width: 7, height: 7, borderRadius: 2, background: PIE_COLORS[i % PIE_COLORS.length], flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: C.muted, flex: 1 }}>{c.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{c.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card style={{ flex: 1 }}>
            <SectionTitle sub="Audience by university">University Split</SectionTitle>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              {event.unis.map((u, i) => (
                <div key={u.name} style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, color: C.muted, marginBottom: 6, fontWeight: 600, textTransform: 'uppercase' }}>{u.name}</div>
                  <div style={{ height: 5, background: C.border, borderRadius: 3, marginBottom: 5, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${u.value}%`, background: UNI_COLORS[i], borderRadius: 3 }} />
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: UNI_COLORS[i] }}>{u.value}%</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* vs Average */}
      <Card>
        <SectionTitle sub="This event vs society average">Performance Comparison</SectionTitle>
        <ResponsiveContainer width="100%" height={190}>
          <BarChart data={compData} layout="vertical" barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
            <XAxis type="number" tick={{ fill: C.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="metric" tick={{ fill: C.muted, fontSize: 12 }} axisLine={false} tickLine={false} width={80} />
            <Tooltip content={<ChartTooltip />} />
            <Legend wrapperStyle={{ color: C.muted, fontSize: 12 }} />
            <Bar dataKey="thisEvent" fill={C.red}    radius={[0, 4, 4, 0]} name="This Event" />
            <Bar dataKey="average"   fill="#E4E4E7"  radius={[0, 4, 4, 0]} name="Society Avg" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}

// ─────────────────────────────────────────────
// PAGE 4 — ANALYTICS
// ─────────────────────────────────────────────
function AnalyticsPage() {
  const [active, setActive] = useState(['impressions', 'saves', 'joinClicks'])
  const toggle = key => setActive(p => p.includes(key) ? p.filter(k => k !== key) : [...p, key])

  const LINES = [
    { key: 'impressions', label: 'Impressions', color: C.red },
    { key: 'saves',       label: 'Saves',       color: C.orange },
    { key: 'joinClicks',  label: 'Join Clicks', color: C.amber },
  ]

  const last = WEEKLY_TRENDS[WEEKLY_TRENDS.length - 1]
  const first = WEEKLY_TRENDS[0]

  return (
    <div>
      <PageHeader eyebrow="Trends" title="Analytics Overview" sub="8-week performance data for Manchester Marketing Society." />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
        {LINES.map(({ key, label }) => (
          <StatCard
            key={key}
            label={`${label} Growth (8 wk)`}
            value={`+${pct(last[key], first[key])}%`}
            sub={`${first[key].toLocaleString()} → ${last[key].toLocaleString()}`}
          />
        ))}
      </div>

      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <SectionTitle sub="Week-on-week across all activity">All Metrics — 8 Week View</SectionTitle>
          <div style={{ display: 'flex', gap: 7 }}>
            {LINES.map(({ key, label, color }) => (
              <button
                key={key}
                onClick={() => toggle(key)}
                style={{
                  padding: '5px 12px', borderRadius: 20,
                  border: `1.5px solid ${active.includes(key) ? color : C.border}`,
                  background: active.includes(key) ? `${color}12` : 'transparent',
                  color: active.includes(key) ? color : C.faint,
                  fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >{label}</button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={WEEKLY_TRENDS}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="week" tick={{ fill: C.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: C.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTooltip />} />
            {LINES.filter(l => active.includes(l.key)).map(({ key, label, color }) => (
              <Line
                key={key} type="monotone" dataKey={key} stroke={color}
                strokeWidth={2.5} dot={{ fill: color, r: 4 }} name={label}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {LINES.map(({ key, label, color }) => (
          <Card key={key}>
            <SectionTitle sub="8-week trend">{label}</SectionTitle>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={WEEKLY_TRENDS} barCategoryGap="25%">
                <XAxis dataKey="week" tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} width={34} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey={key} fill={color} radius={[3, 3, 0, 0]} name={label} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// PAGE 5 — SUBMIT EVENT
// ─────────────────────────────────────────────
function Field({ label, type = 'text', placeholder, value, onChange, as }) {
  const [focused, setFocused] = useState(false)
  const baseStyle = {
    width: '100%', padding: '10px 13px',
    background: C.card2,
    border: `1.5px solid ${focused ? C.red : C.border}`,
    borderRadius: 8, color: C.text, fontSize: 13,
    outline: 'none', transition: 'border-color 0.15s',
    fontFamily: 'inherit',
  }
  const props = {
    style: baseStyle, placeholder, value,
    onChange: e => onChange(e.target.value),
    onFocus: () => setFocused(true),
    onBlur:  () => setFocused(false),
  }
  return (
    <label style={{ display: 'block' }}>
      <span style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
      {as === 'textarea'
        ? <textarea {...props} rows={4} style={{ ...baseStyle, resize: 'vertical' }} />
        : <input {...props} type={type} />}
    </label>
  )
}

function SubmitPage() {
  const [form, setForm] = useState({ title: '', datetime: '', location: '', description: '', ticketLink: '', imageUrl: '' })
  const [submitted, setSubmitted] = useState(false)
  const set = key => val => setForm(f => ({ ...f, [key]: val }))

  if (submitted) {
    return (
      <div style={{ maxWidth: 500, margin: '60px auto', textAlign: 'center' }}>
        <div style={{
          width: 68, height: 68, borderRadius: '50%',
          background: C.redLight, border: `2px solid ${C.red}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, margin: '0 auto 22px', color: C.red,
        }}>✓</div>
        <RMLogo size={22} />
        <h2 style={{ fontSize: 22, fontWeight: 900, color: C.text, margin: '14px 0 8px' }}>Event Submitted!</h2>
        <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 26 }}>
          <strong style={{ color: C.text }}>{form.title || 'Your event'}</strong> has been submitted for review.
          The Redefine Me team will publish it within 24 hours.
        </p>
        <button
          onClick={() => { setForm({ title: '', datetime: '', location: '', description: '', ticketLink: '', imageUrl: '' }); setSubmitted(false) }}
          style={{
            padding: '11px 28px', background: C.red, color: '#fff',
            border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 13,
            cursor: 'pointer',
          }}
        >Submit Another Event</button>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 620 }}>
      <PageHeader eyebrow="New Event" title="Submit an Event" sub="Add a new event to the Redefine Me platform." />
      <Card>
        <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Field label="Event Title *" placeholder="e.g. Summer Marketing Summit" value={form.title} onChange={set('title')} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Field label="Date & Time *" type="datetime-local" value={form.datetime} onChange={set('datetime')} />
            <Field label="Location *" placeholder="Venue or online link" value={form.location} onChange={set('location')} />
          </div>
          <Field label="Description" placeholder="Tell people what to expect..." value={form.description} onChange={set('description')} as="textarea" />
          <Field label="Join / Ticket Link" type="url" placeholder="https://..." value={form.ticketLink} onChange={set('ticketLink')} />
          <Field label="Image URL (optional)" type="url" placeholder="https://..." value={form.imageUrl} onChange={set('imageUrl')} />
          <div style={{ paddingTop: 6 }}>
            <button
              type="submit"
              style={{
                width: '100%', padding: '12px 0', background: C.red, color: '#fff',
                border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 14,
                cursor: 'pointer', transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = C.redDark}
              onMouseLeave={e => e.currentTarget.style.background = C.red}
            >Submit Event →</button>
          </div>
        </form>
      </Card>
    </div>
  )
}

// ─────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('overview')
  const [selectedEvent, setSelectedEvent] = useState(null)

  const handleSetPage = p => { setPage(p); window.scrollTo(0, 0) }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: C.bg }}>
      <Sidebar page={page} setPage={handleSetPage} />
      <main style={{ flex: 1, padding: '36px 44px', minWidth: 0, overflowX: 'hidden' }}>
        {page === 'overview'  && <OverviewPage setPage={handleSetPage} setSelectedEvent={setSelectedEvent} />}
        {page === 'events'    && <EventsPage   setPage={handleSetPage} setSelectedEvent={setSelectedEvent} />}
        {page === 'detail'    && <EventDetailPage event={selectedEvent} setPage={handleSetPage} />}
        {page === 'analytics' && <AnalyticsPage />}
        {page === 'submit'    && <SubmitPage />}
      </main>
    </div>
  )
}
