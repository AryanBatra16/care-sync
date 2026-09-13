import React, { useState } from 'react';
import { PageId } from '../types';

interface AdminPortalPageProps {
  onNavigate: (page: PageId) => void;
}

export const AdminPortalPage: React.FC<AdminPortalPageProps> = ({ onNavigate }) => {
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('Tri-County Metropolitan District');

  const districts = [
    {
      name: 'Metro North',
      volume: 482,
      distress: 61.4,
      staffRatio: '1 : 8',
      bedsRemaining: 4,
      trend: '+6%',
      status: 'High Demand',
    },
    {
      name: 'West Ridge',
      volume: 310,
      distress: 54.2,
      staffRatio: '1 : 6',
      bedsRemaining: 6,
      trend: '+2%',
      status: 'Moderate Demand',
    },
    {
      name: 'East Harbor',
      volume: 275,
      distress: 49.8,
      staffRatio: '1 : 5',
      bedsRemaining: 3,
      trend: '-4%',
      status: 'Moderate Demand',
    },
    {
      name: 'Central Valley',
      volume: 215,
      distress: 42.1,
      staffRatio: '1 : 4',
      bedsRemaining: 2,
      trend: '-1%',
      status: 'Stable',
    },
    {
      name: 'South Shore',
      volume: 146,
      distress: 38.5,
      staffRatio: '1 : 4',
      bedsRemaining: 1,
      trend: '-5%',
      status: 'Stable',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-sky-800 uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-[16px]">shield_person</span>
            <span>Executive &amp; Regional Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Regional Administrative Overview
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Aggregate survivor wellbeing indices, district safety resource allocation, and privacy program metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedJurisdiction}
            onChange={(e) => setSelectedJurisdiction(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-800 focus:outline-none shadow-2xs"
          >
            <option value="Tri-County Metropolitan District">Tri-County Metropolitan District</option>
            <option value="Northern Regional Coalition">Northern Regional Coalition</option>
            <option value="Statewide Victim Services Oversight">Statewide Victim Services Oversight</option>
          </select>

        </div>
      </div>

      {/* 4 Key Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Check-Ins Handled</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-slate-900">1,428</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              +14.2% QoQ
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Zero personal identity records generated</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Regional Distress Mean</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-slate-900">51.8</span>
            <span className="text-sm font-semibold text-slate-400">/100</span>
          </div>
          <p className="text-xs text-amber-700 mt-2 font-medium">Moderate Regional Pressure • Metro North Peak</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Shelter Bed Allocation</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-slate-900">84%</span>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
              16 Beds Left
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Across 6 accredited regional emergency shelters</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Privacy Program Review</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-teal-700">100%</span>
            <span className="material-symbols-outlined text-[20px] text-teal-700">verified</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Demo metric for privacy program monitoring</p>
        </div>
      </div>

      {/* Aggregate Risk Distribution & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-1">Risk Severity Distribution</h3>
          <p className="text-xs text-slate-500 mb-6">Aggregate risk composition across 1,428 recent check-ins</p>

          <div className="h-5 w-full rounded-full overflow-hidden flex shadow-inner mb-6">
            <div className="bg-emerald-500 h-full" style={{ width: '42%' }} title="Low Risk: 42%"></div>
            <div className="bg-amber-400 h-full" style={{ width: '44%' }} title="Moderate Risk: 44%"></div>
            <div className="bg-rose-500 h-full" style={{ width: '14%' }} title="Critical / Escalated: 14%"></div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block mb-1"></span>
              <p className="text-xs text-slate-500 font-semibold">Low (&lt;40)</p>
              <p className="text-lg font-extrabold text-slate-900">42%</p>
              <p className="text-[11px] text-slate-400">599 check-ins</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block mb-1"></span>
              <p className="text-xs text-slate-500 font-semibold">Moderate (40-69)</p>
              <p className="text-lg font-extrabold text-slate-900">44%</p>
              <p className="text-[11px] text-slate-400">628 check-ins</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block mb-1"></span>
              <p className="text-xs text-slate-500 font-semibold">Critical (&ge;70)</p>
              <p className="text-lg font-extrabold text-rose-600">14%</p>
              <p className="text-[11px] text-slate-400">201 check-ins</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Primary Trauma Vectors</h3>
            <p className="text-xs text-slate-500 mb-4">Anonymously categorized primary themes</p>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">Domestic &amp; Intimate Partner Safety</span>
                <span className="font-bold text-slate-900">48% (685)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-teal-600 rounded-full" style={{ width: '48%' }}></div>
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="font-semibold text-slate-700">Workplace / Stalking Concerns</span>
                <span className="font-bold text-slate-900">28% (400)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: '28%' }}></div>
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="font-semibold text-slate-700">Family &amp; Dependent Disruption</span>
                <span className="font-bold text-slate-900">24% (343)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Differential Privacy Noise Added (ε = 0.5)</span>
            <button
              onClick={() => onNavigate('ethics-and-privacy')}
              className="text-teal-700 font-bold hover:underline"
            >
              Privacy Methodology →
            </button>
          </div>
        </div>
      </div>

      {/* District Resource Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">District Need &amp; Staffing Balance</h3>
          <span className="text-xs text-slate-400">Updated every 15 minutes</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-5">District Name</th>
                <th className="py-3 px-5">Check-In Volume</th>
                <th className="py-3 px-5">Avg Distress Index</th>
                <th className="py-3 px-5">Counselor Staffing Ratio</th>
                <th className="py-3 px-5">Available Beds</th>
                <th className="py-3 px-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {districts.map((d) => (
                <tr key={d.name} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-slate-900">{d.name}</td>
                  <td className="py-3.5 px-5 font-semibold text-slate-800">
                    {d.volume} <span className="text-[11px] text-slate-400 font-normal">({d.trend})</span>
                  </td>
                  <td className="py-3.5 px-5 font-bold text-slate-900">{d.distress} / 100</td>
                  <td className="py-3.5 px-5 font-semibold text-slate-800">{d.staffRatio}</td>
                  <td className="py-3.5 px-5 font-semibold text-slate-800">
                    <span className={d.bedsRemaining <= 2 ? 'text-rose-600 font-bold' : 'text-slate-800'}>
                      {d.bedsRemaining} beds
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                        d.status === 'High Demand'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : d.status === 'Moderate Demand'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {d.status}
                    </span>
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
