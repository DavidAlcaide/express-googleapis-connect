interface IWebCredentials {
    "client_id": string,
    "project_id": string,
    "auth_uri": string,
    "token_uri": string,
    "auth_provider_x509_cert_url": string,
    "client_secret": string,
    "redirect_uris": Array<string>
    "javascript_origins": Array<string>
}

export interface ICredentials {
    "web": IWebCredentials
}

export interface IGoogleService {
    serviceName:string,
    initService: ()=> any
}
