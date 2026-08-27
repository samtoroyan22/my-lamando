"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";

import { Button } from "@/components/ui/button";

interface MultiSelectProps {
  options: readonly string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  maxVisible?: number;
}

const MultiSelect = ({
  options,
  value,
  onChange,
  placeholder = "Select works...",
  disabled = false,
  maxVisible = 4,
}: MultiSelectProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((item) => item !== option));
      return;
    }

    onChange([...value, option]);
  };

  const removeOption = (option: string) => {
    onChange(value.filter((item) => item !== option));
  };

  const visibleItems = value.slice(0, maxVisible);
  const remainingCount = value.length - maxVisible;

  return (
    <div ref={containerRef} className="relative">
      <Button
        type="button"
        variant="outline"
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        className="min-h-10 w-full justify-between px-3 font-normal"
      >
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5 text-left">
          {value.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            <>
              {visibleItems.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs font-medium"
                >
                  {item}

                  <span
                    role="button"
                    tabIndex={0}
                    className="cursor-pointer rounded-sm text-muted-foreground hover:text-foreground"
                    onClick={(event) => {
                      event.stopPropagation();
                      removeOption(item);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        event.stopPropagation();
                        removeOption(item);
                      }
                    }}
                    aria-label={`Remove ${item}`}
                  >
                    <X className="size-3" />
                  </span>
                </span>
              ))}

              {remainingCount > 0 && (
                <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                  +{remainingCount}
                </span>
              )}
            </>
          )}
        </div>

        <ChevronDown className="ml-2 size-4 shrink-0 text-muted-foreground" />
      </Button>

      {open && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
          <div className="max-h-64 overflow-y-auto">
            {options.map((option) => {
              const selected = value.includes(option);

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleOption(option)}
                  className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <span
                    className={`flex size-4 items-center justify-center rounded-sm border ${
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/40"
                    }`}
                  >
                    {selected && <Check className="size-3" />}
                  </span>

                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {value.length > 0 && (
            <div className="border-t px-2 pt-1">
              <button
                type="button"
                onClick={() => onChange([])}
                className="w-full rounded-sm px-2 py-2 text-left text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Clear selection
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
