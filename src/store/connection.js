/* Copyright (C) 2022 Nicholas Johnson */

'use strict'

// abstract class
export default class Connection {

    constructor() {

        this.db // override in child
    }

    open() {

    }

    close() {

    }

    read(request) {
        // assume /api/tdata/type_list/:type
        // assume /api/tdata/record_list/:type
        // assume /api/charts/action_chart
    }

    delete(request, data) {
        // assume /api/tdata/record/:type
    }

    add(request, data) {
        // assume /api/tdata/record/:type
    }
}
