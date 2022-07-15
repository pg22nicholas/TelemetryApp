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
    import { ref, watch } from 'vue'

    //const recordDataWatcher = ref('')

    class RecordListController extends Controller {
        constructor( name, subComponentList = []) {
            super( name, subComponentList );

            this.vm = {
                selectedRecordId: -1,
                searchText: "",
            }

            this.injectGetters(['recordList']);
            this.injectActions(['deleteRecordFromStore', 'getRecords'])
        }

        selectRecord(id) {
            this.selectedRecordId = id
        }

        checkRecordSelection(id) {
            // if nothing selected (Case when no records loaded in)
            if (this.selectedRecordId == -1) return

            if (id == this.selectedRecordId) {
                this.$emit('record-selected', this.recordList[id])
                return 'selected'
            } 
            return 'unselected'
        }

        // delete a record and update the currently selected record if needed
        async deleteRecord(id) {
            let arrOfIds = Object.keys(this.recordList)
            let index = arrOfIds.indexOf(id)
            if (index == -1) return;
            
            await this.deleteRecordFromStore(id)  

            arrOfIds.splice(index, 1)

            // if deleted record is the currently selected record
            if (this.selectedRecordId == id) {

                // if list of records empty, set nothing as selected
                if (arrOfIds.length == 0) {
                    this.selectedRecordId = -1
                    return
                }

                // if deleted and was selected last record, decrement selected index
                if (index >= arrOfIds.length) index--;

                this.selectedRecordId = arrOfIds[index]
            }

            // force an update on the specific record
            this.recordList[this.selectedRecordId].id = this.selectedRecordId
        }

        newSearchInput() {
            console.log("New String: " + this.searchText)
        }

        async onMounted() {
            console.log("On Mounted")
            await this.getRecords()  
            this.selectRecord(Object.keys(this.recordList)[0])
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
