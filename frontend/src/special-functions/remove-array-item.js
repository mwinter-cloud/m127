export default function remove_array_item(array, id){
    let new_list = array.filter(function (el) {
        return Number(el.id) !== Number(id)
    })
    return new_list
}