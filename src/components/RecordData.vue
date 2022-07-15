<!--
Copyright (c) 2022 Nicholas Johnson
-->
<template>

    <section class="container">
        <pre class="record-data">{{ formatRecordJSON(recordData) }}</pre>
    </section>

</template>
<script>

    import Controller from '@/mixins/controller'

    class RecordListController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList );

            this.vm = {
                selectedRecord: 0,
            }

            this.props = {
                recordData: Object,
            }

            this.injectGetters(['recordList']);
        }

        formatRecordJSON(record) {
            let stringToDisplay = JSON.stringify(record, null, 8)
            stringToDisplay.slice(0, 1)
            stringToDisplay.slice(stringToDisplay.length - 1, 1)
            return stringToDisplay
        }
    }

    export default new RecordListController('pgRecordList');

</script>
<style scoped>
    /* Local styles for this template */
    .container {
        display: inline-block;
        height: 100%;
        width: 100%;
    }

    .record-data {
        height: 100%;
        margin-left: 20px;
        margin-top: 10px;
        overflow: scroll;
    }

    button {
        padding: .5em;
        margin: .25em;
        padding-bottom: 1.5em;
    }
</style>
