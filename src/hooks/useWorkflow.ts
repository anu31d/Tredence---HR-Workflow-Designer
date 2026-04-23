import React, { useCallback, useState } from 'react';
import { 
  addEdge, 
  applyEdgeChanges, 
  applyNodeChanges, 
  Connection, 
  Edge, 
  EdgeChange, 
  NodeChange, 
  ReactFlowInstance 
} from 'reactflow';
import { WorkflowNode, NodeType } from '../types/workflow';

const initialNodes: WorkflowNode[] = [
  {
    id: 'start-1',
    type: 'custom',
    data: { label: 'Onboarding Start', type: 'start' as NodeType, config: { title: 'New Employee Onboarding' } },
    position: { x: 250, y: 50 },
  },
];

const initialEdges: Edge[] = [];

export function useWorkflow() {
  const [nodes, setNodes] = useState<WorkflowNode[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds) as WorkflowNode[]),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, style: { strokeWidth: 2 } }, eds)),
    []
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: WorkflowNode) => {
    setSelectedNodeId(node.id);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  const updateNodeData = useCallback((nodeId: string, config: any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              label: config.title || node.data.label,
              config,
            },
          };
        }
        return node;
      })
    );
  }, []);

  const addNode = useCallback((type: NodeType, position: { x: number; y: number }) => {
    const newNode: WorkflowNode = {
      id: `${type}-${Date.now()}`,
      type: 'custom',
      data: { 
        label: `New ${type}`, 
        type, 
        config: {} 
      },
      position,
    };
    setNodes((nds) => nds.concat(newNode));
  }, []);

  const deleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    setSelectedNodeId(null);
  }, []);

  return {
    nodes,
    edges,
    selectedNodeId,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    onPaneClick,
    updateNodeData,
    addNode,
    deleteNode,
    setReactFlowInstance,
  };
}
