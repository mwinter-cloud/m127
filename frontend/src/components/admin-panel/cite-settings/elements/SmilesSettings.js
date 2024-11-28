import React, {Component} from "react"
import axios from "axios"
import AddSmileForm from "../forms/AddSmileForm"
import SmileBlock from "./SmileBlock"
import remove_array_item from "../../../../special-functions/remove-array-item"

class SmilesSettings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            smiles: [],
        }
        this.removeItem = this.removeItem.bind(this)
        this.addItem = this.addItem.bind(this)
    }

    componentDidMount() {
        axios.get(window.location.origin + '/api/get-smiles').then(res => {
            this.setState({smiles: res.data})
        })
    }

    removeItem = (id) => {
        let new_list = remove_array_item(this.state.smiles, id)
        this.setState({smiles: new_list})
    }

    addItem = (data) => {
        this.setState({smiles: this.state.smiles.concat(data)})
    }

    render() {
        return (
            <main className="smiles-edit-block">
                <h2><i className="el-icon-tableware"></i> Смайлы</h2>
                <AddSmileForm addItem={this.addItem}/>
                <div className="added-smiles">
                    {this.state.smiles.map((smile, index) => {
                        return (
							<SmileBlock key={index} smile={smile} removeItem={this.removeItem}/>
						)
					})}
                </div>
            </main>
        )
    }
}

export default SmilesSettings
