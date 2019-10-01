
import './_service'


import './data/data.draw'

import './data/data.store'


import './requests/login'

import './requests/tasks'

import './requests/users'

const getNames = () => {
  return {
    username: document.getElementById('login_name').value,
    password: document.getElementById('login_pass').value
  }
}
