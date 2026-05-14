import React, { useState } from 'react';
import { useStore } from '../store.jsx';
import { CITIES, NEIGHBORHOODS } from '../data/seed.js';

const INITIAL = {
  city: '',
  neighborhood: '',
  status: 'active',
  severity: 'medium',
  description: '',
  reportedBy: '',
};

export default function ReportForm() {
  const { addReport, setView } = useStore();
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.city) e.city = 'Choisissez une ville';
    if (!form.neighborhood) e.neighborhood = 'Choisissez un quartier';
    if (!form.description || form.description.length < 15) e.description = 'Description trop courte (min 15 caractères)';
    if (!form.reportedBy) e.reportedBy = 'Entrez votre nom ou pseudo';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setSubmitting(true);

    // Find city coords and add slight random offset
    const cityData = CITIES.find(c => c.name === form.city);
    const lat = cityData.lat + (Math.random() - 0.5) * 0.08;
    const lng = cityData.lng + (Math.random() - 0.5) * 0.08;

    addReport({ ...form, lat, lng });
    setForm(INITIAL);
    setErrors({});
    setSubmitting(false);
    setView('list');
  };

  const field = (key) => ({
    error: errors[key],
    onChange: e => { set(key, e.target.value); setErrors(er => { const n = { ...er }; delete n[key]; return n; }); },
    value: form[key],
  });

  const inputStyle = (hasError) => ({
    width: '100%', background: 'var(--bg3)', border: `1px solid ${hasError ? '#ef4444' : 'var(--border2)'}`,
    color: 'var(--text)', padding: '10px 14px', borderRadius: 8,
    fontSize: 14, fontFamily: 'var(--font-body)',
    outline: 'none',
  });

  const labelStyle = {
    display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text2)',
    textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6,
  };

  const neighborhoods = form.city ? (NEIGHBORHOODS[form.city] || []) : [];

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, marginBottom: 6 }}>
            Signaler une panne
          </div>
          <p style={{ color: 'var(--text3)', fontSize: 13 }}>
            Aidez votre communauté en signalant les problèmes d'accès à l'eau dans votre quartier.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* City + Neighborhood */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={labelStyle}>Ville *</label>
              <select style={inputStyle(errors.city)} value={form.city}
                onChange={e => { set('city', e.target.value); set('neighborhood', ''); }}>
                <option value="">-- Choisir --</option>
                {CITIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
              {errors.city && <div style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{errors.city}</div>}
            </div>
            <div>
              <label style={labelStyle}>Quartier *</label>
              <select style={inputStyle(errors.neighborhood)} value={form.neighborhood}
                onChange={e => set('neighborhood', e.target.value)} disabled={!form.city}>
                <option value="">-- Choisir --</option>
                {neighborhoods.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              {errors.neighborhood && <div style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{errors.neighborhood}</div>}
            </div>
          </div>

          {/* Status + Severity */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={labelStyle}>Type de problème *</label>
              <select style={inputStyle(false)} {...field('status')}>
                <option value="active">Coupure totale</option>
                <option value="partial">Approvisionnement partiel</option>
                <option value="scheduled">Coupure planifiée</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Sévérité</label>
              <select style={inputStyle(false)} {...field('severity')}>
                <option value="low">Faible — gêne mineure</option>
                <option value="medium">Moyenne — impact quotidien</option>
                <option value="high">Élevée — situation critique</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>Description *</label>
            <textarea
              rows={4}
              placeholder="Décrivez le problème : depuis quand, combien de foyers affectés, eau trouble, pression faible..."
              style={{ ...inputStyle(errors.description), resize: 'vertical', lineHeight: 1.6 }}
              value={form.description}
              onChange={e => { set('description', e.target.value); setErrors(er => { const n = { ...er }; delete n.description; return n; }); }}
            />
            {errors.description && <div style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{errors.description}</div>}
          </div>

          {/* Reporter name */}
          <div>
            <label style={labelStyle}>Votre nom / pseudo *</label>
            <input
              type="text"
              placeholder="Ex: Fatima B."
              style={inputStyle(errors.reportedBy)}
              {...field('reportedBy')}
            />
            {errors.reportedBy && <div style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{errors.reportedBy}</div>}
          </div>

          {/* Submit */}
          <button onClick={handleSubmit} disabled={submitting} style={{
            background: 'linear-gradient(135deg, #00b4d8, #0077a8)',
            color: '#fff', border: 'none', borderRadius: 10,
            padding: '13px 24px', fontSize: 15, fontWeight: 600,
            fontFamily: 'var(--font-display)', cursor: 'pointer',
            opacity: submitting ? 0.6 : 1,
            transition: 'opacity 0.2s, transform 0.1s',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {submitting ? 'Envoi en cours...' : '💧 Soumettre le signalement'}
          </button>
        </div>
      </div>
    </div>
  );
}
