<!--
Copyright (c) 2022 Nicholas Johnson
-->
<template>

    <section id="home-container">
        <div id="home">

            <div id="record-container">  
                <div id="record-list-container">
                    <record-list @record-selected="recordSelected"></record-list>
                </div>    
                <div id="record-data-container">
                    <record-data :record-data="recordData"></record-data>
                </div>
            </div>
            
        </div>
    </section>

</template>
<script>

    import Controller from '@/mixins/controller'
    import RecordList from '@/components/RecordList.vue'
    import RecordData from '@/components/RecordData.vue'

    class HomeController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList );

            this.vm = {
                recordData: {}
            }
        }

        recordSelected(record) {
            this.recordData = record
        }
    }

    export default new HomeController('pgHome', { RecordList, RecordData });

</script>
<style scoped>
    /* Local styles for this template */
    #home-container {
        display: inline-block;
        width: 100%;
    }

    #home {
        margin:2vw;
        border: 1px solid black;
        background-color: lightgray;
        color: black;
        height: 78vh;
        width: 80vw;
    }

    .sample-form {
        border: 2px solid #333;
        margin: 1em;
        padding: 2em;
    }

    select, input, button {
        font-size: 1.2em;
        font-weight: 700;
        height: 1.4em;
    }

    #record-container {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    #record-list-container {
        height: 100%;
        width: 14vw;
    }

    #record-data-container {
        height: 100%;
        flex-grow: 1;
    }

    button {
        padding: .5em;
        margin: .25em;
        padding-bottom: 1.5em;
    }
</style>
