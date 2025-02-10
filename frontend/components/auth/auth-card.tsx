import { cn } from "@/lib/utils";

interface AuthCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cardHeader?: React.ReactNode;
  cardFooter?: React.ReactNode;
}

export function AuthCard({ children, cardHeader, cardFooter, className, ...props }: AuthCardProps) {
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {cardHeader && <div className="flex flex-col space-y-2">{cardHeader}</div>}
      <div className="grid gap-4">{children}</div>
      {cardFooter && <div className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">{cardFooter}</div>}
    </div>
  );
}

interface AuthCardHeaderProps {
  title: string;
  description?: string;
}

export function AuthCardHeader({ title, description }: AuthCardHeaderProps) {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </>
  );
}

interface AuthCardFooterProps {
  children: React.ReactNode;
}

export function AuthCardFooter({ children }: AuthCardFooterProps) {
  return <>{children}</>;
}
