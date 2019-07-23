import React from 'react'
 export default class Counter extends React.Component{
    increment=()=>{
        const number =  this.refs.numberSelect.value*1
        this.props.increment(number)
    }

    decrement=()=>{
        const number = this.refs.numberSelect.value*1
        this.props.decrement(number)
    }
    
    // incrementIfOdd=()=>{
    //     const number=  this.refs. numberSelect.value*1
    // }
    // incrementAsync=()=>{
    //     const number=  this.refs. numberSelect.value*1
    // }
    render(){
       const count= this.props.count
        return(
            <div>
                <p>{count}</p>
                <select ref="numberSelect">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;
                <button onClick={this.incrementAsync}>increment async</button>
            </div>
        )
    }
}
