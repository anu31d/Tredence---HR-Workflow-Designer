import React, { useCallback, useRef } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  ReactFlowProvider,
  Panel
} from 'reactflow';
import { Sidebar } from './Sidebar';
import { Inspector } from './Inspector';
import { CustomNode } from './Nodes';
import { useWorkflow } from '../../hooks/useWorkflow';
import { SimulationPanel } from './SimulationPanel';
import { NodeType } from '../../types/workflow';

const nodeTypes = {
  custom: CustomNode,
};

export const WorkflowDesigner = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect, 
    onNodeClick, 
    onPaneClick,
    selectedNodeId,
    updateNodeData,
    addNode,
    deleteNode,
    setReactFlowInstance
  } = useWorkflow();

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || null;

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as NodeType;
      if (!type || !reactFlowWrapper.current) return;

      const rect = reactFlowWrapper.current.getBoundingClientRect();
      const position = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };

      addNode(type, position);
    },
    [addNode]
  );

  return (
    <div className="flex h-screen w-full relative overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 h-full relative" ref={reactFlowWrapper}>
        <div className="absolute top-8 left-8 z-20 pointer-events-none">
           <div className="bg-white/90 backdrop-blur-md border border-slate-200 px-6 py-4 rounded-[28px] shadow-2xl flex items-center gap-6 pointer-events-auto">
              <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="avatar" referrerPolicy="no-referrer" />
                    </div>
                 ))}
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                 <p className="text-sm font-black text-slate-800 tracking-tight">Onboarding Workflow v1.02</p>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-inter flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Collaboration Active
                 </p>
              </div>
           </div>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          className="bg-slate-50"
        >
          <Background color="#cbd5e1" gap={20} size={1.5} />
          <Controls showInteractive={false} className="shadow-lg border-2 border-white rounded-lg overflow-hidden" />
        </ReactFlow>

        <SimulationPanel nodes={nodes} edges={edges} />
      </div>

      <Inspector 
        node={selectedNode} 
        onUpdate={updateNodeData} 
        onDelete={deleteNode}
        onClose={onPaneClick} 
      />
    </div>
  );
};

export default function DesignerWrapper() {
  return (
    <ReactFlowProvider>
      <WorkflowDesigner />
    </ReactFlowProvider>
  );
}
