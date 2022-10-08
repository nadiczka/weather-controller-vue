import { store } from "@/store";
import { notify } from "@/helpers";
import Vue from 'vue';

const extractUserNameFromResponse = (responseData) => {
  const email = responseData.data;
  const customEmailPart = email.split('@')[0];

  const [firstNameLower, lastNameLower] = customEmailPart.split('.');
  const firstNameUpper = firstNameLower.charAt(0).toUpperCase() + firstNameLower.slice(1);
  const lastNameUpper = lastNameLower ? (lastNameLower.charAt(0).toUpperCase() + lastNameLower.slice(1)) : '';

  return `${firstNameUpper} ${lastNameUpper}`;
}

const checkTokenValidation = async () => {
  const token = Vue.$cookies.get('webjive_jwt');
  const exp_time = new Date(JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).exp * 1000);
  const state = Date.now() - Date.parse(exp_time) <= 3600000;

  if (!state) {
    notify({type: 'error', title: 'Session has expired. You will be logged out.'})
    await store.dispatch('user/logout');
  }
  return state;
}

const loginNecessityInformer = async () => {
  await checkTokenValidation();
  if (store.user.user.name === '') {
    notify({type: 'error', title: 'You need to be logged in to do this.'})
  }
}

export {
  extractUserNameFromResponse,
  loginNecessityInformer,
}
