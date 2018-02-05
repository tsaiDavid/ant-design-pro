import { isUrl } from '../utils/utils';

const menuData = [{
  name: 'Dashboard',
  icon: 'dashboard',
  path: 'dashboard',
  children: [{
    name: 'Analysis',
    path: 'analysis',
  }, {
    name: 'Monitoring',
    path: 'monitor',
  }, {
    name: 'Workplace',
    path: 'workplace',
    // hideInMenu: true,
  }],
}, {
  name: 'Form',
  icon: 'form',
  path: 'form',
  children: [{
    name: 'Basic Form',
    path: 'basic-form',
  }, {
    name: 'Step Form',
    path: 'step-form',
  }, {
    name: 'Advanced Form',
    authority: 'admin',
    path: 'advanced-form',
  }],
}, {
  name: 'Table',
  icon: 'table',
  path: 'list',
  children: [{
    name: 'Table List',
    path: 'table-list',
  }, {
    name: 'Basic List',
    path: 'basic-list',
  }, {
    name: 'Card List',
    path: 'card-list',
  }, {
    name: 'Search',
    path: 'search',
    children: [{
      name: 'Articles',
      path: 'articles',
    }, {
      name: 'Projects',
      path: 'projects',
    }, {
      name: 'Applications',
      path: 'applications',
    }],
  }],
}, {
  name: 'Profile',
  icon: 'profile',
  path: 'profile',
  children: [{
    name: 'Basic',
    path: 'basic',
  }, {
    name: 'Advanced',
    path: 'advanced',
    authority: 'admin',
  }],
}, {
  name: 'Result',
  icon: 'check-circle-o',
  path: 'result',
  children: [{
    name: 'Success',
    path: 'success',
  }, {
    name: 'Fail',
    path: 'fail',
  }],
}, {
  name: 'Warning',
  icon: 'warning',
  path: 'exception',
  children: [{
    name: '403',
    path: '403',
  }, {
    name: '404',
    path: '404',
  }, {
    name: '500',
    path: '500',
  }, {
    name: 'Trigger',
    path: 'trigger',
    hideInMenu: true,
  }],
}, {
  name: 'User',
  icon: 'user',
  path: 'user',
  authority: 'guest',
  children: [{
    name: 'Login',
    path: 'login',
  }, {
    name: 'Register',
    path: 'register',
  }, {
    name: 'Registration Result',
    path: 'register-result',
  }],
}];

function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
