import React, { useState } from "react";
import { Calendar, Clock, ChevronDown, Search } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface TimeRangePickerProps {
  from: Date;
  to: Date;
  onFromChange: (date: Date) => void;
  onToChange: (date: Date) => void;
  onApply: () => void;
}

const TimeRangePicker: React.FC<TimeRangePickerProps> = ({
  from,
  to,
  onFromChange,
  onToChange,
  onApply,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const quickRanges = [
    { label: "Last 5 minutes", value: "now-5m" },
    { label: "Last 15 minutes", value: "now-15m" },
    { label: "Last 30 minutes", value: "now-30m" },
    { label: "Last 1 hour", value: "now-1h" },
    { label: "Last 3 hours", value: "now-3h" },
    { label: "Last 6 hours", value: "now-6h" },
    { label: "Last 12 hours", value: "now-12h" },
    { label: "Last 24 hours", value: "now-24h" },
    { label: "Last 2 days", value: "now-2d" },
    { label: "Last 7 days", value: "now-7d" },
  ];

  const recentlyUsedRanges = [
    "2014-07-05 12:00:00 to 2046-06-27 11:59:59"
  ];

  const formatDateTime = (date: Date) => {
    return date.toISOString().replace('T', ' ').slice(0, 19);
  };

  const formatDisplayRange = () => {
    const fromStr = formatDateTime(from);
    const toStr = formatDateTime(to);
    return `${fromStr} to ${toStr}`;
  };

  const filteredRanges = quickRanges.filter(range =>
    range.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
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
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-grafana-text-secondary" />
            <Input
              placeholder="Search quick ranges"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-grafana-bg-tertiary border-grafana-border text-grafana-text-primary placeholder:text-grafana-text-secondary h-9"
            />
          </div>

          {/* From/To Inputs */}
          <div className="space-y-3 mb-4">
            <div>
              <label className="text-xs font-medium text-grafana-text-primary mb-1 block">From</label>
              <div className="relative">
                <DatePicker
                  selected={from}
                  onChange={onFromChange}
                  showTimeSelect
                  timeFormat="HH:mm:ss"
                  timeIntervals={1}
                  dateFormat="yyyy-MM-dd HH:mm:ss"
                  className="w-full h-8 px-3 text-sm bg-grafana-bg-tertiary border border-grafana-border rounded text-grafana-text-primary focus:outline-none focus:ring-2 focus:ring-grafana-active focus:border-grafana-active"
                />
                <Calendar className="absolute right-3 top-2 h-4 w-4 text-grafana-text-secondary pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="text-xs font-medium text-grafana-text-primary mb-1 block">To</label>
              <div className="relative">
                <DatePicker
                  selected={to}
                  onChange={onToChange}
                  showTimeSelect
                  timeFormat="HH:mm:ss"
                  timeIntervals={1}
                  dateFormat="yyyy-MM-dd HH:mm:ss"
                  className="w-full h-8 px-3 text-sm bg-grafana-bg-tertiary border border-grafana-border rounded text-grafana-text-primary focus:outline-none focus:ring-2 focus:ring-grafana-active focus:border-grafana-active"
                />
                <Calendar className="absolute right-3 top-2 h-4 w-4 text-grafana-text-secondary pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => {
                onApply();
                setIsOpen(false);
              }}
              className="bg-grafana-active hover:bg-grafana-active/90 text-white text-sm h-8 px-4"
            >
              Apply time range
            </Button>
          </div>
        </div>

        {/* Quick Ranges */}
        <div className="p-4">
          <div className="mb-4 max-h-48 overflow-y-auto">
            {filteredRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => {
                  // Handle quick range selection
                  const now = new Date();
                  let fromDate = new Date();
                  
                  // Parse the range value (simplified)
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
                  
                  onFromChange(fromDate);
                  onToChange(now);
                  onApply();
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 text-sm text-grafana-text-primary hover:bg-grafana-hover rounded-sm transition-colors"
              >
                {range.label}
              </button>
            ))}
          </div>

          {/* Recently used ranges */}
          <div>
            <h4 className="text-xs font-medium text-grafana-text-primary mb-2">Recently used absolute ranges</h4>
            {recentlyUsedRanges.map((range, index) => (
              <button
                key={index}
                className="w-full text-left px-3 py-1.5 text-sm text-grafana-text-secondary hover:bg-grafana-hover rounded-sm transition-colors"
              >
                {range}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-grafana-border">
            <div className="flex justify-between items-center text-xs text-grafana-text-secondary">
              <span>Browser Time IST</span>
              <span>UTC+05:30</span>
              <button className="text-grafana-active hover:underline">
                Change time settings
              </button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TimeRangePicker;