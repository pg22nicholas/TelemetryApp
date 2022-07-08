<!--
Copyright (c) 2022 Nicholas Johnson
-->
<template>

    <section class="home-container">
        <div class="home">
            <h4>Admin</h4>

            <div class="record-container">      
                <record-list @record-selected="recordSelected"></record-list>
                <record-data :record-data="recordData"></record-data>
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
                recordData: ""
            }
        }

        recordSelected(record) {
            this.recordData = JSON.stringify(record)
        }
    }

    export default new HomeController('pgHome', { RecordList, RecordData });

</script>
<style scoped>
    /* Local styles for this template */
    .home-container {
        display: inline-block;
        width: 100%;
    }

    .home {
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

    button {
        padding: .5em;
        margin: .25em;
        padding-bottom: 1.5em;
    }
</style>
