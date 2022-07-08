<!--
VFS VUE Single File Component

<pg-home user="User"></pg-home>

Copyright (c) 2018. Scott Henshaw, Kibble Online Inc. All Rights Reserved.
-->
<template>

    <section class="home-container">
        <div class="home">
            <h4>Admin</h4>
            <div class="record-list">
                <div    @click="selectRecord(index)" 
                        v-bind:class="(selectedRecord == index ? 'selected' : 'unselected')" 
                        v-for="(record, index) in recordList" :value="record" :key="record.id">
                    {{record.id}}
                </div>
            </div>
        </div>
    </section>

</template>
<script>

    import Controller from '@/mixins/controller'

    class HomeController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList );

            this.vm = {
                selectedRecord: 0,
            }

            this.injectGetters(['recordList']);
        }

        selectRecord(index) {
            this.selectedRecord = index
        }
    }

    export default new HomeController('pgHome');

</script>
<style scoped>
    /* Local styles for this template */
    .home-container {
        display: inline-block;
        width: 100%;
    }

    .record-list {
        display: flex;
        flex-direction: column;
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
