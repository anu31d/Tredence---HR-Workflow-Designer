import React, { useState } from 'react';
import { mockApi } from '@/src/services/mockApi';
import { SimulationResult, WorkflowNode } from '@/src/types/workflow';
import { Edge } from 'reactflow';
import { PlayCircle, Loader2, CheckCircle, AlertCircle, Clock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface SimulationPanelProps {
  nodes: WorkflowNode[];
  edges: Edge[];
}

export const SimulationPanel = ({ nodes, edges }: SimulationPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const runSimulation = async () => {
    setLoading(true);
    setResult(null);
    const res = await mockApi.simulateWorkflow(nodes, edges);
    setResult(res);
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex items-center gap-3 hover:bg-black transition-all font-bold z-10 hover:scale-105 active:scale-95 group"
      >
        <PlayCircle className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
        Run Simulation
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[2000] flex items-center justify-center p-6">
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white rounded-[32px] shadow-[0_40px_100px_rgba(0,0,0,0.25)] w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden border border-white"
            >
              <div className="p-10 border-b border-slate-50 flex items-start justify-between bg-gradient-to-br from-slate-50 to-white">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Design Validator</h2>
                  <p className="text-sm text-slate-500 font-medium mt-1">Stress testing your HR workflow logic</p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="bg-slate-100 p-2 rounded-xl text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-white">
                {!result && !loading && (
                   <div className="text-center py-16 space-y-6">
                      <div className="bg-blue-50 w-24 h-24 rounded-[32px] flex items-center justify-center mx-auto rotate-12 shadow-sm">
                        <Clock className="text-blue-600 w-10 h-10 -rotate-12" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-slate-800">Ready for Execution</h3>
                        <p className="text-slate-500 max-w-sm mx-auto text-sm leading-relaxed">
                          We will now traverse the graph, validate entry/exit points, and simulate system triggers.
                        </p>
                      </div>
                   </div>
                )}

                {loading && (
                  <div className="flex flex-col items-center justify-center py-24 space-y-6">
                    <div className="relative">
                      <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-8 h-8 bg-blue-50 rounded-full animate-ping" />
                      </div>
                    </div>
                    <p className="text-slate-600 font-bold animate-pulse text-lg tracking-tight">Simulating Neural Path...</p>
                  </div>
                )}

                {result && (
                  <div className="space-y-6">
                    {result.error ? (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 bg-rose-50 border-2 border-rose-100 rounded-3xl flex items-start gap-4"
                      >
                        <AlertCircle className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-black text-rose-900 text-lg uppercase tracking-tight">Constraint Violation</p>
                          <p className="text-sm font-medium text-rose-700 leading-relaxed mt-1">{result.error}</p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 bg-emerald-50 border-2 border-emerald-100 rounded-3xl flex items-start gap-4"
                      >
                        <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                           <p className="font-black text-emerald-900 text-lg uppercase tracking-tight">System Integrity Verified</p>
                           <p className="text-sm font-medium text-emerald-700 leading-relaxed mt-1">Found a valid traversable path from Start to End notification.</p>
                        </div>
                      </motion.div>
                    )}

                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 font-inter">Live Execution Log</h4>
                      <div className="space-y-3 relative">
                        <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-slate-100" />
                        {result.steps.map((step, i) => (
                          <motion.div 
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-6 relative"
                          >
                            <div className={cn(
                              "mt-1.5 h-3 w-3 rounded-full shrink-0 z-10 border-2 border-white ring-4",
                              step.status === 'error' ? 'bg-rose-500 ring-rose-50' : 'bg-emerald-500 ring-emerald-50'
                            )} />
                            <div className="flex-1 bg-slate-50/50 hover:bg-slate-50 transition-colors p-5 rounded-2xl border border-slate-100">
                              <div className="flex justify-between items-baseline gap-2 mb-1">
                                <p className="font-black text-slate-800 tracking-tight">{step.nodeLabel}</p>
                                <span className="text-[10px] font-bold font-inter text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-100">
                                  {new Date(step.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                </span>
                              </div>
                              <p className="text-sm font-medium text-slate-500 leading-relaxed">{step.message}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-8 border-t bg-slate-50 flex justify-end gap-4">
                <button
                   onClick={runSimulation}
                   disabled={loading}
                   className={cn(
                     "px-10 py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg active:scale-95",
                     loading ? "bg-slate-200 text-slate-400" : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200 shadow-transparent"
                   )}
                >
                   {loading ? 'Processing...' : (result ? 'Retest Engine' : 'Initialize Simulation')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
