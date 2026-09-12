import React, { useState } from 'react';
import { PageId, CaseRecord } from '../types';
import { MOCK_CASES } from '../data/mockData';

interface CounselorCasesPageProps {
  onNavigate: (page: PageId) => void;
  onSelectCase: (caseId: string) => void;
}

export const CounselorCasesPage: React.FC<CounselorCasesPageProps> = ({ onNavigate, onSelectCase }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCases = MOCK_CASES.filter((c) => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.clientHash.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = districtFilter === 'all' || c.district === districtFilter;
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesDistrict && matchesStatus;
  });

  const handleReview = (id: string) => {
    onSelectCase(id);
    onNavigate('case-detail');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-[16px]">clinical_notes</span>
            <span>Counselor Operations • Clinical Caseload</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Active Triage Caseload
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Real-time distress indices, escalation triggers, and survivor care reviews.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('counselor-alerts')}
            className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span>View Alerts (6)</span>
          </button>

          <button
            onClick={() => alert('Encrypted audit log CSV successfully signed and exported to local vault.')}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            <span>Export Triage Report</span>
          </button>
        </div>
      </div>

      {/* Bento Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Caseload</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">24</h3>
            <p className="text-xs text-rose-600 font-semibold mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">warning</span>
              <span>3 Flagged for Immediate Review</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-[26px]">assignment</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Mean Distress Index</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">54.2 <span className="text-sm font-semibold text-slate-400">/100</span></h3>
            <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_down</span>
              <span>-3.1 pts from last cycle</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-800 flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-[26px]">ecg_heart</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Protocol Adherence</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">98.4%</h3>
            <p className="text-xs text-teal-700 font-semibold mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>Zero-Knowledge Verified</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-800 flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-[26px]">security</span>
          </div>
        </div>
      </div>

      {/* Filters and Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Search & Filter Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/50">
          <div className="relative w-full sm:w-80">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-slate-400">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Case ID or Hash..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 focus:outline-none"
            >
              <option value="all">All Districts</option>
              <option value="Metro North">Metro North</option>
              <option value="East Harbor">East Harbor</option>
              <option value="Central Valley">Central Valley</option>
              <option value="West Ridge">West Ridge</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Under Review">Under Review</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Caseload Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-5">Case ID &amp; Client Hash</th>
                <th className="py-3.5 px-5">Distress Index &amp; Trend</th>
                <th className="py-3.5 px-5">Last Check-In</th>
                <th className="py-3.5 px-5">District</th>
                <th className="py-3.5 px-5">Triage Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredCases.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2.5">
                      {c.flagged && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                      )}
                      <div>
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{c.id}</span>
                          {c.flagged && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                              FLAGGED
                            </span>
                          )}
                        </div>
                        <div className="font-mono text-[11px] text-slate-400 mt-0.5">{c.clientHash}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-bold text-sm ${
                          c.distressScore >= 70
                            ? 'text-rose-600'
                            : c.distressScore >= 50
                            ? 'text-amber-600'
                            : 'text-emerald-600'
                        }`}
                      >
                        {c.distressScore} / 100
                      </span>
                      <span
                        className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          c.trend === 'rising'
                            ? 'bg-rose-50 text-rose-700'
                            : c.trend === 'improving'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {c.trendDelta}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <div>
                      <div className="font-semibold text-slate-800">{c.lastCheckIn}</div>
                      <div className="text-[11px] text-slate-400">{c.lastCheckInRelative}</div>
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <span className="font-medium text-slate-800">{c.district}</span>
                  </td>

                  <td className="py-4 px-5">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full font-bold text-[11px] ${
                        c.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : c.status === 'Under Review'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => handleReview(c.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-700 hover:text-white text-teal-800 border border-teal-200/70 font-bold transition-all cursor-pointer inline-flex items-center gap-1"
                    >
                      <span>Review Case</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
