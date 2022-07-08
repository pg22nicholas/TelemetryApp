<!--
Copyright (c) 2022 Nicholas Johnson
-->
<template>

    <section class="container">
        
            <div class="record-list">
                <div    @click="selectRecord(index)" 
                        v-bind:class="checkRecordSelection(index)" 
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
                selectedRecordIndex: 0,
            }

            this.injectGetters(['recordList']);
        }

        selectRecord(index) {
            this.selectedRecordIndex = index
        }

        checkRecordSelection(index) {
            if (index == this.selectedRecordIndex) {
                this.$emit('record-selected', this.recordList[index])
                return 'selected'
            }
            return 'unselected'
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
