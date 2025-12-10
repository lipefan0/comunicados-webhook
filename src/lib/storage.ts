const WEBHOOK_URL_KEY = "comunicados:webhookUrl";

/**
 * Retrieves the webhook URL from localStorage.
 * @returns The webhook URL if saved, otherwise null.
 */
export function getWebhookUrl(): string | null {
  try {
    return localStorage.getItem(WEBHOOK_URL_KEY);
  } catch (error) {
    console.error("Error reading webhook URL from localStorage:", error);
    return null;
  }
}

/**
 * Saves the webhook URL to localStorage.
 * @param url - The webhook URL to save.
 */
export function setWebhookUrl(url: string): void {
  try {
    localStorage.setItem(WEBHOOK_URL_KEY, url);
  } catch (error) {
    console.error("Error saving webhook URL to localStorage:", error);
    throw new Error("Não foi possível salvar a URL. Verifique o armazenamento do navegador.");
  }
}

/**
 * Removes the webhook URL from localStorage.
 */
export function clearWebhookUrl(): void {
  try {
    localStorage.removeItem(WEBHOOK_URL_KEY);
  } catch (error) {
    console.error("Error clearing webhook URL from localStorage:", error);
    throw new Error("Não foi possível limpar a URL. Verifique o armazenamento do navegador.");
  }
}
