import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Calendar,
  CreditCard,
  DollarSign,
  Mail,
  Package,
  Phone,
  Search,
  ShoppingCart,
  Stethoscope,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { api, type Agendamento, type Compra } from "@/lib/api";
import { toast } from "sonner";

const CRM = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [compras, setCompras] = useState<Compra[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setIsLoading(true);
        const [dadosAgendamentos, dadosCompras] = await Promise.all([
          api.listarAgendamentos(),
          api.listarCompras(),
        ]);
        setAgendamentos(dadosAgendamentos);
        setCompras(dadosCompras);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        toast.error("Erro ao carregar dados do CRM");
      } finally {
        setIsLoading(false);
      }
    };

    carregarDados();
  }, []);

  // Filtros de pesquisa
  const agendamentosFiltrados = agendamentos.filter(
    (ag) =>
      ag.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ag.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ag.especialidade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const comprasFiltradas = compras.filter(
    (cp) =>
      cp.NomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cp.Nomedoplano.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cp.Cpf.includes(searchTerm)
  );

  // Estatísticas
  const totalAgendamentos = agendamentos.length;
  const totalCompras = compras.length;

  // Contar planos vendidos
  const planosVendidos: Record<string, number> = {};
  compras.forEach((compra) => {
    planosVendidos[compra.Nomedoplano] = (planosVendidos[compra.Nomedoplano] || 0) + 1;
  });

  // Especialidades mais procuradas
  const especialidadesMaisProcuradas: Record<string, number> = {};
  agendamentos.forEach((ag) => {
    especialidadesMaisProcuradas[ag.especialidade] =
      (especialidadesMaisProcuradas[ag.especialidade] || 0) + 1;
  });

  // Formas de pagamento
  const formasPagamento: Record<string, number> = {};
  compras.forEach((compra) => {
    formasPagamento[compra.FormaDepagamento] = (formasPagamento[compra.FormaDepagamento] || 0) + 1;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-primary py-12 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <BarChart3 className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold animate-fade-in">CRM - Dashboard</h1>
              <p className="text-lg opacity-90 animate-slide-up">
                Gestão de Compras e Agendamentos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-10 flex-1">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Carregando dados...</p>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="shadow-card-hover">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total de Compras</CardTitle>
                    <ShoppingCart className="h-5 w-5 text-accent" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{totalCompras}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Planos vendidos no total
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-card-hover">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total de Agendamentos</CardTitle>
                    <Calendar className="h-5 w-5 text-accent" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{totalAgendamentos}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Consultas agendadas
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-card-hover">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Plano Mais Vendido</CardTitle>
                    <TrendingUp className="h-5 w-5 text-accent" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold truncate">
                      {Object.keys(planosVendidos).length > 0
                        ? Object.entries(planosVendidos).sort((a, b) => b[1] - a[1])[0][0]
                        : "N/A"}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {Object.keys(planosVendidos).length > 0
                        ? `${Object.entries(planosVendidos).sort((a, b) => b[1] - a[1])[0][1]} vendas`
                        : "Nenhuma venda"}
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-card-hover">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Especialidade Popular</CardTitle>
                    <Stethoscope className="h-5 w-5 text-accent" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold truncate">
                      {Object.keys(especialidadesMaisProcuradas).length > 0
                        ? Object.entries(especialidadesMaisProcuradas).sort(
                            (a, b) => b[1] - a[1]
                          )[0][0]
                        : "N/A"}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {Object.keys(especialidadesMaisProcuradas).length > 0
                        ? `${
                            Object.entries(especialidadesMaisProcuradas).sort(
                              (a, b) => b[1] - a[1]
                            )[0][1]
                          } agendamentos`
                        : "Nenhum agendamento"}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Package className="w-5 h-5 text-accent" />
                      Planos Vendidos por Tipo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {Object.keys(planosVendidos).length > 0 ? (
                      <div className="space-y-2">
                        {Object.entries(planosVendidos).map(([plano, quantidade]) => (
                          <div key={plano} className="flex justify-between items-center">
                            <span className="text-sm font-medium truncate">{plano}</span>
                            <Badge variant="secondary">{quantidade}</Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Nenhuma compra registrada</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-accent" />
                      Formas de Pagamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {Object.keys(formasPagamento).length > 0 ? (
                      <div className="space-y-2">
                        {Object.entries(formasPagamento).map(([forma, quantidade]) => (
                          <div key={forma} className="flex justify-between items-center">
                            <span className="text-sm font-medium">{forma}</span>
                            <Badge variant="secondary">{quantidade}</Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Nenhuma compra registrada</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Stethoscope className="w-5 h-5 text-accent" />
                      Especialidades Mais Procuradas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {Object.keys(especialidadesMaisProcuradas).length > 0 ? (
                      <div className="space-y-2">
                        {Object.entries(especialidadesMaisProcuradas)
                          .sort((a, b) => b[1] - a[1])
                          .slice(0, 5)
                          .map(([especialidade, quantidade]) => (
                            <div key={especialidade} className="flex justify-between items-center">
                              <span className="text-sm font-medium truncate">
                                {especialidade}
                              </span>
                              <Badge variant="secondary">{quantidade}</Badge>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Nenhum agendamento registrado
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Pesquisar por nome, email, CPF, especialidade..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Tabs for Compras and Agendamentos */}
              <Tabs defaultValue="compras" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="compras">
                    Compras ({comprasFiltradas.length})
                  </TabsTrigger>
                  <TabsTrigger value="agendamentos">
                    Agendamentos ({agendamentosFiltrados.length})
                  </TabsTrigger>
                </TabsList>

                {/* Compras Tab */}
                <TabsContent value="compras" className="mt-6">
                  {comprasFiltradas.length === 0 ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">
                          {searchTerm
                            ? "Nenhuma compra encontrada com esse critério"
                            : "Nenhuma compra registrada"}
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {comprasFiltradas.map((compra, index) => (
                        <Card key={compra.id || index} className="shadow-card-hover">
                          <CardHeader className="border-b pb-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">
                                  {compra.NomeCompleto}
                                </CardTitle>
                                <CardDescription className="mt-1">
                                  {compra.Nomedoplano}
                                </CardDescription>
                              </div>
                              <Badge variant="default">Confirmado</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-4 space-y-3 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="w-4 h-4 text-accent" />
                              <span>{compra.telefone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Users className="w-4 h-4 text-accent" />
                              <span>CPF: {compra.Cpf}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <CreditCard className="w-4 h-4 text-accent" />
                              <span>{compra.FormaDepagamento}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <DollarSign className="w-4 h-4 text-accent" />
                              <span>{compra.tipoDepagamento}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                {/* Agendamentos Tab */}
                <TabsContent value="agendamentos" className="mt-6">
                  {agendamentosFiltrados.length === 0 ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">
                          {searchTerm
                            ? "Nenhum agendamento encontrado com esse critério"
                            : "Nenhum agendamento registrado"}
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {agendamentosFiltrados.map((agendamento, index) => (
                        <Card key={agendamento.id || index} className="shadow-card-hover">
                          <CardHeader className="border-b pb-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">{agendamento.nome}</CardTitle>
                                <CardDescription className="mt-1">
                                  {agendamento.especialidade}
                                </CardDescription>
                              </div>
                              <Badge variant="secondary">Pendente</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-4 space-y-3 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Mail className="w-4 h-4 text-accent" />
                              <span className="truncate">{agendamento.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="w-4 h-4 text-accent" />
                              <span>{agendamento.telefone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="w-4 h-4 text-accent" />
                              <span>{agendamento.dataConsulta}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Stethoscope className="w-4 h-4 text-accent" />
                              <span>{agendamento.horario}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CRM;
