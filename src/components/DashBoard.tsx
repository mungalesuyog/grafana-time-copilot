import React from "react";

interface DashBoardProps {
  from: Date;
  to: Date;
  refresh: string;
}

const DashBoard: React.FC<DashBoardProps> = ({ from, to, refresh }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Chart 1 */}
      <div className="bg-grafana-bg-secondary border border-grafana-border rounded">
        <div className="border-b border-grafana-border p-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-grafana-text-primary">CPU Usage</h3>
          <div className="flex items-center gap-2">
            <button className="text-xs text-grafana-text-secondary hover:text-grafana-text-primary">⚙️</button>
            <button className="text-xs text-grafana-text-secondary hover:text-grafana-text-primary">⋯</button>
          </div>
        </div>
        <div className="p-4 h-64 flex items-center justify-center">
          <div className="text-center text-grafana-text-secondary">
            <div className="text-sm">CPU Usage Chart</div>
            <div className="text-xs mt-1">Time range: {from.toLocaleString()} - {to.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Chart 2 */}
      <div className="bg-grafana-bg-secondary border border-grafana-border rounded">
        <div className="border-b border-grafana-border p-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-grafana-text-primary">Memory Usage</h3>
          <div className="flex items-center gap-2">
            <button className="text-xs text-grafana-text-secondary hover:text-grafana-text-primary">⚙️</button>
            <button className="text-xs text-grafana-text-secondary hover:text-grafana-text-primary">⋯</button>
          </div>
        </div>
        <div className="p-4 h-64 flex items-center justify-center">
          <div className="text-center text-grafana-text-secondary">
            <div className="text-sm">Memory Usage Chart</div>
            <div className="text-xs mt-1">Refresh: {refresh}</div>
          </div>
        </div>
      </div>

      {/* Chart 3 */}
      <div className="bg-grafana-bg-secondary border border-grafana-border rounded">
        <div className="border-b border-grafana-border p-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-grafana-text-primary">Network Traffic</h3>
          <div className="flex items-center gap-2">
            <button className="text-xs text-grafana-text-secondary hover:text-grafana-text-primary">⚙️</button>
            <button className="text-xs text-grafana-text-secondary hover:text-grafana-text-primary">⋯</button>
          </div>
        </div>
        <div className="p-4 h-64 flex items-center justify-center">
          <div className="text-center text-grafana-text-secondary">
            <div className="text-sm">Network Traffic Chart</div>
            <div className="text-xs mt-1">Data visualization placeholder</div>
          </div>
        </div>
      </div>

      {/* Chart 4 */}
      <div className="bg-grafana-bg-secondary border border-grafana-border rounded">
        <div className="border-b border-grafana-border p-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-grafana-text-primary">Disk Usage</h3>
          <div className="flex items-center gap-2">
            <button className="text-xs text-grafana-text-secondary hover:text-grafana-text-primary">⚙️</button>
            <button className="text-xs text-grafana-text-secondary hover:text-grafana-text-primary">⋯</button>
          </div>
        </div>
        <div className="p-4 h-64 flex items-center justify-center">
          <div className="text-center text-grafana-text-secondary">
            <div className="text-sm">Disk Usage Chart</div>
            <div className="text-xs mt-1">Ready for data integration</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;