
function averageRating(instance) {
    let totalRating = 0
    if (instance.length > 0) {
        for (let i = 0 ; i < instance.length ; i++) {
            totalRating += +instance[i].rating
        }
        let avg = totalRating / instance.length
        return avg
    }
    return totalRating

}

module.exports = averageRating