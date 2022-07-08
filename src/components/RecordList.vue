<!--
Copyright (c) 2022 Nicholas Johnson
-->
<template>

    <section class="container">
        
            <div id="filter-container">
                <input type="text" id="search-bar" v-model="searchText" @change="newSearchInput()" />
                <button id="filter"></button>
            </div>
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
                searchText: "",
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

        newSearchInput() {
            console.log("New String: " + this.searchText)
        }
    }

    export default new RecordListController('pgRecordList');

</script>
<style scoped>
    
    .container {
        display: inline-block;
        height: 100%;
        width: 100%;
    }

    #filter-container {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: fit-content;
        padding: .2em;
    }
    
    #search-bar {
        border-style: solid;
        border-width: 1px;
        width: 100%;
        height: 100%;
        flex-grow: 1;
        margin-right: 5px;
    }

    #filter {
        width: .7vw;
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
</style>
