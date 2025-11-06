import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Users, Award, Shield, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Planos = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header Section */}
      <section className="bg-gradient-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">
            Nossos Planos Dentários
          </h1>
          <p className="text-xl max-w-3xl mx-auto animate-slide-up">
            Escolha o plano ideal para você, sua família ou sua empresa.
            Cobertura completa com a qualidade do Odonto Prime.
          </p>
        </div>
      </section>


      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Users className="w-16 h-16 mx-auto mb-4 text-accent" />
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Planos Odontotológicos
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano ideal
            </p>
          </div>

          <div className="flex gap-20 flex-row grid-rows-3 justify-center">
            <Card className="hover:shadow-card-hover transition-shadow duration-300  border-accent border-2 w-96">
              <CardHeader className="text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-accent" />
                <CardTitle className="text-2xl">Plano Familiar</CardTitle>
                <CardDescription className="text-lg">
                  Até 5 pessoas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6 pb-6 border-b">
                  <span className="text-4xl font-bold text-primary">
                    R$ 269.90
                  </span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
                 <ul className="space-y-3">
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-accent" size={20} />Todos os benefícios do plano individual incluidos</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-accent" size={20} />Cobertura de até 4 pessoas</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-accent" size={20} />Acompanhamento personalizado</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-accent" size={20} />Avaliação preventiva</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-accent" size={20} />Orientação sobre higiene bucal</li>
                  </ul>

                <ul className="space-y-3 mb-6"></ul>
                <Link to="/compra">
                  <Button className="w-full bg-accent hover:bg-accent/90">
                    Assinar
                  </Button>
                </Link>
              </CardContent>
            </Card>

                <Card className="hover:shadow-card-hover transition-shadow duration-300 border-accent border-2 w-96">
              <CardHeader className="text-center">
                                <Users className="w-12 h-12 mx-auto mb-4 text-accent" />

                <CardTitle className="text-2xl">Plano individual</CardTitle>
                <CardDescription className="text-lg">
                  Individual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6 pb-6 border-b flex flex-row justify-center items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary mb-2">
                    R$ 99.90
                  </span>
                  <div className="text-muted-foreground">/mês</div>
                </div>
                 <ul className="space-y-3">
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-accent" size={20} />Consultas ilimitadas com dentista</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-accent" size={20} />2 limpezas por ano</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-accent" size={20} />Atendimento de emergência 24h</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-accent" size={20} />Avaliação preventiva</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-accent" size={20} />Orientação sobre higiene bucal</li>
                  </ul>
                <ul className="space-y-3 mb-6"></ul>
                <Link to="/compra">
                  <Button className="w-full bg-accent hover:bg-accent/90">
                    Assinar
                  </Button>
                </Link>
              </CardContent>
            </Card>

             <Card className="hover:shadow-card-hover transition-shadow duration-300 border-accent border-2 w-96">
              <CardHeader className="text-center">
                                <Users className="w-12 h-12 mx-auto mb-4 text-accent" />

                <CardTitle className="text-2xl">Empresarial</CardTitle>
                <CardDescription className="text-lg">
                  10 a 30 colaboradores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6 pb-6 border-b">
                  <span className="text-4xl font-bold text-primary">
                    R$ 119
                  </span>
                  <span className="text-muted-foreground">/pessoa</span>
                </div>
                <ul className="space-y-3">
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-accent" size={20} />Planos a partir de 5 colaboradores</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-accent" size={20} />Gestão online simplificada</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-accent" size={20} />Atendimento prioritário</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-accent" size={20} />Relatórios mensais de utilização</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-accent" size={20} />Palestra educativas na empresa</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-accent" size={20} />Campanha de prevenção</li>
                </ul>
                <ul className="space-y-3 mb-6"></ul>
                <Link to="/compra">
                  <Button className="w-full bg-accent hover:bg-accent/90">
                    Solicitar Proposta
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Planos;
