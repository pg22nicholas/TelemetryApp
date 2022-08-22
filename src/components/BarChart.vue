<!--
<t-bar-chart :data='dataObject/>

Copyright (C) Nicholas Johnson 2022
-->
<template>

    <section class="chart-container">  <!-- Just one main element per template -->
        <h3>{{ title }}</h3>
        <GChart
            class="chart"
            type="BarChart"
            :data="actionSummary[chartIndex]"
            :options="chartOptions"
         />
    </section>

</template>
<script>
    import Controller from '@/mixins/controller'
    import { GChart } from 'vue-google-charts/legacy'

    class BarChartController extends Controller {

        constructor( name, subComponentList = []) { 
            super( name, subComponentList )

            this.vm = {
                title: "Bar Chart",
                chartOptions: {
                    title: 'Character Damage Numbers',
                    hAxis: { title: 'Damage', titleTextStyle: { color: '#333' } },
                    vAxis: { minValue: 0 },
                    chartArea: { width: '50%', height: '50%' },
                }
            }

            this.props = {
                chartIndex: Number,
            }

            this.injectGetters(['actionSummary'])
            this.injectActions(['retrieveActionSummary'])
        }

        async onMounted() {
            await this.retrieveActionSummary({ index: 0, chartType: "" })
        }
    }

    export default new BarChartController('TBarChart', { GChart });

</script>
<style scoped>
    
    .chart-container {
        display: flex;
        flex-direction:row;
        flex-wrap:wrap;
        justify-content:space-evenly;
        align-content: flex-start;
        align-items:flex-start;
        width: 100%;
        height: 100%;
    }

    .chart {
        flex-grow: 1;
        width: 100%;
    }

</style>