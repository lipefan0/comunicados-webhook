import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

type Motivo = "Urgente" | "Importante" | "Informativo" | "Atualização";

interface FormData {
  motivo: Motivo | "";
  equipes: string[];
  mensagem: string;
}

const equipesDisponiveis = [
  "Desenvolvimento",
  "Marketing",
  "Vendas",
  "Suporte",
  "RH",
];

export function ComunicadoForm() {
  const [formData, setFormData] = useState<FormData>({
    motivo: "",
    equipes: [],
    mensagem: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleMotivoChange = (value: string) => {
    setFormData({ ...formData, motivo: value as Motivo });
    setError(null);
  };

  const handleEquipeToggle = (equipe: string) => {
    const newEquipes = formData.equipes.includes(equipe)
      ? formData.equipes.filter((e) => e !== equipe)
      : [...formData.equipes, equipe];
    
    setFormData({ ...formData, equipes: newEquipes });
    setError(null);
  };

  const handleTodosToggle = () => {
    const allSelected = equipesDisponiveis.every((equipe) =>
      formData.equipes.includes(equipe)
    );
    
    setFormData({
      ...formData,
      equipes: allSelected ? [] : [...equipesDisponiveis],
    });
    setError(null);
  };

  const handleMensagemChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, mensagem: e.target.value });
    setError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.motivo) {
      setError("Por favor, selecione o motivo do comunicado.");
      return false;
    }

    if (formData.equipes.length === 0) {
      setError("Por favor, selecione pelo menos uma equipe.");
      return false;
    }

    if (formData.mensagem.trim().length < 10) {
      setError("A mensagem deve ter pelo menos 10 caracteres.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;

      if (!webhookUrl) {
        throw new Error(
          "URL do webhook não configurada. Configure a variável VITE_WEBHOOK_URL."
        );
      }

      const payload = {
        motivo: formData.motivo,
        equipes: formData.equipes,
        mensagem: formData.mensagem.trim(),
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Erro ao enviar: ${response.statusText}`);
      }

      setSuccess(true);
      // Limpar formulário após sucesso
      setFormData({
        motivo: "",
        equipes: [],
        mensagem: "",
      });

      // Remover mensagem de sucesso após 5 segundos
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao enviar o comunicado. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const allEquipesSelected = equipesDisponiveis.every((equipe) =>
    formData.equipes.includes(equipe)
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Motivo do Comunicado */}
      <div className="space-y-2">
        <Label htmlFor="motivo">Motivo do Comunicado *</Label>
        <Select value={formData.motivo} onValueChange={handleMotivoChange}>
          <SelectTrigger id="motivo">
            <SelectValue placeholder="Selecione o motivo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Urgente">Urgente</SelectItem>
            <SelectItem value="Importante">Importante</SelectItem>
            <SelectItem value="Informativo">Informativo</SelectItem>
            <SelectItem value="Atualização">Atualização</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Seleção de Equipes */}
      <div className="space-y-3">
        <Label>Equipes *</Label>
        
        {/* Checkbox "Todos" */}
        <div className="flex items-center space-x-2 pb-2 border-b">
          <Checkbox
            id="todos"
            checked={allEquipesSelected}
            onCheckedChange={handleTodosToggle}
          />
          <label
            htmlFor="todos"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            Todos
          </label>
        </div>

        {/* Checkboxes individuais */}
        <div className="space-y-2">
          {equipesDisponiveis.map((equipe) => (
            <div key={equipe} className="flex items-center space-x-2">
              <Checkbox
                id={equipe}
                checked={formData.equipes.includes(equipe)}
                onCheckedChange={() => handleEquipeToggle(equipe)}
              />
              <label
                htmlFor={equipe}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {equipe}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Mensagem */}
      <div className="space-y-2">
        <Label htmlFor="mensagem">Mensagem do Comunicado *</Label>
        <Textarea
          id="mensagem"
          placeholder="Digite o comunicado aqui... (mínimo 10 caracteres)"
          value={formData.mensagem}
          onChange={handleMensagemChange}
          rows={6}
          className="resize-none"
        />
        <p className="text-xs text-muted-foreground">
          {formData.mensagem.length} caracteres
        </p>
      </div>

      {/* Mensagens de erro e sucesso */}
      {error && (
        <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-3 text-sm text-green-700 bg-green-50 rounded-md border border-green-200">
          <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
          <p>Comunicado enviado com sucesso!</p>
        </div>
      )}

      {/* Botão de envio */}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar Comunicado"
        )}
      </Button>
    </form>
  );
}
