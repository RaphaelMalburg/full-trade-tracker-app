import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  title: string;
  description: string;
}

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  currentStep: number;
}

export function Steps({ steps, currentStep, className, ...props }: StepsProps) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div className="relative">
        {/* Progress bar */}
        <div className="absolute left-0 top-[15px] h-[2px] w-full bg-muted">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{
              width: `${(currentStep / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = currentStep > index;
            const isCurrent = currentStep === index;

            return (
              <div key={step.title} className="flex flex-col items-center">
                <div
                  className={cn(
                    "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors duration-200",
                    isCompleted
                      ? "border-primary bg-primary text-primary-foreground"
                      : isCurrent
                        ? "border-primary bg-background text-foreground"
                        : "border-muted bg-muted text-muted-foreground",
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="text-sm">{index + 1}</span>
                  )}
                </div>
                <div className="mt-2 flex flex-col items-center gap-0.5">
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isCurrent ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {step.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {step.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
