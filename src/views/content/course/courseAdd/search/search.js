import React from 'react'

import './search.css'

import { SearchBar } from 'antd-mobile';

class Search extends React.Component{
  render(){
    return (
      <div className='search'>
          <SearchBar 
              placeholder={this.props.placeholder}
              maxLength={20} 
              onSubmit={value => this.props.callback(value)}
          />
      </div>
    )
  }
}

export default Search