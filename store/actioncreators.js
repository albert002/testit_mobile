import Request from './request';

const Dispatcher = (type, payload) => {
  return { type, payload };
};

// simple action creator
export const ActionCreator = (type, payload) => {
  return dispatch => {
    dispatch(Dispatcher(type, payload));
  };
};

// delete action creator
const DeleteData = (api, body) => Request.delete(api, body);

export const DELETE = (api, body) => () => {
  try {
    return DeleteData(api, body)
      .then(resp => resp.json())
      .then(data => data, error => error);
  } catch (error) {
    console.error(error);
  }
};

// get action creator
const FetchData = api => {
  return Request.get(api);
};

export const GET = (api, type) => dispatch => {
  try {
    return FetchData(api)
      .then(resp => resp.json())
      .then(payload => dispatch(Dispatcher(type, payload)), error => error)
      .then(data => data.payload);
  } catch (error) {
    console.error(error);
  }
};

// post action creator
const PostData = (api, data) => {
  return Request.postJson(api, data);
};

export const POST = (api, data) => () => {
  try {
    return PostData(api, data)
      .then(resp => resp.json())
      .then(data => data, error => error);
  } catch (error) {
    console.error(error);
  }
};

// put action creator
const PutData = (api, data, formdata) => {
  if (formdata) return Request.putFormData(api, data);
  return Request.put(api, data);
};

export const PUT = (api, data, formdata) => dispatch => {
  try {
    return PutData(api, data, formdata)
      .then(resp => resp.json())
      .then(data => data, error => error);
  } catch (error) {
    console.error(error);
  }
};
