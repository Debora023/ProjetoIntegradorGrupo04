import { Agendamento } from "../model/Agendamento";

export class AgendamentoService {
  lista: Agendamento[] = [];

  public Agendar(Agendamenta: {
    nome: string,
    email: string,
    especialidade: string,
    dataConsulta: Date,
    horario: string,
    telefone: String,
  }): Agendamento {
    const AgendamentoCriado = Agendamento.create(
      Agendamenta.nome,
      Agendamenta.email,
      Agendamenta.especialidade,
      Agendamenta.dataConsulta,
      Agendamenta.horario,
      Agendamenta.telefone
    );
    this.lista.push(AgendamentoCriado);
    return AgendamentoCriado;
  }
  
  listarAgendamentos(): Agendamento [] {
    return this.lista;
  }

  public buscarPorData(dataConsulta: Date): Agendamento[] {
    return this.lista.filter(
      (a) => a.getdataConsulta().toDateString() === dataConsulta.toDateString()
    );
  }

  }