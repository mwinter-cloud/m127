export default function replace_array_item_field(array, id, fieldname, new_value){
        let index = array.map(function (el) {
            return el.id
        }).indexOf(id)
        array[index][fieldname] = new_value
        return array
}