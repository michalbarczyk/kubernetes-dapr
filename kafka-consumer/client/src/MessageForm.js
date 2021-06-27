// ------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
// ------------------------------------------------------------

import React from 'react';

export class MessageForm extends React.Component {
    constructor(props) {
      super(props);

      this.state = { events: [] }
    }

    handleSubmit = (event) => {
        fetch('/history', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:"GET"
        })
        .then(response => response.json())
        .then(data => {
          this.setState({ events: data })
        })
        
    }

    render() {
      return (
        <div class="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content">
          <form onSubmit={this.handleSubmit}>
            <button type="submit" className="btn btn-primary">Refresh</button>
          </form>
        
          <h1>History</h1>
            <ul>
              {this.state.events.map(ev => {
                return <li>{ev}</li>
              })}
            </ul>
        </div>        
      );
    }
  }