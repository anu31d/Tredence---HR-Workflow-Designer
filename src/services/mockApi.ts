import { AutomationAction, SimulationResult, WorkflowNode, SimulationStep } from '../types/workflow';
import { Edge } from 'reactflow';

export const mockApi = {
  getAutomations: async (): Promise<AutomationAction[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [
      { id: 'send_email', label: 'Send Welcome Email', params: ['to', 'subject', 'body'] },
      { id: 'generate_doc', label: 'Generate Contract PDF', params: ['template_id', 'employee_name'] },
      { id: 'update_payroll', label: 'Update Payroll System', params: ['emp_id', 'salary_details'] },
      { id: 'slack_notify', label: 'Post to Slack Channel', params: ['channel_id', 'message'] },
    ];
  },

  simulateWorkflow: async (nodes: WorkflowNode[], edges: Edge[]): Promise<SimulationResult> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const steps: SimulationStep[] = [];
    const startNode = nodes.find((n) => n.data.type === 'start');

    if (!startNode) {
      return {
        success: false,
        error: 'Workflow must have a Start Node.',
        steps: [],
      };
    }

    // Basic graph traversal simulation
    let currentNode: WorkflowNode | undefined = startNode;
    const visited = new Set<string>();

    while (currentNode) {
      if (visited.has(currentNode.id)) {
        return {
          success: false,
          error: 'Circular dependency detected.',
          steps,
        };
      }
      visited.add(currentNode.id);

      steps.push({
        nodeId: currentNode.id,
        nodeLabel: currentNode.data.label || 'Untitled Node',
        status: 'completed',
        message: `Executed ${currentNode.data.type} logic successfully.`,
        timestamp: new Date().toISOString(),
      });

      if (currentNode.data.type === 'end') break;

      const nextEdge = edges.find((e) => e.source === currentNode?.id);
      currentNode = nodes.find((n) => n.id === nextEdge?.target);

      if (!currentNode && !steps.find(s => s.nodeId === (visited.size > 0 ? Array.from(visited).pop() : ''))?.message.includes('end')) {
         // If no next node and not an end node
         steps.push({
            nodeId: 'error',
            nodeLabel: 'System',
            status: 'error',
            message: 'Workflow stalled. Incomplete path.',
            timestamp: new Date().toISOString()
         });
         break;
      }
    }

    return {
      success: steps.some(s => s.status === 'completed' && nodes.find(n => n.id === s.nodeId)?.data.type === 'end'),
      steps,
    };
  },
};
