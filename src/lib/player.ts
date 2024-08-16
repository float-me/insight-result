export let round = 0

type Action = {
    text: string,
    detail?: string,
    ganet?: number,
    spinel?: number
}

export class Player {
    name: string
    alive: boolean
    ganet: number[]
    spinel: number[]
    history: Action[]
    constructor(name: string, rank: number, initialGanet: number, initialSpinel: number) {
        this.name = name
        this.alive = true
        this.ganet = [initialGanet]
        this.spinel = [initialSpinel]
        this.history = [{text: "선발전", detail:`${rank}등`, ganet:initialGanet, spinel:initialSpinel}]
    }

    giveGanet(player: Player, ganet: number, action: Action) {
        this.ganet[round] -= ganet
        player.ganet[round] -= ganet
        this.history.push( {...action, detail: `${player.name}에게 ${ganet}가넷을 전달했습니다.`, ganet: -ganet})
        player.history.push(
            {...action, detail: `${player.name}에게서 ${ganet}가넷을 받았습니다.`, ganet: ganet})
    }

    getGanet(ganet: number, action: Action) {
        this.ganet[round] += ganet
        this.history.push({...action, detail:`${ganet}가넷을 받았습니다.`, ganet:ganet})
    }

    useGanet(ganet: number, action: Action) {
        this.ganet[round] -= ganet
        this.history.push({...action, detail:`${ganet}가넷을 사용했습니다.`, ganet:-ganet})
    }

    giveSpinel(player: Player, spinel: number, action: Action) {
        this.spinel[round] -= spinel
        player.spinel[round] -= spinel
        this.history.push( {...action, detail: `${player.name}에게 ${spinel}스피넬을 전달했습니다.`, spinel: -spinel})
        player.history.push(
            {...action, detail: `${player.name}에게서 ${spinel}스피넬을 받았습니다.`, spinel: spinel})
    }

    getSpinel(spinel: number, action: Action) {
        this.spinel[round] += spinel
        this.history.push({...action, detail:`${spinel}스피넬을 받았습니다.`, spinel:spinel})
    }

    useSpinel(spinel: number, action: Action) {
        this.spinel[round] -= spinel
        this.history.push({...action, detail:`${spinel}스피넬을 사용했습니다.`, spinel:-spinel})
    }

    changeRound(action: Action) {
        this.ganet.push(this.ganet[round])
        this.spinel.push(this.spinel[round])
        this.history.push(action)
    }

    die(action: Action) {
        this.alive = false
        this.history.push({...action, detail:"탈락했습니다."})
    }
}

const info: [string, number, number][] = [
    ["나경수", 3, 3], ["고종환", 3, 2], ["최준서", 3, 3], ["김솔엽", 1, 0]
]

export let players: {[name: string]: Player} = {}
export let names: string[] = []
for (let i = 0; i < info.length; i++) {
    const element = info[i];
    players[element[0]] = new Player(element[0], i+1, element[1], element[2])
    names.push(element[0])
}

function changeRound() {
    let action = {text: `${round + 1}회전이 시작되었습니다.`}
    for (const name in players) {
        if (Object.prototype.hasOwnProperty.call(players, name)) {
            const player = players[name];
            player.changeRound(action)
        }
    }
    round += 1
}

// HISTORY OF INS!GHT
changeRound()
players["고종환"].getGanet(3, {text: "1회전 우승"})