import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "@/lib/api";

const cadastroSchema = z.object({
  nome: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres").max(100, "Nome muito longo"),
  email: z.string().trim().email("Email inválido").max(255, "Email muito longo"),
  telefone: z.string().trim().min(10, "Telefone inválido").max(15, "Telefone inválido"),
  consulta: z.string().min(1, "Selecione o tipo de consulta"),
  especialidade: z.string().min(1, "Selecione a especialidade"),
  data: z.string().min(1, "Selecione a data"),
  horario: z.string().min(1, "Selecione o horário"),
});

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    consulta: "",
    especialidade: "",
    data: "",
    horario: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      cadastroSchema.parse(formData);
      setErrors({});
      setIsSubmitting(true);

      // Criar o objeto de agendamento conforme esperado pela API
      const agendamento = {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        especialidade: formData.especialidade,
        dataConsulta: formData.data,
        horario: formData.horario,
      };

      // Enviar para a API
      const response = await api.criarAgendamento(agendamento);

      toast.success("Agendamento realizado com sucesso! Entraremos em contato para confirmar.");

      // Limpar formulário
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        consulta: "",
        especialidade: "",
        data: "",
        horario: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        toast.error("Por favor, corrija os erros no formulário");
      } else {
        toast.error("Erro ao criar agendamento. Tente novamente.");
        console.error("Erro:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header Section */}
      <section className="bg-gradient-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <UserPlus className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">
            Cadastro de Paciente
          </h1>
          <p className="text-xl max-w-2xl mx-auto animate-slide-up">
            Preencha o formulário abaixo para agendar sua consulta
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-card-hover">
              <CardHeader className="text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-accent" />
                <CardTitle className="text-3xl">Agendamento de Consulta</CardTitle>
                <CardDescription className="text-lg">
                  Todas as informações são obrigatórias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <Label htmlFor="nome">Nome Completo </Label>
                      <Input
                        id="nome"
                        value={formData.nome}
                        onChange={(e) => handleChange("nome", e.target.value)}
                        placeholder="Digite seu nome completo"
                        className={errors.nome ? "border-destructive" : ""}
                      />
                      {errors.nome && (
                        <p className="text-sm text-destructive mt-1">{errors.nome}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">E-mail </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="seu@email.com"
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="telefone">Telefone </Label>
                      <Input
                        id="telefone"
                        type="tel"
                        value={formData.telefone}
                        onChange={(e) => handleChange("telefone", e.target.value)}
                        placeholder="(11) 99999-9999"
                        className={errors.telefone ? "border-destructive" : ""}
                      />
                      {errors.telefone && (
                        <p className="text-sm text-destructive mt-1">{errors.telefone}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="consulta">Tipo de Consulta </Label>
                      <Select
                        value={formData.consulta}
                        onValueChange={(value) => handleChange("consulta", value)}
                      >
                        <SelectTrigger className={errors.consulta ? "border-destructive" : ""}>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="primeira">Primeira Consulta</SelectItem>
                          <SelectItem value="retorno">Retorno</SelectItem>
                          <SelectItem value="emergencia">Emergência</SelectItem>
                          <SelectItem value="avaliacao">Avaliação</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.consulta && (
                        <p className="text-sm text-destructive mt-1">{errors.consulta}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="especialidade">Especialidade </Label>
                      <Select
                        value={formData.especialidade}
                        onValueChange={(value) => handleChange("especialidade", value)}
                      >
                        <SelectTrigger className={errors.especialidade ? "border-destructive" : ""}>
                          <SelectValue placeholder="Selecione a especialidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="clinico">Clínico Geral</SelectItem>
                          <SelectItem value="ortodontia">Ortodontia</SelectItem>
                          <SelectItem value="implantes">Implantes</SelectItem>
                          <SelectItem value="estetica">Estética Dental</SelectItem>
                          <SelectItem value="endodontia">Endodontia</SelectItem>
                          <SelectItem value="periodontia">Periodontia</SelectItem>
                          <SelectItem value="protese">Prótese Dentária</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.especialidade && (
                        <p className="text-sm text-destructive mt-1">{errors.especialidade}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="data">Data </Label>
                      <Input
                        id="data"
                        type="date"
                        value={formData.data}
                        onChange={(e) => handleChange("data", e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className={errors.data ? "border-destructive" : ""}
                      />
                      {errors.data && (
                        <p className="text-sm text-destructive mt-1">{errors.data}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="horario">Horário </Label>
                      <Select
                        value={formData.horario}
                        onValueChange={(value) => handleChange("horario", value)}
                      >
                        <SelectTrigger className={errors.horario ? "border-destructive" : ""}>
                          <SelectValue placeholder="Selecione o horário" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="08:00">08:00</SelectItem>
                          <SelectItem value="09:00">09:00</SelectItem>
                          <SelectItem value="10:00">10:00</SelectItem>
                          <SelectItem value="11:00">11:00</SelectItem>
                          <SelectItem value="14:00">14:00</SelectItem>
                          <SelectItem value="15:00">15:00</SelectItem>
                          <SelectItem value="16:00">16:00</SelectItem>
                          <SelectItem value="17:00">17:00</SelectItem>
                          <SelectItem value="17:30">17:30</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.horario && (
                        <p className="text-sm text-destructive mt-1">{errors.horario}</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Importante:</strong> Este é um pré-agendamento. Nossa equipe entrará em contato
                      para confirmar a disponibilidade da data e horário solicitados.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Solicitar Agendamento"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cadastro;
