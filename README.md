# Sistema de Comunicados - Webhook Integration

Sistema web desenvolvido em React + Vite para envio de comunicados para equipes através de integração com Make (webhook). O sistema permite selecionar o motivo do comunicado, escolher as equipes destinatárias e enviar a mensagem que será processada via IA e distribuída automaticamente.

## 🎯 Objetivo

Este projeto integra-se com o Make (anteriormente Integromat) para:
1. Receber os dados do formulário via webhook
2. Processar e melhorar o texto do comunicado usando IA
3. Enviar emails automaticamente para as equipes selecionadas

## ⚙️ Configuração do Webhook

**A URL do webhook agora é configurada diretamente na interface do usuário**, sem necessidade de variáveis de ambiente ou redeploy.

### Como configurar:

1. Abra a aplicação no navegador
2. No topo da página, você verá um card "Configuração do Webhook"
3. Insira a URL do seu webhook (por exemplo, do Make)
4. Clique em "Salvar URL"

A URL será salva no **localStorage do navegador** e estará disponível sempre que você acessar a aplicação do mesmo navegador/dispositivo.

### Privacidade e Segurança

- ✅ A URL do webhook é salva **apenas no navegador local** (localStorage)
- ✅ Nenhum dado é enviado para servidores externos além do webhook configurado
- ⚠️ A URL **não é criptografada** no localStorage
- ⚠️ A URL é específica para cada **navegador/dispositivo**
- ⚠️ Se você limpar os dados do navegador, precisará configurar novamente
- 💡 Recomendamos usar **HTTPS** para maior segurança

### Limitações

- A URL salva é específica para o navegador/dispositivo atual
- Se você acessar de outro navegador ou dispositivo, precisará configurar novamente
- Limpar os dados do navegador também removerá a URL salva


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

3. **(Opcional)** Se desejar usar variáveis de ambiente para desenvolvimento local:
```bash
cp .env.example .env
```

**Nota**: A configuração via arquivo `.env` não é mais necessária. A URL do webhook deve ser configurada diretamente na interface da aplicação.


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
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   └── textarea.tsx
│   │   ├── ComunicadoForm.tsx    # Formulário principal
│   │   └── WebhookSettings.tsx   # Configuração do webhook
│   ├── lib/
│   │   ├── storage.ts   # Funções de localStorage
│   │   └── utils.ts     # Utilitários (cn function)
│   ├── App.tsx          # Componente principal
│   ├── main.tsx         # Entry point
│   ├── index.css        # Estilos globais + Tailwind
│   └── vite-env.d.ts    # Types do Vite
├── .env.example         # Exemplo de variáveis (legado)
├── index.html           # HTML template
├── package.json
├── tailwind.config.js   # Configuração Tailwind
├── tsconfig.json        # Configuração TypeScript
└── vite.config.ts       # Configuração Vite
```

## 🎨 Funcionalidades

### Configuração do Webhook

1. **URL Configurável na Interface**
   - Campo de entrada para URL do webhook
   - Validação de URL (formato e protocolo)
   - Botões para Salvar e Limpar
   - Feedback visual de sucesso/erro
   - Persistência em localStorage

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
   - Webhook URL deve estar configurada
   - Feedback visual de erros
   - Mensagens claras de validação

5. **Estados do Formulário**
   - Loading durante envio
   - Feedback de sucesso
   - Mensagens de erro
   - Limpeza automática após envio bem-sucedido
   - Botão desabilitado quando webhook não configurado


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
5. **Cole a URL no campo "Webhook URL" na interface da aplicação**
6. Clique em "Salvar URL"
7. Configure as ações desejadas no Make:
   - Processar o texto com IA (OpenAI, ChatGPT, etc.)
   - Enviar emails para as equipes selecionadas
   - Salvar em banco de dados, etc.

**Nota**: A URL não precisa mais ser configurada em arquivo `.env`. Basta inserir na interface do usuário.


## 🎯 Design

- Interface limpa e moderna com Tailwind CSS
- Design responsivo (mobile-first)
- Componentes acessíveis do shadcn/ui
- Tema claro com possibilidade de dark mode
- Feedback visual para todas as interações
- Card centralizado com sombra e bordas arredondadas
- Configuração de webhook integrada na interface

## 📸 Screenshots

O sistema apresenta:
- Card de configuração do webhook no topo
- Formulário centralizado em card com sombra
- Campo select estilizado para motivo
- Checkboxes com labels clicáveis
- Textarea responsivo para a mensagem
- Botão com estado de loading
- Mensagens de sucesso/erro com ícones
- Avisos quando webhook não configurado

## 💾 Armazenamento Local

A aplicação usa **localStorage** do navegador para salvar a URL do webhook:
- **Chave**: `comunicados:webhookUrl`
- **Persistência**: Dados permanecem entre sessões
- **Privacidade**: Armazenado apenas localmente, sem envio para servidores
- **Limitação**: Específico para cada navegador/dispositivo


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

**Nota**: A URL do webhook é armazenada localmente no navegador (localStorage) e não é enviada para servidores externos. Certifique-se de manter sua URL segura e de usar HTTPS sempre que possível.
