import React from "react";

interface DashBoardProps {
  from: Date;
  to: Date;
  refresh: string;
}

const DashBoard: React.FC<DashBoardProps> = ({ from, to, refresh }) => {
  return (
    <div className="space-y-4">
      {/* Dashboard Status Display */}
      <div className="bg-grafana-bg-secondary border border-grafana-border rounded p-4">
        <h2 className="text-lg font-semibold text-grafana-text-primary mb-4">
          Dashboard Configuration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-grafana-text-secondary">From:</span>
            <div className="text-grafana-text-primary font-mono mt-1">
              {from.toISOString().replace('T', ' ').slice(0, 19)}
            </div>
          </div>
          <div>
            <span className="text-grafana-text-secondary">To:</span>
            <div className="text-grafana-text-primary font-mono mt-1">
              {to.toISOString().replace('T', ' ').slice(0, 19)}
            </div>
          </div>
          <div>
            <span className="text-grafana-text-secondary">Refresh:</span>
            <div className="text-grafana-text-primary font-mono mt-1">
              {refresh}
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder for actual dashboard content */}
      <div className="bg-grafana-bg-secondary border border-grafana-border rounded p-6 min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-grafana-text-secondary text-lg mb-2">
            Dashboard Content
          </div>
          <div className="text-grafana-text-secondary text-sm">
            This is where your Grafana charts and panels would be displayed.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;