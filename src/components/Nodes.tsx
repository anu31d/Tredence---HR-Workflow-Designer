import { Handle, Position } from 'reactflow';
import { Play, ClipboardList, CheckCircle2, Cpu, Flag } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const nodeStyles = {
  start: 'border-emerald-500 bg-white ring-emerald-50',
  task: 'border-blue-500 bg-white ring-blue-50',
  approval: 'border-amber-500 bg-white ring-amber-50',
  automation: 'border-purple-500 bg-white ring-purple-50',
  end: 'border-rose-500 bg-white ring-rose-50',
};

const iconBgStyles = {
  start: 'bg-emerald-50 text-emerald-600',
  task: 'bg-blue-50 text-blue-600',
  approval: 'bg-amber-50 text-amber-600',
  automation: 'bg-purple-50 text-purple-600',
  end: 'bg-rose-50 text-rose-600',
};

const NodeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'start': return <Play className="w-4 h-4 fill-current" />;
    case 'task': return <ClipboardList className="w-4 h-4" />;
    case 'approval': return <CheckCircle2 className="w-4 h-4" />;
    case 'automation': return <Cpu className="w-4 h-4" />;
    case 'end': return <Flag className="w-4 h-4 fill-current" />;
    default: return null;
  }
};

export const CustomNode = ({ data, selected }: any) => {
  const isStart = data.type === 'start';
  const isEnd = data.type === 'end';

  return (
    <div className={cn(
      "group relative px-5 py-4 rounded-2xl border-2 transition-all duration-300 min-w-[220px]",
      "shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]",
      nodeStyles[data.type as keyof typeof nodeStyles],
      selected ? "ring-4 border-blue-500" : "ring-0"
    )}>
      {!isStart && (
        <Handle 
          type="target" 
          position={Position.Top} 
          className="w-12 h-2 !rounded-none !bg-transparent !border-none !top-[-10px]" 
        />
      )}
      
      <div className="flex items-center gap-4">
        <div className={cn(
          "p-3 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
          iconBgStyles[data.type as keyof typeof iconBgStyles]
        )}>
          <NodeIcon type={data.type} />
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.1em] font-inter">
            {data.type}
          </p>
          <p className="text-sm font-bold text-slate-800 line-clamp-1">
            {data.label || 'Untitled Step'}
          </p>
        </div>
      </div>

      {selected && (
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
           <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      )}

      {!isEnd && (
        <Handle 
          type="source" 
          position={Position.Bottom} 
          className="w-12 h-2 !rounded-none !bg-transparent !border-none !bottom-[-10px]" 
        />
      )}
    </div>
  );
};
