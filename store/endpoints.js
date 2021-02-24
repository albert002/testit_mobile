const user = `/user`;
// auth api
export const user_login = `${user}/login`;
export const user_logout = `${user}/logout`;
export const user_register = `${user}/register`;
export const user_recover = `${user}/recover`;
// user personal data
export const user_data = `${user}/data`;
export const user_update = `${user}/update`;
export const user_update_password = `${user}/change_password`;
export const user_upload_avatar = `${user}/upload_image`;
// user projects
export const book_project = id => `${user}/app_booking/${id}`;
export const find_projects = (os, version) => `${user}/find_app?os_type=${os}&os_version=${version}`;
export const user_apps = `${user}/get_apps`;
export const device_options = `${user}/device_options`;
export const report_bug = id => `${user}/add_bug/${id}`;
export const cancel_app = id => `${user}/cancel_app/${id}`;
// user bugs
export const find_bugs = `${user}/find_bug`;

//user chat
export const send_message = `/message/create`;
export const get_chat = `/chat/find?with_=admin`;
export const get_messages = `/message/find/1?page=1&limit=5`;
