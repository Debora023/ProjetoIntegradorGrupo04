import { Agendamento } from "../model/Agendamento";
import { app } from "../server";
import { AgendamentoService } from "../service/Agendamento";

export function AgendamentoController() {
  const service = new AgendamentoService();

  app.get("/Agendamento", (req, res) => {
    const Agendamento = service.listarAgendamentos();
    res.send(Agendamento)
  })

  app.post("/Agendamento", (req, res) => {
    try {
      const dadosAgendamento = req.body;
      const novoAgendamento = service.Agendar(dadosAgendamento);
      res.status(201).json({
        status: "Agendamento criado com sucesso",
        id: novoAgendamento.getId(),
      });
    } catch (e: any) {
      return res.status(400).json({ erro: e.message });
    }
  });


}