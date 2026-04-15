import { useMemo } from "react";
import { ChatKit, useChatKit } from "@openai/chatkit-react";
import { createClientSecretFetcher, workflowId } from "../lib/chatkitSession";

export function ChatKitPanel() {
  const getClientSecret = useMemo(
    () => createClientSecretFetcher(workflowId),
    []
  );

const chatkit = useChatKit({
    api: { getClientSecret },
  });

return (
    <div className="flex h-[90vh] w-full rounded-2xl bg-white shadow-sm" style={{colorScheme: 'light'}}>
      <ChatKit control={chatkit.control} className="h-full w-full" theme="light" />
    </div>
  );
