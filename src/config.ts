import * as _ from 'lodash'

export enum EnvVariable {
    Wolfram = "WOLFRAM_APP_ID",
    Discord = "DISCORD_TOKEN"
}

export const getVariable = (variable: EnvVariable): string => {
    return process.env[variable]
}

export const verifyEnv = () => {
    Object.keys(EnvVariable).forEach((key) => {
        let variable = _.get(process, `env.${EnvVariable[key]}`, null)
        if (_.isNil(variable)) throw new Error(`Environment Variable for ${EnvVariable[key]} is missing in PATH.`)
    })
}