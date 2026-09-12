import React, { useState } from 'react';
import { PageId } from '../types';
import { MOCK_ALERTS } from '../data/mockData';

interface CounselorAlertsPageProps {
  onNavigate: (page: PageId) => void;
  onSelectCase: (caseId: string) => void;
}

export const CounselorAlertsPage: React.FC<CounselorAlertsPageProps> = ({ onNavigate, onSelectCase }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'critical' | 'high' | 'resolved'>('all');
  const [alerts, setAlerts] = useState(MOCK_ALERTS);

  const filtered = alerts.filter((a) => {
    if (activeFilter === 'all') return true;
    return a.severity === activeFilter;
  });

  const handleAcknowledge = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
  };

  const handleReview = (caseId: string) => {
    onSelectCase(caseId);
    onNavigate('case-detail');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-[16px]">notifications_active</span>
            <span>Urgent Clinical Notifications</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Active Priority Alerts
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Automated alerts requiring immediate triage, outreach, or multi-agency coordination.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('counselor-cases')}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to Caseload</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Alerts List (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Filter Tabs */}
          <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200/90 shadow-2xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Alerts ({alerts.length})
            </button>
            <button
              onClick={() => setActiveFilter('critical')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeFilter === 'critical'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-rose-700 hover:bg-rose-50'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
              <span>Critical (2)</span>
            </button>
            <button
              onClick={() => setActiveFilter('high')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeFilter === 'high'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-amber-700 hover:bg-amber-50'
              }`}
            >
              <span>High (3)</span>
            </button>
            <button
              onClick={() => setActiveFilter('resolved')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'resolved'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              Resolved (1)
            </button>
          </div>

          {/* Alert Cards */}
          <div className="space-y-3.5">
            {filtered.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-2xl p-5 border transition-all ${
                  item.severity === 'critical'
                    ? 'border-rose-300 shadow-sm shadow-rose-100/50'
                    : item.severity === 'high'
                    ? 'border-amber-200 shadow-xs'
                    : 'border-slate-200/80 shadow-2xs'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        item.severity === 'critical'
                          ? 'bg-rose-100 text-rose-700'
                          : item.severity === 'high'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[22px]">
                        {item.severity === 'critical'
                          ? 'emergency'
                          : item.severity === 'high'
                          ? 'warning'
                          : 'check_circle'}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-sm text-slate-900">{item.caseId}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                            item.severity === 'critical'
                              ? 'bg-rose-100 text-rose-800'
                              : item.severity === 'high'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {item.severity}
                        </span>
                        <span className="font-mono text-[11px] text-slate-400">({item.clientHash})</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs font-semibold text-slate-500">{item.relativeTime}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 font-medium mt-2 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-3 mt-3 text-xs text-slate-500 flex-wrap">
                        <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-0.5 rounded font-semibold text-slate-700">
                          <span className="material-symbols-outlined text-[14px]">label</span>
                          <span>{item.tag}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-0.5 rounded font-semibold text-slate-700">
                          <span className="material-symbols-outlined text-[14px]">location_on</span>
                          <span>{item.district}</span>
                        </span>
                        <span className="font-bold text-slate-900">
                          Index: {item.score}/100
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 shrink-0">
                    {!item.acknowledged && item.severity !== 'resolved' && (
                      <button
                        onClick={() => handleAcknowledge(item.id)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                      >
                        Acknowledge
                      </button>
                    )}
                    {item.acknowledged && (
                      <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">done_all</span>
                        <span>Acknowledged</span>
                      </span>
                    )}

                    <button
                      onClick={() => handleReview(item.caseId)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#005c55] hover:bg-[#0f766e] text-white text-xs font-bold transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                    >
                      <span>Review</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Status & Guidance (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-teal-700">timer</span>
              <span>Triage SLA Performance</span>
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Critical Response Target:</span>
                <span className="font-bold text-slate-900">&lt; 30 Minutes</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Avg. Acknowledgment Time:</span>
                <span className="font-bold text-emerald-600">11.4 Minutes</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-600">Protocol Compliance:</span>
                <span className="font-bold text-teal-700">100% On-Track</span>
              </div>
            </div>
          </div>

          <div className="bg-teal-900 text-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-teal-200 mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span>Escalation Rule #14</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Any case demonstrating a delta &gt;+15 pts within 48 hours must be reviewed by the primary counselor and
              designated backup within the hour.
            </p>
            <button
              onClick={() => onNavigate('ethics-and-privacy')}
              className="text-xs font-bold text-teal-300 hover:text-white underline"
            >
              Review Full Triage Standard Operating Procedure →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
