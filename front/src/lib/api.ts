// API Service - Integração completa com o Backend
export type FormaPagamento = "cartao_credito" | "cartao_debito" | "pix" | "boleto";
export type TipoPagamento = "avista" | "parcelado";

// Interfaces baseadas nos models do backend
export interface Compra {
  id?: string;
  telefone: string;
  Cpf: string;
  NomeCompleto: string;
  Nomedoplano: string;
  FormaDepagamento: FormaPagamento | string;
  tipoDepagamento: TipoPagamento | string;
}

export interface Agendamento {
  id?: string;
  nome: string;
  email: string;
  especialidade: string;
  dataConsulta: string | Date;
  horario: string;
  telefone: string;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  telefone: string;
}

export interface CompraResponse {
  status: string;
  id?: string;
}

export interface AgendamentoResponse {
  status: string;
  id: string;
}

export interface ErrorResponse {
  erro: string;
}

const API_URL = "https://grupo04projeto20252.escolatecnicaadelia.info/api";

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_URL;
  }

  // Métodos de Compra
  async criarCompra(compra: Compra): Promise<CompraResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/Compra`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(compra),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error((data as ErrorResponse).erro || "Erro ao criar compra");
      }

      return data as CompraResponse;
    } catch (error) {
      console.error("Erro ao criar compra:", error);
      throw error;
    }
  }

  async listarCompras(): Promise<Compra[]> {
    try {
      const response = await fetch(`${this.baseUrl}/Compra`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Erro ao listar compras");
      }

      return await response.json();
    } catch (error) {
      console.error("Erro ao listar compras:", error);
      throw error;
    }
  }

  // Métodos de Agendamento
  async criarAgendamento(agendamento: Agendamento): Promise<AgendamentoResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/Agendamento`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(agendamento),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error((data as ErrorResponse).erro || "Erro ao criar agendamento");
      }

      return data as AgendamentoResponse;
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      throw error;
    }
  }

  async listarAgendamentos(): Promise<Agendamento[]> {
    try {
      const response = await fetch(`${this.baseUrl}/Agendamento`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Erro ao listar agendamentos");
      }

      return await response.json();
    } catch (error) {
      console.error("Erro ao listar agendamentos:", error);
      throw error;
    }
  }

  // Métodos de Usuário
  async listarUsuarios(): Promise<Usuario[]> {
    try {
      const response = await fetch(`${this.baseUrl}/usuarios`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Erro ao listar usuários");
      }

      return await response.json();
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      throw error;
    }
  }
}

// Exportar instância única do serviço
export const api = new ApiService();

// Manter compatibilidade com código antigo
export const compraService = api;
