import React, { useState } from 'react';
import Tooltip from '../tooltip';
import TableEdit from '../table-edit';
import { TABLE_FIELDS, TABLE_EMPLOYERS } from '../../config';
import "./app.css"
import Workers from "../workers";
import ColorForm from "../color-form";


export default function App(props: object) {
  return(
    <React.Fragment>
      <ColorForm />

      <hr/>

      <div className="row">
        <Tooltip
          text="Master Express.js-The Node.js Framework For Your Web Development"
          allowToggleWithClick={false}
          allowToggleWithMouseInteraction={true}
          positionWhereShowText="top"
        >
          Pro Express.js
        </Tooltip>
        was published in 2014. It was one of the first books on v4.x. And it was my second book published with Apress after
        <Tooltip text="Practical Node.js: Building Real-World Scalable Web Apps">Practical Node.js</Tooltip>.
        ...
        The main focus of this post is to compare the four Node.js/Io.js frameworks:
        <Tooltip text="HTTP API server">Hapi</Tooltip>,
        <Tooltip text="Release the Kraken!">Kraken</Tooltip>,
        <Tooltip text="Sail away">Sails.js</Tooltip> and
        <Tooltip text="IBM of frameworks">Loopback</Tooltip>.
        There are many other frameworks to consider, but I had to draw the line somewhere.
      </div>

      <hr/>

      <TableEdit employers={ TABLE_EMPLOYERS } fields={ TABLE_FIELDS }/>

      <hr/>

      <Workers/>
    </React.Fragment>
  );
}

