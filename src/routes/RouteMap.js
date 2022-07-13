const routes = {
  login: "login",
  dashboard: "/",
  admins: "admins",
  services: "services",
  orders: "orders",
  other: "other",
  units: "units",
  auth: "auth",
  services: "services",
  categories: "categories",
  categoriesAtr: "categories-atribute",
  roles: "roles",
  users: "users",
  settlements: "settelments",
  userWallet: "user-wallet",
  financialManagement: "financial-management",
  user: "users/:id",
};

const ref = { ...{ routes } };
const map = {};
const dynamicMap = {};

Object.entries(ref).forEach(([key, value]) => {
  Object.entries(value).forEach(([key1, value1]) => {
    const path = `/${value1}`;

    map[key] = {
      ...map[key],
      [key1]: path,
    };

    const generatePathFunc = (args) => {
      let newPath = path;

      if (!args || Object.values(args).length < 1) return newPath;

      Object.entries(args).forEach(([key3, value3]) => {
        newPath = newPath.includes(`/:${key3}?`)
          ? newPath.replaceAll(`/:${key3}?`, `/${value3}`)
          : newPath.replaceAll(`/:${key3}`, `/${value3}`);
      });

      return newPath;
    };

    dynamicMap[key] = {
      ...dynamicMap[key],
      [key1]: (args) => generatePathFunc(args),
    };
  });
});

export { map, dynamicMap };
