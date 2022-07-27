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

    create(request, data) {

    }

    read(request) {

    }

    update(request, data) {

    }

    delete(request, data) {

    }
}
