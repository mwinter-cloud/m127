export default function replace_array_item(array, new_data){
        let index = array.map(function (el) {
            return el.id
        }).indexOf(new_data.id)
        array[index] = new_data
        return array
}