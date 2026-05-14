import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { SEED_REPORTS } from './data/seed.js';

const StoreCtx = createContext(null);

let nextId = 200;

const initialState = {
  reports: SEED_REPORTS,
  activeReport: null,
  filter: { city: 'all', status: 'all' },
  view: 'map', // 'map' | 'list' | 'report'
  toast: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_REPORT':
      return { ...state, reports: [action.payload, ...state.reports] };
    case 'UPVOTE': {
      return {
        ...state,
        reports: state.reports.map(r =>
          r.id === action.id ? { ...r, upvotes: r.upvotes + 1 } : r
        ),
      };
    }
    case 'UPDATE_STATUS': {
      return {
        ...state,
        reports: state.reports.map(r =>
          r.id === action.id ? { ...r, status: action.status } : r
        ),
      };
    }
    case 'SET_ACTIVE': return { ...state, activeReport: action.id };
    case 'SET_FILTER': return { ...state, filter: { ...state.filter, ...action.filter } };
    case 'SET_VIEW': return { ...state, view: action.view };
    case 'TOAST': return { ...state, toast: action.message };
    case 'CLEAR_TOAST': return { ...state, toast: null };
    default: return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addReport = useCallback((data) => {
    const report = {
      id: `r${++nextId}`,
      reportedAt: new Date().toISOString(),
      upvotes: 0,
      comments: 0,
      estimatedRestore: null,
      severity: 'medium',
      ...data,
    };
    dispatch({ type: 'ADD_REPORT', payload: report });
    dispatch({ type: 'TOAST', message: '✅ Signalement soumis avec succès!' });
    setTimeout(() => dispatch({ type: 'CLEAR_TOAST' }), 3000);
    return report;
  }, []);

  const upvote = useCallback((id) => {
    dispatch({ type: 'UPVOTE', id });
  }, []);

  const setActive = useCallback((id) => {
    dispatch({ type: 'SET_ACTIVE', id });
  }, []);

  const setFilter = useCallback((filter) => {
    dispatch({ type: 'SET_FILTER', filter });
  }, []);

  const setView = useCallback((view) => {
    dispatch({ type: 'SET_VIEW', view });
  }, []);

  const filteredReports = state.reports.filter(r => {
    if (state.filter.city !== 'all' && r.city !== state.filter.city) return false;
    if (state.filter.status !== 'all' && r.status !== state.filter.status) return false;
    return true;
  });

  const stats = {
    total: state.reports.length,
    active: state.reports.filter(r => r.status === 'active').length,
    partial: state.reports.filter(r => r.status === 'partial').length,
    resolved: state.reports.filter(r => r.status === 'resolved').length,
    scheduled: state.reports.filter(r => r.status === 'scheduled').length,
    citiesAffected: new Set(state.reports.filter(r => r.status === 'active').map(r => r.city)).size,
  };

  return (
    <StoreCtx.Provider value={{
      ...state,
      filteredReports,
      stats,
      addReport,
      upvote,
      setActive,
      setFilter,
      setView,
      dispatch,
    }}>
      {children}
    </StoreCtx.Provider>
  );
}

export const useStore = () => useContext(StoreCtx);
