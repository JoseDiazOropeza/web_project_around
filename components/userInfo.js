// Clase UserInfo para manejar la información del usuario
export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  // Devuelve un objeto con la info del usuario
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent
    };
  }

  // Actualiza la información del usuario en la página
  setUserInfo({ name, job }) {
    if (name !== undefined) this._nameElement.textContent = name;
    if (job !== undefined) this._jobElement.textContent = job;
  }
}
