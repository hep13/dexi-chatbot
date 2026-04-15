import { ChatKitPanel } from "./components/ChatKitPanel";
export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-end bg-white">
      <div className="mx-auto w-full max-w-5xl">
        <ChatKitPanel />
      </div>
    </main>
  );
}
