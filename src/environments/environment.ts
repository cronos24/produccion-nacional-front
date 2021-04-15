export const environment: any = {
  production: false,
  CONFIGURACION_SERVICIOS: {
    'produccion-nacional': {
      protocol: 'http',
      host: '34.71.5.25',
      port: 3000,
      pathName: 'pn/v1'
    }
  },
  VUCE_API: {
    MDM: {
      protocol: 'http',
      host: 'mdmqa.vuce.gov.co',
      port: 80,
      pathName: 'api'
    }
  }
};
