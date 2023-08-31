function dateFormat(val) {
    return val.toISOString().split("T")[0]
}

module.exports = dateFormat