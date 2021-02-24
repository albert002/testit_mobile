const email = { name: 'email', type: 'email', placeholder: 'Email', error_message: 'Please enter valid email', icon: 'mail' };
const password = { name: 'password', type: 'password', placeholder: 'Password', error_message: 'Please enter your Password', icon: 'lock' };

const confirm_password = {
  name: 'confirm_password',
  type: 'password',
  placeholder: 'Confirm Password',
  error_message: 'Please enter your confirm password',
  icon: 'lock',
};

const new_password = {
  name: 'new_password',
  type: 'password',
  placeholder: 'Enter new Password',
  error_message: 'Please enter your new password',
  icon: 'lock',
};

const company_name = {
  name: 'company_name',
  type: 'text',
  placeholder: 'Company Name',
  error_message: 'Please enter your company name',
  icon: 'fire',
};

// collections
export const fields_login = [email, password];
export const fields_register = [company_name, email, password, confirm_password];
export const fields_recover = [email];
export const fields_reset = [password, confirm_password];
//
export const fields_personal = object => [{ ...company_name, defaultValue: object.company_name }];
export const fields_ch_password = [password, confirm_password, new_password];
