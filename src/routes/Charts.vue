<!--
VFS VUE Single File Component

<pg-home user="User"></pg-home>

Copyright (c) 2018. Scott Henshaw, Kibble Online Inc. All Rights Reserved.
-->
<template>

    <section class="container main">
        <h3>Charts</h3>
        <div class="container chart-area">
            <div class="chart chart-1">
                this is where the charts go
                <t-bar-chart :data="actionSummary"/>
            </div> 
             <div class="chart chart-2">
                this is where the charts go
            </div> 
             <div class="chart chart-3">
                this is where the charts go
            </div> 
            <div class="chart chart-4">
                this is where the charts go
            </div> 
        </div>
    </section>

</template>
<script>

    import Controller from '@/mixins/controller'
    import TBarChart from '@/components/BarChart.vue'

    class ChartsController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList );
            this.vm = {
                chartData1: [
                     ['Year', 'Sales', 'Expenses'],
                    ['2013', 1000, 400],
                    ['2014', 1170, 460],
                    ['2015', 660, 1120],
                    ['2016', 1030, 540],
                ],
            }
            this.props = {
                name: String,
            }

            
            this.injectGetters(['actionSummary'])
        }
    }

    export default new ChartsController('phCharts', { TBarChart });

</script>
<style scoped>

    h3 {
        color: black;
        font-weight: 700;
    }

    main {
        flex-direction: column;
        overflow-y: auto;
    }
    
    .container {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-evenly;
    } 

    .chart-area {
        flex-direction: row;
        justify-content: space;
        width: 90vw;
    }

    .chart {
        margin:2vw;
        border: 1px solid black;
        color: black;
        height: 40vh;
        width: 25vw;
        background-color: rosybrown;
    }
    
</style>
