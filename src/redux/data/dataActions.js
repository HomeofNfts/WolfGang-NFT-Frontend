// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};
export const fetchDataM = () => {

  // let approved; 
  return async (dispatch) => {
    const configResponse = await fetch("/stakeConfig/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const CONFIG = await configResponse.json();
    dispatch(fetchDataRequest());
    try {
      let totalMinted = await store
        .getState()
        .blockchain.smartContract.methods.totalMinted()
        .call();

      dispatch(
        fetchDataSuccess({
          totalMinted
        })
      );
    } catch (err) {
      // console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};