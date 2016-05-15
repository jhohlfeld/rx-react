function createDOMDriver(initDriver) {
    return function(props$) {

        const _events = {}
        const _callbacks = {}

        const events = function(type) {
            if (!_events[type]) {
                const event$ = new Rx.Subject()
                _events[type] = event$
                _callbacks[type] = (e) => event$.onNext(e)
            }
            return _events[type]
        }

        const createCallback = function(type) {
            if (!_callbacks[type]) {
                events(type)
            }
            return _callbacks[type]
        }

        initDriver(props$, createCallback)

        return { events }

    }
}

export {
    createDOMDriver
}
