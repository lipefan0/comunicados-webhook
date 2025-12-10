import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getWebhookUrl, setWebhookUrl, clearWebhookUrl } from "@/lib/storage";
import { CheckCircle2, AlertCircle, Link2 } from "lucide-react";

interface WebhookSettingsProps {
  onUrlChange?: (url: string | null) => void;
}

export function WebhookSettings({ onUrlChange }: WebhookSettingsProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    // Load saved URL on component mount
    const savedUrl = getWebhookUrl();
    if (savedUrl) {
      setUrl(savedUrl);
      onUrlChange?.(savedUrl);
    }
  }, [onUrlChange]);

  const validateUrl = (urlString: string): boolean => {
    if (!urlString.trim()) {
      setError("Por favor, insira uma URL.");
      return false;
    }

    try {
      const parsedUrl = new URL(urlString);
      
      // Prefer HTTPS for security
      if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") {
        setError("A URL deve usar o protocolo HTTP ou HTTPS.");
        return false;
      }

      return true;
    } catch {
      setError("Por favor, insira uma URL válida (ex: https://hook.us1.make.com/...)");
      return false;
    }
  };

  const handleSave = () => {
    setError(null);
    setSuccess(null);

    if (!validateUrl(url)) {
      return;
    }

    try {
      setWebhookUrl(url);
      setSuccess("URL salva com sucesso!");
      onUrlChange?.(url);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao salvar a URL. Tente novamente."
      );
    }
  };

  const handleClear = () => {
    setError(null);
    setSuccess(null);

    try {
      clearWebhookUrl();
      setUrl("");
      setSuccess("URL removida com sucesso!");
      onUrlChange?.(null);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao limpar a URL. Tente novamente."
      );
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Link2 className="h-5 w-5 text-slate-700" />
        <h2 className="text-lg font-semibold text-slate-900">
          Configuração do Webhook
        </h2>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="webhook-url">Webhook URL</Label>
          <Input
            id="webhook-url"
            type="url"
            placeholder="https://hook.us1.make.com/..."
            value={url}
            onChange={handleUrlChange}
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Insira a URL do webhook do Make (ou outro serviço) para enviar os comunicados.
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 p-3 text-sm text-green-700 bg-green-50 rounded-md border border-green-200">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            <p>{success}</p>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            type="button"
            onClick={handleSave}
            className="flex-1"
          >
            Salvar URL
          </Button>
          <Button
            type="button"
            onClick={handleClear}
            variant="outline"
            className="flex-1"
          >
            Limpar
          </Button>
        </div>
      </div>
    </div>
  );
}
