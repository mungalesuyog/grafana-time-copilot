import React, { useState } from "react";
import { RotateCcw, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface RefreshControlProps {
  refresh: string;
  onRefreshChange: (refresh: string) => void;
  onRefreshNow: () => void;
}

const RefreshControl: React.FC<RefreshControlProps> = ({
  refresh,
  onRefreshChange,
  onRefreshNow,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const refreshOptions = [
    { label: "Auto refresh off", value: "off" },
    { label: "Auto", value: "auto" },
    { label: "5s", value: "5s" },
    { label: "10s", value: "10s" },
    { label: "30s", value: "30s" },
    { label: "1m", value: "1m" },
    { label: "5m", value: "5m" },
    { label: "15m", value: "15m" },
    { label: "30m", value: "30m" },
    { label: "1h", value: "1h" },
    { label: "2h", value: "2h" },
    { label: "1d", value: "1d" },
  ];

  const getCurrentLabel = () => {
    const option = refreshOptions.find(opt => opt.value === refresh);
    return option ? option.label : refresh;
  };

  return (
    <div className="flex items-center gap-1">
      {/* Refresh Button */}
      <Button
        onClick={onRefreshNow}
        variant="outline"
        size="sm"
        className="h-8 px-2 bg-grafana-bg-primary border-grafana-border text-grafana-text-primary hover:bg-grafana-hover"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>

      {/* Refresh Dropdown */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-8 px-3 bg-grafana-bg-primary border-grafana-border text-grafana-text-primary hover:bg-grafana-hover",
              "min-w-[80px] justify-between text-sm"
            )}
          >
            <span>{getCurrentLabel()}</span>
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-48 p-1 bg-grafana-bg-secondary border-grafana-border"
          align="end"
        >
          <div className="space-y-0.5">
            {refreshOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onRefreshChange(option.value);
                  setIsOpen(false);
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
  );
};

export default RefreshControl;