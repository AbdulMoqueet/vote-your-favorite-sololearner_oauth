const Contestant = require('../models/Contestant');

const arr = [
    {
        soloId: '12942084',
        name: 'Aakaanksha 💕'
    },
    {
        soloId: '12006051',
        name: 'Abhinaya'
    },
    {
        soloId: '10107008',
        name: 'Amit'
    },
    {
        soloId: '197327',
        name: 'Burey'
    },
    {
        soloId: '4354920',
        name: 'Calviղ'
    },
    {
        soloId: '8518623',
        name: 'ChillPill'
    },
    {
        soloId: '8569435',
        name: 'EnCoDeR'
    },
    {
        soloId: '12731601',
        name: 'Man Of Action'
    },
    {
        soloId: '8175030',
        name: 'Mitali'
    },
    {
        soloId: '12447674',
        name: 'NiKi🌸 SY💕'
    },
    {
        soloId: '2551505',
        name: 'Nikolay Nachev'
    },
    {
        soloId: '4586359',
        name: 'Serena Yvonne'
    },
    {
        soloId: '5371585',
        name: 'Sick L̲̅i̲̅n̲̅e̲̅ B̶r̶o̶🌡️'
    },
    {
        soloId: '10109012',
        name: 'ՏԹɑɾՏհíƘɑ 🎀'
    }
];

const initialData = () => {
    console.log('data..................');
    Contestant.insertMany(arr, function (error, docs) {
        if (error)
            console.log(error);
        else
            console.log('saved...');
    });
}

module.exports = initialData;