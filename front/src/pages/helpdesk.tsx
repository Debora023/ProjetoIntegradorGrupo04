import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const HelpDesk: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    console.log({ nome: name, email: email, descricao: description });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md border-accent border-2 hover:shadow-card-hover transition-shadow duration-300">
        <CardHeader className="text-center">
          <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-accent" />
          <CardTitle className="text-2xl font-bold">Help Desk - OdontoPrime</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Entre em contato conosco: <strong>Suporte.OdontoPrime@gmail.com</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!sent ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="p-2 border rounded border-gray-300 w-full"
              />
              <input
                type="email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-2 border rounded border-gray-300 w-full"
              />
              <textarea
                placeholder="Descreva seu problema"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="p-2 border rounded border-gray-300 w-full"
              />
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                Enviar
              </Button>
            </form>
          ) : (
            <div className="bg-green-100 p-4 rounded text-center">
              <h3 className="font-bold text-green-700">✅ Mensagem enviada!</h3>
              <p>
                Obrigado, {name}! Recebemos seu chamado e entraremos em contato em breve pelo e-mail:{" "}
                <strong>{email}</strong>.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpDesk;
