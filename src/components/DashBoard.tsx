import React, { useState } from "react";
import TimeRangePicker from "./GrafanaTimeRangePicker";
import RefreshControl from "./GrafanaRefreshControl";

interface DashBoardProps {
  from: Date;
  to: Date;
  refresh: string;
}

const DashBoard: React.FC<DashBoardProps> = ({ from, to, refresh }) => {
  // Individual state for each chart
  const [chart1State, setChart1State] = useState({
    from: new Date(Date.now() - 24 * 60 * 60 * 1000),
    to: new Date(),
    refresh: "5m"
  });

  const [chart2State, setChart2State] = useState({
    from: new Date(Date.now() - 12 * 60 * 60 * 1000),
    to: new Date(),
    refresh: "1m"
  });

  const [chart3State, setChart3State] = useState({
    from: new Date(Date.now() - 6 * 60 * 60 * 1000),
    to: new Date(),
    refresh: "30s"
  });

  const [chart4State, setChart4State] = useState({
    from: new Date(Date.now() - 3 * 60 * 60 * 1000),
    to: new Date(),
    refresh: "10s"
  });

  const handleApplyTimeRange = (chartNumber: number) => {
    console.log(`Chart ${chartNumber} time range applied`);
  };

  const handleRefreshNow = (chartNumber: number) => {
    console.log(`Refreshing chart ${chartNumber}...`);
  };

  const renderChart = (
    title: string,
    chartNumber: number,
    state: any,
    setState: any,
    grafanaUrl: string
  ) => (
    <div className="bg-grafana-bg-secondary border border-grafana-border rounded">
      <div className="border-b border-grafana-border p-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-grafana-text-primary">{title}</h3>
        <div className="flex items-center gap-2">
          <TimeRangePicker
            from={state.from}
            to={state.to}
            onFromChange={(date) => setState({...state, from: date})}
            onToChange={(date) => setState({...state, to: date})}
            onApply={() => handleApplyTimeRange(chartNumber)}
          />
          <RefreshControl
            refresh={state.refresh}
            onRefreshChange={(refresh) => setState({...state, refresh})}
            onRefreshNow={() => handleRefreshNow(chartNumber)}
          />
        </div>
      </div>
      <div className="p-0 h-80">
        <iframe
          src={grafanaUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          className="rounded-b"
          title={`${title} Chart`}
        />
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {renderChart(
        "CPU Usage",
        1,
        chart1State,
        setChart1State,
        "https://grafana.example.com/d-solo/cpu-dashboard/cpu-usage"
      )}
      
      {renderChart(
        "Memory Usage",
        2,
        chart2State,
        setChart2State,
        "https://grafana.example.com/d-solo/memory-dashboard/memory-usage"
      )}
      
      {renderChart(
        "Network Traffic",
        3,
        chart3State,
        setChart3State,
        "https://grafana.example.com/d-solo/network-dashboard/network-traffic"
      )}
      
      {renderChart(
        "Disk Usage",
        4,
        chart4State,
        setChart4State,
        "https://grafana.example.com/d-solo/disk-dashboard/disk-usage"
      )}
    </div>
  );
};

export default DashBoard;