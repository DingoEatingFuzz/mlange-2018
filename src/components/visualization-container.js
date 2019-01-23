import React from 'react'

import './visualization-container.scss'

import Gol from './visualizations/gol'

export default () => (
  <div className="visualization-container">
    <Gol />
    <dl className="visualization-attribution">
      <dt>Title:</dt><dd>Conway's Game of Life</dd>
      <dt>Medium:</dt><dd>WebGL</dd>
      <dt>Date:</dt><dd>Jan. 2019</dd>
    </dl>
    <div className="fade-out"></div>
  </div>
)
