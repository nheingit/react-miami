import { useOpenAIChat } from "./lib/openai";
import {
  Bird,
  CornerDownLeft,
  Rabbit,
  Settings,
  SquareTerminal,
  Turtle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Dashboard() {
  const { fetchChatResponse, response, loading, error } = useOpenAIChat();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const content = event.target.elements.content.value;
    const systemContent = event.target.elements.roleContent.value;
    const topP = event.target.elements.top_p.value;
    const temperature = event.target.elements.temperature.value;

    const messages = [
      { role: "system", content: systemContent },
      { role: "user", content: content },
    ];
    await fetchChatResponse(messages, {
      top_p: topP,
      temperature: temperature,
    });
  };
  return (
    <div className="grid h-screen w-full pl-[56px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <text y=".9em" fontSize="90">
                🐣
              </text>
            </svg>
          </Button>
        </div>
        <nav className="grid gap-1 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg bg-muted"
                aria-label="Playground"
              >
                <SquareTerminal className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Playground
            </TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Playground</h1>
        </header>
        <main>
          <form
            className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3"
            onSubmit={handleSubmit}
          >
            <div
              className="relative hidden flex-col items-start gap-8 md:flex"
              x-chunk="dashboard-03-chunk-0"
            >
              <div className="grid w-full items-start gap-6">
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Settings
                  </legend>
                  <div className="grid gap-3">
                    <Label htmlFor="temperature">Temperature</Label>
                    <Input id="temperature" type="float" placeholder="0.4" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="top-p">Top P</Label>
                      <Input id="top_p" type="float" placeholder="0.7" />
                    </div>
                  </div>
                </fieldset>
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Messages
                  </legend>
                  <div className="grid gap-3">
                    <Label htmlFor="role">Role</Label>
                    <Select name="role" defaultValue="system">
                      <SelectTrigger>
                        <SelectValue id="role" placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="assistant">Assistant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="userContent">Content</Label>
                    <Textarea
                      id="roleContent"
                      placeholder="You are a..."
                      className="min-h-[9.5rem]"
                    />
                  </div>
                </fieldset>
              </div>
            </div>
            <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
              <Badge variant="outline" className="absolute right-3 top-3">
                Output
              </Badge>
              <div
                dangerouslySetInnerHTML={{
                  __html: response ? JSON.stringify(response, null, 2) : "",
                }}
              />
              <div className="flex-1 pt-6">
                {loading && <p>Loading...</p>}
                {response && (
                  <p>
                    <span>{JSON.stringify(response, null, 2)}</span>
                  </p>
                )}
                {error && <p>Error: {error.message}</p>}
              </div>
              <div
                className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
                x-chunk="dashboard-03-chunk-1"
              >
                <Label htmlFor="content" className="sr-only">
                  Message
                </Label>
                <Textarea
                  id="content"
                  placeholder="Type your message here..."
                  className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                />
                <div className="flex items-center p-3 pt-0">
                  <Button type="submit" size="sm" className="ml-auto gap-1.5">
                    Send Message
                    <CornerDownLeft className="size-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
