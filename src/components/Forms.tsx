import React, { useEffect, useState } from 'react';
import { mockApi } from '@/src/services/mockApi';
import { AutomationAction } from '@/src/types/workflow';

interface FormProps {
  data: any;
  onChange: (config: any) => void;
}

export const StartNodeForm = ({ data, onChange }: FormProps) => (
  <div className="space-y-6">
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 font-inter">Start Title</label>
      <input
        type="text"
        className="w-full px-5 py-4 bg-white border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all font-bold text-slate-700"
        value={data.config.title || ''}
        onChange={(e) => onChange({ ...data.config, title: e.target.value })}
        placeholder="e.g. Employee Onboarding"
      />
    </div>
  </div>
);

export const TaskNodeForm = ({ data, onChange }: FormProps) => (
  <div className="space-y-6">
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 font-inter">Step Title</label>
      <input
        type="text"
        className="w-full px-5 py-4 bg-white border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-bold text-slate-700"
        value={data.config.title || ''}
        onChange={(e) => onChange({ ...data.config, title: e.target.value })}
        placeholder="Task name"
        required
      />
    </div>
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 font-inter">Description</label>
      <textarea
        className="w-full px-5 py-4 bg-white border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-medium text-slate-600 h-32 resize-none"
        value={data.config.description || ''}
        onChange={(e) => onChange({ ...data.config, description: e.target.value })}
        placeholder="Define the task objectives..."
      />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 font-inter">Assignee</label>
        <input
          type="text"
          className="w-full px-4 py-3 bg-white border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none font-bold text-slate-700 text-sm"
          value={data.config.assignee || ''}
          onChange={(e) => onChange({ ...data.config, assignee: e.target.value })}
          placeholder="User/ID"
        />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 font-inter">Due Date</label>
        <input
          type="date"
          className="w-full px-4 py-3 bg-white border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none font-bold text-slate-700 text-sm"
          value={data.config.dueDate || ''}
          onChange={(e) => onChange({ ...data.config, dueDate: e.target.value })}
        />
      </div>
    </div>
  </div>
);

export const ApprovalNodeForm = ({ data, onChange }: FormProps) => (
  <div className="space-y-6">
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 font-inter">Approval Title</label>
      <input
        type="text"
        className="w-full px-5 py-4 bg-white border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-amber-100 focus:border-amber-500 outline-none transition-all font-bold text-slate-700"
        value={data.config.title || ''}
        onChange={(e) => onChange({ ...data.config, title: e.target.value })}
      />
    </div>
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 font-inter">Approver Role</label>
      <select
        className="w-full px-5 py-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-amber-500 outline-none font-bold text-slate-700 appearance-none"
        value={data.config.role || ''}
        onChange={(e) => onChange({ ...data.config, role: e.target.value })}
      >
        <option value="">Select Target Role</option>
        <option value="Manager">Line Manager</option>
        <option value="HRBP">HR Business Partner</option>
        <option value="Director">Department Director</option>
        <option value="VP">Executive VP</option>
      </select>
    </div>
    <div className="space-y-4 pt-2">
      <div className="flex justify-between items-center px-1">
         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-inter">Auto-approve Threshold</label>
         <span className="text-xs font-black text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">{data.config.threshold || 50}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
        value={data.config.threshold || 50}
        onChange={(e) => onChange({ ...data.config, threshold: parseInt(e.target.value) })}
      />
    </div>
  </div>
);

export const AutomationNodeForm = ({ data, onChange }: FormProps) => {
  const [actions, setActions] = useState<AutomationAction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.getAutomations().then((res) => {
      setActions(res);
      setLoading(false);
    });
  }, []);

  const selectedAction = actions.find(a => a.id === data.config.actionId);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 font-inter">Action Label</label>
        <input
          type="text"
          className="w-full px-5 py-4 bg-white border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 outline-none transition-all font-bold text-slate-700"
          value={data.config.title || ''}
          onChange={(e) => onChange({ ...data.config, title: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 font-inter">System Action</label>
        {loading ? (
          <div className="animate-pulse bg-slate-100 h-14 rounded-2xl w-full" />
        ) : (
          <select
            className="w-full px-5 py-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-purple-500 outline-none font-bold text-slate-700 appearance-none"
            value={data.config.actionId || ''}
            onChange={(e) => {
              const action = actions.find(a => a.id === e.target.value);
              onChange({ ...data.config, actionId: e.target.value, params: action?.params.reduce((acc: any, p) => ({ ...acc, [p]: '' }), {}) });
            }}
          >
            <option value="">Select Trigger</option>
            {actions.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
          </select>
        )}
      </div>
      {selectedAction && (
        <div className="pt-4 space-y-4 border-t border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 font-inter">Configuration</p>
          {selectedAction.params.map(param => (
            <div key={param} className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-500 capitalize px-1">{param.replace('_', ' ')}</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-white border-2 border-slate-100 rounded-2xl focus:border-purple-500 outline-none font-bold text-slate-700 text-sm"
                value={data.config.params?.[param] || ''}
                onChange={(e) => onChange({ 
                  ...data.config, 
                  params: { ...data.config.params, [param]: e.target.value } 
                })}
                placeholder={`Set ${param}...`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const EndNodeForm = ({ data, onChange }: FormProps) => (
  <div className="space-y-6">
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 font-inter">Completion Message</label>
      <input
        type="text"
        className="w-full px-5 py-4 bg-white border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-rose-100 focus:border-rose-500 outline-none transition-all font-bold text-slate-700"
        value={data.config.message || ''}
        onChange={(e) => onChange({ ...data.config, message: e.target.value })}
        placeholder="Workflow finished successfully."
      />
    </div>
    <div className="flex items-center gap-3 p-4 bg-white border-2 border-slate-100 rounded-2xl">
      <input
        type="checkbox"
        id="summary"
        className="w-5 h-5 text-rose-600 border-slate-200 rounded-lg focus:ring-rose-500"
        checked={data.config.showSummary || false}
        onChange={(e) => onChange({ ...data.config, showSummary: e.target.checked })}
      />
      <label htmlFor="summary" className="text-sm font-bold text-slate-700 cursor-pointer select-none">Generate Summary Report</label>
    </div>
  </div>
);
