import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/Logo.jpg"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Início", path: "/" },
    { name: "Planos", path: "/planos" },
    { name: "Suporte", path: "/suporte" },
    { name: "Comprar", path: "/compra" },
    
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-primary border-b border-primary-light shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <img src={Logo} alt="Logo"/>
            </div>
            <span className="text-2xl font-bold text-primary-foreground">
              Odonto Prime
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "secondary" : "ghost"}
                  className={
                    isActive(item.path)
                      ? "text-primary font-semibold"
                      : "text-primary-foreground hover:bg-primary-light"
                  }
                >
                  {item.name}
                </Button>
              </Link>
            ))}
            <Link to="/cadastro">
              <Button variant="default" className="ml-4 bg-accent hover:bg-accent/90">
                Agendar Consulta
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-slide-up">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                <Button
                  variant={isActive(item.path) ? "secondary" : "ghost"}
                  className={`w-full justify-start ${
                    isActive(item.path)
                      ? "text-primary font-semibold"
                      : "text-primary-foreground hover:bg-primary-light"
                  }`}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
            <Link to="/cadastro" onClick={() => setIsOpen(false)}>
              <Button variant="default" className="w-full bg-accent hover:bg-accent/90">
                Agendar Consulta
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
