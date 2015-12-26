import expect from 'expect';
import deepFreeze from 'deep-freeze';
import {conference, conferences, user} from '../src/reducers';

describe('conference reducer', function () {
  it('new conference', function () {
    const action = {
      type: "ADD_CONF",
      conf: {
        id: 0,
        name: "JSConfBP",
        topic: "Javascript",
        website: "http://jsconfbp.com/",
        dateFrom: 1463007600000,
        dateTo: 1463094000000
      }
    };

    expect(conference(void 0, action))
      .toEqual({
        id: 0,
        name: "JSConfBP",
        topic: "Javascript",
        website: "http://jsconfbp.com/",
        dateFrom: 1463007600000,
        dateTo: 1463094000000,
        peopleGoing: [],
        peopleInterested: []
      })
  });

  it('edit a conference', function () {
    const state = { id: 0, name: "A" };
    const action = {
      type: "EDIT_CONF",
      conf: {
        id: 0,
        name: "B"
      }
    };

    deepFreeze(state);

    expect(conference(state, action))
      .toEqual({ id: 0, name: "B" });
  });
});

describe('conferences reducer', function () {
  it('add a new conference', function () {
    const action = { type: "ADD_CONF", conf: { id: 0 } };
    deepFreeze(action);
    expect(conferences(void 0, action).length).toEqual(1);
  });

  it('remove a conference', function () {
    const action = { type: "DELETE_CONF", conf: { id: 0 } };
    const state = [{ id: 0 }];
    deepFreeze(action);
    expect(conferences(state, action).length).toEqual(0);
  });

  it('edit a conference', function () {
    const action = { type: "EDIT_CONF", conf: { id: 0, name: "B" } };
    const state = [{ id: 0, name: "A" }];
    deepFreeze(state);
    expect(conferences(state, action)[0].name).toEqual("B");
  });
});

describe('user reducer', function () {
  it('go to conference', function () {
    const action = { type: "GO_TO_CONF", confId: 0 };
    const state = { goingToConfs: [], interestedInConfs: [] };
    deepFreeze(state);
    expect(user(state, action)).toEqual({
      goingToConfs: [0],
      interestedInConfs: []
    });
  });

  it('don\' go to conference', function () {
    const action = { type: "DONT_GO_CONF", confId: 0 };
    const state = { goingToConfs: [0], interestedInConfs: [] };
    deepFreeze(state);
    expect(user(state, action)).toEqual({
      goingToConfs: [],
      interestedInConfs: []
    });
  });

  it('interested in conference', function () {
    const action = { type: "INTERESTED_IN_CONF", confId: 0 };
    const state = { goingToConfs: [], interestedInConfs: [] };
    deepFreeze(state);
    expect(user(state, action)).toEqual({
      goingToConfs: [],
      interestedInConfs: [0]
    });
  });

  it('not interested in conference', function () {
    const action = { type: "NOT_INTERESTED_IN_CONF", confId: 0 };
    const state = { goingToConfs: [], interestedInConfs: [0] };
    deepFreeze(state);
    expect(user(state, action)).toEqual({
      goingToConfs: [],
      interestedInConfs: []
    });
  });
});
