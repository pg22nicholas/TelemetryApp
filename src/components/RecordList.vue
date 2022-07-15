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
                <div    
                        v-bind:class="checkRecordSelection(id)" 
                        v-for="(record, id) in recordList" :value="record" :key="record.id">
                        <div class="record-row">
                            <div class="record-info" @click="selectRecord(id)" >{{record.id + "\n" + record.version}}</div>
                            <button @click="deleteRecord(id)" class="delete-record-button">
                                <div class="delete-button-text">-</div>
                            </button>
                        </div>
                </div>
                <!--<button id="load-new-page-button">New Records</button>-->
            </div>

    </section>

</template>
<script>

    import Controller from '@/mixins/controller'

    class RecordListController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList );

            this.vm = {
                selectedRecordId: 0,
                searchText: "",
            }

            this.injectGetters(['recordList']);
            this.injectActions(['deleteRecordFromStore', 'getRecords'])
        }

        selectRecord(id) {
            this.selectedRecordId = id
        }

        checkRecordSelection(id) {
            if (id == this.selectedRecordId) {
                this.$emit('record-selected', this.recordList[id])
                return 'selected'
            } 
            return 'unselected'
        }

        deleteRecord(id) {
            this.deleteRecordFromStore(id)
        }

        newSearchInput() {
            console.log("New String: " + this.searchText)
        }

        onMounted() {
            console.log("On Mounted")
            this.getRecords()
        }
    }

    export default new RecordListController('pgRecordList');

</script>
<style scoped>
    
    .container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        height: 100%;
        width: 20vw;
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
        width: 100%;
        flex-grow: 1;
        background-color: white;
        overflow-y: scroll;
    }

    .record-row {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 35px;
        padding: 5px;
        justify-content: center;
    }

    .delete-record-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 100%;
    }

    #load-new-page-button {
        width: 100%;
        height: 35px;
    }

    .delete-button-text {
        width: fit-content;
        height: fit-content;
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
