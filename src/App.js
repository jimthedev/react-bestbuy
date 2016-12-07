import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import api from './Api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      name: '',
      type: '',
      price: 0,
      shipping: 0,
      upc: '',
      description: '',
      manufacturer: '',
      model: '',
      url: '',
      image: '',
      api: api(),
      isFormShown: false
    }
  }
  componentDidMount(){
    this.getItems();
  }
  getItems() {
    axios.get(api() + '/products')
      .then((response) => {
        this.setState({
          items: response.data.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  onClickDelete(item) {
    axios.delete(api() + '/products/' + item.id)
      .then((response) => {
        this.getItems();
      }).catch(err => console.log(err));
  }
  onNewProductSubmit(e) {
    e.preventDefault();
    console.log(this.state.name);
    const {
      name,
      type,
      price,
      shipping,
      upc,
      description,
      manufacturer,
      model,
      url,
      image
    } = this.state;
    axios.post(api() + '/products', {
      name,
      type,
      price: parseInt(price, 10),
      shipping: parseInt(shipping, 10),
      upc,
      description,
      manufacturer,
      model,
      url,
      image
    })
  }
  onNewProductChange(field, e) {
    this.setState({
      [field]: e.target.value
    })
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React {this.state.api}</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <form onSubmit={this.onNewProductSubmit.bind(this)}>
          <h2>New Product</h2>
          <div>
            Name: <input type="text" onChange={this.onNewProductChange.bind(this, 'name')} value={this.state.name} />
            Type: <input type="text" onChange={this.onNewProductChange.bind(this, 'type')} value={this.state.type} />
            Price: <input type="text" onChange={this.onNewProductChange.bind(this, 'price')} value={this.state.price} />
            Shipping: <input type="text" onChange={this.onNewProductChange.bind(this, 'Shipping')} value={this.state.shipping} />
            UPC: <input type="text" onChange={this.onNewProductChange.bind(this, 'upc')} value={this.state.upc} />
            Description: <input type="text" onChange={this.onNewProductChange.bind(this, 'description')} value={this.state.description} />
            Manufacturer: <input type="text" onChange={this.onNewProductChange.bind(this, 'manufacturer')} value={this.state.manufacturer} />
            Model: <input type="text" onChange={this.onNewProductChange.bind(this, 'model')} value={this.state.model} />
            URL: <input type="text" onChange={this.onNewProductChange.bind(this, 'url')} value={this.state.url} />
            Image url: <input type="text" onChange={this.onNewProductChange.bind(this, 'image')} value={this.state.image} />
            <input type="submit" />
          </div>
        </form>
        <ul>
          {this.state.items.map((item, index) => {
            return (
              <li key={item.id}>{item.name} <span onClick={this.onClickDelete.bind(this, item)}>Delete</span></li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default App;
