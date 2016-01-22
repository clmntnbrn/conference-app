import React, { Component } from 'react';
import { connect } from 'react-redux';
import find from 'lodash/collection/find';
import includes from 'lodash/collection/includes';
import values from 'lodash/object/values';
import s from './user-conf-list.css';

export class UserConfList extends Component {
  clickHandler(key) {
    const { cancelCallback, name, fbRef } = this.props;
    this.props.dispatch(cancelCallback(fbRef, name, key));
  }

  render() {
    const { confKeys, conferences } = this.props;

    return (
      <ul className={s.list}>
        {confKeys.map(key => {
          const conf = conferences[key];

          return (
            <li className={s.listItem} key={key}>
              <a href="">{conf.name}</a>
              <button className={s.button} onClick={this.clickHandler.bind(this, key)}>-</button>
            </li>
          );
        })}
      </ul>
    );
  }
}

export function userConfListSelector(state, props, dispatch) {
  const { user: { name }, conferences } = state;
  const confKeys = Object.keys(conferences).filter(key =>
    includes(conferences[key][props.group], name)
  );
  return { name, dispatch, confKeys, conferences, fbRef: props.fbRef };
}

export default connect(userConfListSelector)(UserConfList);
