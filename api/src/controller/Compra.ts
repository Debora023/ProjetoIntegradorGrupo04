import { Compra } from "../model/Compra";
import { app } from "../server";
import { CompraService } from "../service/Compra";

export function CompraController() {
    const service = new CompraService();

  app.get("/Compra", (req, res) => {
    const Compra = service.listaCompras();
    res.send(Compra)
  })

  app.post("/Compra", (req, res) => {
    try {
      const dadosCompra = req.body;
      const novoCompra = service.Compra(dadosCompra);
      res.status(201).json({
        status: "Compra criada com sucesso",
      });
    } catch (e: any) {
      return res.status(400).json({ erro: e.message });
    }
  });


}