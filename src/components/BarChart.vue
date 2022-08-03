<!--
<t-bar-chart :data='dataObject/>

@copyright (c) 2019. Scott Henshaw. All Rights Reserved.
-->
<template>

    <section class="component-style">  <!-- Just one main element per template -->
        <h3>{{ title }}</h3>
        <GChart
            type="AreaChart"
            :data=data
            :options="chartOptions"
         />
    </section>

</template>
<script>
    import Controller from '@/mixins/controller'
    import { GChart } from 'vue-google-charts/legacy'

    // import other components you use here...

    class BarChartController extends Controller {

        constructor( name, subComponentList = []) { 
            super( name, subComponentList )

            // the vm date does not exist until the component is created
            this.vm = {
                title: "Bar Chart",
                chartOptions: {
                    title: 'Company Performance',
                    hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
                    vAxis: { minValue: 0 },
                    chartArea: { width: '50%', height: '70%' },
                    width: 800,
                    height: 600,
                }
      
            }

            // props passed in when using this component
            this.props = {
                data: Array
            }
        }
    }

    export default new BarChartController('TBarChart', { GChart });

</script>
<style scoped>
    /*
    Add "scoped" attribute to limit CSS to this component only <style scoped>
    styles that are specific to this component only, not sub-children
    */
    .component-style {
        display: flex;
        flex-direction:row;
        flex-wrap:wrap;
        justify-content:space-evenly;
        align-content: flex-start;
        align-items:flex-start;
    }

</style>