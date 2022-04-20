import express from 'express';

const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "1/3/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" }
];
const app = express();
let str = "";

//show all hoidays
app.get("/holidays", (req, res) => {
    holidays.forEach(holiday => {
        str += `<li>${holiday.name} - ${holiday.date}</li> </br>`
    });
    res.send(str);
});

//verify is today is a holiday
app.get("/is-today-holiday", (req, res) => {
    const today = new Date();
    const holiday = holidays.find(holiday => holiday.date === today.toLocaleDateString());
    if (holiday) {
        res.send(`<h1>Hoje é feriado: ${holiday.name}</h1>`);
    } else {
        res.send(`<h1>Hoje não é feriado</h1>`);
    }
});

//get holidays in a specific month
app.get('/holidays/:holidayId', (req, res) => {
    const id = req.params.holidayId;
    let str = "";
    holidays.forEach(holiday => {
        if (holiday.date.split("/")[0] === id) {
            str += `<li>${holiday.name} - ${holiday.date}</li> </br>`
        }
    });
    if (str) {
        res.send(str);
    } else {    
        res.send(`<h1>Não existe feriado para o mês ${id}</h1>`);
    }
});


app.listen(4000);