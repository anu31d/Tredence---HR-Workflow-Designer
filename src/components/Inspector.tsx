import { X, Trash2 } from 'lucide-react';
import { 
  StartNodeForm, 
  TaskNodeForm, 
  ApprovalNodeForm, 
  AutomationNodeForm, 
  EndNodeForm 
} from './Forms';
import { WorkflowNode } from '@/src/types/workflow';
import { motion, AnimatePresence } from 'motion/react';

interface InspectorProps {
  node: WorkflowNode | null;
  onUpdate: (id: string, config: any) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export const Inspector = ({ node, onUpdate, onDelete, onClose }: InspectorProps) => {
  if (!node) return null;

  const renderForm = () => {
    switch (node.data.type) {
      case 'start': return <StartNodeForm data={node.data} onChange={(c) => onUpdate(node.id, c)} />;
      case 'task': return <TaskNodeForm data={node.data} onChange={(c) => onUpdate(node.id, c)} />;
      case 'approval': return <ApprovalNodeForm data={node.data} onChange={(c) => onUpdate(node.id, c)} />;
      case 'automation': return <AutomationNodeForm data={node.data} onChange={(c) => onUpdate(node.id, c)} />;
      case 'end': return <EndNodeForm data={node.data} onChange={(c) => onUpdate(node.id, c)} />;
      default: return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        exit={{ x: 400 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-[420px] bg-white border-l border-slate-200 shadow-[0_0_40px_rgba(0,0,0,0.05)] absolute top-0 right-0 h-full z-[1000] overflow-y-auto flex flex-col"
      >
        <div className="p-8 border-b border-slate-100 sticky top-0 bg-white/90 backdrop-blur-xl z-20 flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest font-inter">Step Configuration</p>
            <h3 className="text-2xl font-bold text-slate-800 capitalize leading-tight">{node.data.type}</h3>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                if(confirm('Are you sure you want to delete this step?')) {
                  onDelete(node.id);
                  onClose();
                }
              }}
              className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
              title="Delete stage"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button 
              onClick={onClose}
              className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-8 flex-1">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-inner">
            {renderForm()}
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
           <p className="text-[10px] text-slate-400 text-center font-medium font-inter">Changes are automatically saved to the workflow graph</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
