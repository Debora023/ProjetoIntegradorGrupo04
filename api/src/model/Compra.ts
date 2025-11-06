export type FormaPagamento = "cartao_credito" | "cartao_debito" | "pix" | "boleto";
export type TipoPagamento = "avista" | "parcelado";



export class Compra {
  constructor(
      private id: string,
      private telefone: string,
       private Cpf: string, 
       private NomeCompleto: string,
      private Nomedoplano: string,
      private FormaDepagamento: FormaPagamento,
      private tipoDepagamento: TipoPagamento
  ) {
    if (!NomeCompleto) throw new Error("Nome completo obrigatório");
    if (telefone === undefined || telefone === null)
      throw new Error("telefone obrigatório");
    if (FormaDepagamento === undefined || FormaDepagamento === null)
      throw new Error("forma de pagamento obrigatório");
    if (Cpf === undefined || Cpf === null)
      throw new Error("Cpf obrigatório");
    if (tipoDepagamento === undefined || tipoDepagamento === null)
      throw new Error("");

    if (NomeCompleto.length < 2) throw new Error("nome muito curto");
    if (Cpf.length !== 11) throw new Error("Cpf deve ter 11 caracteres");
    if (telefone.length < 11) throw new Error("telefone deve conter 11 digitos.");
}

  static create(
    telefone: string,
    cpf: string,
    NomeCompleto: string,
    Nomedoplano: string,
    FormaDepagamento: FormaPagamento,
    tipoDepagamento: TipoPagamento

) {
        const id = crypto.randomUUID();
        return new Compra(id, telefone, cpf, NomeCompleto, Nomedoplano, FormaDepagamento, tipoDepagamento);

}

  getId(): String {
        return this.id;
    }

    getTelefone(): String {
        return this.telefone;
    }
    
    getCpf(): String {
        return this.Cpf;
    }

    getNomeCompleto(): string {
        return this.NomeCompleto;
    }

    getNomedoplano(): String {
        return this.Nomedoplano;
    }

    getFormaDepagamento(): FormaPagamento {
        return this.FormaDepagamento;
    }

     gettipoDePagamento(): TipoPagamento {
        return this.tipoDepagamento;
    }

    setFormaDepagamento(FormaDepagamento: FormaPagamento): void {
    this.FormaDepagamento = FormaDepagamento;
  }

  settipoDepagamento(tipoDepagamento: TipoPagamento): void {
    this.tipoDepagamento = tipoDepagamento;
  }
}
