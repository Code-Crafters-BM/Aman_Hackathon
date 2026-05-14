import React from 'react';
import { useStore } from '../store.jsx';
import ReportCard from './ReportCard.jsx';

export default function ListView() {
  const { filteredReports } = useStore();

  return (
    <div style={{
      flex: 1, overflowY: 'auto', padding: 24,
    }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22,
          marginBottom: 6,
        }}>
          Signalements récents
        </div>
        <div style={{ color: 'var(--text3)', fontSize: 13, marginBottom: 20 }}>
          {filteredReports.length} résultat{filteredReports.length !== 1 ? 's' : ''}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredReports.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '60px 0',
              color: 'var(--text3)', fontSize: 14,
            }}>
              Aucun signalement pour ces filtres.
            </div>
          ) : (
            filteredReports.map((r, i) => (
              <div key={r.id} className={`fade-up`} style={{ animationDelay: `${i * 0.04}s` }}>
                <ReportCard report={r} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
