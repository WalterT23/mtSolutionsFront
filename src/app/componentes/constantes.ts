export const CONSTANTES = {
    LOGIN: {
        route: "login",
        routeArr: ["","login"],
        nombre: "Login"
    },
    DASHBOARD: {
        route: "dashboard",
        routeArr: ["","dashboard"],
        permiso: "V_PAG_INICIAL",
        nombre: "Pagina de inicio"
    },
    USUARIO: {
        route: "usuario",
        routeArr: ["", "usuario"],
        permiso: "V_PAG_USUARIO",
        nombre: "Pagina de usuario"
    },
    CREAR_USUARIO: {
      route: "crear_usuario",
      routeArr: ["","usuario", "crear_usuario"],
      permiso: "F_CREATE_USER",
      nombre: "Pagina alta de usuario"
    },
    EDITAR_USUARIO: {
      route: "editar_usuario",
      routeArr: ["", "usuario", "editar_usuario"],
      permiso: "F_EDIT_USER",
      nombre: "Pagina edicion de usuario"
    },
    ROLES: {
      route: "roles",
      routeArr: ["", "roles"],
      permiso: "V_PAG_ROLES",
      nombre: "Pagina de roles"
    },
    CREAR_ROL: {
      route: "crear_rol",
      routeArr: ["","roles", "crear_rol"],
      permiso: "F_CREATE_ROL",
      nombre: "Pagina alta roles"
    },
    EDITAR_ROL: {
      route: "editar_rol",
      routeArr: ["","roles", "editar_rol"],
      permiso: "F_EDIT_ROL",
      nombre: "Pagina edicion de roles"
    },
    PROVEEDOR: {
      route: "proveedor",
      routeArr: ["", "proveedor"],
      permiso: "V_PAG_PROVEEDOR",
      nombre: "Pagina de proveedores"
    },
    CREAR_PROVEEDOR: {
      route: "crear_proveedor",
      routeArr: ["", "crear_proveedor"],
      permiso: "F_CREATE_PROVEEDOR",
      nombre: "Pagina alta proveedores"
    }
}
