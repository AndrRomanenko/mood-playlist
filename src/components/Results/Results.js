import React from 'react'
import { format } from 'd3-format'

import Message from '../Message'
import './Results.css';

const fmt = (x, digits = 1) => format(`.${digits}%`)(x)

const Summary = ({ emotion }) => (
  <Message bg="green">
    <strong>Results:</strong> Hm, seems that you're <strong>{emotion}</strong>{' '}
  </Message>
)

const Results = ({ faces, emotions }) => {
  return (
    <div>
      <Summary
        emotion={emotions[0][0].label.name}
    />
      <div className="flex flex-wrap mt1 res-container">
        {faces.map((face, i) => (
          <div key={i} className="col col-4 px1">
            <div className="mb1 rounded overflow-hidden">
              <img
                src={face.toDataURL()}
                alt={`face ${i + 1}`}
                className="block col-12"
              />
              <div className="p05 fs-tiny">
                {emotions[i].slice(0, 2).map(({ label, value }) => (
                  <div key={label.name} className="flex justify-between">
                    <div className="mr05 truncate">
                      {label.name}
                    </div>
                    <div className="bold">{fmt(value)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Results
