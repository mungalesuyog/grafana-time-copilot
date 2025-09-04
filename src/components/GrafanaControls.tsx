import React, { useState } from "react";
import TimeRangePicker from "./GrafanaTimeRangePicker";
import RefreshControl from "./GrafanaRefreshControl";
import DashBoard from "./DashBoard";

const GrafanaControls = () => {
  const [from, setFrom] = useState(new Date(Date.now() - 24 * 60 * 60 * 1000)); // 24 hours ago
  const [to, setTo] = useState(new Date());
  const [refresh, setRefresh] = useState("5m");

  const handleApplyTimeRange = () => {
    // This could trigger a dashboard refresh or update
    console.log("Time range applied:", { from, to });
  };

  const handleRefreshNow = () => {
    console.log("Refreshing dashboard...");
    // Trigger immediate dashboard refresh
  };

  return (
    <div className="min-h-screen bg-grafana-bg-primary">
      {/* Top Control Bar */}
      <div className="sticky top-0 z-50 bg-grafana-bg-primary border-b border-grafana-border">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            {/* Left side - could include dashboard title, breadcrumbs etc */}
            <div className="text-grafana-text-primary font-medium">
              Dashboard
            </div>
          </div>

          {/* Right side - Time and Refresh controls */}
          <div className="flex items-center gap-3">
            <TimeRangePicker
              from={from}
              to={to}
              onFromChange={setFrom}
              onToChange={setTo}
              onApply={handleApplyTimeRange}
            />
            
            <RefreshControl
              refresh={refresh}
              onRefreshChange={setRefresh}
              onRefreshNow={handleRefreshNow}
            />
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-4">
        <DashBoard from={from} to={to} refresh={refresh} />
      </div>
    </div>
  );
};

export default GrafanaControls;