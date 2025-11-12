import { ComunicadoForm } from "./components/ComunicadoForm";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Sistema de Comunicados
          </h1>
          <p className="text-slate-600">
            Envie comunicados importantes para as equipes
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <ComunicadoForm />
        </div>

        <div className="mt-6 text-center text-sm text-slate-500">
          <p>
            Os comunicados serão processados via webhook e enviados
            automaticamente para as equipes selecionadas.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
