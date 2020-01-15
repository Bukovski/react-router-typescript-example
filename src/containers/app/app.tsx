import React from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom'
import Tooltip from '../tooltip';
import TableEdit from '../table-edit';
import { TABLE_EMPLOYERS, TABLE_FIELDS } from '../../config';
import Workers from "../workers";
import ColorForm from "../color-form";
import "./app.css"


export default function App() {
  return(
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink
              to="/"
              className="nav-link"
              exact
              activeClassName={'active'}
            >
              Color Form
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/tooltip"
              className="nav-link"
              activeClassName={'active'}
            >
              Tooltip
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/edit-table"
              className="nav-link"
              activeClassName={'active'}
            >
              Edit Table
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/workers"
              className="nav-link"
              activeClassName={'active'}
            >
              Workers Table
            </NavLink>
          </li>
        </ul>
      </nav>


      <Switch>
        <Route path="/" exact component={ ColorForm }/>

        <Route path="/tooltip" render={ () => <div className="row">
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
        } />

        <Route path="/edit-table" render={ () => <TableEdit
          employers={ TABLE_EMPLOYERS }
          fields={ TABLE_FIELDS }
        />
        } />

        <Route path="/workers" component={ Workers }/>

        <Redirect to={'/'}/>
      </Switch>
    </React.Fragment>
  );
}

