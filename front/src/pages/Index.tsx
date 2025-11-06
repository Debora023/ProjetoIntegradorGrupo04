import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar, Shield, Users, Award, CheckCircle2, Clock, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import heroImage from "../assets/HeroImage.jpg";
import ConsentModel from "../components/ConsentModal";

const Index = () => {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    mensagem: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Agendamento solicitado! Entraremos em contato em breve.");
    setFormData({ nome: "", telefone: "", mensagem: "" });
  };

  return (
    <>
      {/* Modal de Consentimento */}
      <ConsentModel />

      <div className="min-h-screen flex flex-col">
        <Navbar />

        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center bg-gradient-hero overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img
              src={heroImage}
              alt="Odonto Prime"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
              Sorria com a confiança de quem é prime!
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Odontologia de excelência com tecnologia de ponta e profissionais especializados
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/planos">
                <Button
                  size="lg"
                  variant="default"
                  className="w-full bg-accent hover:bg-accent/90"
                >
                  Conhecer Planos
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Sessão de Planos */}
        <section className="py-20 bg-secondary" id="planos">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-slide-up">
              <h2 className="text-4xl font-bold text-foreground mb-4">Planos Dentários</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Escolha o plano ideal para você ou sua empresa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Plano Familiar */}
              <Card className="hover:shadow-card-hover transition-shadow duration-300 border-accent border-2">
                <CardHeader className="text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-accent" />
                  <CardTitle className="text-2xl">Plano Familiar</CardTitle>
                  <CardDescription className="text-lg">O cuidado que sua família merece</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-primary">R$ 269,90</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                  <Link to="/planos" className="block mt-6">
                    <Button className="w-full bg-accent hover:bg-accent/90">Ver Detalhes</Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Plano Individual */}
              <Card className="hover:shadow-card-hover transition-shadow duration-300 border-accent border-2">
                <CardHeader className="text-center">
                  <Award className="w-12 h-12 mx-auto mb-4 text-accent" />
                  <CardTitle className="text-2xl">Plano Individual</CardTitle>
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-primary">R$ 99,90</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                  <CardDescription className="text-lg">Ideal para quem busca cuidados odontológicos completos</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/planos" className="block mt-6">
                    <Button className="w-full bg-accent hover:bg-accent/90">Ver Detalhes</Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Plano Empresarial */}
              <Card className="hover:shadow-card-hover transition-shadow duration-300 border-accent border-2">
                <CardHeader className="text-center">
                  <Shield className="w-12 h-12 mx-auto mb-4 text-accent" />
                  <CardTitle className="text-2xl">Plano Empresarial</CardTitle>
                  <CardDescription className="text-lg">Os cuidados essenciais para sua equipe</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-primary">R$ 299,90</span>
                    <span className="text-muted-foreground">/pessoa</span>
                  </div>
                  <Link to="/planos" className="block mt-6">
                    <Button className="w-full bg-accent hover:bg-accent/90">Ver Detalhes</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Quem Somos Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">Quem Somos</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Missão</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Proporcionar saúde bucal de excelência com atendimento humanizado, utilizando tecnologia de ponta e profissionais altamente qualificados.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Visão</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Ser referência em odontologia no Brasil, reconhecida pela qualidade dos serviços e pela satisfação dos nossos pacientes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Valores</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-accent" size={18} />Excelência</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-accent" size={18} />Ética profissional</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-accent" size={18} />Humanização</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-accent" size={18} />Inovação</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-foreground mb-4">Perguntas Frequentes</h2>
                <p className="text-xl text-muted-foreground">Tire suas dúvidas sobre nossos serviços</p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg">Como funciona o agendamento de consultas?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Você pode agendar através do nosso site, telefone ou WhatsApp. Nossa equipe entrará em contato para confirmar o horário disponível.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg">Os planos cobrem emergências?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Sim! Todos os nossos planos incluem atendimento de emergência 24h para situações urgentes como dores intensas ou traumas.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg">Qual a carência para usar o plano?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Não há carência para consultas e procedimentos básicos. Para tratamentos mais complexos, a carência varia de 30 a 180 dias conforme o plano escolhido.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg">Posso incluir dependentes no plano?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Sim! Nosso Plano Familiar permite incluir até 5 dependentes. Para o Plano Empresarial, não há limite de dependentes.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-lg">Aceitam convênios médicos?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Trabalhamos com diversos convênios odontológicos. Entre em contato para verificar se o seu convênio é aceito em nossa clínica.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Localização Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-accent" />
              <h2 className="text-4xl font-bold text-foreground mb-4">Nossa Localização</h2>
              <p className="text-xl text-muted-foreground">Venha nos visitar na Av. Adhemar de Barros</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Endereço</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-accent mt-1" size={20} />
                    <div>
                      <p className="font-semibold">Odonto Prime</p>
                      <p className="text-muted-foreground">
                        Av. Adhemar de Barros, 1307
                        <br />
                        Guarujá, São Paulo - SP
                        <br />
                        CEP: 11430-000
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-accent mt-1" size={20} />
                    <div>
                      <p className="font-semibold">Telefone</p>
                      <p className="text-muted-foreground">(13) 98864-4782</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="text-accent mt-1" size={20} />
                    <div>
                      <p className="font-semibold">Horário</p>
                      <p className="text-muted-foreground">
                        Segunda a Sexta: 8h às 18h
                        <br />
                        Sábado: 8h às 12h
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Index;