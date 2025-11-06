import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Planos from "./pages/Planos";
import Cadastro from "./pages/Cadastro";
import Compra from "./pages/Compra";
import NotFound from "./pages/NotFound";
import ListaAgendamento from "./pages/ListaDeAgendamentos";
import HelpDesk from "./pages/helpdesk";
import CRM from "./pages/CRM";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/compra" element={<Compra />} />
          <Route path="/lista" element={<ListaAgendamento />} />
          <Route path="/suporte" element={<HelpDesk />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
