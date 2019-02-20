const Events = (function() {
    var listeners = []

    const matcher = (element, eventname) => {
        (evl) => evl.element === element && evl.eventname === eventname
    }

    var exists = (element, eventname) => listeners.some(matcher(element, eventname, callback))

    function addListener(element, eventname, callback) {
        if (exists(element, eventname)) {
            console.log(`Event ${name} already exists.`)
            return false
        }
        element.addEventListener(eventname, callback)
        listeners.push({element:element, eventname:eventname, callback:callback})
        return true
    }

    function removeListener(element, eventname, callback) {
        if (!exists(element, eventname)) {
            console.log(`Attempted to remove non-existent listener`)
            return false
        }
        element.removeEventListener(eventname, callback)
        const isMatch = matcher(element, eventname, callback)
        for (let [i, l] of listeners) {
            if (isMatch(l)) {
                console.log(listeners[i])
                l.element.removeEventListener(l.eventname, l.callback)
                listeners.splice(i, 1)
                return true
            }
        }
        return false
    }

    return {
        addListener: addListener,
        removeListener: removeListener
    }
}())