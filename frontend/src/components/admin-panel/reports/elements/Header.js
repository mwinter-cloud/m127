import React, { Component } from 'react'
import {Link} from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
      return (
          <header>
              <h2>Жалобы за сегодня</h2>
              <Link to="/admin-panel/black-list" className="simple-button"><i className="el-icon-user"></i> Заблокированные участники</Link>
          </header>
      )
  }
}

export default Header
