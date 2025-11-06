import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, CreditCard, Phone, User } from "lucide-react";
import { useEffect, useState } from "react";
import { api, type Compra } from "@/lib/api";
import { toast } from "sonner";

const ListaCompras = () => {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const carregarCompras = async () => {
      try {
        setIsLoading(true);
        const dados = await api.listarCompras();
        setCompras(dados);
      } catch (error) {
        console.error("Erro ao carregar compras:", error);
        toast.error("Erro ao carregar compras");
      } finally {
        setIsLoading(false);
      }
    };

    carregarCompras();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-gradient-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">
            Compras de Planos Dentários
          </h1>
          <p className="text-lg max-w-2xl mx-auto animate-slide-up">
            Veja os planos dentários adquiridos
          </p>
        </div>
      </section>

      {/* Lista */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Carregando compras...</p>
            </div>
          ) : compras.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Nenhuma compra encontrada.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {compras.map((compra, index) => (
                <Card
                  key={compra.id || index}
                  className="shadow-card-hover transition-all hover:scale-[1.02]"
                >
                  <CardHeader className="border-b pb-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl font-semibold">
                        {compra.NomeCompleto}
                      </CardTitle>
                      <Badge variant="default">Confirmado</Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-4 space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-accent" />
                      <span className="font-semibold">{compra.Nomedoplano}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-accent" />
                      <span>{compra.telefone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-accent" />
                      <span>CPF: {compra.Cpf}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-accent" />
                      <span>{compra.FormaDepagamento} - {compra.tipoDepagamento}</span>
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

export default ListaCompras;
