import React, { Component } from 'react';
import styled from 'styled-components';

export default class Dropdown extends Component {
    state = {
        items: this.props.items || [],
        showItems: false,
        selectedItem: this.props.items && this.props.items[0],
    }

    dropDown = () => {
        this.setState(prevState => ({
            showItems: !prevState.showItems,
        }));
    }

    selectItem = (item) => this.setState({
        selectedItem: item,
        showItems: false
    })


    render() {
        return (
            <div class="input-group">
                <select style={{borderColor: 'transparent'}} class="custom-select" id="inputGroupSelect04">
                    <option selected>What city are you in?</option>
                    <option value="1">Plano</option>
                    <option value="2">Carrollton</option>
                    <option value="3">Frisco</option>
                </select>
                <div class="input-group-append">
                    <button style={{background: 'red', color: 'white', borderColor: 'transparent'}} class="btn btn-outline-secondary" type="button"><strong>Shop</strong></button>
                </div>
            </div>
        )
    }
}

