# HR Workflow Designer Module

A high-fidelity, production-ready visual designer for HR administrators. This tool enables the creation, configuration, and testing of complex employee lifecycle processes like onboarding, leave approvals, and multi-stage document verifications.

## 🚀 Key Features

- **Intuitive Visual Canvas**: Powered by React Flow v11, featuring a draggable grid, smooth zooming, and custom-styled edges.
- **Custom Node Architecture**: 
  - **Start**: Entry point with metadata support.
  - **Task**: Human intervention steps with assignee and deadline tracking.
  - **Approval**: Hierarchical decision points with confidence threshold logic.
  - **Automation**: Integration-ready nodes for system triggers (Emails, Slack, PDF generation).
  - **End**: Finalization stages with automated reporting.
- **Contextual Inspector Panel**: Slides in with Framer Motion, providing deep-dive configuration for every step without losing canvas context.
- **Real-time Validation Engine**: A robust simulation sandbox that analyzes graph integrity, identifies broken paths, and detects circular logic.
- **Enterprise Aesthetics**: Clean, data-driven design using the **Outfit** and **Inter** font family for maximum legibility and a premium "SaaS" feel.

## 🛠 Technical Architecture

- **React & TypeScript**: Strong typing for all workflow schemas and node configurations.
- **React Flow**: Used for graph representation and interaction logic.
- **Framer Motion**: Handles all UI micro-interactions, panel transitions, and modal animations.
- **Tailwind CSS**: Utility-first styling for high-performance, responsive UI.
- **Mock API Service**: Simulated backend for fetching dynamic automation actions and verifying graph traversability.

## 🧪 Simulation Logic

The simulation engine uses a deterministic graph traversal algorithm:
1. **Entry Check**: Ensures a valid `Start` node exists.
2. **Cycle Detection**: Prevents infinite loops by tracking visited nodes.
3. **Connectivity Analysis**: Identifies nodes that are not properly connected to a resolution path.
4. **Step-by-Step Reporting**: Generates a detailed timestamped log of how a signal would travel through the designed workflow.

## 📈 Future Enhancements

- **Backend Persistence**: Hooking up Firestore for saving and versioning workflows.
- **Conditional Branching**: Adding "If/Else" logic nodes for advanced routing.
- **Collaborative Editing**: Real-time multi-user editing using WebSockets.
- **Export/Import**: Standardized JSON schema for sharing workflows across environments.

## 📖 How to Run

1. **Install Dependencies**: `npm install`
2. **Start Dev Server**: `npm run dev`
3. **Build for Production**: `npm run build`
