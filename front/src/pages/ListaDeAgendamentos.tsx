import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Mail, Phone, User, Stethoscope } from "lucide-react";
import { useEffect, useState } from "react";
import { api, type Agendamento } from "@/lib/api";
import { toast } from "sonner";

const ListaAgendamento = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const carregarAgendamentos = async () => {
      try {
        setIsLoading(true);
        const dados = await api.listarAgendamentos();
        setAgendamentos(dados);
      } catch (error) {
        console.error("Erro ao carregar agendamentos:", error);
        toast.error("Erro ao carregar agendamentos");
      } finally {
        setIsLoading(false);
      }
    };

    carregarAgendamentos();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Calendar className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">
            Lista de Agendamentos
          </h1>
          <p className="text-lg max-w-2xl mx-auto animate-slide-up">
            Visualize abaixo todos os agendamentos realizados recentemente
          </p>
        </div>
      </section>

      {/* Lista */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Carregando agendamentos...</p>
            </div>
          ) : agendamentos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Nenhum agendamento encontrado.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {agendamentos.map((item, index) => (
                <Card
                  key={item.id || index}
                  className="shadow-card-hover transition-all hover:scale-[1.02]"
                >
                  <CardHeader className="border-b pb-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl font-semibold">
                        {item.nome}
                      </CardTitle>
                      <Badge variant="default">Pendente</Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-4 space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-accent" />
                      <span>{item.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-accent" />
                      <span>{item.telefone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-accent" />
                      <span>{item.especialidade}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span>{item.dataConsulta}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-accent" />
                      <span>{item.horario}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ListaAgendamento;
