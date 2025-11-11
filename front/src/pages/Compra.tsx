import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  CreditCard,
  Smartphone,
  Barcode,
  DollarSign,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { api, type FormaPagamento, type TipoPagamento } from "@/lib/api";

const compraSchema = z.object({
  nomeCompleto: z
    .string()
    .trim()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100),
  telefone: z.string().trim().min(10, "Telefone inválido").max(15),
  email: z.string().trim().email("Email inválido").max(255),
  cpf: z
    .string()
    .trim()
    .regex(/^\d{11}$/, "CPF deve conter 11 dígitos"),
  servico: z.string().min(1, "Selecione um plano"),
  formaPagamento: z.string().min(1, "Selecione a forma de pagamento"),
  tipoPagamento: z.string().min(1, "Selecione o tipo de pagamento"),
});

const Compra = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    telefone: "",
    email: "",
    cpf: "",
    servico: "",
    formaPagamento: "",
    tipoPagamento: "",
    parcelas: "1",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const servicos = [
    { id: "limpeza", nome: "Plano Familiar", valor: 269.90 },
    { id: "clareamento", nome: "Plano Individual", valor: 99.90 },
    { id: "restauracao", nome: "Plano Empresarial", valor: 119.0, texto: "/pessoa" },
  ];

  const servicoSelecionado = servicos.find((s) => s.id === formData.servico);
  const valorTotal = servicoSelecionado?.valor || 0;
  const valorParcela =
    formData.tipoPagamento === "parcelado"
      ? valorTotal / parseInt(formData.parcelas)
      : valorTotal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      compraSchema.parse(formData);
      setErrors({});
      setIsSubmitting(true);

      // Mapear forma de pagamento para o formato da API
      let formaPagamentoAPI: string = formData.formaPagamento;
      if (formData.formaPagamento === "credito") {
        formaPagamentoAPI = "cartao_credito";
      } else if (formData.formaPagamento === "debito") {
        formaPagamentoAPI = "cartao_debito";
      }

      // Criar objeto de compra conforme esperado pela API
      const compra = {
        telefone: formData.telefone,
        Cpf: formData.cpf,
        NomeCompleto: formData.nomeCompleto,
        Nomedoplano: servicoSelecionado?.nome || "",
        FormaDepagamento: formaPagamentoAPI,
        tipoDepagamento: formData.tipoPagamento,
      };

      // Enviar para a API
      const response = await api.criarCompra(compra);

      toast.success("Compra realizada com sucesso! Enviamos os detalhes para seu email.");

      // Reset form
      setFormData({
        nomeCompleto: "",
        telefone: "",
        email: "",
        cpf: "",
        servico: "",
        formaPagamento: "",
        tipoPagamento: "",
        parcelas: "1",
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
        toast.error("Por favor, revise o formulário");
      } else {
        toast.error("Compra realizada com sucesso! Enviamos os detalhes para seu email.");
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

  const getPaymentIcon = () => {
    switch (formData.formaPagamento) {
      case "credito":
      case "debito":
        return <CreditCard className="w-5 h-5" />;
      case "pix":
        return <Smartphone className="w-5 h-5" />;
      case "boleto":
        return <Barcode className="w-5 h-5" />;
      default:
        return <DollarSign className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header Section */}
      <section className="bg-gradient-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">
            Finalizar Compra
          </h1>
          <p className="text-xl max-w-2xl mx-auto animate-slide-up">
            Complete seus dados e escolha a forma de pagamento
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Informações Pessoais
                  </CardTitle>
                  <CardDescription>
                    Preencha todos os campos obrigatórios
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="nomeCompleto">Nome Completo *</Label>
                        <Input
                          id="nomeCompleto"
                          value={formData.nomeCompleto}
                          onChange={(e) =>
                            handleChange("nomeCompleto", e.target.value)
                          }
                          placeholder="Digite seu nome completo"
                          className={
                            errors.nomeCompleto ? "border-destructive" : ""
                          }
                        />
                        {errors.nomeCompleto && (
                          <p className="text-sm text-destructive mt-1">
                            {errors.nomeCompleto}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="telefone">Telefone *</Label>
                          <Input
                            id="telefone"
                            type="tel"
                            value={formData.telefone}
                            onChange={(e) =>
                              handleChange("telefone", e.target.value)
                            }
                            placeholder="(11) 99999-9999"
                            className={
                              errors.telefone ? "border-destructive" : ""
                            }
                          />
                          {errors.telefone && (
                            <p className="text-sm text-destructive mt-1">
                              {errors.telefone}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="cpf">CPF *</Label>
                          <Input
                            id="cpf"
                            value={formData.cpf}
                            onChange={(e) =>
                              handleChange(
                                "cpf",
                                e.target.value.replace(/\D/g, "")
                              )
                            }
                            placeholder="00000000000"
                            maxLength={11}
                            className={errors.cpf ? "border-destructive" : ""}
                          />
                          {errors.cpf && (
                            <p className="text-sm text-destructive mt-1">
                              {errors.cpf}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">E-mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          placeholder="seu@email.com"
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label htmlFor="servico">Serviço Desejado *</Label>
                      <Select
                        value={formData.servico}
                        onValueChange={(value) =>
                          handleChange("servico", value)
                        }
                      >
                        <SelectTrigger
                          className={errors.servico ? "border-destructive" : ""}
                        >
                          <SelectValue placeholder="Selecione o serviço" />
                        </SelectTrigger>
                        <SelectContent>
                          {servicos.map((servico) => (
                            <SelectItem key={servico.id} value={servico.id}>
                              {servico.nome} - R$ {servico.valor.toFixed(2)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.servico && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.servico}
                        </p>
                      )}
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <Label>Forma de Pagamento *</Label>
                      <RadioGroup
                        value={formData.formaPagamento}
                        onValueChange={(value) =>
                          handleChange("formaPagamento", value)
                        }
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                          <RadioGroupItem value="credito" id="credito" />
                          <Label
                            htmlFor="credito"
                            className="cursor-pointer flex items-center gap-2"
                          >
                            <CreditCard className="w-5 h-5 text-accent" />
                            Cartão de Crédito
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                          <RadioGroupItem value="debito" id="debito" />
                          <Label
                            htmlFor="debito"
                            className="cursor-pointer flex items-center gap-2"
                          >
                            <CreditCard className="w-5 h-5 text-accent" />
                            Cartão de Débito
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                          <RadioGroupItem value="pix" id="pix" />
                          <Label
                            htmlFor="pix"
                            className="cursor-pointer flex items-center gap-2"
                          >
                            <Smartphone className="w-5 h-5 text-accent" />
                            PIX
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                          <RadioGroupItem value="boleto" id="boleto" />
                          <Label
                            htmlFor="boleto"
                            className="cursor-pointer flex items-center gap-2"
                          >
                            <Barcode className="w-5 h-5 text-accent" />
                            Boleto Bancário
                          </Label>
                        </div>
                      </RadioGroup>
                      {errors.formaPagamento && (
                        <p className="text-sm text-destructive">
                          {errors.formaPagamento}
                        </p>
                      )}
                    </div>

                    {(formData.formaPagamento === "credito" ||
                      formData.formaPagamento === "boleto") && (
                      <>
                        <Separator />
                        <div className="space-y-4">
                          <Label>Tipo de Pagamento *</Label>
                          <RadioGroup
                            value={formData.tipoPagamento}
                            onValueChange={(value) => {
                              handleChange("tipoPagamento", value);
                              if (value === "vista") {
                                handleChange("parcelas", "1");
                              }
                            }}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-3">
                              <RadioGroupItem value="avista" id="avista" />
                              <Label htmlFor="vista" className="cursor-pointer">
                                À Vista
                              </Label>
                            </div>
                            <div className="flex items-center space-x-3">
                              <RadioGroupItem
                                value="parcelado"
                                id="parcelado"
                              />
                              <Label
                                htmlFor="parcelado"
                                className="cursor-pointer"
                              >
                                Parcelado
                              </Label>
                            </div>
                          </RadioGroup>
                          {errors.tipoPagamento && (
                            <p className="text-sm text-destructive">
                              {errors.tipoPagamento}
                            </p>
                          )}
                        </div>

                        {formData.tipoPagamento === "parcelado" && (
                          <div>
                            <Label htmlFor="parcelas">Número de Parcelas</Label>
                            <Select
                              value={formData.parcelas}
                              onValueChange={(value) =>
                                handleChange("parcelas", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                                  (num) => (
                                    <SelectItem
                                      key={num}
                                      value={num.toString()}
                                    >
                                      {num}x de R${" "}
                                      {(valorTotal / num).toFixed(2)}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-accent hover:bg-accent/90"
                      size="lg"
                      disabled={!servicoSelecionado || isSubmitting}
                    >
                      {isSubmitting ? "Processando..." : "Finalizar Compra"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="shadow-card sticky top-24">
                <CardHeader>
                  <CardTitle className="text-2xl">Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {servicoSelecionado ? (
                    <>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Serviço:
                          </span>
                          <span className="font-semibold">
                            {servicoSelecionado.nome}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Valor:</span>
                          <span className="font-semibold">
                            R$ {valorTotal.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {formData.formaPagamento && (
                        <>
                          <Separator />
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">
                                Pagamento:
                              </span>
                              <span className="font-semibold flex items-center gap-2">
                                {getPaymentIcon()}
                                {formData.formaPagamento === "credito" &&
                                  "Crédito"}
                                {formData.formaPagamento === "debito" &&
                                  "Débito"}
                                {formData.formaPagamento === "pix" && "PIX"}
                                {formData.formaPagamento === "boleto" &&
                                  "Boleto"}
                              </span>
                            </div>

                            {formData.tipoPagamento === "parcelado" && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Parcelas:
                                </span>
                                <span className="font-semibold">
                                  {formData.parcelas}x de R${" "}
                                  {valorParcela.toFixed(2)}
                                </span>
                              </div>
                            )}
                          </div>
                        </>
                      )}

                      <Separator />

                      <div className="bg-accent/10 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold">Total:</span>
                          <span className="text-2xl font-bold text-accent">
                            R$ {valorTotal.toFixed(2)}
                          </span>
                        </div>
                        {formData.tipoPagamento === "parcelado" && (
                          <p className="text-sm text-muted-foreground mt-2 text-center">
                            ou {formData.parcelas}x de R${" "}
                            {valorParcela.toFixed(2)}
                          </p>
                        )}
                      </div>

                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground">
                          Após a confirmação do pedido, você receberá um email
                          com todas as instruções e o orçamento detalhado.
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      Selecione um serviço para ver o resumo
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Compra;
