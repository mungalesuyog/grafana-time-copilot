import React, { useState } from "react";
import { RotateCcw, Clock, ChevronDown } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import DashBoard from "./DashBoard";
import { cn } from "@/lib/utils";

const DashboardControls = () => {
  const [from, setFrom] = useState(new Date(Date.now() - 24 * 60 * 60 * 1000));
  const [to, setTo] = useState(new Date());
  const [refresh, setRefresh] = useState("15s");
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [isRefreshOpen, setIsRefreshOpen] = useState(false);

  const quickRanges = [
    { label: "Last 5 minutes", value: "now-5m" },
    { label: "Last 15 minutes", value: "now-15m" },
    { label: "Last 30 minutes", value: "now-30m" },
    { label: "Last 1 hour", value: "now-1h" },
    { label: "Last 6 hours", value: "now-6h" },
    { label: "Last 12 hours", value: "now-12h" },
    { label: "Last 24 hours", value: "now-24h" },
    { label: "Last 7 days", value: "now-7d" },
  ];

  const refreshOptions = [
    { label: "Auto refresh off", value: "off" },
    { label: "5s", value: "5s" },
    { label: "15s", value: "15s" },
    { label: "30s", value: "30s" },
    { label: "1m", value: "1m" },
    { label: "5m", value: "5m" },
    { label: "10m", value: "10m" },
    { label: "30m", value: "30m" },
    { label: "1h", value: "1h" },
    { label: "1d", value: "1d" },
  ];

  const handleQuickRange = (range: any) => {
    const now = new Date();
    let fromDate = new Date();
    
    if (range.value.includes('m')) {
      const minutes = parseInt(range.value.replace('now-', '').replace('m', ''));
      fromDate = new Date(now.getTime() - minutes * 60 * 1000);
    } else if (range.value.includes('h')) {
      const hours = parseInt(range.value.replace('now-', '').replace('h', ''));
      fromDate = new Date(now.getTime() - hours * 60 * 60 * 1000);
    } else if (range.value.includes('d')) {
      const days = parseInt(range.value.replace('now-', '').replace('d', ''));
      fromDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    }
    
    setFrom(fromDate);
    setTo(now);
    setIsTimePickerOpen(false);
  };

  const handleRefreshNow = () => {
    console.log("Refreshing dashboard...");
  };

  const formatDateTime = (date: Date) => {
    return date.toISOString().replace('T', ' ').slice(0, 19);
  };

  const formatDisplayRange = () => {
    const fromStr = formatDateTime(from);
    const toStr = formatDateTime(to);
    return `${fromStr} to ${toStr}`;
  };

  const getCurrentRefreshLabel = () => {
    const option = refreshOptions.find(opt => opt.value === refresh);
    return option ? option.label : refresh;
  };

  return (
    <div className="min-h-screen bg-grafana-bg-primary">
      {/* Top Control Bar */}
      <div className="sticky top-0 z-50 bg-grafana-bg-primary border-b border-grafana-border">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <div className="text-grafana-text-primary font-medium">
              Dashboard
            </div>
          </div>

          {/* Right side - Time and Refresh controls */}
          <div className="flex items-center gap-3">
            {/* Time Range Picker */}
            <Popover open={isTimePickerOpen} onOpenChange={setIsTimePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-between text-left font-normal bg-grafana-bg-primary border-grafana-border text-grafana-text-primary hover:bg-grafana-hover",
                    "min-w-[280px] h-8 px-3 text-sm"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="truncate">{formatDisplayRange()}</span>
                  </div>
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent 
                className="w-96 p-0 bg-grafana-bg-secondary border-grafana-border"
                align="start"
              >
                <div className="p-4 border-b border-grafana-border">
                  <h3 className="text-sm font-medium text-grafana-text-primary mb-3">Absolute time range</h3>
                  
                  {/* From/To Inputs */}
                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="text-xs font-medium text-grafana-text-primary mb-1 block">From</label>
                      <DatePicker
                        selected={from}
                        onChange={(date: Date | null) => date && setFrom(date)}
                        showTimeSelect
                        timeFormat="HH:mm:ss"
                        timeIntervals={1}
                        dateFormat="yyyy-MM-dd HH:mm:ss"
                        className="w-full h-8 px-3 text-sm bg-grafana-bg-tertiary border border-grafana-border rounded text-grafana-text-primary focus:outline-none focus:ring-2 focus:ring-grafana-active focus:border-grafana-active"
                      />
                    </div>
                    
                    <div>
                      <label className="text-xs font-medium text-grafana-text-primary mb-1 block">To</label>
                      <DatePicker
                        selected={to}
                        onChange={(date: Date | null) => date && setTo(date)}
                        showTimeSelect
                        timeFormat="HH:mm:ss"
                        timeIntervals={1}
                        dateFormat="yyyy-MM-dd HH:mm:ss"
                        className="w-full h-8 px-3 text-sm bg-grafana-bg-tertiary border border-grafana-border rounded text-grafana-text-primary focus:outline-none focus:ring-2 focus:ring-grafana-active focus:border-grafana-active"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => setIsTimePickerOpen(false)}
                      className="bg-grafana-active hover:bg-grafana-active/90 text-white text-sm h-8 px-4"
                    >
                      Apply time range
                    </Button>
                  </div>
                </div>

                {/* Quick Ranges */}
                <div className="p-4">
                  <div className="mb-4 max-h-48 overflow-y-auto">
                    {quickRanges.map((range) => (
                      <button
                        key={range.value}
                        onClick={() => handleQuickRange(range)}
                        className="w-full text-left px-3 py-1.5 text-sm text-grafana-text-primary hover:bg-grafana-hover rounded-sm transition-colors"
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Refresh Control */}
            <div className="flex items-center gap-1">
              {/* Refresh Button */}
              <Button
                onClick={handleRefreshNow}
                variant="outline"
                size="sm"
                className="h-8 px-2 bg-grafana-bg-primary border-grafana-border text-grafana-text-primary hover:bg-grafana-hover"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>

              {/* Refresh Dropdown */}
              <Popover open={isRefreshOpen} onOpenChange={setIsRefreshOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "h-8 px-3 bg-grafana-bg-primary border-grafana-border text-grafana-text-primary hover:bg-grafana-hover",
                      "min-w-[80px] justify-between text-sm"
                    )}
                  >
                    <span>{getCurrentRefreshLabel()}</span>
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-48 p-1 bg-grafana-bg-secondary border-grafana-border z-50"
                  align="end"
                >
                  <div className="space-y-0.5">
                    {refreshOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setRefresh(option.value);
                          setIsRefreshOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-3 py-2 text-sm rounded-sm transition-colors",
                          refresh === option.value
                            ? "bg-grafana-active text-white"
                            : "text-grafana-text-primary hover:bg-grafana-hover"
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
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

export default DashboardControls;