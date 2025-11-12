# Sistema de Comunicados - Webhook Integration

Sistema web desenvolvido em React + Vite para envio de comunicados para equipes através de integração com Make (webhook). O sistema permite selecionar o motivo do comunicado, escolher as equipes destinatárias e enviar a mensagem que será processada via IA e distribuída automaticamente.

## 🎯 Objetivo

Este projeto integra-se com o Make (anteriormente Integromat) para:
1. Receber os dados do formulário via webhook
2. Processar e melhorar o texto do comunicado usando IA
3. Enviar emails automaticamente para as equipes selecionadas

## 🚀 Tecnologias Utilizadas

- **React 19** - Biblioteca para construção da interface
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server ultrarrápido
- **Tailwind CSS** - Framework CSS utility-first
- **shadcn/ui** - Componentes acessíveis e customizáveis
- **Radix UI** - Primitivos de UI headless
- **Lucide React** - Ícones

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/lipefan0/comunicados-webhook.git
cd comunicados-webhook
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o arquivo de ambiente:
```bash
cp .env.example .env
```

4. Edite o arquivo `.env` e configure a URL do webhook do Make:
```env
VITE_WEBHOOK_URL=https://hook.us1.make.com/your-webhook-url
```

## 🏃 Como Executar

### Modo Desenvolvimento
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

### Build para Produção
```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`

### Preview da Build
```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
comunicados-webhook/
├── public/              # Arquivos estáticos
├── src/
│   ├── components/
│   │   ├── ui/         # Componentes shadcn/ui
│   │   │   ├── button.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   └── textarea.tsx
│   │   └── ComunicadoForm.tsx  # Formulário principal
│   ├── lib/
│   │   └── utils.ts    # Utilitários (cn function)
│   ├── App.tsx         # Componente principal
│   ├── main.tsx        # Entry point
│   ├── index.css       # Estilos globais + Tailwind
│   └── vite-env.d.ts   # Types do Vite
├── .env.example        # Exemplo de variáveis de ambiente
├── index.html          # HTML template
├── package.json
├── tailwind.config.js  # Configuração Tailwind
├── tsconfig.json       # Configuração TypeScript
└── vite.config.ts      # Configuração Vite
```

## 🎨 Funcionalidades

### Formulário de Comunicados

1. **Motivo do Comunicado** (Select)
   - Urgente
   - Importante
   - Informativo
   - Atualização

2. **Seleção de Equipes** (Checkboxes)
   - Desenvolvimento
   - Marketing
   - Vendas
   - Suporte
   - RH
   - Opção "Todos" para selecionar/deselecionar todas

3. **Mensagem do Comunicado** (Textarea)
   - Mínimo de 10 caracteres
   - Contador de caracteres
   - Campo responsivo

4. **Validação**
   - Todos os campos são obrigatórios
   - Feedback visual de erros
   - Mensagens claras de validação

5. **Estados do Formulário**
   - Loading durante envio
   - Feedback de sucesso
   - Mensagens de erro
   - Limpeza automática após envio bem-sucedido

## 📤 Formato dos Dados Enviados ao Webhook

O formulário envia um POST request para o webhook configurado com o seguinte JSON:

```json
{
  "motivo": "Urgente",
  "equipes": ["Desenvolvimento", "Marketing"],
  "mensagem": "Texto do comunicado que será enviado"
}
```

### Exemplo de Resposta Esperada

O webhook deve retornar status HTTP 200-299 para indicar sucesso.

## ⚙️ Configuração do Webhook no Make

1. Acesse sua conta no [Make](https://www.make.com)
2. Crie um novo cenário
3. Adicione um trigger "Webhook" → "Custom Webhook"
4. Copie a URL do webhook gerada
5. Cole a URL no arquivo `.env` do projeto
6. Configure as ações desejadas no Make:
   - Processar o texto com IA (OpenAI, ChatGPT, etc.)
   - Enviar emails para as equipes selecionadas
   - Salvar em banco de dados, etc.

## 🎯 Design

- Interface limpa e moderna com Tailwind CSS
- Design responsivo (mobile-first)
- Componentes acessíveis do shadcn/ui
- Tema claro com possibilidade de dark mode
- Feedback visual para todas as interações
- Card centralizado com sombra e bordas arredondadas

## 📸 Screenshots

O sistema apresenta:
- Formulário centralizado em card com sombra
- Campo select estilizado para motivo
- Checkboxes com labels clicáveis
- Textarea responsivo para a mensagem
- Botão com estado de loading
- Mensagens de sucesso/erro com ícones

## 🛠️ Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Cria build de produção
npm run preview  # Preview da build de produção
npm run lint     # Executa ESLint
```

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 👨‍💻 Autor

Desenvolvido por [lipefan0](https://github.com/lipefan0)

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

---

**Nota**: Certifique-se de manter sua URL do webhook segura e nunca commite o arquivo `.env` no repositório.
