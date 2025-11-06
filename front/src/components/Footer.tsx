import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary-light">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🦷</span>
              Odonto Prime
            </h3>
            <p className="text-primary-foreground/80">
              Cuidando do seu sorriso com excelência e tecnologia de ponta.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3 text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <Phone size={18} />
                <span>(13) 98864-4782</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <span>contato@odontoprime.com.br</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>Av. Adhemar de Barros, 1307 - Guarujá, SP</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Horário de Atendimento</h4>
            <div className="space-y-2 text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>Segunda a Sexta: 8h às 18h</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>Sábado: 8h às 14h</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-light mt-8 pt-8 text-center text-primary-foreground/70">
          <p>&copy; 2025 Odonto Prime. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
