import React from 'react';
import { useStore } from '../store.jsx';

export default function Header() {
  const { view, setView, stats } = useStore();

  return (
    <header style={{
      background: 'var(--bg2)',
      borderBottom: '1px solid var(--border)',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 60,
      flexShrink: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'linear-gradient(135deg, #00b4d8, #0077a8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16,
        }}>💧</div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, lineHeight: 1, letterSpacing: '-0.5px' }}>
            Aman
          </div>
          <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Maroc · Signalement d'eau
          </div>
        </div>
      </div>

      {/* Live badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 20, padding: '4px 10px' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', display: 'inline-block', animation: 'pulse-dot 2s infinite' }} />
          <span style={{ fontSize: 12, color: '#ef4444', fontWeight: 600 }}>{stats.active} pannes actives</span>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', gap: 4 }}>
          {[
            { id: 'map', label: '🗺 Carte' },
            { id: 'list', label: '📋 Liste' },
            { id: 'report', label: '➕ Signaler' },
          ].map(({ id, label }) => (
            <button key={id} onClick={() => setView(id)} style={{
              padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
              background: view === id ? 'var(--accent)' : 'transparent',
              color: view === id ? '#fff' : 'var(--text2)',
              transition: 'all 0.15s',
            }}>
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
