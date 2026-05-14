import React from 'react';
import { useStore } from '../store.jsx';

export default function StatsBar() {
  const { stats } = useStore();

  const items = [
    { label: 'Pannes actives', value: stats.active, color: '#ef4444' },
    { label: 'Approvisionnement partiel', value: stats.partial, color: '#f59e0b' },
    { label: 'Coupures planifiées', value: stats.scheduled, color: '#8b5cf6' },
    { label: 'Résolues (24h)', value: stats.resolved, color: '#10b981' },
    { label: 'Villes affectées', value: stats.citiesAffected, color: '#00b4d8' },
  ];

  return (
    <div style={{
      background: 'var(--bg3)',
      borderBottom: '1px solid var(--border)',
      padding: '10px 24px',
      display: 'flex',
      gap: 32,
      overflowX: 'auto',
      flexShrink: 0,
    }}>
      {items.map(({ label, value, color }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22,
            color, lineHeight: 1,
          }}>{value}</span>
          <span style={{ fontSize: 12, color: 'var(--text3)', maxWidth: 80, lineHeight: 1.3 }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
