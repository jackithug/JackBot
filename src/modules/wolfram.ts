import { WolframClient } from 'node-wolfram-alpha'
import * as _ from 'lodash'
import * as config from '../config'
import { EnvVariable } from '../config';

const appId = config.getVariable(EnvVariable.Wolfram)
const client = new WolframClient(appId)

export const evaluate = async (query: string): Promise<String> => {
    const result = await client.query(query, { format: "plaintext" })
    let input, outcome

    const pods = _.get(result, 'data.queryresult.pods', [])
    pods.forEach((pod) => {
        const subpods = _.get(pod, 'subpods', [])
        subpods.forEach((subpod) => {
            const title = _.get(pod, 'title', '')
            switch (title) {
                case "Input":
                    input = subpod.plaintext
                    break
                case "Input interpretation":
                    input = subpod.plaintext
                    break
                case "Result":
                    outcome = subpod.plaintext
                    break
            }
        })
    })

    if (!input || !outcome || !result.data.queryresult.success) {
        return "Sorry, I can't help with that."
    } else {
        return JSON.stringify(`${input} => ${outcome}`)
    }
}