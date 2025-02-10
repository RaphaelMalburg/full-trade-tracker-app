import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
  title: "AI Copilot | Dashboard",
  description: "Interact with your AI assistant",
};

export default function CopilotPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Copilot</h1>
        <p className="text-muted-foreground mt-2">Your personal AI assistant to help you with your tasks</p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <h2 className="text-xl font-semibold">Chat</h2>
              <div className="h-[400px] rounded-lg border bg-muted/50 p-4">
                {/* Chat messages would go here */}
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <p>Hello! How can I assist you today?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Textarea placeholder="Type your message here..." className="min-h-[80px]" />
              <Button className="px-8">Send</Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Button variant="outline" className="h-auto py-4 justify-start">
                <div className="text-left">
                  <div className="font-semibold">Generate Content</div>
                  <div className="text-sm text-muted-foreground">Create blog posts, articles, and more</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto py-4 justify-start">
                <div className="text-left">
                  <div className="font-semibold">Code Assistant</div>
                  <div className="text-sm text-muted-foreground">Get help with coding tasks</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto py-4 justify-start">
                <div className="text-left">
                  <div className="font-semibold">Data Analysis</div>
                  <div className="text-sm text-muted-foreground">Analyze and visualize your data</div>
                </div>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
