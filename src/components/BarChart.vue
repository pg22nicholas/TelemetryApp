<!--
<t-bar-chart :chartIndex=Number :chartType=String/>

Copyright (C) Nicholas Johnson 2022
-->
<template>

    <section class="chart-container">  <!-- Just one main element per template -->
        <h3>{{ chartTypes[chartType].title }}</h3>
        <GChart
            class="chart"
            :type="chartTypes[chartType].type"
            :data="actionSummary[chartIndex]"
            :options="chartTypes[chartType].chartOptions"
         />
    </section>

</template>
<script>
    import Controller from '@/mixins/controller'
    import { GChart } from 'vue-google-charts/legacy'
    import { ChartTypes } from '../store/ChartData.js'

    class BarChartController extends Controller {

        constructor( name, subComponentList = []) { 
            super( name, subComponentList )

            this.vm = {
                chartTypes: ChartTypes
            }

            this.props = {
                chartType: String,
                chartIndex: Number,
            }

            this.injectGetters(['actionSummary'])
            this.injectActions(['retrieveActionSummary'])
        }

        async onMounted() {
            await this.retrieveActionSummary({ index: 0, chartType: "player_damage" })
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