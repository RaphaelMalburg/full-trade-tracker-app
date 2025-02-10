import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

interface HistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  items: any[];
  renderItem: (item: any) => React.ReactNode;
}

export function HistoryDialog({
  open,
  onOpenChange,
  title,
  items,
  renderItem,
}: HistoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            {items.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No history available
              </p>
            ) : (
              items.map(renderItem)
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
