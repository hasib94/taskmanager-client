import React, {Component} from 'react'

export default class Alert extends Component {
  render() {
    return(
      <div class={`notification ${this.props.givenClass}`}>
        <button class="delete" onClick={this.props.alertRemove}></button>
        {this.props.children}
      </div>
    )
  }
}