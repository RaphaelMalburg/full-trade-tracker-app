import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome to your dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Quick Stats</h2>
          {/* Add your stats content here */}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
          {/* Add your recent activity content here */}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Performance</h2>
          {/* Add your performance metrics here */}
        </Card>
      </div>
    </div>
  );
}
