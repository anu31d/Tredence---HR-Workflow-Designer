import { Node, Edge } from 'reactflow';

export type NodeType = 'start' | 'task' | 'approval' | 'automation' | 'end';

export interface WorkflowNodeData {
  label: string;
  type: NodeType;
  config: any;
}

export type WorkflowNode = Node<WorkflowNodeData>;

export interface AutomationAction {
  id: string;
  label: string;
  params: string[];
}

export interface SimulationStep {
  nodeId: string;
  nodeLabel: string;
  status: 'completed' | 'blocked' | 'error';
  message: string;
  timestamp: string;
}

export interface SimulationResult {
  steps: SimulationStep[];
  success: boolean;
  error?: string;
}
