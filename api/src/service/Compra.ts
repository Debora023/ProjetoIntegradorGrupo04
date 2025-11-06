import { Compra, FormaPagamento, TipoPagamento } from "../model/Compra";

export class CompraService {
    listaC: Compra[] = [];

   public Compra (Comprar: {
        telefone: string,
        Cpf: string, 
        NomeCompleto: string,
        Nomedoplano: string,
        FormaDepagamento: FormaPagamento,
        tipoDepagamento: TipoPagamento

     }): Compra | void { 
       const CompraFeita = Compra.create(
         Comprar.telefone,
         Comprar.Cpf,
         Comprar.NomeCompleto,
         Comprar.Nomedoplano,
         Comprar.FormaDepagamento,
         Comprar.tipoDepagamento
         
       );

       this.listaC.push(CompraFeita);
       return CompraFeita;
    } 

   listaCompras(): Compra [] {
      return this.listaC;
    }
  
    public buscarPorCompraComNomeDoCliente(NomeCliente: String): Compra | undefined {
      return this.listaC.find((a) => a.getNomeCompleto() == NomeCliente);
    }
}