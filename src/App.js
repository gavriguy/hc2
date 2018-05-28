import React, { Component } from 'react';
import './App.css';
import Hill from './hill.svg';
import Draggable from 'react-draggable';
import * as R from 'ramda';

const t = window.TrelloPowerUp.iframe();

const handleStop = ticketId => (e, data) => {
  const { x, y } = data;
  t.set('board', 'shared', { [ticketId]: { x, y } });
};

const Ticket = ({ id, position, color, onClick, isSelected }) => (
  <Draggable
    axis="both"
    handle=".handle"
    defaultPosition={position}
    position={null}
    onStart={onClick}
    onStop={handleStop(id)}
  >
    <div
      className="handle"
      style={{
        cursor: 'move',
        backgroundColor: color,
        opacity: isSelected ? 1 : 0.4,
        width: 20,
        height: 20,
        borderRadius: 20,
        border: 'solid 1px #000'
      }}
    />
  </Draggable>
);

class App extends Component {
  state = { selected: null, tickets: [] };

  componentDidMount() {
    t.get('board', 'shared').then(data => {
      t.lists('all').then(lists => {
        t.cards('all').then(tickets => {
          const ticktesWithPosition = R.map(ticket => ({
            ...ticket,
            name: `${ticket.name} [${
              lists.find(list => list.id === ticket.idList).name
            }]`,
            position: data[ticket.id] ? data[ticket.id] : { x: 0, y: 0 }
          }))(tickets);

          this.setState({ tickets: ticktesWithPosition });
        });
      });
    });
  }

  handleClick(ticketId) {
    this.setState({ selected: ticketId });
  }

  render() {
    const { tickets } = this.state;
    if (tickets.length === 0) return null;
    return (
      <div>
        <div
          style={{
            height: 20,
            width: 700,
            textAlign: 'center',
            paddingTop: 10
          }}
        >
          {this.state.selected &&
            tickets.find(ticket => ticket.id === this.state.selected).name}
        </div>
        <div
          style={{
            background: `url(${Hill}) no-repeat 50% 50% `,
            backgroundSize: 'contain',
            height: 340,
            width: 700,
            margin: 10
          }}
        >
          {tickets.map(ticket => (
            <Ticket
              id={ticket.id}
              onClick={this.handleClick.bind(this, ticket.id)}
              key={ticket.id}
              position={ticket.position}
              color={ticket.labels.length > 0 ? ticket.labels[0].color : '#ccc'}
              isSelected={ticket.id === this.state.selected}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
