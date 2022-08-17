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

    read(request, type) {
        // assume request is /api/tdata/record_list
        // assume request is /api/charts/action-chart
    }

    update(request, data) {

    }

    delete(request, data, type) {

    }

    add(request, data, type) {

    }
}
