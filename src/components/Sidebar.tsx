import React from 'react';
import { Play, ClipboardList, CheckCircle2, Cpu, Flag } from 'lucide-react';
import { NodeType } from '@/src/types/workflow';

const NODE_TYPES = [
  { type: 'start' as NodeType, label: 'Start Node', icon: Play, color: 'text-emerald-500' },
  { type: 'task' as NodeType, label: 'Task Node', icon: ClipboardList, color: 'text-blue-500' },
  { type: 'approval' as NodeType, label: 'Approval Node', icon: CheckCircle2, color: 'text-amber-500' },
  { type: 'automation' as NodeType, label: 'Automation', icon: Cpu, color: 'text-purple-500' },
  { type: 'end' as NodeType, label: 'End Notification', icon: Flag, color: 'text-rose-500' },
];

export const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-80 bg-white border-r border-slate-100 p-8 flex flex-col h-full shadow-[20px_0_40px_rgba(0,0,0,0.01)] z-50">
      <div className="mb-10 space-y-2">
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-blue-600" />
           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600/60 font-inter">HR Workflow</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Designer</h2>
        <p className="text-sm font-medium text-slate-400 leading-relaxed">
           Architect your automated employee lifecycle processes.
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest px-1 font-inter">Components Library</p>
        <div className="space-y-3">
          {NODE_TYPES.map((node) => (
            <div
              key={node.type}
              draggable
              onDragStart={(e) => onDragStart(e, node.type)}
              className="flex items-center gap-4 p-4 bg-white border-2 border-slate-50 rounded-2xl cursor-grab hover:border-blue-100 hover:shadow-[0_10px_20px_rgba(0,0,0,0.02)] transition-all group active:scale-95 active:cursor-grabbing"
            >
              <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                 <node.icon className={`w-5 h-5 ${node.color} transition-transform group-hover:scale-110`} />
              </div>
              <div className="flex-1">
                <span className="text-sm font-bold text-slate-700 block tracking-tight group-hover:text-slate-900">{node.label}</span>
                <span className="text-[10px] font-medium text-slate-400 font-inter">Standard Node</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto space-y-4">
        <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-3 opacity-20 transition-transform group-hover:scale-125">
             <Cpu className="text-blue-400 w-12 h-12" />
          </div>
          <p className="text-xs font-black text-blue-400 mb-2 uppercase tracking-widest font-inter">Pro Tip</p>
          <p className="text-sm text-slate-400 font-medium leading-relaxed relative z-10">
            Connect nodes by logic paths. Use automated nodes to trigger API actions.
          </p>
        </div>
      </div>
    </div>
  );
};
