import express from "express";
import { AgendamentoController } from "./controller/Agendamento";
import { CompraController } from "./controller/Compra";



export const app = express();
const PORTA = 3004


app.use((req, res, next) => {
    
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-type, Authorization");

 
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
})

app.use(express.json());

AgendamentoController();
CompraController();

app.listen(PORTA, () => {
    console.log("Servidor rodando na porta...");
});


