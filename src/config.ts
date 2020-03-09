import * as _ from 'lodash'

export enum EnvVariable {
    Wolfram = "WOLFRAM_APP_ID",
    Discord = "DISCORD_TOKEN"
}

export enum Guild {
    TxGS = '135579694203535360',
    CBD  = '601584043414257674'
}

export enum UserId {
    Timmons   = '467175964590473219',
    Cash      = '172193487645704193',
    Jack      = '165665871363047424',
    Kyle      = '124682946668920835',
    Shawn     = '136670778111295488',
    SandGhost = '335533146332200961',
    Matt      = '272614212029775873',
    Josh      = '77288648961171456',
    Joey      = '190972183189651456',
    Beanie    = '215632146205769728',
    Chris     = '650353865803169823',
    Auston    = '138343490584182784',
    Ross      = '204426596805902336',
}

export enum Reaction {
    Siren    = 'siren:686121210869710858',
    Corn     = '%F0%9F%8C%BD',
    Timmons  = 'timmons:326897101231489024',
    MushiJoe = 'mushijoe:251240811587567616',
    BIP      = 'BIP:439181868815089666',
    Shawn    = 'gilleland:326875229077110796',
    Feetza   = 'feetza:484210228418576384',
    Potato   = 'potato_ass:465947295305695242',
    Juggies  = 'juggies:558434800579379210',
    TxGS     = 'TxGS:442058552224514048',
    Kyle     = 'eduminer:480600463658713100',
    OOO      = 'OOO:473042993444814858',
    Beanie   = 'beanie:480197818196426776'
} 

export const defaultReactions = {
    [Guild.TxGS] : {
        [UserId.Timmons]   : Reaction.Siren,
        [UserId.Cash]      : Reaction.Corn,
        [UserId.Jack]      : Reaction.Potato,
        [UserId.Kyle]      : Reaction.Kyle,
        [UserId.Shawn]     : Reaction.Shawn,
        [UserId.SandGhost] : Reaction.BIP,
        [UserId.Matt]      : Reaction.Timmons,
        [UserId.Josh]      : Reaction.OOO,
        [UserId.Joey]      : Reaction.MushiJoe,
        [UserId.Beanie]    : Reaction.Beanie,
        [UserId.Chris]     : Reaction.TxGS,
        [UserId.Auston]    : Reaction.Feetza,
        [UserId.Ross]      : Reaction.Juggies
    },
    [Guild.CBD] : {
        [UserId.Jack]      : Reaction.Potato,
        [UserId.Cash]      : Reaction.Corn
    }
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