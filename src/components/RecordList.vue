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
                        <div class="record-row">
                            <div class="record-info">{{record.id + "\n" + record.version}}</div>
                            <button @click="deleteRecord(index)" class="delete-record-button"></button>
                        </div>
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
            this.injectActions(['deleteRecordFromStore'])
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

        deleteRecord(index) {
            this.deleteRecordFromStore(index)
            if (index == this.selectedRecordIndex) {
                if (this.selectedRecordIndex > 0) this.selectedRecordIndex--
            }
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

    .record-row {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 35px;
        padding: 5px;
    }

    .delete-record-button {
        width: 50px;
        height: 100%;
    }

    .record-info {
        flex-grow: 1;
    }

    .selected {
        background-color: rgb(191, 158, 221);
    }

    .unselected {
        background-color: white;
    }
</style>
