// Copyright (c) 2022 Nicholas Johnson

export const ChartTypes = {
    player_damage: {
        type: "BarChart",
        endpoint: "/api/charts/player_damage",
        chartOptions: {
            title: 'Character Damage Numbers',
            hAxis: { title: 'Damage', titleTextStyle: { color: '#333' } },
            vAxis: { minValue: 0 },
            chartArea: { width: '50%', height: '50%' },
        },
        // @param {crow_player: Number, pheonix_player: Number} data 
        chartDataStruture: (data) => {
            console.log(data)
            return [['player', 'Crow', 'Pheonix'],
                    ['', data.crow_player, data.pheonix_player]]
        }
    },
    // TODO: Put rest of types here
}