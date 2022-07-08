<!--
Copyright (c) 2022 Nicholas Johnson
-->
<template>

    <section class="container">
        
            <div class="record-data">
                {{ recordData }}
            </div>

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
                recordData: String,
            }

            this.injectGetters(['recordList']);
        }
    }

    export default new RecordListController('pgRecordList');

</script>
<style scoped>
    /* Local styles for this template */
    .container {
        display: inline-block;
        width: 100%;
    }

    .record-data {
    }

    button {
        padding: .5em;
        margin: .25em;
        padding-bottom: 1.5em;
    }
</style>
