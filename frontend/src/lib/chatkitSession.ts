const readEnvString = (value: unknown): string | undefined =>
  typeof value === "string" && value.trim() ? value.trim() : undefined;

export const workflowId = (() => {
  const id = readEnvString(import.meta.env.VITE_CHATKIT_WORKFLOW_ID);
  if (!id || id.startsWith("wf_replace")) {
    throw new Error("Set VITE_CHATKIT_WORKFLOW_ID in your .env file.");
  }
  return id;
})();

export const domainKey = (() => {
  const key = readEnvString(import.meta.env.VITE_CHATKIT_API_DOMAIN_KEY);
  if (!key) {
    throw new Error("Set VITE_CHATKIT_API_DOMAIN_KEY in your .env file.");
  }
  return key;
})();

export function createClientSecretFetcher(workflow: string) {
  return async (currentSecret: string | null) => {
    if (currentSecret) return currentSecret;
    const response = await fetch("https://api.openai.com/v1/chatkit/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + domainKey,
        "OpenAI-Beta": "chatkit_beta=v1",
      },
      body: JSON.stringify({
        workflow: { id: workflow },
        user: "visitor-" + Date.now(),
      }),
    });
    const payload = await response.json().catch(() => ({})) as {
      client_secret?: string;
      error?: string;
    };
    if (!response.ok) {
      throw new Error((payload as any).error ?? "Failed to create session");
    }
    if (!payload.client_secret) {
      throw new Error("Missing client secret in response");
    }
    return payload.client_secret;
  };
}
