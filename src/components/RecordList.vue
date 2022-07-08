<!--
Copyright (c) 2022 Nicholas Johnson
-->
<template>

    <section class="container">
        
            <div class="record-list">
                <div    @click="selectRecord(index)" 
                        v-bind:class="(selectedRecord == index ? 'selected' : 'unselected')" 
                        v-for="(record, index) in recordList" :value="record" :key="record.id">
                    {{record.id}}
                </div>
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

            this.injectGetters(['recordList']);
        }

        selectRecord(index) {
            this.$emit('recordSelected', this.recordList[index])
            this.selectedRecord = index
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

    .record-list {
        display: flex;
        flex-direction: column;
    }

    .selected {
        background-color: rgb(191, 158, 221);
    }

    .unselected {
        background-color: white;
    }

    button {
        padding: .5em;
        margin: .25em;
        padding-bottom: 1.5em;
    }
</style>
