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
export let balance;
export let rewards;
export const fetchData = () => {

  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {

      let balanceOf = await store
      .getState()
      .blockchain.smartContract.methods.balanceOf(store.getState().blockchain.account)
        .call()
        .then((response) => {
          balance = response;
        })

      let getAllRewards = await store
      .getState()
      .blockchain.smartContract.methods.getAllRewards(store.getState().blockchain.account)
      .call()
      .then((response)=>{
        rewards = response;
      })
      dispatch(
        fetchDataSuccess({
          balanceOf,
          getAllRewards
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};